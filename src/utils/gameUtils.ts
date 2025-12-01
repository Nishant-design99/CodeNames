import { WORDS } from '../constants';
import { Card, CardType, Team } from '../types';

export function shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export function generateBoard(startingTeam: Team): Card[] {
    // Select 25 random words
    const selectedWords = shuffle(WORDS).slice(0, 25);

    // Determine card counts
    // Starting team gets 9, other gets 8, 7 neutral, 1 assassin
    const redCount = startingTeam === 'red' ? 9 : 8;
    const blueCount = startingTeam === 'blue' ? 9 : 8;
    const neutralCount = 7;
    const assassinCount = 1;

    const types: CardType[] = [
        ...Array(redCount).fill('red'),
        ...Array(blueCount).fill('blue'),
        ...Array(neutralCount).fill('neutral'),
        ...Array(assassinCount).fill('assassin'),
    ];

    const shuffledTypes = shuffle(types);

    return selectedWords.map((word, index) => ({
        id: index,
        word,
        type: shuffledTypes[index],
        revealed: false,
    }));
}

export function checkWinner(board: Card[], currentTurn: Team): Team | null {
    const redCards = board.filter(c => c.type === 'red');
    const blueCards = board.filter(c => c.type === 'blue');
    const assassin = board.find(c => c.type === 'assassin');

    // If assassin is revealed, the CURRENT team loses (so the OTHER team wins)
    if (assassin?.revealed) {
        return currentTurn === 'red' ? 'blue' : 'red';
    }

    // Check if all agents of a team are revealed
    const allRedRevealed = redCards.every(c => c.revealed);
    const allBlueRevealed = blueCards.every(c => c.revealed);

    if (allRedRevealed) return 'red';
    if (allBlueRevealed) return 'blue';

    return null;
}
