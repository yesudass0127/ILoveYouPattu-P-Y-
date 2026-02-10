import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
    id: number;
    x: number;
    y: number;
    photo: string;
    caption: string;
}

const constellationStars: Star[] = [
    { id: 1, x: 20, y: 30, photo: "/Photos/1770658961313.jpg", caption: "Our Spark" },
    { id: 2, x: 40, y: 15, photo: "/Photos/1770658961333.jpg", caption: "The North Star of my Life" },
    { id: 3, x: 60, y: 25, photo: "/Photos/1770658961347.jpg", caption: "Guiding Light" },
    { id: 4, x: 80, y: 40, photo: "/Photos/1770658961362.jpg", caption: "Eternal Glow" },
    { id: 5, x: 70, y: 65, photo: "/Photos/1770658961387.jpg", caption: "Stardust Memories" },
    { id: 6, x: 50, y: 80, photo: "/Photos/1770658961407.jpg", caption: "Cosmic Connection" },
    { id: 7, x: 30, y: 60, photo: "/Photos/1770658961413.jpg", caption: "Heavenly Moments" }
];

interface MemoryConstellationProps {
    onComplete?: () => void;
}

const MemoryConstellation: React.FC<MemoryConstellationProps> = ({ onComplete }) => {
    const [selectedStar, setSelectedStar] = useState<Star | null>(null);
    const [connectedStars, setConnectedStars] = useState<number[]>([]);

    const handleStarClick = (star: Star) => {
        if (!connectedStars.includes(star.id)) {
            setConnectedStars(prev => [...prev, star.id]);
        }
        setSelectedStar(star);
        onComplete?.();
    };

    return (
        <section className="h-screen w-full bg-[#030311] relative overflow-hidden flex items-center justify-center">
            {/* Background stars */}
            <div className="absolute inset-0">
                {Array.from({ length: 200 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: Math.random() }}
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
                        className="absolute w-[1px] h-[1px] bg-white rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>

            <div className="relative z-10 text-center mb-auto pt-20">
                <h2 className="text-4xl md:text-5xl font-dancing text-blue-100 mb-2">The Memory Constellation</h2>
                <p className="text-blue-200/50 font-outfit text-sm tracking-widest uppercase">Click the stars to map our journey</p>
            </div>

            {/* The Constellation Map */}
            <div className="absolute inset-0 flex items-center justify-center cursor-crosshair">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {connectedStars.map((starId, index) => {
                        if (index === 0) return null;
                        const start = constellationStars.find(s => s.id === connectedStars[index - 1]);
                        const end = constellationStars.find(s => s.id === starId);
                        if (!start || !end) return null;
                        return (
                            <motion.line
                                key={`${start.id}-${end.id}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.5 }}
                                transition={{ duration: 1 }}
                                x1={`${start.x}%`}
                                y1={`${start.y}%`}
                                x2={`${end.x}%`}
                                y2={`${end.y}%`}
                                stroke="white"
                                strokeWidth="1"
                                strokeDasharray="5,5"
                                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                            />
                        );
                    })}
                </svg>

                {constellationStars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute group"
                        style={{ left: `${star.x}%`, top: `${star.y}%` }}
                        whileHover={{ scale: 1.5 }}
                        onClick={() => handleStarClick(star)}
                    >
                        <div className={`w-3 h-3 rounded-full shadow-[0_0_15px_#fff] cursor-pointer transition-all duration-500 ${connectedStars.includes(star.id) ? "bg-white scale-125" : "bg-blue-300 opacity-40 hover:opacity-100"
                            }`} />

                        {/* Glow effect */}
                        <div className="absolute inset-0 w-3 h-3 bg-white blur-md animate-pulse rounded-full opacity-50" />

                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-blue-200/40 font-outfit opacity-0 group-hover:opacity-100 transition-opacity">
                            {star.caption}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Photo Reveal Modal */}
            <AnimatePresence>
                {selectedStar && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedStar(null)}
                    >
                        <div className="max-w-lg w-full bg-white p-2 rounded-lg shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                                <img
                                    src={selectedStar.photo}
                                    alt={selectedStar.caption}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <p className="text-3xl font-dancing mb-2">{selectedStar.caption}</p>
                                    <div className="w-12 h-1 bg-blue-400" />
                                </div>
                            </div>
                        </div>
                        <p className="absolute bottom-12 text-white/50 font-outfit uppercase tracking-widest text-xs">Tap anywhere to close</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-24 text-center">
                <p className="text-blue-100/30 text-xs italic font-playfair">"You are the universe expressing itself in human form..."</p>
            </div>
        </section>
    );
};

export default MemoryConstellation;
