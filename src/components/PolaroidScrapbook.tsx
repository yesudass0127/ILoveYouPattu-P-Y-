import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scrapbookPhotos = [
    "/Photos/1770658961337.jpg", "/Photos/1770658961341.jpg", "/Photos/1770658961366.jpg",
    "/Photos/1770658961371.jpg", "/Photos/1770658961402.jpg", "/Photos/1770658961410.jpg",
    "/Photos/1770658961425.jpg", "/Photos/1770658961436.jpg", "/Photos/1770658961441.jpg",
    "/Photos/1770658961444.jpg", "/Photos/1770658961455.jpg"
];

const PolaroidScrapbook: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(scrapbookPhotos.length - 1);

    const handleNext = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else {
            setCurrentIndex(scrapbookPhotos.length - 1);
        }
    };

    return (
        <section className="py-24 bg-rose-50/30 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center px-4">
                <h2 className="text-4xl md:text-5xl font-dancing text-valentine-red mb-4">Our Polaroid Scrapbook</h2>
                <p className="text-gray-600 mb-12 font-outfit">Click/Tap the top photo to see the next memory</p>

                <div className="relative h-[500px] flex items-center justify-center">
                    {scrapbookPhotos.map((src, i) => (
                        <AnimatePresence key={i}>
                            {i <= currentIndex && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0, y: 100 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        y: 0,
                                        rotate: (i % 2 === 0 ? 5 : -5) * (currentIndex - i + 1),
                                        x: (i % 2 === 0 ? 10 : -10) * (currentIndex - i)
                                    }}
                                    exit={{
                                        x: 500,
                                        rotate: 45,
                                        opacity: 0,
                                        transition: { duration: 0.5 }
                                    }}
                                    className="absolute w-72 h-96 md:w-80 md:h-[450px] bg-white p-4 pb-12 shadow-2xl border border-gray-100 cursor-pointer"
                                    style={{ zIndex: i }}
                                    onClick={handleNext}
                                >
                                    <div className="w-full h-full overflow-hidden bg-gray-50 flex items-center justify-center">
                                        <img src={src} alt="Memory" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="mt-4 font-dancing text-2xl text-rose-400">
                                        Forever & Always
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-12 text-valentine-red flex items-center justify-center gap-4"
                >
                    <span className="text-2xl">📸</span>
                    <p className="font-playfair italic text-xl">Capturing magic, one moment at a time.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default PolaroidScrapbook;
