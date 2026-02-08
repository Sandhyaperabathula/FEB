// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from './Confetti';

const SuccessMessage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // In production, we might want to use a relative URL or configured env var
    // For now, localhost:5000 is fine as per backend plan
    fetch('http://localhost:5000/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error("Failed to fetch message:", err);
        setMessage("You're my favorite person! ❤️");
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center p-4">
      <Confetti />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-lg z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-red-500 mb-6">
          Yay! I knew you&apos;d say Yes! ❤️
        </h1>
        <p className="text-xl text-gray-700 italic">
          {message || "Loading sweet message..."}
        </p>
        <div className="mt-8 text-6xl animate-bounce">
          💑
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessMessage;
