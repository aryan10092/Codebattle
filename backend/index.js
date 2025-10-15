const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require('./routes/auth');
const path = require("path");
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))

.catch(err => console.error('MongoDB connection error:', err));


app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  console.log("Root route hit");
  res.send("Backend alive!");
});


const server = http.createServer(app);


const io = new Server(server);

// const __dirname1=path.resolve()
// app.use(express.static(path.join(__dirname1, "../frontend/dist")));

// app.use( (req, res) => {
//   res.sendFile(path.join(__dirname1, "frontend","dist","index.html"));
// });

//app.use(express.static("../frontend/dist"))
//app.use( (req, res) => {
  //   res.sendFile(path.join(__dirname,  '../../CODEBATTLE/frontend/dist/index.html'));
 // })

server.on('error', (error) => {
  console.error('Server error:', error);
});

const socketmap = {};

const rooms = new Map();
const user = new Map();
const MAX_ROUNDS = 3;

const ROUND_DURATION = 5 * 60 * 1000; 

// const getallusers = (roomid) => {
//   return Array.from(io.sockets.adapter.rooms.get(roomid) || []).map(
//     (socketid) => {
//       return { socketid,
//         name: socketmap[socketid]
//       }
//     })}


const createCleanRoomObject = (room) => {
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
               disconnected: player.disconnected || false
        }
        ])
    ) };};

io.on('connection', (socket) => {
  console.log(`user connected:${socket.id}`);


  socket.on('join', ({ roomid, name }) => {
    const room = rooms.get(roomid) ||
     {
      id: roomid,
      players: {},
      status: 'waiting',
      currentChallenge: null,
      difficulty: 'easy',
      round: 1,
      maxRounds: MAX_ROUNDS,

       timer: null,
      roundStartTime: null
    };
 //const n=name
    if (Object.keys(room.players).length >= 2 && !room.players[socket.id]) {
      socket.emit('room_full');
      return;
    }

  
    if (room.players[socket.id]) {
      room.players[socket.id].socketId = socket.id;
    }
     else {
      room.players[socket.id] = {
        id: socket.id,
        name,
        code: '',
        isReady: false,
        score: 0,
        submitted: false,
        totalScore: 0,
        disconnected: false
      };
    }

    rooms.set(roomid, room);
    socket.join(roomid);
    user.set(socket.id, { roomid, name });


    const cleanRoom = createCleanRoomObject(room);
    socket.emit('room_update', cleanRoom);

    if (room.status === 'in-progress') {
      socket.emit('game_start', {
        round: room.round,
        maxRounds: room.maxRounds,
        startTime: room.roundStartTime,
        duration: ROUND_DURATION,
        players: Object.values(room.players).map(p =>
           ({
          id: p.id,
          name: p.name,
          isReady: p.isReady
        }))
   });}
  });


  socket.on('disconnect', () => {
    console.log(`user disconnected:${socket.id}`);
    const userData = user.get(socket.id);
    if (userData) {
      const room = rooms.get(userData.roomid);
      if (room) {
   
        if (room.players[socket.id]) {
          room.players[socket.id].disconnected = true;
        }
        const cleanRoom = createCleanRoomObject(room);
        io.to(userData.roomid).emit('room_update', cleanRoom);
      }
      user.delete(socket.id);
    }
  });

  socket.on('code_update', ({ roomid, code }) => {
    const room = rooms.get(roomid);
    if (room && room.players[socket.id]) {
      room.players[socket.id].code = code;
      console.log(code)
      socket.to(roomid).emit('opponent_code_update', {
        userId: socket.id,
        code
      });
    }
  });

  socket.on('ready', ({ roomid, code }) => {
    const room = rooms.get(roomid);
    if (!room) {
        socket.emit('error', {
           message: 'Room not found' });
        return;
    }

    if (!room.players[socket.id]) {
        socket.emit('error', { message: 'Player not found in room' });
        return;
    }

    if (room.timer) {
      clearTimeout(room.timer);
      room.timer = null;
  }

    room.players[socket.id].isReady = true;
    //const res=code
    room.players[socket.id].code = code || '';
    
   
    const allReady = Object.values(room.players).every(player => player.isReady);
    const allPlayersPresent = Object.keys(room.players).length === 2;

    if (allReady && allPlayersPresent) {
        room.status = 'in-progress';
        room.roundStartTime = Date.now();
        
      
        if (room.timer) {
            clearTimeout(room.timer);
        }

        room.timer = setTimeout(() => {
      
            Object.values(room.players).forEach(player => {
                if (!player.submitted) {
                    player.submitted = true;
                    player.score = 0;
                }
            });
            
            processRoundResults(room);
        }, ROUND_DURATION);

    
        io.to(roomid).emit('game_start', {
            round: room.round,
            maxRounds: room.maxRounds,
            startTime: room.roundStartTime,
            duration: ROUND_DURATION,
            players: Object.values(room.players).map(p => ({
                id: p.id,
                name: p.name,
                isReady: p.isReady
            }))
        });
    }

    const cleanRoom = createCleanRoomObject(room);
    io.to(roomid).emit('room_update', cleanRoom);

    socket.to(roomid).emit('opponent_ready', {
      message: 'Your opponent is ready'
  });
  });

  // socket.on('submit_code', ({ roomid, code,marks,playerName }) => {
  //   const room = rooms.get(roomid);
  //   if (room && room.players[socket.id]) {
  //     // Here you would implement code execution and testing
  //     // For now, we'll just acknowledge the submission
  //     socket.emit('submission_result', {
  //       success: true,
  //       message: 'Code submitted successfully'
  //     });
  //   }
  // });

  socket.on('submit_code', ({ roomid, score }) => {
    const room = rooms.get(roomid);
    if (!room) {
        socket.emit('error', { message: 'Room not found' });
        return;
    }

    if (!room.players[socket.id]) {
        socket.emit('error', { message: 'Player not found in room' });
        return;
    }

    if (room.players[socket.id].submitted) {
        socket.emit('error', { message: 'You have already submitted for this round' });
        return;
    }

    room.players[socket.id].score = Number(score);
    room.players[socket.id].submitted = true;
    room.players[socket.id].totalScore += Number(score);

    const allSubmitted = Object.values(room.players).every(player => player.submitted);
    
    if (allSubmitted) {

        if (room.timer) {
            clearTimeout(room.timer);
            room.timer = null;
        }
        processRoundResults(room);
    } else {
  
        socket.to(roomid).emit('opponent_submitted', {
            message: 'Your opponent has submitted their code'
        });
    }
  });

  function processRoundResults(room) {
    if (room.timer) {
        clearTimeout(room.timer);
        room.timer = null;
    }

    const players = Object.values(room.players);
    
    // Check if it's a tie
    const isTie = players[0].score === players[1].score;
    
    if (isTie) {
        // Both players get a point in case of tie
        players.forEach(player => {
            player.totalScore += 1;
        });

        io.to(room.id).emit('update_leaderboard', {
            isTie: true,
            message: "It's a tie! Both players get a point",
            playerScores: players.map(p => ({
                id: p.id,
                name: p.name,
                score: p.score,
                totalScore: p.totalScore
            }))
        });
    } else {
        // Handle normal case with a winner
        const roundWinner = players.reduce((max, player) => 
            player.score > max.score ? player : max, players[0]);

        roundWinner.totalScore += 1;

        io.to(room.id).emit('update_leaderboard', {
            winnerId: roundWinner.id,
            winnerName: roundWinner.name,
            score: roundWinner.score,
            round: room.round,
            isTie: false,
            playerScores: players.map(p => ({
                id: p.id,
                name: p.name,
                score: p.score,
                totalScore: p.totalScore
            }))
        });
    }

    if (room.round >= room.maxRounds) {
        const finalWinner = players.reduce((max, player) => 
            player.totalScore > max.totalScore ? player : max, players[0]);
        
        io.to(room.id).emit('game_over', {
            winner: finalWinner.name,
            totalScore: finalWinner.totalScore,
            scores: players.map(p => ({ 
                name: p.name, 
                totalScore: p.totalScore,
                roundScores: p.roundScores || [] 
            }))
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
        player.code = '';
        player.score = 0; 
    }

    io.to(room.id).emit('prepare_next_round', { 
        round: room.round,
        maxRounds: room.maxRounds,
        playerScores: players.map(p => ({
            id: p.id,
            name: p.name,
            totalScore: p.totalScore
        }))
    });
  }

  socket.on('challenge_generated', ({ roomid, challenge, difficulty }) => {
    const room = rooms.get(roomid);
    if (room) {
      room.currentChallenge = challenge;
      room.difficulty = difficulty;
      const message= 'New challenge generated'

      io.to(roomid).emit('challenge_generated', { challenge, difficulty,message });
    //   socket.to(roomid).emit('new_challenge', {
    //     message: 'New challenge generated'
    // });
      console.log(`Challenge sent to room ${roomid}:`, challenge);
    }
  });

})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server is ready for connections`);
});
