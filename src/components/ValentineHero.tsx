import { motion, AnimatePresence } from 'framer-motion';

const cinematicPhotos = [
    "/Photos/1770658961425.jpg",
    "/Photos/1770658961337.jpg",
    "/Photos/1770658961410.jpg"
];

const ValentineHero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
            {/* Cinematic Flashback Background */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence>
                    {cinematicPhotos.map((src, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.4, 0] }}
                            transition={{
                                duration: 9,
                                repeat: Infinity,
                                delay: idx * 3,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0"
                        >
                            <img src={src} alt="" className="w-full h-full object-cover blur-[2px] scale-110" />
                            <div className="absolute inset-0 bg-rose-50/20 mix-blend-overlay"></div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-center z-10 p-12 glass rounded-[3rem] border-white/50 backdrop-blur-xl"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="inline-block mb-6"
                >
                    <span className="text-6xl md:text-8xl">💝</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-dancing font-bold text-valentine-red mb-4">
                    Happy Valentine's Day
                </h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-5xl font-playfair italic text-valentine-pink mb-8">
                        Princy Nayagi (Bommi)
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 font-outfit leading-relaxed">
                        Every moment with you feels like a dream come true. You are my sunshine, my everything.
                    </p>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-valentine-red animate-bounce"
            >
                <span className="text-sm font-semibold tracking-widest uppercase">Scroll for a surprise</span>
                <div className="w-px h-12 bg-valentine-red mx-auto mt-2"></div>
            </motion.div>
        </section>
    );
};

export default ValentineHero;
