import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertCircle, Copy, ChevronsUpDown, Play, TimerReset, Trophy, Code2, Users,
   Settings, Zap, Sparkles, Sword, Shield, Crown, Terminal, Target, Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";
//import Codeeditor from '../components/Codeeditor';

import { initSocket } from '../socket';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import toast from 'react-hot-toast';
import Editor from '@monaco-editor/react';
import { updateCode } from '../components/sockets';
import axios from 'axios';

function Dashboard() {
  const socketref = useRef(null)
  const location = useLocation()
  const {roomid} = useParams()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || 'Anonymous';

  const [code, setCode] = useState(' //Write your code here\n');
  const [room, setRoom] = useState()
  const [ready, setready] = useState('false')
  const [language, setLanguage] = useState("javascript");
  
  const [opponentCode, setOpponentCode] = useState('// Waiting for opponent...\n');
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [players, setPlayers] = useState({ player1: null, player2: null });
  const playersRef = useRef(players);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [totalScores, setTotalScores] = useState({ player1: 0, player2: 0 });
  
  const [difficulty, setDifficulty] = useState('easy');
  const [isLoading, setIsLoading] = useState(false);
  const [marks, setmarks] = useState()
  
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const[winner,setWinner]=useState()


  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roundInfo, setRoundInfo] = useState({ current: 1, max: 3 });
  const [gameOver, setGameOver] = useState(false);
  const [finalResults, setFinalResults] = useState(null);
  const [opponentSubmitted, setOpponentSubmitted] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [bothPlayersReady, setBothPlayersReady] = useState(false);
  const [generating, setgenerating] = useState(false);

  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  const fetchRandomChallenge = async () => {
    if (!bothPlayersReady) {
      toast.error("Both players must be ready before starting the challenge");
      return;
    }
     setgenerating(true)
    setIsLoading(true);
    try {
      console.log(difficulty)
      const response = await axios.post("https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "system", content: `Generate a random ${difficulty} level coding question from leetcode or any platform that can be solved in any language,Strictly
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
` }],
        },
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${import.meta.env.VITE_KEY}`,
        //   },
        // }
      );
      console.log(response.data)
      const challenge = JSON.parse(response.data.choices[0].message.content)
      console.log("Generated challenge:", challenge);
      setCurrentChallenge(challenge);
      

      if (roomid && socketref.current) {
        console.log("Emitting challenge to room:", roomid);
        socketref.current.emit("challenge_generated", {
          roomid,
          challenge: challenge,
          difficulty: difficulty
        });
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch challenge");
    } finally {
      setIsLoading(false);
      setgenerating(false)
    }
  };

  useEffect(()=>{
    console.log(code)
  },[code])

  useEffect(()=>{
    console.log(currentChallenge)
  },[currentChallenge])

  useEffect(()=>{
console.log("scores",scores)
  },[scores])

  
  // const evaluateCode = async (player1Code, player2Code) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post('/api/evaluate-code', {
  //       player1Code,
  //       player2Code,
  //       challenge: currentChallenge
  //     });
      
  //     const { winner, explanation } = response.data;
      
  //     setScores(prev => ({
  //       ...prev,
  //       [winner === 'player1' ? 'player1' : 'player2']: prev[winner === 'player1' ? 'player1' : 'player2'] + 1
  //     }));

  //     toast.success(`Winner: ${winner === 'player1' ? 'Player 1' : 'Player 2'}\n${explanation}`);
  //   } catch (error) {
  //     toast.error("Failed to evaluate code");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchRandomChallenge();
  // }, []);

  useEffect(() => {
    const sync = async () => {
      if(!location.state){
        navigate("/");
        return;
      }

      try {
        socketref.current = await initSocket();
        setConnectionError(false);

        socketref.current.on('connect_error', (error) => {
          console.error('Socket connection error:', error);

           setConnectionError(true);
            toast.error("Connection to server lost. Trying to reconnect...");
        
         });

        socketref.current.on('reconnect', () =>
           {
          setConnectionError(false);
          toast.success("Reconnected to server!");
        });

        socketref.current.on('room_full', () => {
          toast.error("Room is full")
          navigate('/join')
          return
        })

        socketref.current.on('connect_failed', 
          (error) => errrofunc(error))

        const errrofunc = (x) => {
          console.log('sockettt error',x)
          toast.error("Socket connection failed")
          navigate("/")
        }

        socketref.current.emit("join", {
          roomid,
          name: name
        })

        socketref.current.on('opponent_code_update', ({userId, code}) => {
          setOpponentCode(code);
        });
      
        socketref.current.on('room_update', (updatedRoom) => {
          console.log("Room update received:", updatedRoom);

         // toast.success("Room is created")
          setRoom(updatedRoom);

          const playerIds = Object.keys(updatedRoom.players);
          console.log("Player IDs from room:", playerIds);
          
          if (playerIds.length === 2) {
            const [id1, id2] = playerIds;
            const p1 = updatedRoom.players[id1];
            const p2 = updatedRoom.players[id2];
            
            console.log("Player 1 data:", { 
              id: id1, name: p1.name, socketId: id1 });
            console.log("Player 2 data:", { 
              id: id2, name: p2.name, socketId: id2 });

            const newPlayers = {
              player1: { id: id1, name: p1.name, socketId: id1 },
              player2: { id: id2, name: p2.name, socketId: id2 }
            };
            
            console.log("Setting players state to:", newPlayers);
            setPlayers(prev => {
              console.log("Previous players state:", prev);
              return newPlayers;
            });

          
            const allReady = Object.values(updatedRoom.players).every(player => player.isReady);
            setBothPlayersReady(allReady);
          }
           else {
            console.log("Waiting for second player to join...");
            setBothPlayersReady(false);
          }
        });

        socketref.current.on('game_start', ({ round, maxRounds, startTime, duration ,players}) => {
          console.log('Game started!');
          setRoundInfo({ current: round, max: maxRounds });
          startTimer(startTime, duration);
          setBothPlayersReady(true);
        });

        socketref.current.on('prepare_next_round', ({ round, maxRounds, startTime, duration }) => {
          setRoundInfo({ current: round, max: maxRounds });
          setTimeLeft(300);
          setHasSubmitted(false);
          setIsSubmitting(false);
          setOpponentSubmitted(false);
          setCode('//Write your code here\n');
          setOpponentCode('// Waiting for opponent...\n');
          setBothPlayersReady(false);
          
    
          if (startTime && duration) {
            startTimer(startTime, duration);
          }
          
          toast(`Round ${round} starting!`);
        });

        socketref.current.on('game_over', (results) => {
          setGameOver(true);
          setFinalResults(results);
          setTimeLeft(null);
              if (window.timerInterval) {
            clearInterval(window.timerInterval);
          }
          setTimeLeft(0);
        });

        socketref.current.on('error', ({ message }) => {
          toast.error(message);
        });

        socketref.current.on("challenge_generated", ({ challenge, difficulty,message }) => {
          console.log("Received challenge:", challenge, "Difficulty:", difficulty);
             toast.success(message)
        
          setCurrentChallenge(challenge);
          setDifficulty(difficulty);
      });

        socketref.current.on("update_leaderboard", ({ winnerId, winnerName, score, isTie, message, playerScores }) => {
          if (isTie) {
            toast.success(message || "It's a tie! Both players get a point");
            // Increment both scores by 1 for tie
            setScores(prev => ({
              player1: (prev.player1 || 0) + 1,
              player2: (prev.player2 || 0) + 1
            }));
            setTotalScores(prev => ({
              player1: (prev.player1 || 0) + 1,
              player2: (prev.player2 || 0) + 1
            }));
          } else {
            toast.success(`${winnerName} wins this round`);
            setScores(prev => {
              const newScores = { ...prev };
              if (playersRef.current.player1?.name === winnerName) {
                newScores.player1 = (prev.player1 || 0) + 1;
              } else if (playersRef.current.player2?.name === winnerName) {
                newScores.player2 = (prev.player2 || 0) + 1;
              }
              return newScores;
            });

            setTotalScores(prev => {
              const newTotalScores = { ...prev };
              if (playersRef.current.player1?.name === winnerName) {
                newTotalScores.player1 = (prev.player1 || 0) + 1;
              } else if (playersRef.current.player2?.name === winnerName) {
                newTotalScores.player2 = (prev.player2 || 0) + 1;
              }
              return newTotalScores;
            });
            setWinner(winnerName);
          }
        });

        socketref.current.on('opponent_submitted', ({ message }) => {
          setOpponentSubmitted(true);
          toast(message);
        });
        //  socketref.current.on('new_challenge', ({ message }) => {
          
        //   toast.success(message);
        // });
        
        socketref.current.on('opponent_ready', ({ message }) => {
          
          toast(message);
        });
      } catch (error) {
        console.error('Failed to initialize socket:', error);
        setConnectionError(true);
        toast.error("Failed to connect to server. Please try again later.");
        navigate("/");
      }
    };

    sync();

    
    return () => {
         if (window.timerInterval) {
        clearInterval(window.timerInterval);
      }
      if (socketref.current) {
        socketref.current.disconnect();
      }
    };
  }, [roomid, name, navigate, location.state]);

 
  useEffect(() => 
    {
    console.log("Current challenge updated:", currentChallenge);
  }, [currentChallenge]);

  const handleCodeChange = (code) => {
    setCode(code);
    if (roomid) {
      socketref.current.emit("code_update", { roomid, code });
    }
  };

  const handleReady = () => {
    setready(true)
    if (roomid) {
      socketref.current.emit("ready", {roomid, code});
    } };

  const startTimer = (startTime, duration) => {
    if (window.timerInterval) {
      clearInterval(window.timerInterval);
    }

    // const endTime = startTime + duration;
    // const updateTimer = () => {
    //   const now = Date.now();
    //   const remaining = Math.max(0, endTime - now);
      setTimeLeft(300);

    //   if (remaining > 0) {
    //     setTimeout(updateTimer, 1000);
    //     window.timerInterval = setTimeout(updateTimer, 1000);
    //   } else {
    //     setTimeLeft(0);
    //     clearInterval(window.timerInterval);
    //   }
    // };
    // updateTimer();
      window.timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(window.timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlesubmit = async () => {
  if (!bothPlayersReady) 
      {
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
    console.log(currentChallenge)
    setIsSubmitting(true);
    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{
            role: "system",
            content: `Check the following code: ${code} for the given question: ${currentChallenge}. Return ONLY a JSON object in this format:
         {"marks": "marks of this code out of 1000"}  
      Do NOT include any explanation, text, or extra formatting. The response should be strictly a JSON object.`
          }],
        },
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${import.meta.env.VITE_KEY}`,
        //   },
        // }
      );

      const res = JSON.parse(response.data.choices[0].message.content);
      console.log(res.marks)
      setmarks(Number(res.marks));
     
      if (socketref.current) {
        socketref.current.emit("submit_code", {
          roomid,
          score: Number(res.marks)
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

  useEffect(() => {
    if (socketref.current) {
      socketref.current.on("prepare_next_round", ({ round }) => {
        if (window.timerInterval) {
          clearInterval(window.timerInterval);
        }
        setTimeLeft(300)
        setHasSubmitted(false);
       //setWaitingForResult(false);
       setIsSubmitting(false);
       setOpponentSubmitted(false)
        setCode("");
        setmarks(0);
        toast(`Round ${round} starting!`);
      });
    }
    return () => {
      if (window.timerInterval) {
        clearInterval(window.timerInterval);
      }
    };
  }, []);
  
  useEffect(()=>{
  console.log(language)
 },[language])

 useEffect(()=>{
  console.log(players)
 },[players])

 useEffect(()=>{
  console.log(room)
 
 },[room])
 useEffect(()=>{
  console.log(scores)
 },[scores])

 
  useEffect(() => {
    console.log("Players state updated:", players);
  }, [players]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
       
        {/* <div className="absolute -top-16 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse z-0" /> */}

      {connectionError && (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-2 text-center z-50">
       Connection lost. Trying to reconnect...  </div>
      )}
   
      <div className="bg-black border-blue border-blue-500/20">
     <div className="container mx-auto px-4 py-3">

          <div className="flex justify-between items-center ">
         <div className="flex items-center space-x-3">
              <div className="bg-black border border-gray-700 p-2 rounded-lg">
                <Terminal className="h-6 w-6 text-white" />
          </div>

             <div>
                <h1 className="text-xl font-bold  bg-clip-text text-white">Code Battle</h1>
                <p className="text-xs text-blue-200">Room: {roomid}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">

              <Badge variant="outline" className="border-gray-700  text-blue-200">
                Round {roundInfo.current}/{roundInfo.max}

              </Badge>
              {timeLeft !== null && (
                <Badge variant="outline" className="border-red-400 bg-red-400/20 text-red-200">
                  {formatTime(timeLeft)}
                </Badge>
              )}
              <Badge variant="outline" className="border-gray-700 bg-blu text-blue-200">
                {name}
              </Badge>
          </div>
         </div>
        </div>   </div>

      <div className="container mx-auto px-4 py-6">
      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
 
          <div className="lg:col-span-2 space-y-4">
        
            <Card className="bg-black border-purple-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm text-blue-200">
                  <Target className="text-red-400" />
                  <span>Battle Status
                  </span>
                </CardTitle>
              </CardHeader>  <CardContent>

                <div className="space-y-4">
            <div className="flex justify-between items-center">
                 <div className="text-center">
                   <p className="text-blue-200 text-xs">
                        {players.player1?.name || "You"}</p>
                     <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        {scores.player1 || 0}
                    </p>
                    </div>
                    <div className="text-xl font-bold text-blue-300">VS</div>
                    <div className="text-center">
                      <p className="text-blue-200 text-xs">
                        {players.player2?.name || "Opponent"}</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                        {scores.player2 || 0}
                      </p>
                    </div>  </div> </div>
              </CardContent>
            </Card>

   
            <Card className="bg-black border-purple-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm text-blue-200">
                  <Award className="text-yellow-400" />
                  <span>Challenge</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    onClick={() => setDifficulty('easy')}
                    className={`w-full cursor-pointer transition-all duration-200 ${
                      difficulty === 'easy' 
                        ? 'bg-green-500 hover:bg-green-600 border-green-400 text-white shadow-lg shadow-green-500/20' 
                        : 'text-gray-200 bg-black hover:bg-black border border-gray-800 hover:shadow-md hover:shadow-gray-800'
                    }`}
                  >
                    Easy
                  </Button>
                  <Button 
                    onClick={() => setDifficulty('medium')}
                    className={`w-full cursor-pointer transition-all duration-200 ${
                      difficulty === 'medium' 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg shadow-yellow-500/20' 
                        : 'text-gray-200 bg-black hover:bg-black border border-gray-800 hover:shadow-md hover:shadow-gray-800'
                    }`}
                  >
                    Medium   </Button>
                  <Button 
                    onClick={() => setDifficulty('hard')}
                    className={`w-full cursor-pointer transition-all duration-200 ${
                      difficulty === 'hard' 
                        ? 'bg-red-500 border-red-400 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' 
                        : ' text-gray-200 bg-black hover:bg-black border border-gray-800 hover:shadow-md hover:shadow-gray-800'
                    }`}
                  >
                    Hard
                  </Button>
                </div>
                <Button
                  onClick={fetchRandomChallenge}
                  disabled={generating}
                  className="w-full cursor-pointer bg-[#1a1a2e] hover:bg-gray-900 border border-gray-800   text-white
                   shadow-l shadow-gray-500/20 transition-all duration-200"
                >
                  {generating ? 'Generating...' : 'Generate'}
                </Button>
              </CardContent>
            </Card>

   
            <Card className="bg-black border-purple-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm text-blue-200">
                  <Code2 className="text-blue-400" />
                  <span>Language</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-[#1a1a2e] border border-gray-500/20 text-blue-200 rounded-lg px-3 
                  py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all duration-200"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
              <option value="cpp">C++</option>

                 <option value="java">Java</option>
                  <option value="csharp">C#</option>
                  <option value="go">Go</option>
                </select>
              </CardContent>
            </Card>
          </div>

         
          <div className="lg:col-span-10 space-y-4">
         
            <Card className="bg-black border-purple-500/20">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-blue-200">{currentChallenge?.Title || 'Code'}</CardTitle>
                  <Badge variant="outline" className="border-gray-700 bg-purpl text-blue-200">
                    {difficulty.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="text-sm text-blue-200 whitespace-pre-wrap bg-[#1a1a2e] p-4 rounded-lg overflow-auto 
                max-h-40 border border-gray-500/20">
                  {currentChallenge?.Description || 'Generate a challenge'}
                </pre>
              </CardContent>
            </Card>

 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg border bg-black border-gray-500/20">
                  <h3 className="text-sm font-semibold flex items-center text-blue-200">
                    <Code2 className="mr-2 text-blue-400" /> Your Code
                  </h3>
                  <div className="flex items-center space-x-2">
                    {hasSubmitted && (
                      <Badge variant="outline" className="border-green-400 bg-green-400/20 text-green-200">
                        Submitted
                      </Badge>
                    )}
                    <Button
                      onClick={handleReady}
                      disabled={hasSubmitted}
                      className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                       text-white shadow-lg shadow-blue-500/20 transition-all duration-200"
                      size="sm"
                    >
                      <Play className="mr-2 h-4 w-4" /> Ready
                    </Button>
                  </div>
                </div>
                <div className="bg-[#0f3460] rounded-lg  border border-black">
                  <Editor
                    height="500px"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={handleCodeChange}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between bg-black border-purple-500/20 p-3 rounded-lg border ">
                  <h3 className="text-sm font-semibold flex items-center text-purple-200">
                    <Users className="mr-2 text-red-400" /> Opponent's Code
                  </h3>
                  <div className="flex items-center space-x-2">
                    {opponentSubmitted && (
                      <Badge variant="outline" className="border-green-400 bg-green-400/20 text-green-200">
                        Opponent Submitted
                      </Badge>
                    )}
                    <Button
                      onClick={handlesubmit}
                      disabled={hasSubmitted || isSubmitting}
                      className={`cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white 
                        shadow-lg shadow-green-500/20 transition-all duration-200 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      size="sm"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Trophy className="mr-2 h-4 w-4" /> Submit
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="bg-[#0f3460] rounded-lg  border border-black">
             {hasSubmitted?     <Editor
                    height="500px"
                    language={language}
                    theme="vs-dark"
                    value={opponentCode}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                    }}
                  />:
                  <Editor
                    height="500px"
                    language={language}
                    theme="vs-dark"
                    value={"//Opponent's code"}   
                   options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                    }}
                  />
                  }
                   
                     </div>
                 
              </div>
            </div>
      </div>
        </div></div>

      
      {gameOver && finalResults && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-4">Game Over!</h2>
            <div className="text-center mb-4">
              {totalScores.player1 === totalScores.player2 ? (
                <p className="text-xl font-semibold text-yellow-400">It's a Tie!</p>
              ) : (
                <p className="text-xl font-semibold text-yellow-400">
                  Winner: {totalScores.player1 > totalScores.player2 ? players.player1?.name : players.player2?.name}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="text-lg font-semibold">{players.player1?.name}</span>
                  <span className="text-xl font-bold text-blue-400">{totalScores.player1}</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="text-lg font-semibold">{players.player2?.name}</span>
                  <span className="text-xl font-bold text-blue-400">{totalScores.player2}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => navigate('/')}
              className="w-full cursor-pointer mt-4 bg-gradient-to-r from-blue-500 to-purple-500"
            >
              Return to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard
