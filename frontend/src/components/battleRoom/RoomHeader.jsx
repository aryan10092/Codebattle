import { Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { formatTime } from "../../utils/battleRoom";

export function RoomHeader({ roomid, name, roundInfo, timeLeft }) {
  return (
    <div className="bg-black border-blue border-blue-500/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-black border border-gray-700 p-2 rounded-lg">
              <Terminal className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold bg-clip-text text-white">Code Battle</h1>
              <p className="text-xs text-blue-200">Room: {roomid}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-gray-700 text-blue-200">
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
      </div>
    </div>
  );
}