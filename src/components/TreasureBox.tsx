import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreasureBoxProps {
    onOpen: () => void;
}

const TreasureBox: React.FC<TreasureBoxProps> = ({ onOpen }) => {
    const [isOpening, setIsOpening] = useState(false);

    const handleOpen = () => {
        setIsOpening(true);
        setTimeout(onOpen, 2000);
    };

    return (
        <div className="min-h-screen bg-rose-100 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
            >
                <h2 className="text-4xl font-dancing text-valentine-red mb-12">The Ultimate Surprise Awaits...</h2>

                <div className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer group" onClick={handleOpen}>
                    {/* 3D Box Representation */}
                    <motion.div
                        animate={isOpening ? {
                            rotateY: 360,
                            scale: [1, 1.5, 0],
                            opacity: [1, 1, 0]
                        } : {
                            rotateY: [0, 5, -5, 0],
                            y: [0, -10, 0]
                        }}
                        transition={isOpening ? { duration: 2 } : { duration: 4, repeat: Infinity }}
                        className="w-full h-full text-9xl flex items-center justify-center"
                    >
                        {isOpening ? "✨" : "🎁"}
                    </motion.div>

                    <AnimatePresence>
                        {!isOpening && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-rose-400/20 rounded-full blur-3xl -z-10 group-hover:bg-rose-400/40 transition-colors"
                            />
                        )}
                    </AnimatePresence>
                </div>

                {!isOpening && (
                    <p className="mt-12 text-xl font-outfit text-gray-700 animate-pulse">
                        Tap the gift box to open the final treasure
                    </p>
                )}
            </motion.div>


            {/* Light rays effect on opening */}
            <AnimatePresence>
                {isOpening && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] bg-white flex items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            animate={{ scale: [1, 50], opacity: [0, 1] }}
                            transition={{ duration: 1.5 }}
                            className="w-10 h-10 bg-rose-100 rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default TreasureBox;
