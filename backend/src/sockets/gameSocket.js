const MAX_ROUNDS = 3;
const ROUND_DURATION = 5 * 60 * 1000;
const User = require('../models/User');

function getStatsDelta({ isTie, isWinner }) {
  if (isTie) {
    return { rating: 2, wins: 0, losses: 0, gamesPlayed: 1 };
  }

  if (isWinner) {
    return { rating: 15, wins: 1, losses: 0, gamesPlayed: 1 };
  }

  return { rating: -10, wins: 0, losses: 1, gamesPlayed: 1 };
}

async function persistLeaderboardStats(room, players, winnerName, isTie) {
  const now = new Date();

  const operations = players.map((player) => {
    const isWinner = !isTie && player.name === winnerName;
    const delta = getStatsDelta({ isTie, isWinner });

    return {
      updateOne: {
        filter: { username: player.name },
        update: {
          $inc: {
            rating: delta.rating,
            wins: delta.wins,
            losses: delta.losses,
            gamesPlayed: delta.gamesPlayed,
          },
          $set: {
            lastActive: now,
          },
        },
      },
    };
  });

  if (!operations.length) {
    return;
  }

  const result = await User.bulkWrite(operations, { ordered: false });
  console.log(`Leaderboard stats updated for room ${room.id}`, result.modifiedCount || 0);
}

function createCleanRoomObject(room) {
  return {
    id: room.id,
    status: room.status,
    currentChallenge: room.currentChallenge,
    difficulty: room.difficulty,
    round: room.round,
    maxRounds: room.maxRounds,
    roundStartTime: room.roundStartTime,
    players: Object.fromEntries(
      Object.entries(room.players).map(([id, player]) => [
        id,
        {
          id: player.id,
          name: player.name,
          isReady: player.isReady,
          submitted: player.submitted,
          score: player.score,
          totalScore: player.totalScore,
          disconnected: player.disconnected || false,
        },
    ])
    ),
  };
}

function createRoom(roomid) {
  return {
    id: roomid,
    players: {},
    status: "waiting",
    currentChallenge: null,
    difficulty: "easy",
    round: 1,
    maxRounds: MAX_ROUNDS,
    timer: null,
    roundStartTime: null,
  };
}

function processRoundResults(io, rooms, room) {
  if (room.timer) {
    clearTimeout(room.timer);
    room.timer = null;
  }

  const players = Object.values(room.players);
  const isTie = players[0].score === players[1].score;
  const roundWinnerName = isTie ? null : players.reduce((max, player) =>
    player.score > max.score ? player : max,
  players[0]).name;

  if (isTie) {
    players.forEach((player) => {
      player.totalScore += 1;
    });

    io.emit("leaderboard_updated", {
      roomId: room.id,
      isTie: true,
      playerScores: players.map((player) => ({
        id: player.id,
        name: player.name,
        score: player.score,
        totalScore: player.totalScore,
      })),
    });

    io.to(room.id).emit("update_leaderboard", {
      isTie: true,
      message: "It's a tie! Both players get a point",
      playerScores: players.map((player) => ({
        id: player.id,
        name: player.name,
        score: player.score,
        totalScore: player.totalScore,
      })),
    });
  } else {
    const roundWinner = players.find((player) => player.name === roundWinnerName) || players[0];

    roundWinner.totalScore += 1;

    io.emit("leaderboard_updated", {
      roomId: room.id,
      isTie: false,
      winnerId: roundWinner.id,
      winnerName: roundWinner.name,
      score: roundWinner.score,
      round: room.round,
      playerScores: players.map((player) => ({
        id: player.id,
        name: player.name,
        score: player.score,
        totalScore: player.totalScore,
      })),
    });


  persistLeaderboardStats(room, players, roundWinnerName, isTie).catch((error) => {
    console.error(`Failed to persist leaderboard stats for room ${room.id}:`, error);
  });
    io.to(room.id).emit("update_leaderboard", {
      winnerId: roundWinner.id,
      winnerName: roundWinner.name,
      score: roundWinner.score,
      round: room.round,
      isTie: false,
      playerScores: players.map((player) => ({
        id: player.id,
        name: player.name,
        score: player.score,
        totalScore: player.totalScore,
      })),
    });
  }

  if (room.round >= room.maxRounds) {
    const finalWinner = players.reduce((max, player) =>
      player.totalScore > max.totalScore ? player : max,
    players[0]);

    io.to(room.id).emit("game_over", {
      winner: finalWinner.name,
      totalScore: finalWinner.totalScore,
      scores: players.map((player) => ({
        name: player.name,
        totalScore: player.totalScore,
        roundScores: player.roundScores || [],
      })),
    });

    rooms.delete(room.id);
    return;
  }

  room.round += 1;
  room.currentChallenge = null;
  room.roundStartTime = null;
  room.timer = null;

  for (const player of players) {
    player.submitted = false;
    player.isReady = false;
    player.code = "";
    player.score = 0;
  }

  io.to(room.id).emit("prepare_next_round", {
    round: room.round,
    maxRounds: room.maxRounds,
    playerScores: players.map((player) => ({
      id: player.id,
      name: player.name,
      totalScore: player.totalScore,
    })),
  });
}

function registerGameSockets(io) {
  const rooms = new Map();
  const users = new Map();

  io.on("connection", (socket) => {
    console.log(`user connected:${socket.id}`);

    socket.on("join", ({ roomid, name }) => {
      const room = rooms.get(roomid) || createRoom(roomid);

      if (Object.keys(room.players).length >= 2 && !room.players[socket.id]) {
        socket.emit("room_full");
        return;
      }

      if (room.players[socket.id]) {
        room.players[socket.id].socketId = socket.id;
      } else {
        room.players[socket.id] = {
          id: socket.id,
          name,
          code: "",
          isReady: false,
          score: 0,
          submitted: false,
          totalScore: 0,
          disconnected: false,
        };
      }

      rooms.set(roomid, room);
      socket.join(roomid);
      users.set(socket.id, { roomid, name });

      socket.emit("room_update", createCleanRoomObject(room));

      if (room.status === "in-progress") {
        socket.emit("game_start", {
          round: room.round,
          maxRounds: room.maxRounds,
          startTime: room.roundStartTime,
          duration: ROUND_DURATION,
          players: Object.values(room.players).map((player) => ({
            id: player.id,
            name: player.name,
            isReady: player.isReady,
          })),
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`user disconnected:${socket.id}`);
      const userData = users.get(socket.id);

      if (userData) {
        const room = rooms.get(userData.roomid);

        if (room) {
          if (room.players[socket.id]) {
            room.players[socket.id].disconnected = true;
          }

          io.to(userData.roomid).emit("room_update", createCleanRoomObject(room));
        }

        users.delete(socket.id);
      }
    });

    socket.on("code_update", ({ roomid, code }) => {
      const room = rooms.get(roomid);

      if (room && room.players[socket.id]) {
        room.players[socket.id].code = code;
        socket.to(roomid).emit("opponent_code_update", {
          userId: socket.id,
          code,
        });
      }
    });

    socket.on("ready", ({ roomid, code }) => {
      const room = rooms.get(roomid);

      if (!room) {
        socket.emit("error", {
          message: "Room not found",
        });
        return;
      }

      if (!room.players[socket.id]) {
        socket.emit("error", { message: "Player not found in room" });
        return;
      }

      if (room.timer) {
        clearTimeout(room.timer);
        room.timer = null;
      }

      room.players[socket.id].isReady = true;
      room.players[socket.id].code = code || "";

      const allReady = Object.values(room.players).every((player) => player.isReady);
      const allPlayersPresent = Object.keys(room.players).length === 2;

      if (allReady && allPlayersPresent) {
        room.status = "in-progress";
        room.roundStartTime = Date.now();

        if (room.timer) {
          clearTimeout(room.timer);
        }

        room.timer = setTimeout(() => {
          Object.values(room.players).forEach((player) => {
            if (!player.submitted) {
              player.submitted = true;
              player.score = 0;
            }
          });

          processRoundResults(io, rooms, room);
        }, ROUND_DURATION);

        io.to(roomid).emit("game_start", {
          round: room.round,
          maxRounds: room.maxRounds,
          startTime: room.roundStartTime,
          duration: ROUND_DURATION,
          players: Object.values(room.players).map((player) => ({
            id: player.id,
            name: player.name,
            isReady: player.isReady,
          })),
        });
      }

      io.to(roomid).emit("room_update", createCleanRoomObject(room));

      socket.to(roomid).emit("opponent_ready", {
        message: "Your opponent is ready",
      });
    });

    socket.on("submit_code", ({ roomid, score }) => {
      const room = rooms.get(roomid);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      if (!room.players[socket.id]) {
        socket.emit("error", { message: "Player not found in room" });
        return;
      }

      if (room.players[socket.id].submitted) {
        socket.emit("error", { message: "You have already submitted for this round" });
        return;
      }

      room.players[socket.id].score = Number(score);
      room.players[socket.id].submitted = true;
      room.players[socket.id].totalScore += Number(score);

      const allSubmitted = Object.values(room.players).every((player) => player.submitted);

      if (allSubmitted) {
        if (room.timer) {
          clearTimeout(room.timer);
          room.timer = null;
        }

        processRoundResults(io, rooms, room);
      } else {
        socket.to(roomid).emit("opponent_submitted", {
          message: "Your opponent has submitted their code",
        });
      }
    });

    socket.on("challenge_generated", ({ roomid, challenge, difficulty }) => {
      const room = rooms.get(roomid);

      if (room) {
        room.currentChallenge = challenge;
        room.difficulty = difficulty;

        io.to(roomid).emit("challenge_generated", {
          challenge,
          difficulty,
          message: "New challenge generated",
        });

        console.log(`Challenge sent to room ${roomid}:`, challenge);
      }
    });
  });
}

module.exports = {
  registerGameSockets,
  createCleanRoomObject,
};