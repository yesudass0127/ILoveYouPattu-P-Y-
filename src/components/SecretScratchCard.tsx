import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SecretScratchCardProps {
    onComplete?: () => void;
}

const SecretScratchCard: React.FC<SecretScratchCardProps> = ({ onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratched, setIsScratched] = useState(false);
    const [scratchPercentage, setScratchPercentage] = useState(0);

    useEffect(() => {
        if (isScratched) {
            onComplete?.();
        }
    }, [isScratched, onComplete]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize canvas with silver/pink gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#f43f5e');
        gradient.addColorStop(1, '#fb7185');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add some "texture"
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 100; i++) {
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
        }

        // Add text instruction on the scratch layer
        ctx.font = '24px Dancing Script';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Scratch to see my', canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillText('secret promise...', canvas.width / 2, canvas.height / 2 + 30);

        const scratch = (x: number, y: number) => {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2);
            ctx.fill();
            checkScratchAmount();
        };

        const checkScratchAmount = () => {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let transparentPixels = 0;

            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] === 0) transparentPixels++;
            }

            const percentage = (transparentPixels / (pixels.length / 4)) * 100;
            setScratchPercentage(percentage);
            if (percentage > 60) setIsScratched(true);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (e.buttons !== 1) return;
            const rect = canvas.getBoundingClientRect();
            scratch(e.clientX - rect.left, e.clientY - rect.top);
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            scratch(touch.clientX - rect.left, touch.clientY - rect.top);
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchmove', handleTouchMove);

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <section className="py-24 bg-rose-50 flex flex-col items-center">
            <h2 className="text-4xl font-dancing text-valentine-red mb-12">A Hidden Promise</h2>

            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl glass">
                {/* Hidden Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white">
                    <span className="text-5xl mb-4">♾️</span>
                    <h3 className="text-3xl font-dancing text-valentine-red mb-4">My Forever Promise</h3>
                    <p className="text-gray-600 font-outfit italic">
                        "No matter where life takes us, my hand will always be holding yours.
                        I promise to always make you smile, Pattu."
                    </p>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="mt-6 text-2xl"
                    >
                        ❤️
                    </motion.div>
                </div>

                {/* Scratch Layer */}
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    className={`absolute inset-0 cursor-crosshair transition-opacity duration-1000 ${isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                />
            </div>

            <p className="mt-8 text-valentine-pink font-playfair italic">
                {scratchPercentage < 60 ? "Use your finger or mouse to scratch!" : "✨ Promise revealed! ✨"}
            </p>
        </section>
    );
};

export default SecretScratchCard;
