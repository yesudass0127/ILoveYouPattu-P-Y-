import React from 'react';
import { motion } from 'framer-motion';

const heartShapes = [
    "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
];

const FloatingHearts: React.FC = () => {
    const hearts = Array.from({ length: 20 });

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((_, i) => (
                <motion.svg
                    key={i}
                    viewBox="0 0 24 24"
                    className="absolute text-rose-300 opacity-20"
                    initial={{
                        y: "110vh",
                        x: `${Math.random() * 100}vw`,
                        scale: Math.random() * 0.5 + 0.5,
                        rotate: Math.random() * 360
                    }}
                    animate={{
                        y: "-10vh",
                        rotate: Math.random() * 360 + 360,
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 20,
                        ease: "linear"
                    }}
                    style={{ width: `${Math.random() * 30 + 20}px` }}
                >
                    <path fill="currentColor" d={heartShapes[0]} />
                </motion.svg>
            ))}
        </div>
    );
};

export default FloatingHearts;
