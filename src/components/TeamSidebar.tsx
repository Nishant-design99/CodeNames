import React from 'react';
import { Player, Team } from '../types';
import { clsx } from 'clsx';
import { Crown, User } from 'lucide-react';

interface TeamSidebarProps {
    team: Team;
    players: Player[];
    currentTurn: Team;
    currentPlayerId: string;
    className?: string;
}

const TeamSidebar: React.FC<TeamSidebarProps> = ({ team, players, currentTurn, currentPlayerId, className }) => {
    const isRed = team === 'red';
    const teamColor = isRed ? 'text-red-700 dark:text-red-400' : 'text-blue-700 dark:text-blue-400';
    const bgColor = isRed ? 'bg-red-50/80 dark:bg-red-950/70 backdrop-blur-sm' : 'bg-blue-50/80 dark:bg-blue-950/70 backdrop-blur-sm';
    const borderColor = isRed ? 'border-red-200 dark:border-red-500/30' : 'border-blue-200 dark:border-blue-500/30';

    return (
        <div className={clsx(
            "w-full lg:w-64 p-4 rounded-xl border shadow-sm h-fit transition-all duration-300",
            bgColor,
            borderColor,
            currentTurn === team ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900" : "opacity-80 grayscale-[0.3]",
            currentTurn === team && (isRed ? "ring-red-400 dark:ring-red-500/50" : "ring-blue-400 dark:ring-blue-500/50"),
            className,
            "text-gray-900 dark:text-gray-100"
        )}>
            <div className="flex items-center justify-between mb-4">
                <h2 className={clsx("text-lg font-bold uppercase tracking-wider", teamColor)}>
                    {team} Team
                </h2>
                <span className={clsx("text-xs font-bold px-2 py-1 rounded-full bg-white/60 dark:bg-black/40", teamColor)}>
                    {players.length}
                </span>
            </div>

            <div className="space-y-2">
                {players.map((player) => (
                    <div
                        key={player.id}
                        className={clsx(
                            "flex items-center justify-between p-2 rounded-lg bg-white/60 dark:bg-black/20 border border-transparent transition-all",
                            player.id === currentPlayerId && "border-current shadow-sm bg-white dark:bg-gray-800/80",
                            player.role === 'spymaster' && "bg-yellow-100/50 dark:bg-yellow-500/10"
                        )}
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            {player.role === 'spymaster' ? (
                                <Crown size={16} className={isRed ? "text-red-600 dark:text-red-500" : "text-blue-600 dark:text-blue-500"} />
                            ) : (
                                <User size={16} className="text-gray-400 dark:text-gray-500" />
                            )}
                            <span className={clsx(
                                "truncate font-medium text-sm",
                                player.id === currentPlayerId ? "text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400"
                            )}>
                                {player.name} {player.id === currentPlayerId && "(You)"}
                            </span>
                        </div>
                    </div>
                ))}

                {players.length === 0 && (
                    <div className="text-center py-4 text-gray-500 text-sm italic">
                        No players yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamSidebar;
