import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reasons = [
    "Your beautiful smile that lights up my day.",
    "The way you care for everyone around you.",
    "Your kindness and pure heart.",
    "How you make me feel like the luckiest person.",
    "Your laugh - it's my favorite song.",
    "The way you look at me, Pattu.",
    "Your strength and how you never give up.",
    "Simply because you are YOU, Bommi."
];

const stamps = ["💖", "💋", "🌸", "🎀", "⭐", "🔥"];

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");
        let i = 0;
        const timer = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(i));
            i++;
            if (i >= text.length) clearInterval(timer);
        }, 50);
        return () => clearInterval(timer);
    }, [text]);

    return <span>{displayedText}</span>;
};

const FloatingLoveNotes: React.FC = () => {
    const [openNote, setOpenNote] = useState<number | null>(null);
    const [isReacted, setIsReacted] = useState(false);

    const handleOpen = (i: number) => {
        setOpenNote(i);
        setIsReacted(false);
    };

    return (
        <section className="py-24 relative overflow-hidden bg-white/30 backdrop-blur-sm min-h-screen flex flex-col justify-center">
            <div className="max-w-6xl mx-auto text-center px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-dancing text-valentine-red mb-6 drop-shadow-sm">Messages from My Heart</h2>
                    <p className="text-gray-500 font-outfit text-xl italic">
                        Each envelope holds a fragment of my love for you. Tap to reveal...
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {reasons.map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            onClick={() => handleOpen(i)}
                            className="relative cursor-pointer group"
                        >
                            {/* Envelope Visual */}
                            <div className="bg-rose-50 p-6 md:p-8 rounded-[2.5rem] shadow-xl border-2 border-white group-hover:border-valentine-pink transition-all flex flex-col items-center">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
                                    className="text-5xl mb-4"
                                >
                                    ✉️
                                </motion.div>
                                <div className="absolute top-2 right-2 text-xl opacity-60">
                                    {stamps[i % stamps.length]}
                                </div>
                                <span className="font-outfit text-xs font-bold text-rose-300 uppercase tracking-[0.2em]">Open Heart</span>
                            </div>

                            {/* Interactive Sparkle effect on hover */}
                            <div className="absolute inset-0 bg-valentine-pink/5 blur-xl group-hover:opacity-100 opacity-0 transition-opacity rounded-full"></div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {openNote !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] flex items-center justify-center bg-rose-900/40 backdrop-blur-lg p-4"
                        onClick={() => setOpenNote(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 100, rotateY: 90 }}
                            animate={{ scale: 1, y: 0, rotateY: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotateY: -90 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="bg-white p-8 md:p-12 rounded-[3.5rem] max-w-lg w-full text-center shadow-[0_20px_50px_rgba(233,30,99,0.3)] relative border-b-8 border-rose-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Cinematic Icon Reveal */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-7xl mb-8 flex justify-center"
                            >
                                <div className="relative">
                                    <span>💌</span>
                                    <motion.span
                                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute -top-4 -right-4 text-3xl"
                                    >
                                        ✨
                                    </motion.span>
                                </div>
                            </motion.div>

                            <div className="min-h-[120px] flex items-center justify-center">
                                <p className="text-3xl md:text-4xl font-dancing text-valentine-red leading-relaxed italic px-4">
                                    "<TypewriterText text={reasons[openNote]} />"
                                </p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-12 flex flex-col items-center gap-6"
                            >
                                {!isReacted ? (
                                    <button
                                        onClick={() => setIsReacted(true)}
                                        className="group relative px-10 py-4 bg-gradient-to-r from-valentine-red to-rose-400 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-valentine-pink/50 transition-all flex items-center gap-3"
                                    >
                                        <span>Tap to send me a hug 🫂</span>
                                        <motion.div
                                            whileHover={{ scale: 1.5 }}
                                            className="text-xl"
                                        >
                                            💖
                                        </motion.div>
                                    </button>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-rose-400 font-dancing text-2xl flex items-center gap-2"
                                    >
                                        Hug Sent! I felt that. 🥰 🫂
                                    </motion.div>
                                )}

                                <button
                                    onClick={() => setOpenNote(null)}
                                    className="text-gray-400 font-outfit text-sm hover:text-valentine-red transition-colors uppercase tracking-widest"
                                >
                                    Dismiss with Love
                                </button>
                            </motion.div>

                            {/* Floating decorative elements in modal */}
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute -top-6 -right-6 text-4xl">🌸</motion.div>
                            <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} className="absolute -bottom-6 -left-6 text-4xl">🎀</motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[1, 2, 3, 4, 5].map(i => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, 50, 0],
                            rotate: [0, 360]
                        }}
                        transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
                        className="absolute text-rose-100/30 text-8xl"
                        style={{ left: `${i * 20}%`, top: `${Math.random() * 100}%` }}
                    >
                        ☁️
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FloatingLoveNotes;
