import React, { useEffect, useState, useRef } from 'react';
import { Clue } from '../types';
import { clsx } from 'clsx';

interface CluePopupProps {
    clue: Clue | undefined;
}

const CluePopup: React.FC<CluePopupProps> = ({ clue }) => {
    const [visible, setVisible] = useState(false);
    // Initialize with current time to avoid showing old clues on reload
    const lastClueTimestampRef = useRef(Date.now());

    useEffect(() => {
        if (clue && clue.timestamp > lastClueTimestampRef.current) {
            setVisible(true);
            lastClueTimestampRef.current = clue.timestamp;

            const timer = setTimeout(() => {
                setVisible(false);
            }, 1500); // Show for 1.5 seconds to be safe/readable
            return () => clearTimeout(timer);
        }
    }, [clue]);

    if (!visible || !clue) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none bg-black/20 backdrop-blur-[2px]">
            <div className={clsx(
                "px-12 py-8 rounded-3xl shadow-2xl border-4 transform animate-pop-up flex flex-col items-center gap-3 bg-white",
                clue.team === 'red' ? "border-red-500 shadow-red-500/20" : "border-blue-500 shadow-blue-500/20"
            )}>
                <span className={clsx(
                    "text-sm font-bold uppercase tracking-widest",
                    clue.team === 'red' ? "text-red-500" : "text-blue-500"
                )}>
                    {clue.team} Team Clue
                </span>
                <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-black text-gray-900">{clue.word}</span>
                    <span className={clsx(
                        "text-5xl font-black px-4 py-1 rounded-xl bg-gray-100",
                        clue.team === 'red' ? "text-red-600" : "text-blue-600"
                    )}>
                        {clue.number}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CluePopup;
