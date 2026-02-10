import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const LoveLetter: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sealClicks, setSealClicks] = useState(0);
    const isSealed = sealClicks < 3;

    const handleSealClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isSealed) {
            setSealClicks(prev => prev + 1);
            return;
        }
        setIsOpen(!isOpen);
    };

    return (
        <section className="py-20 flex flex-col items-center justify-center bg-rose-50/50 min-h-screen">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-dancing text-valentine-red mb-4">The Final Secret Letter</h2>
                <p className="text-gray-600 font-outfit">
                    {isSealed
                        ? "Tap the wax seal 3 times to break it open..."
                        : "The seal is broken. Click to reveal my heart."
                    }
                </p>
            </div>

            <div
                className="relative w-80 h-64 cursor-pointer group"
                onClick={handleSealClick}
            >
                {/* Envelope Back */}
                <div className="absolute inset-0 bg-rose-200 rounded-lg shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full border-t-[128px] border-t-rose-300 border-x-[160px] border-x-transparent"></div>
                </div>

                {/* The Letter */}
                <motion.div
                    initial={false}
                    animate={{
                        y: (isOpen && !isSealed) ? -180 : 0,
                        zIndex: (isOpen && !isSealed) ? 20 : 5
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-x-4 top-4 bottom-4 bg-white rounded shadow-md p-6 overflow-y-auto"
                >
                    <div className="font-dancing text-2xl text-valentine-red mb-4 border-b border-rose-100 pb-2">
                        My Dearest Princy (Bommi),
                    </div>
                    <p className="font-outfit text-gray-700 leading-relaxed text-sm">
                        From the moment I met you, my life has been filled with colors I never knew existed.
                        You are my best friend, my soulmate, and my heart's greatest joy.
                        <br /><br />
                        You'll always be my <strong>Pattu</strong>, the cutest person in my world.
                        Thank you for being you and for making every single day meaningful.
                        <br /><br />
                        I love you more than words can express.
                        <br /><br />
                        Yours always,<br />
                        ❤
                    </p>
                </motion.div>

                {/* Envelope Front/Flap */}
                <motion.div
                    initial={false}
                    animate={{ rotateX: (isOpen && !isSealed) ? 180 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-0 left-0 w-full h-1/2 bg-rose-300 rounded-t-lg origin-bottom z-30 shadow-inner"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="absolute inset-x-0 bottom-4 flex justify-center">
                        <span className="text-3xl text-rose-50">💌</span>
                    </div>
                </motion.div>

                {/* Envelope Bottom Overlap */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-rose-200/80 rounded-b-lg z-25 border-t border-rose-300/30"></div>

                {/* Interactive Wax Seal */}
                <AnimatePresence>
                    {isSealed && (
                        <motion.div
                            exit={{ scale: 2, opacity: 0, rotate: 45 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[40]"
                        >
                            <motion.div
                                animate={sealClicks > 0 ? {
                                    scale: [1, 1.2, 1],
                                    rotate: [0, -10, 10, 0]
                                } : {}}
                                className="w-20 h-20 bg-valentine-red rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] border-4 border-rose-900/10 cursor-pointer"
                            >
                                <div className="text-white font-dancing text-2xl font-bold select-none">
                                    {sealClicks === 0 ? "P" : sealClicks === 1 ? "P♥N" : "♥"}
                                </div>

                                {sealClicks > 0 && (
                                    <div className="absolute inset-0 border-r-2 border-rose-900/20 rotate-45 transform scale-y-110"></div>
                                )}
                                {sealClicks > 1 && (
                                    <div className="absolute inset-0 border-l-2 border-rose-900/20 -rotate-12 transform scale-y-110"></div>
                                )}
                            </motion.div>

                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`w-2 h-2 rounded-full ${sealClicks >= i ? 'bg-valentine-red' : 'bg-rose-200'}`}></div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {isOpen && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-24 px-8 py-3 bg-valentine-red text-white rounded-full font-outfit font-semibold shadow-lg hover:bg-rose-600 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                    }}
                >
                    Close Letter
                </motion.button>
            )}
        </section>
    );
};

export default LoveLetter;
