import React from 'react';
import { motion } from 'framer-motion';

interface UnlockHeartProps {
    onUnlock: () => void;
}

const UnlockHeart: React.FC<UnlockHeartProps> = ({ onUnlock }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-rose-100"
        >
            <div className="text-center">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        textShadow: ["0 0 10px #e11d48", "0 0 30px #e11d48", "0 0 10px #e11d48"]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-9xl cursor-pointer mb-8"
                    onClick={onUnlock}
                >
                    ❤️
                </motion.div>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl font-dancing text-valentine-red"
                >
                    Click to unlock my heart, Bommi
                </motion.h2>
            </div>

            {/* Decorative pulse rings */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute border-2 border-rose-300 rounded-full pointer-events-none"
                    initial={{ width: 0, height: 0, opacity: 0.5 }}
                    animate={{ width: 600, height: 600, opacity: 0 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeOut"
                    }}
                />
            ))}
        </motion.div>
    );
};

export default UnlockHeart;
