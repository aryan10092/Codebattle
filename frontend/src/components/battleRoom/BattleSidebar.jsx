import { Award, Code2, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BattleSidebar({
  players,
  scores,
  difficulty,
  onDifficultyChange,
  onGenerate,
  generating,
  language,
  onLanguageChange,
}) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <Card className="bg-black border-purple-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-sm text-blue-200">
            <Target className="text-red-400" />
            <span>Battle Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-blue-200 text-xs">{players.player1?.name || "You"}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {scores.player1 || 0}
                </p>
              </div>
              <div className="text-xl font-bold text-blue-300">VS</div>
              <div className="text-center">
                <p className="text-blue-200 text-xs">{players.player2?.name || "Opponent"}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  {scores.player2 || 0}
                </p>
              </div>
            </div>
          </div>
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
              onClick={() => onDifficultyChange("easy")}
              className={`w-full cursor-pointer transition-all duration-200 ${
                difficulty === "easy"
                  ? "bg-green-500 hover:bg-green-600 border-green-400 text-white shadow-lg shadow-green-500/20"
                  : "text-gray-200 bg-black hover:bg-black border border-gray-800 hover:shadow-md hover:shadow-gray-800"
              }`}
            >
              Easy
            </Button>
            <Button
              onClick={() => onDifficultyChange("medium")}
              className={`w-full cursor-pointer transition-all duration-200 ${
                difficulty === "medium"
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg shadow-yellow-500/20"
                  : "text-gray-200 bg-black hover:bg-black border border-gray-800 hover:shadow-md hover:shadow-gray-800"
              }`}
            >
              Medium
            </Button>
            <Button
              onClick={() => onDifficultyChange("hard")}
              className={`w-full cursor-pointer transition-all duration-200 ${
                difficulty === "hard"
                  ? "bg-red-500 border-red-400 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
                  : " text-gray-200 bg-black hover:bg-black border border-gray-800 hover:shadow-md hover:shadow-gray-800"
              }`}
            >
              Hard
            </Button>
          </div>

          <Button
            onClick={onGenerate}
            disabled={generating}
            className="w-full cursor-pointer bg-[#1a1a2e] hover:bg-gray-900 border border-gray-800 text-white shadow-l shadow-gray-500/20 transition-all duration-200"
          >
            {generating ? "Generating..." : "Generate"}
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
            onChange={(event) => onLanguageChange(event.target.value)}
            className="w-full bg-[#1a1a2e] border border-gray-500/20 text-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all duration-200"
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
  );
}