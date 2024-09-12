// app/components/Footer.tsx (New file for the Footer component)
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <motion.p 
          className="text-center text-gray-300 text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          © 2024 AMIT SAMANT. All rights reserved.
        </motion.p>
        <motion.p 
          className="text-center text-gray-400 mt-6 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          This portfolio showcases my passion for web development and creative design. 
          Built with React, Tailwind CSS, and Framer Motion, it represents my commitment 
          to creating engaging and interactive user experiences.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;