import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
    id: number;
    x: number;
    y: number;
    size: number;
}

const CursorTrail: React.FC = () => {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newSparkle: Sparkle = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 20 + 10,
            };

            setSparkles((prev) => [...prev.slice(-15), newSparkle]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[999]">
            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        initial={{ opacity: 1, scale: 0, rotate: 0 }}
                        animate={{ opacity: 0, scale: 1.5, rotate: 180, y: sparkle.y + 50 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'absolute',
                            left: sparkle.x,
                            top: sparkle.y,
                            fontSize: sparkle.size,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CursorTrail;
