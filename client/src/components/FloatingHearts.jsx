// eslint-disable-next-line no-unused-vars
import React from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-400 text-4xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
