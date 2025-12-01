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
            <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <div className="flex items-center gap-4">
                    <div className="text-red-600 font-bold text-xl flex flex-col items-center">
                        <span className="text-xs uppercase tracking-wider text-red-400">Red</span>
                        <span>{scores.red}</span>
                    </div>
                    <div className="h-8 w-px bg-gray-200" />
                    <div className="text-blue-600 font-bold text-xl flex flex-col items-center">
                        <span className="text-xs uppercase tracking-wider text-blue-400">Blue</span>
                        <span>{scores.blue}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {winner ? (
                        <div className={clsx(
                            "px-4 py-1 rounded-full font-bold text-sm uppercase tracking-wider animate-pulse",
                            winner === 'red' ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                        )}>
                            {winner} Wins!
                        </div>
                    ) : (
                        <div className={clsx(
                            "px-4 py-1 rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2",
                            currentTurn === 'red' ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                        )}>
                            <span className={clsx("w-2 h-2 rounded-full", currentTurn === 'red' ? "bg-red-500" : "bg-blue-500")} />
                            {currentTurn}'s Turn
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScoreBoard;
