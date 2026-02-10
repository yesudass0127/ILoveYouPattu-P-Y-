import React from 'react';
import { motion } from 'framer-motion';

const HandInHandHighlight: React.FC = () => {
    return (
        <section className="py-24 bg-rose-50/30 flex flex-col items-center justify-center relative overflow-hidden px-4">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-200/20 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50, rotate: -3 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full md:w-1/2 relative group"
                >
                    {/* Decorative frame */}
                    <div className="absolute inset-0 bg-white shadow-xl -rotate-2 transform group-hover:rotate-0 transition-transform duration-500"></div>

                    <img
                        src="/Photos/1770658961436.jpg"
                        alt="Hand in Hand"
                        className="relative z-10 w-full h-auto p-4 bg-white shadow-2xl object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    />

                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-6 -right-6 text-5xl z-20"
                    >
                        💖
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="w-full md:w-1/2 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-5xl font-dancing text-valentine-red mb-6 leading-tight">
                        Our Hands, One Heart
                    </h2>
                    <p className="text-xl text-gray-700 font-outfit leading-relaxed mb-8 italic">
                        "Looking at this photo, I remember the feeling of your hand in mine.
                        A promise that no matter where we go, I will never let go.
                        You are my support, my strength, and my forever Pattu."
                    </p>
                    <div className="flex items-center gap-4 text-rose-400 font-playfair font-bold text-lg">
                        <span>Infinity</span>
                        <div className="h-[2px] w-12 bg-rose-200"></div>
                        <span>And Beyond</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HandInHandHighlight;
