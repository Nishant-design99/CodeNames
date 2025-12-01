import React from 'react';
import { RefreshCw, SkipForward } from 'lucide-react';

import { Team } from '../types';
import ClueInput from './ClueInput';

interface ControlsProps {
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
