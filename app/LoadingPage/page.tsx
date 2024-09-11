'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Loader, Zap, Star } from 'lucide-react';

const LoadingPage = () => {
  const iconVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 neon-background">
      <motion.h1 
        className="text-4xl font-bold mb-8 neon-text"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Loading Experience
      </motion.h1>
      
      <div className="flex space-x-8 mb-8">
        <motion.div variants={iconVariants} animate="animate">
          <Loader className="w-12 h-12 text-cyan-400 neon-icon" />
        </motion.div>
        <motion.div variants={iconVariants} animate="animate">
          <Zap className="w-12 h-12 text-yellow-400 neon-icon" />
        </motion.div>
        <motion.div variants={iconVariants} animate="animate">
          <Star className="w-12 h-12 text-pink-400 neon-icon" />
        </motion.div>
      </div>
      
      <motion.p 
        className="text-xl text-cyan-300 mb-4"
        variants={textVariants}
        animate="animate"
      >
        Preparing your amazing content...
      </motion.p>
      
      <motion.div 
        className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: 256 }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400"
          initial={{ x: -256 }}
          animate={{ x: 256 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingPage;