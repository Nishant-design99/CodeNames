import React from 'react';
import { RefreshCw, SkipForward } from 'lucide-react';
import { clsx } from 'clsx';
import { Team } from '../types';
import ClueInput from './ClueInput';

interface ControlsProps {
    scores: { red: number; blue: number };
    currentTurn: Team;
    winner: Team | null;
    isSpymaster: boolean;
    isMyTurn: boolean;
    isHost: boolean;
    onToggleSpymaster: () => void;
    onEndTurn: () => void;
    onNewGame: () => void;
    onGiveClue: (word: string, number: number) => void;
    clueGiven: boolean;
}

const Controls: React.FC<ControlsProps> = ({
    scores,
    currentTurn,
    winner,
    isMyTurn,
    isSpymaster,
    isHost,
    onEndTurn,
    onNewGame,
    onGiveClue,
    clueGiven,
}) => {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-4">
            {/* Top Bar: Scores and Turn */}
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

            {/* Bottom Bar: Actions */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                    {isSpymaster && isMyTurn && !winner && (
                        <div className="max-w-md">
                            <ClueInput onGiveClue={onGiveClue} disabled={clueGiven} />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onEndTurn}
                        disabled={!!winner || !isMyTurn}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <SkipForward size={18} />
                        <span className="hidden sm:inline">End Turn</span>
                    </button>

                    {isHost && (
                        <button
                            onClick={onNewGame}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow"
                        >
                            <RefreshCw size={18} />
                            <span className="hidden sm:inline">New Game</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Controls;
