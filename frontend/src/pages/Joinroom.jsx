import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Users, Code2, Sparkles } from "lucide-react";
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Joinroom() {
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
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#0f3460] border-blue-500/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500/20 p-4 rounded-full">
              <Code2 className="h-12 w-12 text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Join Code Battle
          </CardTitle>
          <CardDescription className="text-blue-200">
            Create a new room or join an existing one to start coding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">Your Name</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="bg-[#1a1a2e] border-blue-500/20 text-white placeholder:text-blue-200/50"
                />
                <Users className="absolute right-3 top-3 h-4 w-4 text-blue-400" />
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
                  className="bg-[#1a1a2e] border-blue-500/20 text-white placeholder:text-blue-200/50"
                />
                {roomid && (
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-3 top-3 text-blue-400 hover:text-blue-300"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              onClick={createid}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate New Room
            </Button>

            <Button
              onClick={joinroom}
              className="w-full bg-[#1a1a2e] border border-blue-500/20 text-blue-200 hover:bg-blue-500/20"
            >
              Join Room
            </Button>
          </div>

          <div className="text-center text-sm text-blue-200/70">
            <p>Share the room ID with your opponent to start the battle!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Joinroom;
