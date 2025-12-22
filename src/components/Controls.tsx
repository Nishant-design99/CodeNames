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
        <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 flex flex-col gap-3 sm:gap-4">


            {/* Bottom Bar: Actions */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3">
                <div className="flex-1 order-2 xs:order-1">
                    {isSpymaster && isMyTurn && !winner && (
                        <div className="max-w-md">
                            <ClueInput onGiveClue={onGiveClue} disabled={clueGiven} />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 order-1 xs:order-2">
                    <button
                        onClick={onEndTurn}
                        disabled={!!winner || !isMyTurn}
                        className="btn-touch flex-1 xs:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors no-select"
                    >
                        <SkipForward size={18} />
                        <span>End Turn</span>
                    </button>

                    {isHost && (
                        <button
                            onClick={onNewGame}
                            className="btn-touch flex-1 xs:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow transition-all no-select"
                        >
                            <RefreshCw size={18} />
                            <span>New Game</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Controls;
