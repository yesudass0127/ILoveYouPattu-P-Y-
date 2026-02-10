import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
    type: 'text' | 'choice';
    question: string;
    answer: string | string[];
    options?: string[];
    feedback: string;
    hint?: string;
}

const quizQuestions: QuizQuestion[] = [
    {
        type: 'text',
        question: "What did I first call you?",
        answer: ["baby", "baby girl"],
        hint: "It's the sweetest 4-letter word starting with 'B'...",
        feedback: "Yes! You'll always be my Baby. ❤️"
    },
    {
        type: 'choice',
        question: "What is my favorite thing about you?",
        options: ["Your Smile", "Your Heart", "Your Eyes", "Everything!"],
        answer: "Everything!",
        feedback: "Exactly! I couldn't pick just one thing about you, Bommi. 🥰"
    },
    {
        type: 'choice',
        question: "How much do I love you?",
        options: ["A lot", "To the moon and back", "Infinitely", "More than words can say"],
        answer: "Infinitely",
        feedback: "To infinity and beyond, my Pattu! ♾️✨"
    }
];

interface LoveQuizProps {
    onComplete?: () => void;
}

const LoveQuiz: React.FC<LoveQuizProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [textInput, setTextInput] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [mistakes, setMistakes] = useState(0);
    const [isShaking, setIsShaking] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const correctAnswers = quizQuestions[currentStep].answer as string[];
        if (correctAnswers.includes(textInput.toLowerCase().trim())) {
            setIsCorrect(true);
            setShowFeedback(true);
            setMistakes(0);
        } else {
            setIsShaking(true);
            setMistakes(prev => prev + 1);
            setTimeout(() => setIsShaking(false), 500);
            setTextInput('');
        }
    };

    const handleOptionClick = (option: string) => {
        const correct = option === quizQuestions[currentStep].answer;
        setIsCorrect(correct);
        if (!correct) {
            setIsShaking(true);
            setMistakes(prev => prev + 1);
            setTimeout(() => setIsShaking(false), 500);
        } else {
            setShowFeedback(true);
            setMistakes(0);
        }
    };


    const handleNext = () => {
        setShowFeedback(false);
        setTextInput('');
        if (currentStep < quizQuestions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsFinished(true);
            onComplete?.();
        }
    };

    return (
        <section className="py-24 px-4 relative">
            {/* Decorative background sparks */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[1, 2, 3].map(i => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3],
                            rotate: [0, 90, 180]
                        }}
                        transition={{ duration: 10, repeat: Infinity, delay: i * 2 }}
                        className="absolute w-96 h-96 bg-rose-200/20 blur-3xl rounded-full"
                        style={{ top: `${i * 30}%`, left: i % 2 === 0 ? '-10%' : '80%' }}
                    />
                ))}
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                <AnimatePresence mode="wait">
                    {!isFinished ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                x: isShaking ? [0, -10, 10, -10, 10, 0] : 0
                            }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="glass p-8 md:p-16 rounded-[4rem] text-center border-white/50 shadow-2xl overflow-hidden"
                        >

                            {/* Question Header */}
                            <div className="flex flex-col items-center mb-8">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="text-6xl mb-6"
                                >
                                    {quizQuestions[currentStep].type === 'text' ? '🔓' : '✨'}
                                </motion.div>
                                <div className="px-6 py-2 bg-rose-100/50 text-valentine-red rounded-full text-sm font-bold tracking-widest uppercase">
                                    Step {currentStep + 1} of {quizQuestions.length}
                                </div>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-playfair text-gray-800 mb-10 leading-tight">
                                {quizQuestions[currentStep].question}
                            </h3>

                            {/* Interaction Area */}
                            <div className="min-h-[200px] flex flex-col justify-center">
                                {!showFeedback ? (
                                    quizQuestions[currentStep].type === 'text' ? (
                                        <form onSubmit={handleTextSubmit} className="space-y-6">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={textInput}
                                                    onChange={(e) => setTextInput(e.target.value)}
                                                    placeholder="Type it here..."
                                                    className="w-full px-8 py-5 rounded-3xl border-2 border-rose-100 bg-white/50 text-center font-outfit text-xl focus:border-valentine-pink outline-none shadow-inner transition-all"
                                                    autoFocus
                                                />
                                                {quizQuestions[currentStep].type === 'text' && mistakes > 0 && (
                                                    <motion.p
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="mt-4 text-rose-500 italic font-outfit text-sm"
                                                    >
                                                        {mistakes === 1
                                                            ? "Hint: It starts with 'B'..."
                                                            : `Full Hint: ${quizQuestions[currentStep].hint}`}
                                                    </motion.p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full py-5 bg-gradient-to-r from-valentine-red to-rose-400 text-white rounded-3xl font-bold text-xl shadow-xl hover:shadow-valentine-pink/30 transition-all hover:-translate-y-1"
                                            >
                                                Unlock Next Level
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {quizQuestions[currentStep].options?.map((option) => (
                                                <motion.button
                                                    key={option}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleOptionClick(option)}
                                                    className="py-5 px-6 rounded-3xl font-outfit text-lg border-2 border-rose-50 bg-white/30 hover:bg-white hover:border-valentine-pink transition-all shadow-sm text-gray-700"
                                                >
                                                    {option}
                                                </motion.button>
                                            ))}
                                        </div>
                                    )
                                ) : (
                                    /* Feedback View */
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="py-8"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-7xl mb-6"
                                        >
                                            {isCorrect ? '✨💖✨' : '😋'}
                                        </motion.div>
                                        <p className="text-2xl font-dancing text-valentine-red mb-8 leading-relaxed">
                                            {isCorrect
                                                ? quizQuestions[currentStep].feedback
                                                : "Haha, you know the truth! It was " + quizQuestions[currentStep].answer + "! ❤️"}
                                        </p>
                                        <button
                                            onClick={handleNext}
                                            className="bg-gray-800 text-white px-12 py-4 rounded-full font-bold shadow-lg hover:bg-black transition-all"
                                        >
                                            Continue the Magic →
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        /* Finale View */
                        <motion.div
                            key="finale"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass p-16 rounded-[4rem] text-center border-valentine-pink shadow-2xl bg-gradient-to-br from-rose-50 to-white"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.5, 1],
                                    rotate: [0, 360, 0]
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="text-8xl mb-10"
                            >
                                👸✨
                            </motion.div>
                            <h3 className="text-5xl font-dancing text-valentine-red mb-6">Quiz Champion Princy!</h3>
                            <p className="text-xl font-outfit text-gray-700 mb-10 leading-relaxed max-w-md mx-auto">
                                You know every little detail about us. That's why I'm the luckiest person in the world to have you as my Pattu.
                            </p>
                            <div className="flex justify-center gap-4">
                                <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-5xl">💝</motion.span>
                                <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="text-5xl">🎀</motion.span>
                                <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} className="text-5xl">🎈</motion.span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default LoveQuiz;
