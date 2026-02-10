import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeartScannerProps {
    onComplete?: () => void;
}

const HeartScanner: React.FC<HeartScannerProps> = ({ onComplete }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        // Consider it complete if they've hovered/scanned
        if (!isHovering) return;
        onComplete?.();
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-dancing text-rose-600 mb-4">The Secret Heart Scanner</h2>
                <p className="text-gray-500 font-outfit mb-12 italic">Hover over the image to reveal what my heart sees...</p>

                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden cursor-none shadow-2xl border-4 border-rose-100"
                >
                    {/* Base Image (What everyone sees) */}
                    <img
                        src="/Photos/1770658961425.jpg"
                        alt="Memory Base"
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
                    />

                    {/* Overlay Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-rose-200 text-8xl md:text-9xl font-dancing opacity-20">Ordinary Day?</span>
                    </div>

                    {/* Revealed Image (What the heart sees) */}
                    <div
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{
                            clipPath: isHovering
                                ? `path('M ${mousePos.x} ${mousePos.y - 40} C ${mousePos.x - 50} ${mousePos.y - 100}, ${mousePos.x - 120} ${mousePos.y - 20}, ${mousePos.x} ${mousePos.y + 60} C ${mousePos.x + 120} ${mousePos.y - 20}, ${mousePos.x + 50} ${mousePos.y - 100}, ${mousePos.x} ${mousePos.y - 40}')`
                                : 'circle(0% at 50% 50%)',
                            transition: 'clip-path 0.1s ease-out'
                        }}
                    >
                        <img
                            src="/Photos/1770658961425.jpg"
                            alt="Memory Secret"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-rose-500/10 mix-blend-overlay" />
                    </div>

                    {/* Scanner UI */}
                    {isHovering && (
                        <motion.div
                            className="absolute pointer-events-none flex flex-col items-center justify-center"
                            style={{
                                left: mousePos.x,
                                top: mousePos.y,
                                x: '-50%',
                                y: '-50%'
                            }}
                        >
                            <div className="w-24 h-24 border-2 border-rose-500 rounded-full animate-ping opacity-30" />
                            <div className="absolute -bottom-10 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                                Heart Vision Active
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                        <span className="text-3xl mb-4 block">👀</span>
                        <h3 className="font-playfair text-xl text-rose-900 mb-2">Look Closer</h3>
                        <p className="text-rose-700/70 text-sm">Every ordinary moment becomes extraordinary when I'm with you.</p>
                    </div>
                    <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                        <span className="text-3xl mb-4 block">💖</span>
                        <h3 className="font-playfair text-xl text-rose-900 mb-2">Heart Vision</h3>
                        <p className="text-rose-700/70 text-sm">How I see you isn't just with my eyes, but with everything I am.</p>
                    </div>
                    <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                        <span className="text-3xl mb-4 block">✨</span>
                        <h3 className="font-playfair text-xl text-rose-900 mb-2">Pure Magic</h3>
                        <p className="text-rose-700/70 text-sm">Scan any memory to see the love hidden within the frame.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeartScanner;
