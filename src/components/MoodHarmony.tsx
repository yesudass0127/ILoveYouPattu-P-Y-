import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Mood = 'Romantic' | 'Peaceful' | 'Excited' | 'Dreamy';

interface MoodTheme {
    name: Mood;
    icon: string;
    colors: string;
    accent: string;
    description: string;
}

const themes: MoodTheme[] = [
    {
        name: 'Romantic',
        icon: '🌹',
        colors: 'bg-gradient-to-br from-rose-100 via-rose-50 to-pink-100',
        accent: 'bg-valentine-red',
        description: 'Deep, passionate, and classic love.'
    },
    {
        name: 'Peaceful',
        icon: '🌅',
        colors: 'bg-gradient-to-br from-blue-50 via-white to-rose-50',
        accent: 'bg-blue-400',
        description: 'Calm, serene, and steady affection.'
    },
    {
        name: 'Excited',
        icon: '✨',
        colors: 'bg-gradient-to-br from-yellow-50 via-rose-50 to-orange-50',
        accent: 'bg-orange-400',
        description: 'Bright, energetic, and joyful sparks.'
    },
    {
        name: 'Dreamy',
        icon: '☁️',
        colors: 'bg-gradient-to-br from-purple-50 via-rose-50 to-white',
        accent: 'bg-purple-400',
        description: 'Soft, ethereal, and magical wonders.'
    }
];

const MoodHarmony: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<Mood>('Romantic');

    return (
        <section className={`h-screen w-full transition-all duration-1000 flex flex-col items-center justify-center p-8 ${themes.find(t => t.name === selectedMood)?.colors}`}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 relative z-10"
            >
                <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 mb-6 italic">Mood Harmony</h2>
                <p className="text-gray-500 font-outfit text-xl mb-4">How are you feeling right now, Bommi?</p>
                <p className="text-rose-400 font-dancing text-2xl">The whole world will change to match your heart.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full relative z-10">
                {themes.map((theme) => (
                    <motion.div
                        key={theme.name}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedMood(theme.name)}
                        className={`cursor-pointer p-8 rounded-[3rem] border-4 transition-all duration-500 bg-white/60 backdrop-blur-md shadow-xl flex flex-col items-center text-center ${selectedMood === theme.name ? 'border-valentine-red shadow-valentine-pink/30' : 'border-transparent'}`}
                    >
                        <span className="text-6xl mb-6">{theme.icon}</span>
                        <h3 className="text-2xl font-bold font-outfit text-gray-700 mb-2">{theme.name}</h3>
                        <p className="text-xs text-gray-400 font-outfit leading-relaxed">{theme.description}</p>

                        <AnimatePresence>
                            {selectedMood === theme.name && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="mt-6 w-3 h-3 rounded-full bg-valentine-red"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Decorative Floating Elements based on Theme */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -1000],
                            x: [0, Math.sin(i) * 100],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        className="absolute text-2xl"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: '100%',
                            zIndex: 0
                        }}
                    >
                        {themes.find(t => t.name === selectedMood)?.icon}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default MoodHarmony;
