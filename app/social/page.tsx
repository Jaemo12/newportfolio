'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Github, Instagram, Linkedin, LucideIcon, Twitter } from 'lucide-react';

interface SocialIconProps {
  icon: LucideIcon; 
  link: string;
  color: string; // Hex color string (e.g., "#1DA1F2")
  name: string;
  glowColor: string; // RGBA string for glow (e.g., "rgba(29, 161, 242, 0.5)")
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, link, color, name, glowColor }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center w-full max-w-md p-4 sm:p-5 rounded-xl overflow-hidden transition-all duration-300 ease-out"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle background for the card
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      initial={{ scale: 1, y: 0 }}
      whileHover={{ 
        y: -5, 
        scale: 1.03,
        boxShadow: `0 0 25px -5px ${glowColor}, 0 0 15px -8px ${color}`,
        borderColor: color,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {/* Icon Container */}
      <motion.div
        className="relative p-3 sm:p-4 rounded-full mr-4 sm:mr-5 transition-all duration-300"
        style={{ backgroundColor: color }}
        whileHover={{ scale: 1.1, rotate: -5 }} // Icon itself can have a slight hover effect
      >
        <Icon size={32} strokeWidth={1.5} className="text-black" /> {/* Icon color changed for contrast */}
      </motion.div>

      {/* Text Content */}
      <div className="flex-grow">
        <span 
          className="text-lg sm:text-xl font-semibold transition-colors duration-300"
          style={{ color: color }} // Initial color from prop
        >
          {name}
        </span>
        <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300 truncate">
          {link.replace('https://', '')}
        </p>
      </div>
      
      {/* Subtle arrow on hover */}
       <motion.div 
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ x: -10 }}
        animate={{ x: 0 }} // This needs to be controlled by group hover state for Framer Motion
                           // For pure CSS, group-hover:translate-x-0 would work
       >
        <ArrowRightIcon color={color} />
      </motion.div>
    </motion.a>
  );
};

// A simple ArrowRight icon component
const ArrowRightIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


// Particle Background Component
const ParticleBackground = () => {
  const particles = Array.from({ length: 30 }); // Adjust particle count as needed
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10" // Subtle white particles
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
            scale: [1, Math.random() * 1.5 + 0.5, 1],
            opacity: [0, Math.random() * 0.3 + 0.1, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};


const SocialsPage = () => {
  const socialLinks: SocialIconProps[] = [
    { icon: Twitter, link: 'https://twitter.com/AmitSamant7146', color: '#1DA1F2', name: 'Twitter', glowColor: 'rgba(29, 161, 242, 0.6)' },
    { icon: Facebook, link: 'https://facebook.com/amitsamantscience', color: '#1877F2', name: 'Facebook', glowColor: 'rgba(24, 119, 242, 0.6)' },
    { icon: Instagram, link: 'https://instagram.com/_grim_jaw_', color: '#E4405F', name: 'Instagram', glowColor: 'rgba(228, 64, 95, 0.6)' },
    { icon: Linkedin, link: 'https://linkedin.com/in/amitsamant12', color: '#0A66C2', name: 'LinkedIn', glowColor: 'rgba(10, 102, 194, 0.6)' },
    { icon: Github, link: 'https://github.com/Jaemo12', color: '#6e5494', name: 'GitHub', glowColor: 'rgba(110, 84, 148, 0.6)' }, // Purplish GitHub color
  ];

  const headingVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        staggerChildren: 0.07
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-slate-100 overflow-hidden relative font-inter">
      <ParticleBackground />
      <div className="container mx-auto px-4 py-20 sm:py-24 md:py-32 relative z-10">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-16 sm:mb-20 md:mb-24 tracking-tighter" // Using Inter Bold
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from("Connect With Me").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              whileHover={{ scale: 1.15, color: '#ff00ff', y: -5, transition: {duration: 0.2} }} // Kept original hover color
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="flex flex-col space-y-6 sm:space-y-8 items-center mb-20 sm:mb-24 md:mb-32"
          initial="hidden" // Use variants for stagger on parent
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
          }}
        >
          {socialLinks.map((social) => ( // Removed index from map as key is now social.name
            <motion.div
              key={social.name} // Use unique name or id for key
              variants={{ // Define variants for children of staggered parent
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: {type: 'spring', stiffness: 100, damping:12} }
              }}
            >
              <SocialIcon {...social} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-center max-w-3xl mx-auto mb-16 sm:mb-20 md:mb-24 leading-relaxed text-slate-300 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "circOut" }}
        >
          Lets connect and explore the endless possibilities of collaboration! 
          Whether you are interested in technology, design, or just want to chat, 
          Im always excited to meet new people and discuss innovative ideas.
        </motion.p>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.7, ease: "circOut" }}
        >
          <motion.a
            href="/resume.pdf" // Ensure this path is correct
            target="_blank" // Open in new tab
            rel="noopener noreferrer" // Security best practice
            className="inline-block px-10 py-5 sm:px-12 sm:py-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-lg text-lg sm:text-xl transition-all duration-300 shadow-lg hover:shadow-2xl"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 35px rgba(236, 72, 153, 0.6), 0 0 20px rgba(139, 92, 246, 0.5)', // Pink and purple glow
              y: -3 
            }}
            whileTap={{ scale: 0.97 }}
          >
            Download My Resume
          </motion.a>
        </motion.div>
      </div>
      {/* Font Import for Inter */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default SocialsPage;
