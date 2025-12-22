import React from 'react';
import { Clue, Team } from '../types';
import { clsx } from 'clsx';

interface ClueHistoryProps {
    clues: Clue[];
    currentTurn: Team;
}

const ClueHistory: React.FC<ClueHistoryProps> = ({ clues, currentTurn }) => {
    if (!clues || clues.length === 0) {
        // If there are no clues, we can still render the component to show "No clues yet"
        // but we need to ensure currentTurn is handled if it's not used in this specific return path.
        // For now, let's keep it as null if no clues at all, as per original.
        // The "No clues yet" message will be handled inside the component if historyClues is empty.
    }

    // Check if the last clue is active (belongs to current turn)
    const lastClue = clues.length > 0 ? clues[clues.length - 1] : undefined;
    const isLastClueActive = lastClue && lastClue.team === currentTurn;

    // If active, we show it separately at the top
    // The history list will show the rest (reversed for chronological order if desired, or just list)
    // Actually, usually history is newest at bottom. But if we pull the newest to top...
    // Let's keep the list as is, but highlight the newest if active.

    // User request: "move the current highlighed clue at the to of clue history"
    // So we should probably show the active clue in a special "Current Clue" section at the top of the card.

    const historyClues = isLastClueActive ? clues.slice(0, -1) : clues;

    return (
        <div className="w-full max-w-md mx-auto mt-6 sm:mt-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-20 max-h-64 sm:max-h-80 flex flex-col transition-colors">
            <div className="bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-2 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm flex justify-between items-center">
                <span>Clue History</span>
                {isLastClueActive && (
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 animate-pulse">LIVE</span>
                )}
            </div>

            {isLastClueActive && lastClue && ( // Ensure lastClue exists before rendering
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 border-b border-indigo-100 dark:border-indigo-800 animate-pop-up">
                    <div className="text-xs uppercase tracking-wider text-indigo-400 dark:text-indigo-500 font-bold mb-1">Current Clue</div>
                    <div className="flex items-center justify-between">
                        <span className="text-lg sm:text-xl font-black text-indigo-900 dark:text-indigo-100">{lastClue.word}</span>
                        <span className="text-lg sm:text-xl font-black bg-white dark:bg-gray-800 px-2 sm:px-3 py-1 rounded shadow-sm text-indigo-600 dark:text-indigo-400">
                            {lastClue.number}
                        </span>
                    </div>
                </div>
            )}

            <div className="overflow-y-auto custom-scrollbar p-2 flex flex-col gap-2 flex-1">
                {/* Show history in reverse order (newest first) so it connects with the top? 
                    Or standard order? Standard is usually oldest top. 
                    If we have a "Current Clue" at top, maybe history should be below it.
                */}
                {[...historyClues].reverse().map((clue, index) => (
                    <div
                        key={`${clue.timestamp} -${index} `}
                        className={clsx(
                            "flex items-center justify-between px-2 sm:px-3 py-2 rounded border opacity-75",
                            clue.team === 'red'
                                ? "bg-red-50 border-red-100 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300"
                                : "bg-blue-50 border-blue-100 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
                        )}
                    >
                        <span className="font-medium text-sm">{clue.word}</span>
                        <span className="font-bold bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded text-xs sm:text-sm">
                            {clue.number}
                        </span>
                    </div>
                ))}
                {historyClues.length === 0 && !isLastClueActive && (
                    <div className="text-center text-gray-400 dark:text-gray-500 text-xs sm:text-sm py-4">
                        No clues yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClueHistory;
