import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChallengePanel({ currentChallenge, difficulty }) {
  return (
    <Card className="bg-black border-purple-500/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-blue-200">{currentChallenge?.Title || "Code"}</CardTitle>
          <Badge variant="outline" className="border-gray-700 bg-purpl text-blue-200">
            {difficulty.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="text-sm text-blue-200 whitespace-pre-wrap bg-[#1a1a2e] p-4 rounded-lg overflow-auto max-h-40 border border-gray-500/20">
          {currentChallenge?.Description || "Generate a challenge"}
        </pre>
      </CardContent>
    </Card>
  );
}