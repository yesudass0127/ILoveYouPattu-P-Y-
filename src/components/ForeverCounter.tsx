import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ForeverCounter: React.FC = () => {
    const startDate = new Date('2023-02-11T00:00:00');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const calculateTime = () => {
        const diff = currentTime.getTime() - startDate.getTime();

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return { years, days, hours, minutes, seconds };
    };

    const time = calculateTime();

    const TimeUnit = ({ value, label }: { value: number, label: string }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl w-32"
        >
            <span className="text-4xl font-bold text-valentine-red font-outfit">{value}</span>
            <span className="text-xs uppercase tracking-widest text-rose-300 font-bold mt-2">{label}</span>
        </motion.div>
    );

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4 bg-gradient-to-br from-rose-50 via-white to-rose-100/30">
            {/* Animated Background Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[1, 2, 3].map(i => (
                    <motion.div
                        key={i}
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{
                            rotate: { duration: 20 + i * 10, repeat: Infinity, ease: "linear" },
                            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute border-2 border-rose-200 rounded-full"
                        style={{ width: `${i * 300}px`, height: `${i * 300}px` }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center relative z-10"
            >
                <h2 className="text-5xl md:text-6xl font-dancing text-valentine-red mb-4">Our Forever Story</h2>
                <p className="text-gray-500 font-outfit text-lg mb-12">Every second since February 11, 2023, has been a blessing.</p>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl">
                    <TimeUnit value={time.years} label="Years" />
                    <TimeUnit value={time.days} label="Days" />
                    <TimeUnit value={time.hours} label="Hours" />
                    <TimeUnit value={time.minutes} label="Minutes" />
                    <TimeUnit value={time.seconds} label="Seconds" />
                </div>

                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-16 text-3xl"
                >
                    💖
                </motion.div>

                <p className="mt-8 font-dancing text-3xl text-rose-400">
                    ...and counting, infinity more to go!
                </p>
            </motion.div>

            {/* Floating Date Badge */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="absolute top-12 right-12 bg-valentine-red text-white px-6 py-2 rounded-full font-bold shadow-lg -rotate-12"
            >
                Since Day One
            </motion.div>
        </section>
    );
};

export default ForeverCounter;
