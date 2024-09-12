'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Loader, Briefcase, Code, Palette, User, Mail } from 'lucide-react';

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

  const loadingItems = [
    { Icon: User, text: "Loading profile..." },
    { Icon: Briefcase, text: "Preparing work experience..." },
    { Icon: Code, text: "Compiling projects..." },
    { Icon: Palette, text: "Sketching designs..." },
    { Icon: Mail, text: "Setting up contact form..." }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-cyan-400"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Loading Portfolio
      </motion.h1>
      
      <motion.div 
        className="flex space-x-4 mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
      </motion.div>
      
      <div className="space-y-4 mb-8">
        {loadingItems.map((item, index) => (
          <motion.div 
            key={index}
            className="flex items-center space-x-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <motion.div variants={iconVariants} animate="animate">
              <item.Icon className="w-6 h-6 text-cyan-400" />
            </motion.div>
            <motion.p 
              className="text-lg text-cyan-300"
              variants={textVariants}
              animate="animate"
            >
              {item.text}
            </motion.p>
          </motion.div>
        ))}
      </div>
      
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

      <motion.p 
        className="mt-8 text-xl text-cyan-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Crafting an unforgettable experience...
      </motion.p>

      <motion.div 
        className="mt-8 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        Fun fact: Did you know that the first portfolio website was created in 1995?
      </motion.div>
    </div>
  );
};

export default LoadingPage;