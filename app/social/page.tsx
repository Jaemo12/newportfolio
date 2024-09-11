'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Github, Instagram, Linkedin, LucideIcon, Twitter } from 'lucide-react';

interface SocialIconProps {
  icon: LucideIcon; 
  link: string;
  color: string;
  name: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, link, color, name }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center space-x-4 p-4 rounded-full text-${color} hover:text-white transition-colors duration-300`}
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      className={`relative p-4 bg-${color} rounded-full`}
      whileHover={{
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.5 }
      }}
    >
      <Icon size={40} strokeWidth={1.5} className="text-white" />
      <motion.div
        className={`absolute inset-0 bg-${color} rounded-full`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        style={{ filter: 'blur(15px)', zIndex: -1 }}
      />
    </motion.div>
    <span className={`text-xl font-semibold text-${color}`}>{name}</span>
  </motion.a>
);

const SocialsPage = () => {
  const socialLinks: SocialIconProps[] = [
    { icon: Twitter, link: 'https://twitter.com/yourusername', color: 'blue-400', name: 'Twitter' },
    { icon: Facebook, link: 'https://facebook.com/yourusername', color: 'blue-600', name: 'Facebook' },
    { icon: Instagram, link: 'https://instagram.com/yourusername', color: 'pink-500', name: 'Instagram' },
    { icon: Linkedin, link: 'https://linkedin.com/in/yourusername', color: 'blue-700', name: 'LinkedIn' },
    { icon: Github, link: 'https://github.com/yourusername', color: 'purple-400', name: 'GitHub' },
  ];

  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 10,
        staggerChildren: 0.08
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 10 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-24">
        <motion.h1
          className="text-8xl font-thin text-center mb-24"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from("Connect With Me").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              whileHover={{ scale: 1.2, color: '#ff00ff' }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="flex flex-col space-y-8 items-center mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}
        >
          {socialLinks.map((social, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SocialIcon {...social} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-3xl text-center max-w-4xl mx-auto mb-24 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Connect and explore the endless possibilities of collaboration! 
          Whether you are interested in tech, design, or just want to chat, 
          I am always excited to meet new people and discuss innovative ideas.
        </motion.p>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.a
            href="#"
            className="inline-block px-16 py-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 0, 255, 0.7)' }}
            whileTap={{ scale: 0.95 }}
          >
            Download My Resume
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialsPage;