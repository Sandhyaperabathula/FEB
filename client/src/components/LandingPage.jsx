/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LandingPage = ({ onYes }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    // Generate random x and y within a reasonable range
    // We want it to move away from the cursor, but random is usually enough to be annoying/fun
    const x = Math.random() * 200 - 100; // -100 to 100
    // eslint-disable-next-line no-unused-vars
    const y = Math.random() * 200 - 100; // -100 to 100
    
    // Add to current position to keep it moving away potentially
    // Or just set new random offset
    setNoPosition(prev => ({
        x: prev.x + (Math.random() > 0.5 ? 100 : -100),
        y: prev.y + (Math.random() > 0.5 ? 100 : -100)
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 overflow-hidden relative">
      <div className="z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-12 drop-shadow-md">
          Will you be my Valentine? 🌹
        </h1>
        
        <div className="flex gap-8 justify-center items-center flex-wrap">
          <button
            onClick={onYes}
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 cursor-pointer"
          >
            Yes ❤️
          </button>
          
          <motion.button
            animate={noPosition}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton} // For mobile touch
            className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white text-2xl font-bold rounded-full shadow-lg cursor-pointer"
          >
            No 💔
          </motion.button>
        </div>
      </div>
      
      <div className="absolute bottom-10 text-pink-400 text-sm">
        Made with ❤️ for you
      </div>
    </div>
  );
};

export default LandingPage;
