import { useState } from 'react';
import { useGame } from './hooks/useGame';
import { useTheme } from './hooks/useTheme';
import { Sun, Moon, HelpCircle } from 'lucide-react';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import Lobby from './components/Lobby';
import HowToPlayModal from './components/HowToPlayModal';
import WaitingRoom from './components/WaitingRoom';
import WinnerOverlay from './components/WinnerOverlay';
import ClueHistory from './components/ClueHistory';
import CluePopup from './components/CluePopup';
import TeamSidebar from './components/TeamSidebar';
import ScoreBoard from './components/ScoreBoard';

function App() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const { gameState, loading, playerId, actions } = useGame(roomId || undefined);

  // Check for room in URL
  const urlParams = new URLSearchParams(window.location.search);
  const roomFromUrl = urlParams.get('room');

  const handleJoin = (id: string, name: string) => {
    setRoomId(id);
    actions.joinRoom(name, id);

    // Update URL to include room code
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('room', id);
    window.history.pushState({}, '', newUrl.toString());
  };

  const handleLeave = () => {
    setRoomId(null);
    // Clear room from URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('room');
    window.history.pushState({}, '', newUrl.toString());
  }

  if (!roomId) {
    return (
      <div className="min-h-screen text-gray-900 dark:text-white relative transition-colors duration-500">
        <div className="fixed inset-0 z-[-1] bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
          <div className="absolute inset-0 bg-[url('/bg-pattern-light.png')] dark:bg-[url('/bg-pattern.png')] opacity-[0.6] dark:opacity-[0.15] bg-[length:300px_300px]" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-gray-200/50 dark:to-gray-950/80" />
        </div>

        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:scale-110 transition-all shadow-lg"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Lobby onJoinRoom={handleJoin} initialRoomId={roomFromUrl || undefined} />
      </div>
    );
  }

  const myPlayer = gameState.players?.[playerId];
  const isSpymaster = myPlayer?.role === 'spymaster';

  const redPlayers = Object.values(gameState.players || {}).filter(p => p.team === 'red');
  const bluePlayers = Object.values(gameState.players || {}).filter(p => p.team === 'blue');

  return (
    <div className={`min-h-screen text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-500 relative`}>
      {/* Background Layer */}
      <div className="fixed inset-0 z-[-1] bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/bg-pattern-light.png')] dark:bg-[url('/bg-pattern.png')] opacity-[0.9] dark:opacity-[0.15] bg-[length:300px_300px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent dark:from-gray-950/80" />
      </div>

      <header className="bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10 shadow-lg backdrop-blur-md transition-colors duration-500">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-black bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent cursor-pointer tracking-widest filter drop-shadow-sm" onClick={handleLeave}>
            SPYMASTER
          </h1>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm font-bold text-gray-600 dark:text-gray-300 shadow-inner">
              ROOM: <span className="text-gray-900 dark:text-white tracking-widest">{roomId}</span>
            </div>
            {myPlayer && (
              <div className="flex items-center gap-3 text-sm font-medium">
                <span className={`filter drop-shadow-sm font-bold ${myPlayer.team === 'red' ? 'text-red-600 dark:text-red-400' : myPlayer.team === 'blue' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {myPlayer.name}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs uppercase text-gray-500 dark:text-gray-400 font-bold">
                  {myPlayer.role}
                </span>
              </div>
            )}

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>

            <button
              onClick={() => setShowHowToPlay(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
              title="How to Play"
            >
              <HelpCircle size={18} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={handleLeave}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors underline decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-900 dark:hover:decoration-white"
            >
              Leave
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 overflow-x-hidden">
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
          <div className="flex flex-col xl:flex-row items-start justify-center gap-6 max-w-[1600px] mx-auto w-full">
            {/* Red Team Sidebar (Desktop Only) */}
            <div className="hidden xl:block w-64 shrink-0 order-1">
              <TeamSidebar
                team="red"
                players={redPlayers}
                currentTurn={gameState.currentTurn}
                currentPlayerId={playerId}
              />
            </div>

            {/* Main Game Area */}
            <div className="flex-1 w-full max-w-4xl flex flex-col gap-6 order-2">
              <ScoreBoard
                scores={gameState.scores}
                currentTurn={gameState.currentTurn}
                winner={gameState.winner}
              />

              {/* Mobile Teams (Side by Side) */}
              <div className="xl:hidden flex gap-4 w-full">
                <TeamSidebar
                  team="red"
                  players={redPlayers}
                  currentTurn={gameState.currentTurn}
                  currentPlayerId={playerId}
                  className="flex-1"
                />
                <TeamSidebar
                  team="blue"
                  players={bluePlayers}
                  currentTurn={gameState.currentTurn}
                  currentPlayerId={playerId}
                  className="flex-1"
                />
              </div>

              <Controls
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
            </div>

            {/* Blue Team Sidebar (Desktop Only) */}
            <div className="hidden xl:block w-64 shrink-0 order-3">
              <TeamSidebar
                team="blue"
                players={bluePlayers}
                currentTurn={gameState.currentTurn}
                currentPlayerId={playerId}
              />
            </div>

            {gameState.winner && (
              <WinnerOverlay
                winner={gameState.winner}
                isHost={myPlayer?.isHost || false}
                onNewGame={actions.resetToLobby}
              />
            )}

            <CluePopup clue={gameState.clues[gameState.clues.length - 1]} />
          </div>
        )}
      </main>
      {/* Global How to Play Modal */}
      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </div>
  );
}

export default App;
