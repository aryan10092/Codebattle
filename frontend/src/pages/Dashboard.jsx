import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import { Badge } from '@/components/ui/badge';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { ArrowRight, Crown, Sparkles, Target, Trophy, Users } from 'lucide-react';
import { initSocket } from '@/socket';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
  const socketRef = useRef(null);

  const topThree = useMemo(() => users.slice(0, 3), [users]);

  const mergeLiveLeaderboardUpdate = (payload) => {
    const updatedPlayers = new Map((payload?.playerScores || []).map((player) => [player.name, player]));

    setUsers((currentUsers) => {
      const nextUsers = currentUsers.map((user) => {
        const player = updatedPlayers.get(user.username);
        if (!player) return user;

        const isWinner = !payload.isTie && payload.winnerName === user.username;
        const isLoser = !payload.isTie && payload.winnerName && payload.winnerName !== user.username;

        return {
          ...user,
          wins: (user.wins || 0) + (payload.isTie ? 0 : isWinner ? 1 : 0),
          losses: (user.losses || 0) + (payload.isTie ? 0 : isLoser ? 1 : 0),
          gamesPlayed: (user.gamesPlayed || 0) + 1,
          rating: Math.max(
            0,
            (user.rating || 1000) + (payload.isTie ? 2 : isWinner ? 15 : isLoser ? -10 : 0),
          ),
        }
      })

      nextUsers.sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.wins || 0) - (a.wins || 0));
      return nextUsers;
    })
  };

  useEffect(() => {
    async function fetchBoard() {
      try {
        const res = await axios.get(`${backendUrl}/api/leaderboard?limit=20`);
        const data = await res.data;

        // console.log('datta', data);
        if (data.success) setUsers(data.users || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBoard();
  }, [backendUrl]);

  useEffect(() => {
    let mounted = true;

    const connectSocket = async () => {
      try {
        socketRef.current = await initSocket();
        if (!mounted || !socketRef.current) return;

        socketRef.current.on('leaderboard_updated', mergeLiveLeaderboardUpdate);
      } catch (error) {
        console.error('Leaderboard socket connection failed:', error);
      }
    };

    connectSocket();

    return () => {
      mounted = false;
      if (socketRef.current) {
        socketRef.current.off('leaderboard_updated', mergeLiveLeaderboardUpdate);
        socketRef.current.disconnect();
      }
    };
  }, []);

  const heroStats = [
    { label: 'Players ranked', value: users.length || '20+' },
    { label: 'Battles ready', value: 'Real-time' },
    { label: 'Season mode', value: 'Live' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-white/70 backdrop-blur">
            Loading leaderboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      <div className="relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/3 -left-28 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>

        <section className="relative mx-auto max-w-7xl px-6 pt-8 pb-8 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 lg:p-10 backdrop-blur-xl shadow-2xl shadow-black/30">
              <Badge className="mb-5 bg-white/10 text-white border border-white/15 px-3 py-1">
                <Sparkles className="mr-2 h-4 w-4 text-gray-300" />
                Live rankings
              </Badge>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl bg-gradient-to-br from-gray-300 via-gray-300 to-gray-400 bg-clip-text text-transparent ">
                Battle for the top of the leaderboard
                {/* <span className="bloc bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                  leaderboard.
                </span> */}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                Climb the rankings by winning head-to-head code battles, building streaks,
                and improving your rating every round.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/join">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="div"
                    role="button"
                    tabIndex={0}
                    className="bg-black text-white flex items-center space-x-2 px-6 py-3 cursor-pointer"
                  >
                    <span className="font-semibold">Join Battle</span>
                    <ArrowRight className="h-4 w-4" />
                  </HoverBorderGradient>
                </Link>

                <Link
                  to="/profile"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  View profile
                  <Target className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">{stat.label}</div>
                    <div className="mt-2 text-lg font-semibold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 lg:p-8 backdrop-blur-xl shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-white/40">Featured board</p>
                  <h2 className="mt-2 text-2xl font-semibold">Top challengers</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80">
                  <Trophy className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {topThree.length ? topThree.map((user, index) => {
                  const placeStyles = [
                    'border-yellow-400/30 bg-yellow-400/10',
                    'border-slate-300/20 bg-white/8',
                    'border-orange-400/20 bg-orange-400/10',
                  ];

                  return (
                    <div
                      key={user._id}
                      className={`flex items-center gap-4 rounded-2xl border p-4 ${placeStyles[index] || 'border-white/10 bg-black/20'}`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/30 text-lg font-bold">
                        {index === 0 ? <Crown className="h-5 w-5 text-yellow-300" /> : index + 1}
                      </div>
                      <img
                        src={user.avatarUrl || '/default.png'}
                        alt={user.username}
                        className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold text-white">{user.username}</div>
                        <div className="mt-1 text-sm text-white/55">
                          Rating {user.rating} • {user.wins} wins
                        </div>
                      </div>
                      <div className="text-right text-sm text-white/60">
                        <div>{user.gamesPlayed || 0} games</div>
                        <div>{user.losses || 0} losses</div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center text-white/60">
                    No ranked players yet.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 pb-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl shadow-black/30">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/40">Ranking table</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Leaderboard standings</h2>
              </div>
              <p className="max-w-xl text-sm text-white/55">
                Sorted by rating, then wins. Beat more opponents to push your name higher.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {users.map((user, idx) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  className="grid grid-cols-[72px_1fr_auto] items-center gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-4 sm:px-5"
                >
                  <div className="flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg font-semibold text-white">
                      {idx + 1}
                    </div>
                  </div>

                  <div className="flex min-w-0 items-center gap-4">
                    <img
                      src={user.avatarUrl || '/default.png'}
                      alt={user.username}
                      className="h-14 w-14 rounded-full object-cover ring-1 ring-white/15"
                    />
                    <div className="min-w-0">
                      <div className="truncate text-lg font-semibold text-white">{user.username}</div>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-white/55">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Rating {user.rating}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Wins {user.wins}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Losses {user.losses}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-sm text-white/55">
                    <div className="font-medium text-white">{user.gamesPlayed || 0} games</div>
                    <div className="mt-1"># {idx + 1}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
