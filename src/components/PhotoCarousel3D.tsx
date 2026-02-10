import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const carouselPhotos = [
    { src: "/Photos/1770658961313.jpg", caption: "Our First Date" },
    { src: "/Photos/1770658961333.jpg", caption: "That Beautiful Sunset" },
    { src: "/Photos/1770658961347.jpg", caption: "Laughter in the Rain" },
    { src: "/Photos/1770658961362.jpg", caption: "Midsummer Dreams" },
    { src: "/Photos/1770658961387.jpg", caption: "Winter Cuddles" },
    { src: "/Photos/1770658961395.jpg", caption: "The Best Coffee Day" },
    { src: "/Photos/1770658961407.jpg", caption: "Exploration Together" },
    { src: "/Photos/1770658961413.jpg", caption: "Sweet Moments" }
];

interface PhotoCarousel3DProps {
    onComplete?: () => void;
}

const PhotoCarousel3D: React.FC<PhotoCarousel3DProps> = ({ onComplete }) => {
    const x = useMotionValue(0);
    const [activeIndex, setActiveIndex] = useState(0);

    // Smooth physics for the rotation
    const rotateY = useSpring(useTransform(x, [-500, 500], [-180, 180]), {
        stiffness: 100,
        damping: 30
    });

    const handleDragEnd = () => {
        const currentRotate = rotateY.get();
        const adjustedRotate = ((currentRotate % 360) + 360) % 360;
        const index = Math.round(adjustedRotate / (360 / carouselPhotos.length)) % carouselPhotos.length;
        setActiveIndex(index);
        onComplete?.();
    };

    return (
        <section className="py-32 bg-stone-950 overflow-hidden relative min-h-[700px] flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-transparent to-transparent opacity-50" />

            <div className="text-center mb-16 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-dancing text-rose-200 mb-4"
                >
                    The Infinite Love Carousel
                </motion.h2>
                <p className="text-rose-100/60 font-outfit uppercase tracking-widest text-sm">Drag to spin our universe</p>
            </div>

            <div className="relative w-full h-[400px] perspective-1000 flex items-center justify-center">
                <motion.div
                    drag="x"
                    style={{ x, rotateY, transformStyle: "preserve-3d" }}
                    onDragEnd={handleDragEnd}
                    className="relative w-64 h-80 cursor-grab active:cursor-grabbing"
                >
                    {carouselPhotos.map((photo, i) => {
                        const angle = (i * 360) / carouselPhotos.length;
                        return (
                            <motion.div
                                key={i}
                                className="absolute inset-0 bg-white p-2 shadow-2xl rounded-lg overflow-hidden border border-rose-200/20"
                                style={{
                                    transform: `rotateY(${angle}deg) translateZ(350px)`,
                                    backfaceVisibility: "hidden"
                                }}
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.caption}
                                    className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white font-dancing text-xl">{photo.caption}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            <div className="mt-16 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                >
                    {carouselPhotos.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${(carouselPhotos.length - activeIndex) % carouselPhotos.length === i ? "bg-rose-500 w-6" : "bg-rose-200/20"
                                }`}
                        />
                    ))}
                </motion.div>
            </div>

            <style>{`
                .perspective-1000 {
                    perspective: 1200px;
                }
            `}</style>
        </section>
    );
};

export default PhotoCarousel3D;
