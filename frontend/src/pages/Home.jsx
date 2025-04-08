import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Trophy, Timer, Users, Zap, Sparkles } from "lucide-react"

import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white">
      
      <div className="container mx-auto px-4 py-20">
      <div className="text-center max-w-3xl mx-auto">
        
          <h1 className="text-5xl md:text-6xl font-bold
            mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Code Battle </h1>
        
          <p className="text-xl text-blue-200 mb-8">
            Challenge your coding skills in real-time battles against other developers. 
            Solve problems, compete, and climb the leaderboard!
       </p>
        
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate('/join')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600
              text-white px-8 py-6 text-lg"
            >
              Start Battle  </Button>
          
          </div> </div>
      </div>

      
      <div className="container mx-auto px-4 py-3.5">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Why Choose Code Battle?
          </h2>
          
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Experience the thrill of competitive coding with our unique features designed to enhance your programming skills
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-[#0f3460] border-blue-500/20 hover:border-blue-400 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-500/20 p-4 rounded-full">
                  <Code2 className="h-12 w-12 text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-center text-xl mb-2">Real-time Coding</CardTitle>
              <CardDescription className="text-center text-blue-200">
                <ul className="space-y-2 text-left">
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
                    Multiple language support
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
                    Live code sharing
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
                    Syntax highlighting
                  </li>
                </ul>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-[#0f3460] border-blue-500/20 hover:border-blue-400 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-yellow-500/20 p-4 rounded-full">
                  <Trophy className="h-12 w-12 text-yellow-400" />
                </div>
              </div>
              <CardTitle className="text-center text-xl mb-2">Competitive Battles</CardTitle>
              <CardDescription className="text-center text-blue-200">
                <ul className="space-y-2 text-left">
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
                    Head-to-head challenges
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
                    Real-time scoring
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
                    Global leaderboard
                  </li>
                </ul>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-[#0f3460] border-blue-500/20 hover:border-blue-400 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-500/20 p-4 rounded-full">
                  <Timer className="h-12 w-12 text-red-400" />
                </div>
              </div>
              <CardTitle className="text-center text-xl mb-2">Time-based Rounds</CardTitle>
              <CardDescription className="text-center text-blue-200">
                <ul className="space-y-2 text-left">
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-red-400" />
                    Multiple difficulty levels
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-red-400" />
                    Auto-submission on timeout
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-red-400" />
                    Round-based progression
                  </li>
                </ul>
              </CardDescription>
            </CardHeader>
         </Card>
        </div>

      
      </div>

      
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-[#0f3460] p-4 rounded-full mb-4">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Create or Join</h3>
            <p className="text-blue-200 text-center">Create a new battle room or join an existing one</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#0f3460] p-4 rounded-full mb-4">
              <Code2 className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Get Challenge</h3>
            <p className="text-blue-200 text-center">Receive a coding challenge to solve</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#0f3460] p-4 rounded-full mb-4">
              <Timer className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Code & Submit</h3>
            <p className="text-blue-200 text-center">Write your solution and submit before time runs out</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#0f3460] p-4 rounded-full mb-4">
              <Trophy className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">4. Win Points</h3>
            <p className="text-blue-200 text-center">Get points based on your solution's quality</p>
          </div>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-16">
        <div className="bg-[#0f3460] rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Battle?</h2>
          <p className="text-xl text-blue-200 mb-8">
            Join the coding battle arena and test your skills against other developers
          </p>
          <Button 
            onClick={() => navigate('/join')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg"
          >
            Start Coding Battle
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
