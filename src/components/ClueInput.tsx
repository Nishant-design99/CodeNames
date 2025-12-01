import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ClueInputProps {
    onGiveClue: (word: string, number: number) => void;
    disabled?: boolean;
}

const ClueInput: React.FC<ClueInputProps> = ({ onGiveClue, disabled }) => {
    const [word, setWord] = useState('');
    const [number, setNumber] = useState<number | ''>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!word.trim() || !number || disabled) return;

        onGiveClue(word.trim(), Number(number));
        setWord('');
        setNumber('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
            <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Clue word"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={disabled}
            />
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="#"
                min="0"
                max="9"
                className="w-16 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={disabled}
            />
            <button
                type="submit"
                disabled={!word.trim() || !number || disabled}
                className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Send size={20} />
            </button>
        </form>
    );
};

export default ClueInput;
