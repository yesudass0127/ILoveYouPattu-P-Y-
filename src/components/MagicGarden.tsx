import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Flower {
    id: number;
    x: number;
    y: number;
    type: string;
    scale: number;
}

const MagicGarden: React.FC = () => {
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const flowerTypes = ["🌸", "🌹", "🌷", "🌻", "💖", "✨"];

    const handleCanvasClick = (e: React.MouseEvent | React.TouchEvent) => {
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const newFlower: Flower = {
            id: Date.now(),
            x,
            y,
            type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
            scale: Math.random() * 0.5 + 0.5
        };

        setFlowers(prev => [...prev.slice(-20), newFlower]);
    };

    return (
        <section className="h-screen w-full relative bg-gradient-to-b from-rose-50 to-white flex flex-col items-center justify-center cursor-pointer overflow-hidden p-8" onClick={handleCanvasClick} touch-action="none">
            <div className="text-center mb-12 relative z-10 pointer-events-none">
                <h2 className="text-5xl font-dancing text-valentine-red mb-4">Our Magic Garden</h2>
                <p className="text-gray-500 font-outfit text-lg">Tap anywhere to plant a flower in our love garden, Bommi...</p>
            </div>

            <div className="absolute inset-0 z-0">
                <AnimatePresence>
                    {flowers.map(flower => (
                        <motion.div
                            key={flower.id}
                            initial={{ opacity: 0, scale: 0, y: 20 }}
                            animate={{ opacity: 1, scale: flower.scale, y: 0 }}
                            exit={{ opacity: 0, scale: 1.5, y: -50 }}
                            className="absolute pointer-events-none"
                            style={{
                                left: flower.x,
                                top: flower.y,
                                fontSize: '3rem',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            {flower.type}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="mt-auto mb-12 flex flex-col items-center gap-4 opacity-40 pointer-events-none"
            >
                <div className="w-1 h-12 bg-rose-200 rounded-full"></div>
                <span className="font-outfit text-xs text-rose-300 uppercase tracking-widest">Tap to Grow</span>
            </motion.div>
        </section>
    );
};

export default MagicGarden;
