import React from 'react';
import { motion } from 'framer-motion';

const gifts = [
    { emoji: "🌹", title: "Eternal Love", desc: "A rose that never fades, just like my love for you." },
    { emoji: "🍫", title: "Sweet Moments", desc: "For the sweetest person I've ever known." },
    { emoji: "🎁", title: "Classic Surprise", desc: "The best gift in my life is having you by my side." },
];

const GiftSection: React.FC = () => {
    return (
        <section className="py-24 px-4 bg-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50"></div>

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <span className="text-sm font-outfit uppercase tracking-widest text-valentine-pink font-bold">The Modern Classics</span>
                    <h2 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mt-4 mb-6">Traditional Tokens of Affection</h2>
                    <div className="w-24 h-1 bg-valentine-red mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {gifts.map((gift, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            whileHover={{ y: -10 }}
                            className="p-10 rounded-3xl bg-rose-50/50 border border-rose-100 hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                {gift.emoji}
                            </div>
                            <h3 className="text-2xl font-playfair font-bold text-valentine-red mb-4">{gift.title}</h3>
                            <p className="text-gray-600 font-outfit leading-relaxed">
                                {gift.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-24 p-12 rounded-[3rem] glass border-valentine-pink/20 max-w-4xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-3xl font-dancing text-valentine-red mb-4">Dedicated to Princy Nayagi</h3>
                    <p className="text-xl md:text-2xl font-playfair italic text-gray-800">
                        "In your smile, I see something more beautiful than the stars."
                    </p>
                    <div className="mt-8 text-4xl">💎✨</div>
                </motion.div>
            </div>
        </section>
    );
};

export default GiftSection;
