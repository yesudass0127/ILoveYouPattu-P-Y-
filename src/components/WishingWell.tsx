import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StarWish {
    id: number;
    text: string;
    x: number;
    y: number;
    size: number;
}

const WishingWell: React.FC = () => {
    const [wish, setWish] = useState("");
    const [stars, setStars] = useState<StarWish[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!wish.trim()) return;

        const newStar: StarWish = {
            id: Date.now(),
            text: wish,
            x: 20 + Math.random() * 60, // Keep in center-ish area
            y: 10 + Math.random() * 40,
            size: Math.random() * 1.5 + 0.5
        };

        setStars(prev => [...prev, newStar]);
        setWish("");
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 2000);
    };

    return (
        <section className="h-screen w-full bg-[#0a0a23] relative flex flex-col items-center justify-center overflow-hidden p-8 px-4">
            {/* Starry Background */}
            <div className="absolute inset-0 z-0">
                {Array.from({ length: 100 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full text-center relative z-10"
            >
                <h2 className="text-5xl md:text-6xl font-dancing text-rose-100 mb-6">The Future Wishing Well</h2>
                <p className="text-rose-200/70 font-outfit text-xl mb-12">Type a wish for us, and watch it become a star in our universe...</p>

                <form onSubmit={handleSubmit} className="relative mb-24">
                    <input
                        type="text"
                        value={wish}
                        onChange={(e) => setWish(e.target.value)}
                        placeholder="I wish for..."
                        className="w-full bg-white/5 backdrop-blur-md border-b-2 border-rose-300/30 py-4 px-6 text-2xl font-dancing text-white placeholder:text-rose-100/30 focus:outline-none focus:border-rose-400 transition-all text-center rounded-2xl"
                    />
                    <button
                        type="submit"
                        className="mt-8 px-12 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-bold shadow-lg shadow-rose-900/50 hover:scale-105 active:scale-95 transition-all"
                    >
                        Launch into Infinity
                    </button>
                </form>

                <AnimatePresence>
                    {isSubmitted && (
                        <motion.p
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-valentine-pink font-dancing text-2xl absolute left-1/2 -translate-x-1/2 mt-4"
                        >
                            Your wish is now a star! ✨
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Your Wishes / Stars */}
            {stars.map((s) => (
                <motion.div
                    key={s.id}
                    initial={{ scale: 0, x: "50%", y: "80%" }}
                    animate={{ x: `${s.x}%`, y: `${s.y}%`, scale: s.size }}
                    className="absolute z-20 pointer-events-none flex flex-col items-center"
                >
                    <div className="w-4 h-4 bg-yellow-100 rounded-full blur-[2px] shadow-[0_0_15px_#fff]" />
                    <motion.p
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 4 }}
                        className="text-white text-[10px] whitespace-nowrap mt-2 font-dancing opacity-50"
                    >
                        {s.text}
                    </motion.p>
                </motion.div>
            ))}

            {/* Atmospheric Moon */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-rose-100/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-valentine-pink/10 rounded-full blur-3xl" />
        </section>
    );
};

export default WishingWell;
