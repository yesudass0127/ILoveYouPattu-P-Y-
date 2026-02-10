import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoveContractProps {
    onComplete?: () => void;
}

const LoveContract: React.FC<LoveContractProps> = ({ onComplete }) => {
    const [isSigned, setIsSigned] = useState(false);
    const [isCelebrating, setIsCelebrating] = useState(false);

    const handleSign = () => {
        setIsSigned(true);
        setIsCelebrating(true);
        onComplete?.();
        setTimeout(() => setIsCelebrating(false), 5000);
    };

    const clauses = [
        "Unlimited supply of morning cuddles and forehead kisses.",
        "Priority access to the 'Decision Maker' role for one movie night a week.",
        "Guaranteed listening ear for all rants, big or small.",
        "Lifetime subscription to my worst jokes and best attempts at making you laugh.",
        "An agreement to always be the 'Big Spoon' (or Little Spoon, as requested).",
        "Permission to steal my hoodies whenever the temperature drops below 20°C."
    ];

    return (
        <section className="min-h-screen py-24 bg-orange-50/30 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="max-w-3xl w-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden border border-orange-100 flex flex-col md:flex-row"
            >
                {/* Visual Left Side */}
                <div className="md:w-1/3 bg-gradient-to-br from-rose-500 to-orange-400 p-12 flex flex-col justify-between text-white">
                    <div>
                        <h2 className="text-4xl font-dancing mb-4">The Heart Bond Agreement</h2>
                        <div className="w-12 h-1 bg-white opacity-50 mb-8" />
                        <p className="font-outfit text-sm opacity-90 leading-relaxed">
                            A legally non-binding but emotionally unbreakable commitment to us.
                        </p>
                    </div>
                    <div className="text-6xl opacity-20">📜</div>
                </div>

                {/* Content Right Side */}
                <div className="md:w-2/3 p-12 relative bg-[#fdfcfb]">
                    <div className="mb-12">
                        <h3 className="text-2xl font-playfair text-stone-800 mb-6 border-b pb-4">Terms & Conditions</h3>
                        <ul className="space-y-4">
                            {clauses.map((clause, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4 items-start"
                                >
                                    <span className="text-rose-500 mt-1">♥</span>
                                    <p className="text-stone-600 font-outfit text-sm leading-relaxed">{clause}</p>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-16 pt-8 border-t border-dashed border-stone-200 flex flex-col items-center">
                        {!isSigned ? (
                            <div className="w-full text-center">
                                <p className="font-dancing text-xl text-stone-400 mb-6 italic">Waiting for your magical touch...</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSign}
                                    className="px-12 py-4 bg-stone-900 text-white rounded-xl font-bold tracking-widest uppercase text-sm shadow-xl hover:bg-rose-600 transition-colors"
                                >
                                    Sign with Love
                                </motion.button>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center"
                            >
                                <p className="font-dancing text-4xl text-rose-500 mb-2">Signed & Sealed</p>
                                <p className="font-outfit text-xs text-stone-400 uppercase tracking-widest">February 14th, Forever</p>
                                <div className="mt-6 flex justify-center">
                                    <span className="text-5xl text-rose-500 animate-bounce">💍</span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Confetti-like celebration */}
            <AnimatePresence>
                {isCelebrating && (
                    <div className="fixed inset-0 pointer-events-none z-[100]">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: window.innerHeight + 10,
                                    rotate: 0,
                                    scale: 0.5
                                }}
                                animate={{
                                    y: -100,
                                    rotate: 360,
                                    scale: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    ease: "easeOut"
                                }}
                                className="absolute text-2xl"
                            >
                                {['❤️', '💖', '✨', '🌹', '🥂'][Math.floor(Math.random() * 5)]}
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-12 text-stone-400 font-outfit text-xs text-center italic"
            >
                * This contract is powered by 100% genuine feelings and a lifetime of shared dreams.
            </motion.p>
        </section>
    );
};

export default LoveContract;
