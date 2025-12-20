import React from 'react';
import { X, BookOpen } from 'lucide-react';

interface HowToPlayModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="relative w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg">
                            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How to Play</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-8">

                    {/* Section 1: Objective */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Objective</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Two teams (Red and Blue) compete to be the first to contact all their agents.
                            Spymasters give one-word clues that can point to multiple words on the board.
                            Their teammates try to guess words of the right color while shifting away from those that belong to the opposing team.
                            And everyone wants to avoid the Assassin!
                        </p>
                    </section>

                    {/* Section 2: Roles */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Roles</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                                <span className="text-gray-900 dark:text-white font-bold block mb-2">🕵️ Spymaster</span>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Knows the secret identities of 25 agents. Gives one-word clues and a number to their team.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                                <span className="text-gray-900 dark:text-white font-bold block mb-2">👥 Operatives</span>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Only know the agents by their codenames. Guess words based on the Spymaster's clues.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Gameplay */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Gameplay</h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white flex items-center justify-center text-sm font-bold">1</span>
                                <span>The Spymaster checks the key card to see which words belong to their team.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white flex items-center justify-center text-sm font-bold">2</span>
                                <span>The Spymaster gives a clue: <strong className="text-gray-900 dark:text-white">One Word + One Number</strong>. <br />
                                    <span className="text-sm text-gray-500 italic">Example: "Nut - 2" for 'Almond' and 'Cashew'.</span></span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white flex items-center justify-center text-sm font-bold">3</span>
                                <span>Operatives discuss and tap the words they think fit the clue.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 4: Card Types */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Card Meanings</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm font-bold">
                            <div className="p-3 bg-red-50 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-400 border dark:border-red-900/50 rounded-lg">Red Agent</div>
                            <div className="p-3 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 border dark:border-blue-900/50 rounded-lg">Blue Agent</div>
                            <div className="p-3 bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-600 border dark:border-yellow-900/30 rounded-lg">Bystander</div>
                            <div className="p-3 bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-400 border dark:border-gray-700 rounded-lg border-l-4 border-l-gray-500">Assassin</div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Hitting the Assassin ends the game immediately (your team loses!). Hitting a bystander or enemy agent ends your turn.
                        </p>
                    </section>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 text-center">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Got it, let's play!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowToPlayModal;
