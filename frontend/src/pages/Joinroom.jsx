import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Users, Code2, Sparkles } from "lucide-react";
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Joinroom() {
  const [roomid, setroomid] = useState("");
  const [name, setname] = useState("");
  const navigate = useNavigate();

  const createid = (e) => {
    e.preventDefault();
    const id = nanoid(8);
    setroomid(id);
    toast.success("Room ID generated successfully!");
  };

  const copyToClipboard = () => {
    if (roomid) {
      navigator.clipboard.writeText(roomid);
      toast.success("Room ID copied to clipboard!");
    }
  };

   const joinroom = (e) => {
    if (!roomid || !name) {
      toast.error("Please enter both name and room ID");
      return;
    }
    navigate(`/dashboard/${roomid}?name=${encodeURIComponent(name)}`, {
      state: { name }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse z-0" />

      <Card className="w-full max-w-md bg-[#181826] border border-blue-500/20 shadow-2xl relative z-10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-tr from-blue-500/30 to-purple-500/30 p-4 rounded-full shadow-lg">
              <Code2 className="h-12 w-12 text-blue-400 drop-shadow-lg" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight drop-shadow">
            Join Code Battle
          </CardTitle>
          <CardDescription className="text-blue-200 mt-2">
            Create a new room or join an existing one to start coding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); joinroom(e); }}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">Your Name</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                  className="bg-[#23233a] border border-blue-500/20 text-white placeholder:text-blue-200/50 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
                />
                <Users className="absolute right-3 top-3 h-4 w-4 text-blue-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">Room ID</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter room ID"
                  value={roomid}
                  onChange={(e) => setroomid(e.target.value)}
                  required
                  className="bg-[#23233a] border border-blue-500/20 text-white placeholder:text-blue-200/50 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400 transition"
                />
                {roomid && (
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="absolute right-10 top-3 text-blue-400 hover:text-purple-400 transition-colors"
                    tabIndex={-1}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                )}
                <span className="absolute right-3 top-3">
                  <Sparkles className="h-4 w-4 text-blue-400 pointer-events-none" />
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                type="button"
                onClick={createid}
                className="w-full cursor-pointer bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate New Room
              </Button>

              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#23233a] border border-blue-500/20 text-blue-200 hover:bg-blue-500/20 font-semibold py-3 rounded-lg shadow transition-all duration-200"
              >
                Join Room
              </Button>
            </div>

            <div className="text-center text-sm text-blue-200/70 mt-2">
              <p>Share the room ID with your opponent to start the battle!</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );}
