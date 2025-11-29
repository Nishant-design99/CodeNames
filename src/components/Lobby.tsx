import React, { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';

interface LobbyProps {
  onJoinRoom: (roomId: string, name: string) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onJoinRoom }) => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (!name.trim()) {
      alert("Please enter your name first!");
      return;
    }
    const newRoomId = Math.random().toString(36).substring(2, 6).toUpperCase();
    onJoinRoom(newRoomId, name.trim());
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim() && name.trim()) {
      onJoinRoom(roomId.trim().toUpperCase(), name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-6xl font-black bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent tracking-tight">
          SPYMASTER
        </h1>
        <p className="text-gray-400 text-lg">Online Multiplayer Codenames</p>
      </div>

      <div className="w-full max-w-md space-y-6 bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-700">

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg font-medium transition-all"
          />
        </div>

        <div className="pt-4 space-y-4">
          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="w-full flex items-center justify-center gap-3 p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/50"
          >
            <Plus size={24} />
            Create New Game
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800 text-gray-400 font-medium">OR JOIN GAME</span>
            </div>
          </div>

          <form onSubmit={handleJoin} className="flex gap-2">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.toUpperCase())}
              placeholder="CODE"
              className="flex-1 p-4 bg-gray-900 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center tracking-widest text-xl font-mono uppercase"
              maxLength={4}
            />
            <button
              type="submit"
              disabled={!roomId.trim() || !name.trim()}
              className="px-6 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
