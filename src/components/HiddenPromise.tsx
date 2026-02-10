import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HiddenPromiseProps {
    onComplete?: () => void;
}

const HiddenPromise: React.FC<HiddenPromiseProps> = ({ onComplete }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleOpen = () => {
        setIsOpened(true);
        onComplete?.();
    };

    return (
        <section className="h-screen w-full bg-[#fdfaf6] flex flex-col items-center justify-center overflow-hidden p-4 relative">
            {/* Soft background aura */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-100/30 via-transparent to-transparent opacity-60" />

            <div className="max-w-md w-full relative z-10 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {!isOpened ? (
                        <motion.div
                            key="envelope"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.1, opacity: 0, rotate: 5 }}
                            className="relative w-full aspect-[4/3] bg-[#f8f1e7] rounded-lg shadow-2xl border border-stone-200 cursor-pointer group"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={handleOpen}
                        >
                            {/* Envelope Flap Background */}
                            <div className="absolute inset-0 bg-[#f4ebd9] clip-path-envelope" />

                            {/* Wax Seal */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                                animate={{ scale: isHovered ? 1.1 : 1 }}
                            >
                                <div className="w-20 h-20 bg-rose-700 rounded-full shadow-lg border-4 border-rose-800 flex items-center justify-center text-white text-3xl">
                                    <span className="animate-pulse">♥</span>
                                </div>
                                <div className="absolute -inset-2 border border-rose-900/10 rounded-full animate-ping opacity-20" />
                            </motion.div>

                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
                                <p className="font-dancing text-stone-500 text-xl group-hover:text-rose-600 transition-colors">
                                    A promise waiting for you...
                                </p>
                                <p className="text-[10px] font-outfit uppercase tracking-widest text-stone-300 mt-2">
                                    Click the seal to break it
                                </p>
                            </div>

                            <style>{`
                                .clip-path-envelope {
                                    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 50%, 0 100%);
                                }
                            `}</style>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="promise"
                            initial={{ y: 100, opacity: 0, rotate: -2 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            className="w-full bg-white p-12 rounded-sm shadow-xl border border-stone-100 relative"
                            style={{
                                backgroundImage: 'linear-gradient(#f1f1f1 .1em, transparent .1em)',
                                backgroundSize: '100% 2em'
                            }}
                        >
                            <div className="mb-8">
                                <span className="text-4xl text-rose-500 mb-4 block">💌</span>
                                <h2 className="text-4xl font-dancing text-stone-800 mb-6">A Promise to You</h2>
                            </div>

                            <div className="space-y-6 font-outfit text-stone-600 leading-relaxed italic text-lg">
                                <p>"I promise to be your biggest supporter, your safest place, and your best friend for all the days of our lives."</p>
                                <p>"No matter where the journey takes us, I will always hold your hand and walk by your side."</p>
                                <p>"My love for you grows stronger with every heartbeat, every breath, and every shared laugh."</p>
                            </div>

                            <div className="mt-12 text-right">
                                <p className="font-dancing text-2xl text-rose-600">Yours Forever, Always.</p>
                                <div className="w-32 h-[1px] bg-rose-100 ml-auto mt-2" />
                            </div>

                            {/* Floating decorative elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute -top-6 -right-6 text-4xl"
                            >
                                ✨
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpened ? 1 : 0 }}
                className="mt-12 text-stone-400 font-outfit text-xs text-center"
            >
                Navigation unlocked. Proceed when you are ready.
            </motion.div>
        </section>
    );
};

export default HiddenPromise;
