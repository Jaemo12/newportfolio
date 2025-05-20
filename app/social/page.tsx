'use client';

import React, { useState, useEffect, useRef } from 'react'; // Added useEffect, useRef
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
  // This component is mostly driven by hover/tap, which are client-side by nature.
  // The main SSR concern would be if complex initial styles relied on window/document.
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center w-full max-w-md p-4 sm:p-5 rounded-xl overflow-hidden transition-all duration-300 ease-out"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
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
      <motion.div
        className="relative p-3 sm:p-4 rounded-full mr-4 sm:mr-5 transition-all duration-300"
        style={{ backgroundColor: color }}
        // Removed whileHover from here as parent handles main hover effect
      >
        <Icon size={32} strokeWidth={1.5} className="text-black" /> 
      </motion.div>

      <div className="flex-grow">
        <span 
          className="text-lg sm:text-xl font-semibold transition-colors duration-300"
          style={{ color: color }} 
        >
          {name}
        </span>
        <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300 truncate">
          {link.replace('https://', '')}
        </p>
      </div>
      
       <motion.div 
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        // For Framer Motion to animate based on group hover, the parent needs to pass hover state
        // or use variants. For simplicity, this relies on Tailwind's group-hover for opacity.
        // The x animation can be subtle or removed if not easily tied to JS hover state.
        initial={{ x: -10 }}
        animate={{ x: 0 }} // This will animate once on load, not on hover directly via Framer.
                           // For true hover animation, parent would need to manage hover state.
       >
        <ArrowRightIcon color={color} />
      </motion.div>
    </motion.a>
  );
};

const ArrowRightIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ParticleBackground = () => {
  const particles = Array.from({ length: 25 }); 
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden"> {/* Ensure it's behind content */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: `${Math.random() * 1.5 + 0.5}px`,
            height: `${Math.random() * 1.5 + 0.5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
            scale: [1, Math.random() * 1.3 + 0.7, 1],
            opacity: [0, Math.random() * 0.2 + 0.05, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: "easeInOut",
            delay: Math.random() * 7,
          }}
        />
      ))}
       <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-indigo-900/20 opacity-60"></div>
    </div>
  );
};


const SocialsPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const socialLinks: SocialIconProps[] = [
    { icon: Twitter, link: 'https://twitter.com/AmitSamant7146', color: '#1DA1F2', name: 'Twitter', glowColor: 'rgba(29, 161, 242, 0.5)' },
    { icon: Facebook, link: 'https://facebook.com/amitsamantscience', color: '#1877F2', name: 'Facebook', glowColor: 'rgba(24, 119, 242, 0.5)' },
    { icon: Instagram, link: 'https://instagram.com/_grim_jaw_', color: '#E4405F', name: 'Instagram', glowColor: 'rgba(228, 64, 95, 0.5)' },
    { icon: Linkedin, link: 'https://linkedin.com/in/amitsamant12', color: '#0A66C2', name: 'LinkedIn', glowColor: 'rgba(10, 102, 194, 0.5)' },
    { icon: Github, link: 'https://github.com/Jaemo12', color: '#6e5494', name: 'GitHub', glowColor: 'rgba(110, 84, 148, 0.5)' },
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

  // Fallback for SSR or before mount
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-slate-100 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-slate-400">Loading Connections...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-slate-100 overflow-hidden relative font-inter">
      {isMounted && <ParticleBackground />} {/* Conditionally render ParticleBackground */}
      
      <div className="container mx-auto px-4 py-20 sm:py-24 md:py-32 relative z-10">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-center mb-16 sm:mb-20 md:mb-24 tracking-tighter" // Using Inter ExtraBold
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from("Connect With Me").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              whileHover={{ scale: 1.15, color: '#E879F9', y: -5, transition: {duration: 0.2} }} // Using a Tailwind fuchsia for hover
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="flex flex-col space-y-6 sm:space-y-8 items-center mb-20 sm:mb-24 md:mb-32"
          initial="hidden" 
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } // Adjusted stagger
          }}
        >
          {socialLinks.map((social) => ( 
            <motion.div
              key={social.name} 
              variants={{ 
                hidden: { opacity: 0, y: 25, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1, transition: {type: 'spring', stiffness: 120, damping:14} }
              }}
            >
              <SocialIcon {...social} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-center max-w-3xl mx-auto mb-16 sm:mb-20 md:mb-24 leading-relaxed text-slate-300/90 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + socialLinks.length * 0.1, duration: 0.8, ease: "circOut" }} // Delay after social links
        >
          Lets connect and explore the endless possibilities of collaboration! 
          Whether you are interested in technology, design, or just want to chat, 
          Im always excited to meet new people and discuss innovative ideas.
        </motion.p>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + socialLinks.length * 0.1, duration: 0.7, ease: "circOut" }}
        >
          <motion.a
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block px-10 py-5 sm:px-12 sm:py-6 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 text-white font-semibold rounded-lg text-lg sm:text-xl transition-all duration-300 shadow-lg hover:shadow-2xl"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 30px rgba(217, 70, 239, 0.5), 0 0 18px rgba(168, 85, 247, 0.4)', // Fuchsia and Purple glow
              y: -3 
            }}
            whileTap={{ scale: 0.97 }}
          >
            Download My Resume
          </motion.a>
        </motion.div>
      </div>
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
