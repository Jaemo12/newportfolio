import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://assets.lummi.ai/assets/QmTTKLDwvzQbPNp1zgknpBfna9qJz8uzXUTYG8gRgKscFz?auto=format&w=1500";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src="https://assets.lummi.ai/assets/QmbjrejTEudJmkbFxcu5QfksCiAsfBzVL8gaEzMov3JgVs?auto=format&w=1500"
          alt="Hero background"
          className="w-full h-full object-cover opacity-50"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Hello
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-2xl text-center max-w-lg"
        >
          Welcome to my website
        </motion.p>
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 0 0px rgba(167, 139, 250, 0.7)",
              "0 0 0 10px rgba(167, 139, 250, 0)",
              "0 0 0 0px rgba(167, 139, 250, 0.7)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition duration-300"
        >
          Explore
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;