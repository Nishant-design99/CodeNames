import React from 'react';
import Card from './Card';
import { Card as CardType } from '../types';

interface GameBoardProps {
    board: CardType[];
    isSpymaster: boolean;
    onCardClick: (id: number) => void;
    canInteract: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, isSpymaster, onCardClick, canInteract }) => {
    return (
        <div className="grid grid-cols-4 xs:grid-cols-5 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 w-full max-w-4xl mx-auto p-2 sm:p-4">
            {board.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    isSpymaster={isSpymaster}
                    onClick={() => onCardClick(card.id)}
                    disabled={!canInteract}
                />
            ))}
        </div>
    );
};

export default GameBoard;
