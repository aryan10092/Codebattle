import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { RoomHeader } from '../components/battleRoom/RoomHeader';
import { BattleSidebar } from '../components/battleRoom/BattleSidebar';
import { ChallengePanel } from '../components/battleRoom/ChallengePanel';
import { CodeBattleEditors } from '../components/battleRoom/CodeBattleEditors';
import { GameOverModal } from '../components/battleRoom/GameOverModal';

import { useRoom } from '../hooks/useRoom';

function BattleRoom() {
  const location = useLocation()
  const {roomid} = useParams()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || 'Anonymous';
  const {
    connectionError,
    code,
    language,
    opponentCode,
    currentChallenge,
    players,
    scores,
    totalScores,
    difficulty,
    setDifficulty, generating,
    hasSubmitted,
    isSubmitting,
    roundInfo,
    gameOver,
    finalResults,
    opponentSubmitted,
    bothPlayersReady,
    timeLeft,
    setLanguage,
    handleCodeChange,
    handleReady,
    fetchRandomChallenge,
    handlesubmit,
  } = useRoom({ roomid, name, locationState: location.state, navigate });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {connectionError && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-2 text-center z-50">
          Connection lost. Trying to reconnect...
        </div>
      )}

      <RoomHeader roomid={roomid} name={name} roundInfo={roundInfo} timeLeft={timeLeft} />

      <div className="container mx-auto px-4 py-6">
      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <BattleSidebar
            players={players}
            scores={scores}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            onGenerate={fetchRandomChallenge}
            generating={generating}
            language={language}
            onLanguageChange={setLanguage}
          />

          <div className="lg:col-span-10 space-y-4">
            <ChallengePanel currentChallenge={currentChallenge} difficulty={difficulty} />

            <CodeBattleEditors
              code={code}
              language={language}
              opponentCode={opponentCode}
              hasSubmitted={hasSubmitted}
              isSubmitting={isSubmitting}
              opponentSubmitted={opponentSubmitted}
              onCodeChange={handleCodeChange}
              onReady={handleReady}
              onSubmit={handlesubmit}
            />
          </div>
        </div>
      </div>

      <GameOverModal
        isOpen={Boolean(gameOver && finalResults)}
        players={players}
        totalScores={totalScores}
        finalResults={finalResults}
        onReturnHome={() => navigate('/')}
      />
    </div>
  );
}

export default BattleRoom
