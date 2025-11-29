import React from 'react';
import { Player } from '../types';
import { Crown, Shield, Eye } from 'lucide-react';

interface WaitingRoomProps {
    players: Record<string, Player>;
    currentPlayerId: string;
    isHost: boolean;
    onUpdatePlayer: (updates: Partial<Player>) => void;
    onStartGame: () => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({
    players,
    currentPlayerId,
    isHost,
    onUpdatePlayer,
    onStartGame,
}) => {
    const playerList = Object.values(players || {}).filter(p => p && typeof p === 'object');
    const redTeam = playerList.filter(p => p?.team === 'red');
    const blueTeam = playerList.filter(p => p?.team === 'blue');
    const spectators = playerList.filter(p => p?.team === 'spectator' || !p?.team);

    const TeamColumn = ({ team, title, players, colorClass, bgClass }: any) => (
        <div className={`flex-1 min-w-[300px] rounded-xl p-4 ${bgClass}`}>
            <h3 className={`text-xl font-bold mb-4 flex items-center justify-between ${colorClass}`}>
                {title} ({players.length})
            </h3>

            {team !== 'spectator' ? (
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => onUpdatePlayer({ team, role: 'operative' })}
                        className="flex-1 flex items-center justify-center gap-1 text-xs py-2 rounded-lg border border-current hover:bg-white/20 transition-colors font-bold"
                    >
                        <Shield size={12} />
                        Join Operative
                    </button>
                    <button
                        onClick={() => onUpdatePlayer({ team, role: 'spymaster' })}
                        className="flex-1 flex items-center justify-center gap-1 text-xs py-2 rounded-lg border border-current hover:bg-white/20 transition-colors font-bold"
                    >
                        <Eye size={12} />
                        Join Spymaster
                    </button>
                </div>
            ) : (
                <div className="mb-4">
                    <button
                        onClick={() => onUpdatePlayer({ team, role: 'operative' })}
                        className="w-full text-xs py-2 rounded-lg border border-current hover:bg-white/20 transition-colors font-bold"
                    >
                        Join Spectators
                    </button>
                </div>
            )}
            <div className="space-y-2">
                {players.map((p: Player) => (
                    <div key={p.id} className="bg-white/50 p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {p.isHost && <Crown size={16} className="text-yellow-600" />}
                            <span className="font-medium">{p.name}</span>
                            {p.id === currentPlayerId && <span className="text-xs opacity-50">(You)</span>}
                        </div>

                        {team !== 'spectator' && p.id === currentPlayerId && (
                            <button
                                onClick={() => onUpdatePlayer({ role: p?.role === 'spymaster' ? 'operative' : 'spymaster' })}
                                className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-white/50 hover:bg-white transition-colors"
                            >
                                {p?.role === 'spymaster' ? <Eye size={14} /> : <Shield size={14} />}
                                {p?.role === 'spymaster' ? 'SPYMASTER' : 'OPERATIVE'}
                            </button>
                        )}
                        {team !== 'spectator' && p.id !== currentPlayerId && (
                            <div className="flex items-center gap-1 text-xs opacity-70">
                                {p?.role?.toUpperCase() || 'OPERATIVE'}
                            </div>
                        )}
                    </div>
                ))}
                {players.length === 0 && (
                    <div className="text-center py-8 opacity-40 italic">Empty</div>
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-800">Lobby</h2>
                <p className="text-gray-500">Choose your team and role</p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                <TeamColumn
                    team="red"
                    title="Red Team"
                    players={redTeam}
                    colorClass="text-red-700"
                    bgClass="bg-red-50 border border-red-100"
                />
                <TeamColumn
                    team="blue"
                    title="Blue Team"
                    players={blueTeam}
                    colorClass="text-blue-700"
                    bgClass="bg-blue-50 border border-blue-100"
                />
                <TeamColumn
                    team="spectator"
                    title="Spectators"
                    players={spectators}
                    colorClass="text-gray-700"
                    bgClass="bg-gray-100 border border-gray-200"
                />
            </div>

            <div className="flex justify-center pt-8">
                {isHost ? (
                    <button
                        onClick={onStartGame}
                        disabled={redTeam.length === 0 || blueTeam.length === 0}
                        className="px-8 py-4 bg-indigo-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Start Game
                    </button>
                ) : (
                    <div className="text-gray-500 animate-pulse">
                        Waiting for host to start game...
                    </div>
                )}
            </div>
        </div>
    );
};

export default WaitingRoom;
