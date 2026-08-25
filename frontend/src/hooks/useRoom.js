import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { initSocket } from "../socket";
import {
  DEFAULT_CODE,
  DEFAULT_OPPONENT_CODE,
  DEFAULT_TIME_LEFT,
  parseModelJson,
} from "../utils/battleRoom";

export function useRoom({ roomid, name, locationState, navigate }) {
  const socketref = useRef(null);
  const timerRef = useRef(null);
  const playersRef = useRef({ player1: null, player2: null });

  const [connectionError, setConnectionError] = useState(false);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("javascript");
  const [opponentCode, setOpponentCode] = useState(DEFAULT_OPPONENT_CODE);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [players, setPlayers] = useState({ player1: null, player2: null });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [totalScores, setTotalScores] = useState({ player1: 0, player2: 0 });
  const [difficulty, setDifficulty] = useState("easy");
  const [generating, setGenerating] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roundInfo, setRoundInfo] = useState({ current: 1, max: 3 });
  const [gameOver, setGameOver] = useState(false);
  const [finalResults, setFinalResults] = useState(null);
  const [opponentSubmitted, setOpponentSubmitted] = useState(false);
  const [bothPlayersReady, setBothPlayersReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (startTime, duration) => {
    clearTimer();
    const durationSeconds = Math.floor((duration || DEFAULT_TIME_LEFT * 1000) / 1000);
    const elapsedSeconds = startTime
      ? Math.floor((Date.now() - startTime) / 1000)
      : 0;
    const initialSeconds = Math.max(0, durationSeconds - elapsedSeconds);
    setTimeLeft(initialSeconds);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const setRoundScoresFromLeaderboard = (winnerId, isTie) => {
    if (isTie) {
      setScores((prev) => ({
        player1: (prev.player1 || 0) + 1,
        player2: (prev.player2 || 0) + 1,
      }));
      setTotalScores((prev) => ({
        player1: (prev.player1 || 0) + 1,
        player2: (prev.player2 || 0) + 1,
      }));
      return;
    }

    setScores((prev) => {
      const nextScores = { ...prev };
      if (playersRef.current.player1?.id === winnerId) {
        nextScores.player1 = (prev.player1 || 0) + 1;
      } else if (playersRef.current.player2?.id === winnerId) {
        nextScores.player2 = (prev.player2 || 0) + 1;
      }
      return nextScores;
    });

    setTotalScores((prev) => {
      const nextScores = { ...prev };
      if (playersRef.current.player1?.id === winnerId) {
        nextScores.player1 = (prev.player1 || 0) + 1;
      } else if (playersRef.current.player2?.id === winnerId) {
        nextScores.player2 = (prev.player2 || 0) + 1;
      }
      return nextScores;
    });
  };

  useEffect(() => {
    if (!locationState) {
      navigate("/");
      return undefined;
    }

    let cancelled = false;

    const handleConnectFailure = (error) => {
      console.log("sockettt error", error);
      toast.error("Socket connection failed");
      navigate("/");
    };

    const sync = async () => {
      try {
        socketref.current = await initSocket();
        if (cancelled || !socketref.current) {
          return;
        }

        setConnectionError(false);

        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        const userId = storedUser?.id ?? storedUser?._id;
        const joinRoom = () => {
          socketref.current.emit("join", {
            roomid,
            name,
            userId,
          });
        };

        socketref.current.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
          setConnectionError(true);
          toast.error("Connection to server lost. Trying to reconnect...");
        });

        socketref.current.on("reconnect", () => {
          setConnectionError(false);
          toast.success("Reconnected to server!");
        });

        socketref.current.on("connect", joinRoom);

        socketref.current.on("room_full", () => {
          toast.error("Room is full");
          navigate("/join");
        });

        socketref.current.on("connect_failed", handleConnectFailure);

        socketref.current.on("opponent_code_update", ({ code: nextCode }) => {
          setOpponentCode(nextCode);
        });

        socketref.current.on("room_update", (updatedRoom) => {
          const playerIds = Object.keys(updatedRoom.players);

          if (playerIds.length === 2) {
            const [id1, id2] = playerIds;
            const p1 = updatedRoom.players[id1];
            const p2 = updatedRoom.players[id2];

            const newPlayers = {
              player1: { id: p1.id, name: p1.name, socketId: id1 },
              player2: { id: p2.id, name: p2.name, socketId: id2 },
            };
  console.log("room update", newPlayers, p1.totalScore, p2.totalScore);
  console.log("room update", newPlayers, p1.score, p2.score);
            setPlayers(newPlayers);
            setScores({
              player1: p1.totalScore || 0,
              player2: p2.totalScore || 0,
            });
            setTotalScores({
              player1: p1.totalScore || 0,
              player2: p2.totalScore || 0,
            });
            setBothPlayersReady(Object.values(updatedRoom.players).every((player) => player.isReady));
          } else {
            setBothPlayersReady(false);
          }
        });

        socketref.current.on("game_start", ({ round, maxRounds, startTime, duration }) => {
          setRoundInfo({ current: round, max: maxRounds });
          startTimer(startTime, duration);
          setBothPlayersReady(true);
        });

        socketref.current.on("prepare_next_round", ({ round, maxRounds }) => {
          clearTimer();
          setRoundInfo({ current: round, max: maxRounds });
          setTimeLeft(DEFAULT_TIME_LEFT);
          setHasSubmitted(false);
          setIsSubmitting(false);
          setOpponentSubmitted(false);
          setCode(DEFAULT_CODE);
          setOpponentCode(DEFAULT_OPPONENT_CODE);
          setBothPlayersReady(false);
          toast(`Round ${round} starting!`);
        });

        socketref.current.on("game_over", (results) => {
          setGameOver(true);
          setFinalResults(results);
          clearTimer();
          setTimeLeft(0);
        });

        socketref.current.on("error", ({ message }) => {
          toast.error(message);
        });

        socketref.current.on("challenge_generated", ({ challenge, difficulty: nextDifficulty, message }) => {
          toast.success(message);
          setCurrentChallenge(challenge);
          setDifficulty(nextDifficulty);
        });

        socketref.current.on("update_leaderboard", ({ winnerName, winnerId, isTie, message }) => {
          if (isTie) {
            toast.success(message || "It's a tie! Both players get a point");
          } else {
            toast.success(`${winnerName} wins this round`);
          }
    console.log("update_leaderboard", winnerId, isTie);
          setRoundScoresFromLeaderboard(winnerId, isTie);
        });

        socketref.current.on("opponent_submitted", ({ message }) => {
          setOpponentSubmitted(true);
          toast(message);
        });

        socketref.current.on("opponent_ready", ({ message }) => {
          toast(message);
        });

        joinRoom();
      } catch (error) {
        console.error("Failed to initialize socket:", error);
        setConnectionError(true);
        toast.error("Failed to connect to server. Please try again later.");
        navigate("/");
      }
    };

    sync();

    return () => {
      cancelled = true;
      clearTimer();
      if (socketref.current) {
        socketref.current.disconnect();
      }
    };
  }, [roomid, name, navigate, locationState]);

  const fetchRandomChallenge = async () => {
    if (!bothPlayersReady) {
      toast.error("Both players must be ready before starting the challenge");
      return;
    }

    setGenerating(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/groq`,
        {
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content: `Generate a random ${difficulty === 'easy' ? 'easy' : 'medium'} level coding question from leetcode or any platform that can be solved in any language,Strictly
Respond in JSON format with the following structure:

{
  "Title": "Title of the Coding Question",
  "Description": " problem statement, constraints, and examples.",
  "TestCases": [
    {
      "input": "Input example 1",
      "output": "Expected output 1"
    },
    {
      "input": "Input example 2",
      "output": "Expected output 2"
    }
  ]
}
`,
            },
          ],
        }
      );

      const challenge = parseModelJson(response.data.choices[0].message.content);
      setCurrentChallenge(challenge);

      if (roomid && socketref.current) {
        socketref.current.emit("challenge_generated", {
          roomid,
          challenge,
          difficulty,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch challenge");
    } finally {
      setGenerating(false);
    }
  };

  const handleCodeChange = (nextCode) => {
    setCode(nextCode);
    if (roomid && socketref.current) {
      socketref.current.emit("code_update", { roomid, code: nextCode });
    }
  };

  const handleReady = () => {
    if (roomid && socketref.current) {
      socketref.current.emit("ready", { roomid, code });
    }
  };

  const handlesubmit = async () => {
    if (!bothPlayersReady) {
      toast.error("Both players must be ready before submitting");
      return;
    }

    if (hasSubmitted) {
      toast.error("You already submitted for this round");
      return;
    }

    if (isSubmitting) {
      toast.error("Already submitting...");
      return;
    }

    if (code.trim() === DEFAULT_CODE.trim() || code.trim().length === 0) {
      toast.error("Please write some code before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/groq`,
        {
           model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: `
You are a STRICT competitive programming judge.

You MUST internally reason step-by-step before deciding marks, but DO NOT output reasoning.

Evaluation steps (MANDATORY):
1. Check correctness of logic
2. Check edge cases
3. Check constraints handling
4. Check time & space complexity
5. Check if code is complete and runnable

Scoring rules (STRICT):
- Random keywords  → 0 marks
- Wrong logic → marks below 300
- Missing edge cases → below 700
- Inefficient solution → reduce marks
- ONLY give 900+ if fully correct and optimal

CRITICAL RULES:
- DO NOT assume code is correct
- DO NOT give high marks by default
- If unsure → give LOWER marks
- NEVER give 1000 unless absolutely perfect

Return ONLY valid JSON:
{"marks": number}
No explanation, no text.
            `,
          },
          {
            role: "user",
            content: `
Problem:
${JSON.stringify(currentChallenge)}

Language:
${language}

Candidate Code:
${code}
            `,
          },
        ],
        temperature: 0.2,
      }
    );

    const raw = response?.data?.choices?.[0]?.message?.content || "";
     console.log("Raw model output:", raw);
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/); 
      parsed = match ? JSON.parse(match[0]) : { marks: 0 };
    }

    let marks = parsed?.marks ?? 0;
    if (typeof marks !== "number") {
      const nums = String(marks).match(/\d+/g);
      marks = nums ? Number(nums[nums.length - 1]) : 0;
    }

    marks = Math.max(0, Math.min(1000, Math.round(marks)));
      if (socketref.current) {
        socketref.current.emit("submit_code", {
          roomid,
          score: marks,
        });
      }

      setHasSubmitted(true);
      toast.success("Code submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to evaluate code");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    connectionError,
    code,
    setCode,
    language,
    setLanguage,
    opponentCode,
    currentChallenge,
    players,
    scores,
    totalScores,
    difficulty,
    setDifficulty,
    generating,
    hasSubmitted,
    isSubmitting,
    roundInfo,
    gameOver,
    finalResults,
    opponentSubmitted,
    bothPlayersReady,
    timeLeft,
    handleCodeChange,
    handleReady,
    fetchRandomChallenge,
    handlesubmit,
  };
}
