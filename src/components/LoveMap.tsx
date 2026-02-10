import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Location {
    id: number;
    title: string;
    description: string;
    icon: string;
    x: number;
    y: number;
}

const locations: Location[] = [
    {
        id: 1,
        title: "The Beginning",
        description: "Where our hearts first connected. The start of it all.",
        icon: "📍",
        x: 30,
        y: 40
    },
    {
        id: 2,
        title: "First I Love You",
        description: "The moment the world stood still and I said those three words.",
        icon: "💘",
        x: 60,
        y: 25
    },
    {
        id: 3,
        title: "Future Travels",
        description: "Everywhere else I go, I want to have your hand in mine.",
        icon: "✈️",
        x: 75,
        y: 65
    },
    {
        id: 4,
        title: "Our Home",
        description: "Where peace resides, because you are there.",
        icon: "🏠",
        x: 45,
        y: 75
    }
];

const LoveMap: React.FC = () => {
    const [activeLoc, setActiveLoc] = useState<Location | null>(null);

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4 bg-white/80">
            <div className="text-center mb-12 relative z-10 w-full px-8">
                <h2 className="text-5xl font-dancing text-valentine-red mb-4">Our Love Map</h2>
                <p className="text-gray-500 font-outfit text-lg">Tap on the markers to explore our special moments...</p>
            </div>

            <div className="relative w-full max-w-4xl aspect-[16/9] bg-rose-50/50 rounded-[4rem] border-4 border-white shadow-2xl overflow-hidden group">
                {/* Symbolic Map Grid/Design */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="w-full h-full border-[1px] border-rose-300 grid grid-cols-12 grid-rows-6">
                        {[...Array(72)].map((_, i) => (
                            <div key={i} className="border-[0.5px] border-rose-200"></div>
                        ))}
                    </div>
                </div>

                {/* Hand-drawn look background paths */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                        d="M 200,300 Q 400,100 600,300 T 1000,300"
                        fill="none"
                        stroke="#FDA4AF"
                        strokeWidth="2"
                        strokeDasharray="10 5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                </svg>

                {/* Location Markers */}
                {locations.map((loc) => (
                    <motion.div
                        key={loc.id}
                        className="absolute cursor-pointer z-20"
                        style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setActiveLoc(loc)}
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -inset-4 bg-valentine-red/20 rounded-full"
                            />
                            <div className="bg-white p-3 rounded-2xl shadow-lg border border-rose-100 text-2xl relative z-10">
                                {loc.icon}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Location Reveal Modal-style Overlay */}
                <AnimatePresence>
                    {activeLoc && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className="absolute top-8 right-8 w-72 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-2 border-rose-100 z-30"
                        >
                            <div className="text-4xl mb-4">{activeLoc.icon}</div>
                            <h3 className="text-2xl font-dancing text-valentine-red mb-3">{activeLoc.title}</h3>
                            <p className="text-gray-600 font-outfit text-sm leading-relaxed mb-6">
                                {activeLoc.description}
                            </p>
                            <button
                                onClick={() => setActiveLoc(null)}
                                className="w-full py-2 bg-rose-50 text-rose-400 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-rose-100 transition-all"
                            >
                                Exploring next...
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.div
                animate={{ x: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="mt-12 flex items-center gap-4 opacity-30"
            >
                <div className="w-24 h-1 bg-rose-200 rounded-full"></div>
                <span className="font-outfit text-xs text-rose-300 uppercase tracking-widest italic">Miles of Love</span>
            </motion.div>
        </section>
    );
};

export default LoveMap;
