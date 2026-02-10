import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const photos = [
    "/Photos/1770658961313.jpg",
    "/Photos/1770658961333.jpg",
    "/Photos/1770658961362.jpg",
    "/Photos/1770658961387.jpg",
    "/Photos/1770658961395.jpg",
    "/Photos/1770658961407.jpg",
    "/Photos/1770658961413.jpg",
    "/Photos/1770658961418.jpg",
    "/Photos/1770658961421.jpg",
    "/Photos/1770658961429.jpg",
    "/Photos/1770658961432.jpg",
    "/Photos/1770658961447.jpg",
];

const loveNotes = [
    "Your smile is my favorite view.",
    "Every moment with you is a treasure.",
    "I'm so lucky to have you, Pattu.",
    "You make my heart skip a beat.",
    "You are my today and all of my tomorrows.",
    "Love you to the moon and back.",
    "You're the best thing that ever happened to me.",
    "My beautiful Princy.",
    "Forever yours, Bommi.",
    "You are my sunshine.",
    "Simply the best.",
    "My heart belongs to you."
];

interface MemoryBubblesProps {
    onComplete: () => void;
}

const MemoryBubbles: React.FC<MemoryBubblesProps> = ({ onComplete }) => {
    const [viewedCount, setViewedCount] = useState(0);
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [hasUnlockedFinal, setHasUnlockedFinal] = useState(false);

    const handlePhotoClick = (index: number) => {
        setSelectedPhoto(index);
        if (!hasUnlockedFinal) {
            setViewedCount(prev => {
                const newCount = prev + 1;
                if (newCount >= 5) setHasUnlockedFinal(true);
                return newCount;
            });
        }
    };

    return (
        <div className="min-h-screen bg-rose-50 p-8 overflow-hidden relative">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-dancing text-valentine-red">Our Memory Lane</h2>
                <p className="font-outfit text-gray-600">Explore our moments to find the key to my heart ({viewedCount}/5)</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                {photos.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: Math.random() * 20 - 10 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: 0 }}
                        className="relative w-40 h-40 md:w-56 md:h-56 cursor-pointer rounded-2xl overflow-hidden shadow-lg border-4 border-white"
                        onClick={() => handlePhotoClick(i)}
                    >
                        <img src={src} alt="Memory" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-valentine-red/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-4xl text-white">❤️</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedPhoto !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white rounded-[2rem] p-6 max-w-lg w-full text-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="rounded-xl overflow-hidden mb-6 h-80">
                                <img src={photos[selectedPhoto]} alt="Memory Full" className="w-full h-full object-cover" />
                            </div>
                            <p className="text-2xl font-dancing text-valentine-red mb-6">
                                "{loveNotes[selectedPhoto % loveNotes.length]}"
                            </p>
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="px-8 py-2 bg-rose-500 text-white rounded-full font-outfit"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {hasUnlockedFinal && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 text-center"
                >
                    <button
                        onClick={onComplete}
                        className="px-10 py-4 bg-valentine-red text-white text-xl font-bold rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce"
                    >
                        Final Surprise Unlocked! 🎁
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default MemoryBubbles;
