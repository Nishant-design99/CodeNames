import React, { useEffect } from 'react';
import { Trophy, RefreshCw, PartyPopper } from 'lucide-react';
import { Team } from '../types';
import confetti from 'canvas-confetti';

interface WinnerOverlayProps {
    winner: Team;
    isHost: boolean;
    onNewGame: () => void;
}

const WinnerOverlay: React.FC<WinnerOverlayProps> = ({ winner, isHost, onNewGame }) => {
    useEffect(() => {
        if (winner) {
            // Fire confetti
            const duration = 3000;
            const end = Date.now() + duration;

            const colors = winner === 'red'
                ? ['#ef4444', '#b91c1c', '#ffffff']
                : ['#3b82f6', '#1d4ed8', '#ffffff'];

            (function frame() {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }, [winner]);

    if (!winner) return null;

    const isRed = winner === 'red';
    const gradientColor = isRed ? 'from-red-500 via-red-600 to-red-800' : 'from-blue-500 via-blue-600 to-blue-800';
    const textColor = isRed ? 'text-red-100' : 'text-blue-100';
    const buttonColor = isRed ? 'text-red-600 hover:bg-red-50' : 'text-blue-600 hover:bg-blue-50';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
            <div className={`relative w-full max-w-2xl mx-4 p-12 rounded-3xl shadow-2xl bg-gradient-to-br ${gradientColor} text-center transform animate-in zoom-in-95 duration-300`}>

                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />

                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4">
                        <PartyPopper size={48} className="text-white/80 animate-bounce" />
                        <div className="p-6 bg-white/20 rounded-full backdrop-blur-md shadow-inner animate-bounce">
                            <Trophy size={64} className="text-white drop-shadow-lg" />
                        </div>
                        <PartyPopper size={48} className="text-white/80 animate-bounce" style={{ animationDelay: '0.1s' }} />
                    </div>

                    <div className="space-y-2">
                        <h2 className={`text-2xl font-bold uppercase tracking-widest ${textColor} opacity-90`}>
                            Victory!
                        </h2>
                        <h1 className="text-6xl md:text-7xl font-black text-white drop-shadow-md tracking-tight uppercase">
                            {winner} Team <br /> Wins
                        </h1>
                    </div>

                    <div className="pt-8">
                        {isHost ? (
                            <button
                                onClick={onNewGame}
                                className={`flex items-center gap-3 px-8 py-4 bg-white rounded-xl font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all ${buttonColor}`}
                            >
                                <RefreshCw size={24} />
                                Play Again
                            </button>
                        ) : (
                            <div className="text-white/80 animate-pulse">
                                Waiting for host to start new game...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WinnerOverlay;
