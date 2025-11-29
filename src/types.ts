export type Team = 'red' | 'blue' | 'spectator';
export type CardType = 'red' | 'blue' | 'neutral' | 'assassin';
export type GameStatus = 'lobby' | 'playing' | 'finished';
export type Role = 'spymaster' | 'operative';

export interface Card {
    id: number;
    word: string;
    type: CardType;
    revealed: boolean;
}

export interface Player {
    id: string;
    name: string;
    team: Team;
    role: Role;
    isHost: boolean;
    joinedAt: number;
}

export interface GameState {
    board: Card[];
    currentTurn: 'red' | 'blue';
    scores: {
        red: number;
        blue: number;
    };
    winner: 'red' | 'blue' | null;
    lastUpdated: number;
    status: GameStatus;
    players: Record<string, Player>;
    hostId: string;
}

export interface Room {
    id: string;
    gameState: GameState;
    createdAt: number;
}
