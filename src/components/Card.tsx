import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Card as CardType } from '../types';

interface CardProps {
    card: CardType;
    isSpymaster: boolean;
    onClick: () => void;
    disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, isSpymaster, onClick, disabled }) => {
    const { word, type, revealed } = card;

    // Determine the background color based on state
    const getBackgroundColor = () => {
        if (revealed) {
            switch (type) {
                case 'red': return 'bg-red-500 text-white border-red-600';
                case 'blue': return 'bg-blue-500 text-white border-blue-600';
                case 'neutral': return 'bg-amber-100 text-amber-800 border-amber-200 opacity-50 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800';
                case 'assassin': return 'bg-gray-900 text-white border-gray-950';
            }
        }

        if (isSpymaster) {
            switch (type) {
                case 'red': return 'bg-red-100 text-red-900 border-red-200 dark:bg-red-900/40 dark:text-red-200 dark:border-red-800';
                case 'blue': return 'bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800';
                case 'neutral': return 'bg-amber-50 text-amber-900 border-amber-100 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-800';
                case 'assassin': return 'bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
            }
        }

        return 'bg-white text-gray-800 hover:bg-gray-50 border-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:border-gray-600 shadow-sm';
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || revealed}
            className={twMerge(
                'relative w-full aspect-[4/3] rounded-lg shadow-sm border-b-4 transition-all duration-300',
                'flex items-center justify-center p-2',
                'text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider break-words text-center',
                getBackgroundColor(),
                !revealed && !disabled && 'hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-sm cursor-pointer',
                (revealed || disabled) && 'cursor-default',
                revealed && type === 'neutral' && 'shadow-none border-transparent',
                revealed && 'animate-flip'
            )}
        >
            <span className={clsx(
                "transition-opacity duration-500",
                revealed && type === 'assassin' && "text-red-500"
            )}>
                {word}
            </span>

            {/* Spymaster Indicator (Optional icon or marker) */}
            {isSpymaster && !revealed && (
                <div className={clsx(
                    "absolute top-1 right-1 w-2 h-2 rounded-full",
                    type === 'red' && "bg-red-500",
                    type === 'blue' && "bg-blue-500",
                    type === 'assassin' && "bg-black",
                    type === 'neutral' && "bg-amber-300"
                )} />
            )}
        </button>
    );
};

export default Card;
