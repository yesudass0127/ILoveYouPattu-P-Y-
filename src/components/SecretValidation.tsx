import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecretValidationProps {
    onSuccess: () => void;
}

const SecretValidation: React.FC<SecretValidationProps> = ({ onSuccess }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const secrets = ['pattu', 'baby'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (secrets.includes(inputValue.toLowerCase().trim())) {
            setShowSuccess(true);
            setTimeout(onSuccess, 2000);
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-rose-50 p-6">
            <AnimatePresence mode="wait">
                {!showSuccess ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="max-w-md w-full glass p-10 rounded-[2.5rem] text-center border-rose-200"
                    >
                        <div className="text-6xl mb-6">🤫</div>
                        <h2 className="text-3xl font-dancing text-valentine-red mb-4">Our Secret Word</h2>
                        <p className="font-outfit text-gray-600 mb-8 leading-relaxed">
                            To see what's inside my heart, you must enter your cutest name. (The one I love to call you)
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.input
                                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter the secret word..."
                                className={`w-full px-6 py-4 rounded-full border-2 text-center font-outfit text-lg transition-all outline-none ${error ? 'border-red-400 bg-red-50' : 'border-rose-200 focus:border-valentine-pink bg-white/50'
                                    }`}
                            />
                            <button
                                type="submit"
                                className="w-full py-4 bg-valentine-red text-white rounded-full font-bold text-lg shadow-lg hover:bg-rose-600 transition-colors"
                            >
                                Unlock My Heart
                            </button>
                        </form>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4 text-red-500 font-outfit text-sm"
                            >
                                Hint: It starts with 'P' or 'B'... and it's our favorite!
                            </motion.p>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 10, 0],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="text-9xl mb-6"
                        >
                            🎉
                        </motion.div>
                        <h2 className="text-5xl font-dancing text-valentine-red">That's my Pattu!</h2>
                        <p className="text-xl font-outfit text-rose-400 mt-4">Opening the memories now...</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SecretValidation;
