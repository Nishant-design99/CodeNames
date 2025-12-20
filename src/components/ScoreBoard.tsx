import React from 'react';
import { clsx } from 'clsx';
import { Team } from '../types';

interface ScoreBoardProps {
    scores: { red: number; blue: number };
    currentTurn: Team;
    winner: Team | null;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, currentTurn, winner }) => {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 pb-0">
            <div className="flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white transition-colors">
                <div className="flex items-center gap-4">
                    <div className="text-red-600 dark:text-red-400 font-bold text-xl flex flex-col items-center">
                        <span className="text-xs uppercase tracking-wider text-red-500/80">Red</span>
                        <span className="filter drop-shadow-sm">{scores.red}</span>
                    </div>
                    <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
                    <div className="text-blue-600 dark:text-blue-400 font-bold text-xl flex flex-col items-center">
                        <span className="text-xs uppercase tracking-wider text-blue-500/80">Blue</span>
                        <span className="filter drop-shadow-sm">{scores.blue}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {winner ? (
                        <div className={clsx(
                            "px-4 py-1 rounded-full font-bold text-sm uppercase tracking-wider animate-pulse shadow-lg",
                            winner === 'red'
                                ? "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/80 dark:text-red-200 dark:border-red-500/50"
                                : "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/80 dark:text-blue-200 dark:border-blue-500/50"
                        )}>
                            {winner} Wins!
                        </div>
                    ) : (
                        <div className={clsx(
                            "px-4 py-1 rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2 border shadow-inner transition-colors",
                            currentTurn === 'red'
                                ? "bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-200 dark:border-red-500/30"
                                : "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-500/30"
                        )}>
                            <span className={clsx("w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]", currentTurn === 'red' ? "bg-red-500" : "bg-blue-500")} />
                            {currentTurn}'s Turn
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScoreBoard;
