import { useState, useCallback, useEffect } from 'react';
import { ref, onValue, update, get, onDisconnect } from 'firebase/database';
import { db } from '../services/firebase';
import { generateBoard, checkWinner } from '../utils/gameUtils';
import { GameState, Player } from '../types';

const INITIAL_STATE: GameState = {
    board: [],
    currentTurn: 'red',
    scores: { red: 9, blue: 8 },
    winner: null,
    lastUpdated: Date.now(),
    status: 'lobby',
    players: {},
    hostId: '',
    clues: [],
    guessesRemaining: null,
};

export function useGame(roomId?: string) {
    const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [playerId, setPlayerId] = useState<string>('');

    // Initialize Player ID
    useEffect(() => {
        let id = localStorage.getItem('spymaster_player_id');
        if (!id) {
            id = Math.random().toString(36).substring(2, 15);
            localStorage.setItem('spymaster_player_id', id);
        }
        setPlayerId(id);
    }, []);

    // Subscribe to Room
    useEffect(() => {
        if (!roomId) {
            setLoading(false);
            return;
        }

        const roomRef = ref(db, `rooms/${roomId}`);
        const unsubscribe = onValue(roomRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Merge with INITIAL_STATE to ensure all fields exist
                setGameState(() => ({
                    ...INITIAL_STATE,
                    ...data,
                    // Ensure nested objects exist if missing in data
                    players: data.players || {},
                    scores: data.scores || INITIAL_STATE.scores,
                    board: data.board || INITIAL_STATE.board,
                    clues: data.clues || [],
                    guessesRemaining: data.guessesRemaining === undefined ? null : data.guessesRemaining,
                }));
            } else {
                // Room doesn't exist yet, we'll create it when joining
                setGameState(INITIAL_STATE);
            }
            setLoading(false);
        }, (err) => {
            console.error("Firebase error:", err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [roomId]);

    // Handle Disconnect / Cleanup
    useEffect(() => {
        if (!roomId || !playerId) return;

        // Only set disconnect logic if we are actually in the players list
        // This prevents race conditions where we might delete the room before loading the state
        if (!gameState.players || !gameState.players[playerId]) return;

        const playerRef = ref(db, `rooms/${roomId}/players/${playerId}`);
        const roomRef = ref(db, `rooms/${roomId}`);

        const playerCount = Object.keys(gameState.players).length;

        if (playerCount <= 1) {
            // If we are the last one, remove the room (which removes us too)
            onDisconnect(roomRef).remove();
        } else {
            // If others are present:
            // 1. Cancel any pending room removal (crucial!)
            onDisconnect(roomRef).cancel();
            // 2. Queue our own removal
            // Note: We set this AFTER cancelling the room to ensure it doesn't get wiped
            onDisconnect(playerRef).remove();
        }

        return () => {
            onDisconnect(roomRef).cancel();
            onDisconnect(playerRef).cancel();
        };
    }, [roomId, playerId, gameState.players]);

    // Join Room Logic
    const joinRoom = useCallback(async (name: string, roomIdOverride?: string) => {
        const targetRoomId = roomIdOverride || roomId;
        if (!targetRoomId || !playerId) return;

        const roomRef = ref(db, `rooms/${targetRoomId}`);
        const snapshot = await get(roomRef);
        const currentData = snapshot.val() as GameState | null;

        let newState = currentData || { ...INITIAL_STATE, hostId: playerId };

        // If no host (new room), set current player as host
        if (!newState.hostId) {
            newState.hostId = playerId;
        }

        // Add/Update player
        if (!newState.players) newState.players = {};

        newState.players[playerId] = {
            id: playerId,
            name,
            team: 'spectator', // Default to spectator
            role: 'operative',
            isHost: newState.hostId === playerId,
            joinedAt: Date.now(),
        };

        await update(roomRef, newState);
    }, [roomId, playerId]);

    const updatePlayer = useCallback((updates: Partial<Player>) => {
        if (!roomId || !playerId) return;
        update(ref(db, `rooms/${roomId}/players/${playerId}`), updates);
    }, [roomId, playerId]);

    const startGame = useCallback(() => {
        if (!roomId) return;

        const startingTeam: 'red' | 'blue' = Math.random() < 0.5 ? 'red' : 'blue';
        const newBoard = generateBoard(startingTeam);

        const updates = {
            board: newBoard,
            currentTurn: startingTeam,
            scores: {
                red: startingTeam === 'red' ? 9 : 8,
                blue: startingTeam === 'blue' ? 9 : 8,
            },
            winner: null,
            status: 'playing',
            lastUpdated: Date.now(),
            clues: [],
            guessesRemaining: null,
        };

        update(ref(db, `rooms/${roomId}`), updates);
    }, [roomId]);

    const handleCardClick = useCallback((cardId: number) => {
        if (gameState.winner || gameState.status !== 'playing') return;

        // Only current turn team can play (enforced by UI, but good to check)
        // And Spymasters cannot click cards
        const myPlayer = gameState.players[playerId];
        if (!myPlayer || myPlayer.role === 'spymaster') return;
        if (myPlayer.team !== gameState.currentTurn) return;

        // Check if guesses are remaining
        if (gameState.guessesRemaining !== null && gameState.guessesRemaining <= 0) return;
        // Also if no clue has been given yet (guessesRemaining is null), maybe we shouldn't allow guessing?
        // The requirement implies "number of correct tiles ... is number of words ... + 1".
        // This implies they need a clue first.
        if (gameState.guessesRemaining === null) return;

        const cardIndex = gameState.board.findIndex(c => c.id === cardId);
        if (cardIndex === -1) return;

        const card = gameState.board[cardIndex];
        if (card.revealed) return;

        // Create a copy of the board
        const newBoard = [...gameState.board];
        newBoard[cardIndex] = { ...card, revealed: true };

        // Update scores
        const newScores = { ...gameState.scores };
        if (card.type === 'red' || card.type === 'blue') {
            newScores[card.type]--;
        }

        // Check for winner
        let newWinner = checkWinner(newBoard, gameState.currentTurn);

        // Determine next turn and guesses
        let nextTurn = gameState.currentTurn;
        let newGuessesRemaining: number | null = gameState.guessesRemaining;

        if (card.type !== gameState.currentTurn) {
            // Wrong guess (opponent or neutral or assassin)
            // End turn immediately
            nextTurn = gameState.currentTurn === 'red' ? 'blue' : 'red';
            newGuessesRemaining = null; // Reset for next team
        } else {
            // Correct guess
            if (newGuessesRemaining !== null) {
                newGuessesRemaining--;
                if (newGuessesRemaining <= 0) {
                    // Used all guesses
                    nextTurn = gameState.currentTurn === 'red' ? 'blue' : 'red';
                    newGuessesRemaining = null;
                }
            }
        }

        const updates = {
            board: newBoard,
            scores: newScores,
            winner: newWinner,
            currentTurn: nextTurn,
            lastUpdated: Date.now(),
            guessesRemaining: newGuessesRemaining,
        };

        if (roomId) {
            update(ref(db, `rooms/${roomId}`), updates);
        }
    }, [gameState, roomId, playerId]);

    const endTurn = useCallback(() => {
        if (gameState.winner) return;

        const myPlayer = gameState.players[playerId];
        if (!myPlayer || myPlayer.team !== gameState.currentTurn) return;

        const nextTurn: 'red' | 'blue' = gameState.currentTurn === 'red' ? 'blue' : 'red';
        update(ref(db, `rooms/${roomId}`), {
            currentTurn: nextTurn,
            lastUpdated: Date.now(),
            guessesRemaining: null,
        });
    }, [gameState, roomId, playerId]);

    const resetToLobby = useCallback(() => {
        if (!roomId) return;

        const myPlayer = gameState.players[playerId];
        if (!myPlayer || !myPlayer.isHost) return;

        update(ref(db, `rooms/${roomId}`), {
            status: 'lobby',
            winner: null,
            lastUpdated: Date.now(),
        });
    }, [roomId, playerId, gameState.players]);

    const giveClue = useCallback((word: string, number: number) => {
        if (!roomId || !gameState.currentTurn) return;
        if (gameState.guessesRemaining !== null) return;

        const newClue = {
            word,
            number,
            team: gameState.currentTurn,
            timestamp: Date.now(),
        };

        const currentClues = gameState.clues || [];
        const updatedClues = [...currentClues, newClue];

        update(ref(db, `rooms/${roomId}`), {
            clues: updatedClues,
            lastUpdated: Date.now(),
            guessesRemaining: number + 1,
        });
    }, [roomId, gameState.currentTurn, gameState.clues]);

    return {
        gameState,
        loading,
        error,
        playerId,
        actions: {
            joinRoom,
            updatePlayer,
            startGame,
            handleCardClick,
            endTurn,
            resetToLobby,
            giveClue,
        }
    };
}
