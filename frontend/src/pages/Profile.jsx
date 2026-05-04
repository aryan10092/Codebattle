import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import { Badge } from '@/components/ui/badge';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { ArrowRight, Crown, Pencil, Sparkles, Target, Trophy, UserCircle2 } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ username: '', bio: '', avatarUrl: '', country: '' });

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/profile/me`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        //conole.log(res)
        const data = await res.data;
        if (data.success) {
          setUser(data.user);
          setForm({
            username: data.user.username || '',
            bio: data.user.bio || '',
            avatarUrl: data.user.avatarUrl || '',
            country: data.user.country || '',
          });
        }
      } catch (err) {
        if(err.response?.status === 401) {
          toast.error('Please log in to view your profile');
        }
        console.error(err);
      }
    }

    load();
  }, []);

  const profileStats = useMemo(() => [
    { label: 'Rating', value: user?.rating ?? 0 },
    { label: 'Wins', value: user?.wins ?? 0 },
    { label: 'Games', value: user?.gamesPlayed ?? 0 },
    { label: 'Country', value: user?.country || 'Not set' },
  ], [user]);

  async function save() {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        data: form,
      });

      //conole.log(res)
      const data = await res.data;
      if (data.success) {
        setUser(data.user);
        setEditing(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-white/70 backdrop-blur">
            Loading profile...
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

        <section className="relative mx-auto max-w-7xl px-6 pt-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 lg:p-10 backdrop-blur-xl shadow-2xl shadow-black/30">
              <Badge className="mb-5 bg-white/10 text-white border border-white/15 px-3 py-1">
                <Sparkles className="mr-2 h-4 w-4 text-gray-300" />
                Player profile
              </Badge>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl bg-gradient-to-br from-gray-300 via-white to-gray-400 bg-clip-text text-transparent">
                Your battle identity.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                Track your ratings, wins, and coding battle progress. Keep your profile sharp and
                ready for the next match.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/dashboard">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="div"
                    role="button"
                    tabIndex={0}
                    className="bg-black text-white flex items-center space-x-2 px-6 py-3 cursor-pointer"
                  >
                    <span className="font-semibold">Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </HoverBorderGradient>
                </Link>

                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  Edit profile
                  <Pencil className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {profileStats.map((stat) => (
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
                  <p className="text-sm uppercase tracking-[0.25em] text-white/40">Profile card</p>
                  <h2 className="mt-2 text-2xl font-semibold">{user.username}</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80">
                  <UserCircle2 className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 flex items-start gap-5 rounded-3xl border border-white/10 bg-black/25 p-5">
                <img
                  src={user.avatarUrl || '/default.png'}
                  alt={user.username}
                  className="h-24 w-24 rounded-3xl object-cover ring-1 ring-white/15"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      Rating {user.rating}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      Wins {user.wins}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/60">
                    {user.bio || 'No bio yet. Add a short intro so other players know who they are facing.'}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Crown className="h-4 w-4 text-yellow-300" />
                  Battle-ready profile
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Trophy className="h-4 w-4 text-gray-300" />
                  Leaderboard synced
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Target className="h-4 w-4 text-gray-300" />
                  Ready for the next match
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 pb-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl shadow-black/30">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/40">Account details</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Profile settings</h2>
              </div>
              <p className="max-w-xl text-sm text-white/55">
                Update your identity card, avatar, country, and bio to keep your profile current.
              </p>
            </div>

            {!editing ? (
              <div className="mt-8 rounded-3xl border border-white/10 bg-black/25 p-6 text-white/70">
                <p>{user.bio || 'No bio set yet.'}</p>
                <button
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-3xl border border-white/10 bg-black/25 p-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm text-white/60">Username</span>
                    <input
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/30"
                      placeholder="Username"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-white/60">Avatar URL</span>
                    <input
                      value={form.avatarUrl}
                      onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/30"
                      placeholder="Avatar URL"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-white/60">Country</span>
                    <input
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/30"
                      placeholder="Country"
                    />
                  </label>

                  <div />
                </div>

                <label className="mt-4 block space-y-2">
                  <span className="text-sm text-white/60">Bio</span>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    className="min-h-32 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/30"
                    placeholder="Tell others about your coding style"
                  />
                </label>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={save}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                  <button
                    className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
