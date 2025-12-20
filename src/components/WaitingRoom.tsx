import React, { useState } from 'react';
import { Player } from '../types';
import { Crown, Shield, Eye, Link as LinkIcon, Check } from 'lucide-react';

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

    const TeamColumn = ({ team, title, players, colorClass, bgClass, borderColor }: any) => (
        <div className={`flex-1 min-w-[300px] rounded-xl p-4 ${bgClass} ${borderColor} border backdrop-blur-sm transition-colors duration-300`}>
            <h3 className={`text-xl font-bold mb-4 flex items-center justify-between ${colorClass}`}>
                {title} ({players.length})
            </h3>

            {team !== 'spectator' ? (
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => onUpdatePlayer({ team, role: 'operative' })}
                        className="flex-1 flex items-center justify-center gap-1 text-xs py-2 rounded-lg border border-current hover:bg-black/5 dark:hover:bg-white/10 transition-colors font-bold"
                    >
                        <Shield size={12} />
                        Join Operative
                    </button>
                    <button
                        onClick={() => onUpdatePlayer({ team, role: 'spymaster' })}
                        className="flex-1 flex items-center justify-center gap-1 text-xs py-2 rounded-lg border border-current hover:bg-black/5 dark:hover:bg-white/10 transition-colors font-bold"
                    >
                        <Eye size={12} />
                        Join Spymaster
                    </button>
                </div>
            ) : (
                <div className="mb-4">
                    <button
                        onClick={() => onUpdatePlayer({ team, role: 'operative' })}
                        className="w-full text-xs py-2 rounded-lg border border-current hover:bg-black/5 dark:hover:bg-white/10 transition-colors font-bold"
                    >
                        Join Spectators
                    </button>
                </div>
            )}
            <div className="space-y-2">
                {players.map((p: Player) => (
                    <div key={p.id} className="bg-white/60 dark:bg-gray-900/40 border border-gray-200 dark:border-white/5 p-3 rounded-lg flex items-center justify-between shadow-sm transition-colors">
                        <div className="flex items-center gap-2">
                            {p.isHost && <Crown size={16} className="text-yellow-600 dark:text-yellow-500" />}
                            <span className="font-medium text-gray-900 dark:text-gray-200">{p.name}</span>
                            {p.id === currentPlayerId && <span className="text-xs opacity-50 text-gray-500 dark:text-gray-400">(You)</span>}
                        </div>

                        {team !== 'spectator' && p.id === currentPlayerId && (
                            <button
                                onClick={() => onUpdatePlayer({ role: p?.role === 'spymaster' ? 'operative' : 'spymaster' })}
                                className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-white/50 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 transition-colors text-gray-900 dark:text-white border border-gray-200 dark:border-transparent"
                            >
                                {p?.role === 'spymaster' ? <Eye size={14} /> : <Shield size={14} />}
                                {p?.role === 'spymaster' ? 'SPYMASTER' : 'OPERATIVE'}
                            </button>
                        )}
                        {team !== 'spectator' && p.id !== currentPlayerId && (
                            <div className="flex items-center gap-1 text-xs opacity-50 text-gray-600 dark:text-gray-300">
                                {p?.role?.toUpperCase() || 'OPERATIVE'}
                            </div>
                        )}
                    </div>
                ))}
                {players.length === 0 && (
                    <div className="text-center py-8 opacity-40 italic text-gray-500 dark:text-gray-400">Empty</div>
                )}
            </div>
        </div>
    );

    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
            <div className="text-center space-y-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 filter drop-shadow-sm">Lobby</h2>
                    <p className="text-gray-500 dark:text-gray-400">Choose your team and role</p>
                </div>

                <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 rounded-full font-medium transition-colors border border-indigo-200 dark:border-indigo-500/30"
                >
                    {copied ? <Check size={18} /> : <LinkIcon size={18} />}
                    {copied ? 'Copied Invite Link!' : 'Copy Invite Link'}
                </button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                <TeamColumn
                    team="red"
                    title="Red Team"
                    players={redTeam}
                    colorClass="text-red-700 dark:text-red-400"
                    bgClass="bg-red-50/80 dark:bg-red-950/70"
                    borderColor="border-red-200 dark:border-red-500/30"
                />
                <TeamColumn
                    team="blue"
                    title="Blue Team"
                    players={blueTeam}
                    colorClass="text-blue-700 dark:text-blue-400"
                    bgClass="bg-blue-50/80 dark:bg-blue-950/70"
                    borderColor="border-blue-200 dark:border-blue-500/30"
                />
                <TeamColumn
                    team="spectator"
                    title="Spectators"
                    players={spectators}
                    colorClass="text-gray-700 dark:text-gray-400"
                    bgClass="bg-gray-100/80 dark:bg-gray-900/70"
                    borderColor="border-gray-200 dark:border-gray-700"
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
