import { useState } from 'react';
import { useGame } from './hooks/useGame';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import Lobby from './components/Lobby';
import WaitingRoom from './components/WaitingRoom';
import WinnerOverlay from './components/WinnerOverlay';
import ClueHistory from './components/ClueHistory';
import CluePopup from './components/CluePopup';

function App() {
  const [roomId, setRoomId] = useState<string | null>(null);

  const { gameState, loading, playerId, actions } = useGame(roomId || undefined);

  const handleJoin = (id: string, name: string) => {
    setRoomId(id);
    actions.joinRoom(name, id);
  };

  if (!roomId) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Lobby onJoinRoom={handleJoin} />
      </div>
    );
  }

  const myPlayer = gameState.players?.[playerId];
  const isSpymaster = myPlayer?.role === 'spymaster';

  return (
    <div className={`min-h-screen text-gray-900 flex flex-col transition-colors duration-500 ${gameState.currentTurn === 'red' ? 'bg-red-50' : 'bg-blue-50'
      }`}>
      <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent cursor-pointer" onClick={() => setRoomId(null)}>
            SPYMASTER
          </h1>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-gray-100 rounded-lg font-mono text-sm font-bold text-gray-600">
              ROOM: {roomId}
            </div>
            {myPlayer && (
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className={myPlayer.team === 'red' ? 'text-red-600' : myPlayer.team === 'blue' ? 'text-blue-600' : 'text-gray-600'}>
                  {myPlayer.name}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs uppercase text-gray-500">
                  {myPlayer.role}
                </span>
              </div>
            )}
            <button
              onClick={() => setRoomId(null)}
              className="text-sm text-gray-500 hover:text-gray-900 underline"
            >
              Leave
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start p-4 gap-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : gameState.status === 'lobby' ? (
          <WaitingRoom
            players={gameState.players || {}}
            currentPlayerId={playerId}
            isHost={myPlayer?.isHost || false}
            onUpdatePlayer={actions.updatePlayer}
            onStartGame={actions.startGame}
          />
        ) : (
          <>
            <Controls
              scores={gameState.scores}
              currentTurn={gameState.currentTurn}
              winner={gameState.winner}
              isSpymaster={isSpymaster}
              isMyTurn={myPlayer?.team === gameState.currentTurn}
              isHost={myPlayer?.isHost || false}
              onToggleSpymaster={() => { }}
              onEndTurn={actions.endTurn}
              onNewGame={actions.resetToLobby}
              onGiveClue={actions.giveClue}
              clueGiven={gameState.guessesRemaining !== null}
            />

            <GameBoard
              board={gameState.board}
              isSpymaster={isSpymaster}
              onCardClick={actions.handleCardClick}
              canInteract={!isSpymaster && !gameState.winner && myPlayer?.team === gameState.currentTurn}
            />

            <ClueHistory clues={gameState.clues} currentTurn={gameState.currentTurn} />

            {gameState.winner && (
              <WinnerOverlay
                winner={gameState.winner}
                isHost={myPlayer?.isHost || false}
                onNewGame={actions.resetToLobby}
              />
            )}

            <CluePopup clue={gameState.clues[gameState.clues.length - 1]} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
