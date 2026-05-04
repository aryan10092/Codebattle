import Editor from "@monaco-editor/react";
import { Code2, Play, Trophy, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { DEFAULT_CODE, DEFAULT_OPPONENT_CODE } from "../../utils/battleRoom";

export function CodeBattleEditors({
  code,
  language,
  opponentCode,
  hasSubmitted,
  isSubmitting,
  opponentSubmitted,
  onCodeChange,
  onReady,
  onSubmit,
}) {
  return (
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
              onClick={onReady}
              disabled={hasSubmitted}
              className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all duration-200"
              size="sm"
            >
              <Play className="mr-2 h-4 w-4" /> Ready
            </Button>
          </div>
        </div>

        <div className="bg-[#0f3460] rounded-lg border border-black">
          <Editor
            height="500px"
            language={language}
            theme="vs-dark"
            value={code || DEFAULT_CODE}
            onChange={onCodeChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between bg-black border-purple-500/20 p-3 rounded-lg border">
          <h3 className="text-sm font-semibold flex items-center text-purple-200">
            <Users className="mr-2 text-red-400" /> Opponent&apos;s Code
          </h3>
          <div className="flex items-center space-x-2">
            {opponentSubmitted && (
              <Badge variant="outline" className="border-green-400 bg-green-400/20 text-green-200">
                Opponent Submitted
              </Badge>
            )}
            <Button
              onClick={onSubmit}
              disabled={hasSubmitted || isSubmitting}
              className={`cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/20 transition-all duration-200 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
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

        <div className="bg-[#0f3460] rounded-lg border border-black">
          <Editor
            height="500px"
            language={language}
            theme="vs-dark"
            value={hasSubmitted ? (opponentCode || DEFAULT_OPPONENT_CODE) : DEFAULT_OPPONENT_CODE}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>
      </div>
    </div>
  );
}