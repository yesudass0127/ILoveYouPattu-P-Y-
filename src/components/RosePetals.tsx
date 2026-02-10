import React from 'react';
import { motion } from 'framer-motion';

const RosePetals: React.FC = () => {
    const petals = Array.from({ length: 20 });

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
            {petals.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        y: -100,
                        x: `${Math.random() * 100}vw`,
                        opacity: 0,
                        scale: Math.random() * 0.5 + 0.5,
                        rotate: Math.random() * 360
                    }}
                    animate={{
                        y: "110vh",
                        x: `${(Math.random() - 0.5) * 30 + 50}vw`,
                        opacity: [0, 0.7, 0.7, 0],
                        rotate: Math.random() * 720
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 15,
                        ease: "linear"
                    }}
                    className="absolute"
                >
                    <div className="w-6 h-8 bg-gradient-to-br from-rose-400 to-red-600 rounded-full opacity-60 shadow-sm" style={{ borderRadius: '60% 40% 70% 30% / 50% 50% 50% 50%' }}></div>
                </motion.div>
            ))}
        </div>
    );
};

export default RosePetals;
