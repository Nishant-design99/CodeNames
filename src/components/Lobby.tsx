import React, { useState } from 'react';
import { Plus, ArrowRight, HelpCircle } from 'lucide-react';
import HowToPlayModal from './HowToPlayModal';
import { generateFunnyName } from '../utils/nameGenerator';

interface LobbyProps {
  onJoinRoom: (roomId: string, name: string) => void;
  initialRoomId?: string;
}

const Lobby: React.FC<LobbyProps> = ({ onJoinRoom, initialRoomId }) => {
  const [roomId, setRoomId] = useState(() => initialRoomId || localStorage.getItem('spymaster_last_room') || '');
  const [name, setName] = useState(() => localStorage.getItem('spymaster_player_name') || '');
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Removed local generateRandomName in favor of imported generateFunnyName

  const handleCreate = () => {
    let finalName = name.trim();
    if (!finalName) {
      finalName = generateFunnyName();
      setName(finalName); // Update UI
    }

    localStorage.setItem('spymaster_player_name', finalName);
    const newRoomId = Math.random().toString(36).substring(2, 6).toUpperCase();
    onJoinRoom(newRoomId, finalName);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      let finalName = name.trim();
      if (!finalName) {
        finalName = generateFunnyName();
        setName(finalName); // Update UI
      }

      localStorage.setItem('spymaster_player_name', finalName);
      localStorage.setItem('spymaster_last_room', roomId.trim().toUpperCase());
      onJoinRoom(roomId.trim().toUpperCase(), finalName);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 p-4">
      <div className="text-center space-y-4">
        <div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent tracking-tight">
            SPYMASTER
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Online Multiplayer Codenames</p>
        </div>

        <button
          onClick={() => setShowHowToPlay(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 rounded-full text-sm font-medium transition-colors border border-gray-200 dark:border-gray-700 hover:border-indigo-500/50"
        >
          <HelpCircle size={16} />
          How to Play
        </button>
      </div>

      <div className="w-full max-w-md space-y-6 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-colors">

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Your Name <span className="text-gray-400 dark:text-gray-500 font-normal lowercase">(optional)</span></label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name or get random..."
            className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg font-medium transition-all"
          />
        </div>

        <div className="pt-4 space-y-4">
          <button
            onClick={handleCreate}
            className="w-full flex items-center justify-center gap-3 p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
          >
            <Plus size={24} />
            Create New Game
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-500 dark:text-gray-400 font-medium rounded-full">OR JOIN GAME</span>
            </div>
          </div>

          <form onSubmit={handleJoin} className="flex gap-2">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.toUpperCase())}
              placeholder="CODE"
              className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center tracking-widest text-xl font-mono uppercase"
              maxLength={4}
            />
            <button
              type="submit"
              disabled={!roomId.trim()}
              className="px-6 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight size={24} />
            </button>
          </form>
        </div>
      </div>

      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </div>
  );
};

export default Lobby;
