import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProposalGameProps {
    onAccept: () => void;
}

const ProposalGame: React.FC<ProposalGameProps> = ({ onAccept }) => {
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [message, setMessage] = useState("Will you be my Valentine?");
    const [noCount, setNoCount] = useState(0);

    const moveNoButton = () => {
        const maxX = window.innerWidth < 768 ? 100 : 200;
        const maxY = window.innerWidth < 768 ? 50 : 100;
        const x = Math.random() * (maxX * 2) - maxX;
        const y = Math.random() * (maxY * 2) - maxY;
        setNoButtonPos({ x, y });

        setNoCount(prev => prev + 1);
        if (noCount === 0) setMessage("Wait, you clicked 'No'? Try again! 😜");
        if (noCount === 2) setMessage("Hehe, you can't catch it! Say Yes! ❤️");
        if (noCount === 5) setMessage("Pattu, please! I'm waiting! 🥰");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4 overflow-hidden">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass p-12 md:p-16 rounded-[3rem] text-center max-w-lg w-full border-rose-200 shadow-2xl relative"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-8xl mb-8"
                >
                    💍
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-dancing text-valentine-red mb-12">
                    {message}
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative">
                    <button
                        onClick={onAccept}
                        className="bg-valentine-red text-white px-12 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-rose-600 hover:scale-110 transition-all z-10 w-full md:w-auto"
                    >
                        Yes! ❤️
                    </button>

                    <motion.button
                        animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                        onMouseEnter={moveNoButton}
                        onClick={moveNoButton}
                        className="bg-gray-200 text-gray-600 px-12 py-4 rounded-full font-bold text-xl shadow-md w-full md:w-auto"
                    >
                        No 😅
                    </motion.button>
                </div>

                <p className="mt-12 text-rose-300 font-outfit italic">
                    There's only one right answer, my Queen...
                </p>
            </motion.div>
        </div>
    );
};

export default ProposalGame;
