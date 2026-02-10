import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Milestone {
    date: string;
    title: string;
    description: string;
    icon: string;
}

const milestones: Milestone[] = [
    {
        date: "2005/09/13",
        title: "The World Got Brighter",
        description: "The day my Queen was born. The start of everything beautiful.",
        icon: "🎂"
    },
    {
        date: "2023/02/09",
        title: "The Big Question",
        description: "The day I first proposed and told you how much you mean to me.",
        icon: "💍"
    },
    {
        date: "2023/02/11",
        title: "The Best 'Yes'",
        description: "The day you accepted my love and changed my life forever.",
        icon: "💖"
    }
];

interface LoveMilestonesProps {
    onComplete: () => void;
}

const LoveMilestones: React.FC<LoveMilestonesProps> = ({ onComplete }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        if (activeIndex < milestones.length - 1) {
            setActiveIndex(activeIndex + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-rose-50 p-6 overflow-hidden">
            <div className="max-w-2xl w-full text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-dancing text-valentine-red mb-12"
                >
                    Our Magic Moments
                </motion.h2>

                <div className="relative glass p-10 rounded-[3rem] border-rose-200 shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 1.1, x: -20 }}
                            className="flex flex-col items-center"
                        >
                            <div className="text-7xl mb-6">{milestones[activeIndex].icon}</div>
                            <div className="inline-block px-4 py-1 bg-rose-100 text-valentine-red rounded-full text-sm font-bold mb-4 font-outfit">
                                {milestones[activeIndex].date}
                            </div>
                            <h3 className="text-3xl font-playfair text-gray-800 mb-4">
                                {milestones[activeIndex].title}
                            </h3>
                            <p className="text-gray-600 font-outfit text-lg mb-10 leading-relaxed italic">
                                "{milestones[activeIndex].description}"
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-between items-center mt-6">
                        <div className="flex gap-2">
                            {milestones.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-valentine-red w-8' : 'bg-rose-200'}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleNext}
                            className="bg-valentine-red text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-valentine-pink/30 transition-all flex items-center gap-2"
                        >
                            {activeIndex === milestones.length - 1 ? "Start Journey" : "Next Memory"}
                            <span>→</span>
                        </button>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-rose-400 font-playfair italic"
                >
                    Every second with you is a gift...
                </motion.p>
            </div>
        </div>
    );
};

export default LoveMilestones;
