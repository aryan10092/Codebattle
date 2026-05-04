import { Button } from "@/components/ui/button";

export function GameOverModal({ isOpen, players, totalScores, finalResults, onReturnHome }) {
  if (!isOpen) {
    return null;
  }

  const isTie = totalScores.player1 === totalScores.player2;
  const winnerName =
    finalResults?.winner ||
    (isTie ? null : totalScores.player1 > totalScores.player2 ? players.player1?.name : players.player2?.name);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Game Over!</h2>
        <div className="text-center mb-4">
          {isTie ? (
            <p className="text-xl font-semibold text-yellow-400">It&apos;s a Tie!</p>
          ) : (
            <p className="text-xl font-semibold text-yellow-400">Winner: {winnerName}</p>
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
        <Button onClick={onReturnHome} className="w-full cursor-pointer mt-4 bg-gradient-to-r from-blue-500 to-purple-500">
          Return to Home
        </Button>
      </div>
    </div>
  );
}