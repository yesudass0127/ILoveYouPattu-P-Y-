import React from 'react';
import { motion } from 'framer-motion';

const allPhotos = [
    "/Photos/1770658961313.jpg", "/Photos/1770658961333.jpg", "/Photos/1770658961337.jpg",
    "/Photos/1770658961341.jpg", "/Photos/1770658961347.jpg", "/Photos/1770658961362.jpg",
    "/Photos/1770658961366.jpg", "/Photos/1770658961371.jpg", "/Photos/1770658961387.jpg",
    "/Photos/1770658961395.jpg", "/Photos/1770658961402.jpg", "/Photos/1770658961407.jpg",
    "/Photos/1770658961410.jpg", "/Photos/1770658961413.jpg", "/Photos/1770658961418.jpg",
    "/Photos/1770658961421.jpg", "/Photos/1770658961425.jpg", "/Photos/1770658961429.jpg",
    "/Photos/1770658961432.jpg", "/Photos/1770658961436.jpg", "/Photos/1770658961441.jpg",
    "/Photos/1770658961444.jpg", "/Photos/1770658961447.jpg", "/Photos/1770658961455.jpg"
];

const FallingMemories: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
            {allPhotos.map((src, i) => (
                <motion.div
                    key={i}
                    initial={{
                        y: -100,
                        x: `${Math.random() * 100}vw`,
                        opacity: 0,
                        scale: Math.random() * 0.3 + 0.2,
                        rotate: Math.random() * 360
                    }}
                    animate={{
                        y: "110vh",
                        x: `${(Math.random() - 0.5) * 20 + 50}vw`,
                        opacity: [0, 0.4, 0.4, 0],
                        rotate: Math.random() * 360 + 360
                    }}
                    transition={{
                        duration: Math.random() * 15 + 15,
                        repeat: Infinity,
                        delay: Math.random() * 20,
                        ease: "linear"
                    }}
                    className="absolute w-32 h-32 rounded-lg border-2 border-white/30 shadow-sm overflow-hidden"
                >
                    <img src={src} alt="" className="w-full h-full object-cover grayscale-[30%] brightness-110" />
                </motion.div>
            ))}

            {/* Floating Hearts too */}
            {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    initial={{
                        y: "110vh",
                        x: `${Math.random() * 100}vw`,
                        opacity: 0
                    }}
                    animate={{
                        y: "-10vh",
                        opacity: [0, 0.6, 0]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 10
                    }}
                    className="absolute text-3xl"
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
};

export default FallingMemories;
