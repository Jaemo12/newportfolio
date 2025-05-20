// components/CrazyTransition.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

// Transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    filter: 'blur(10px)',
    rotate: -5,
  },
  in: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    rotate: 0,
  },
  exit: {
    opacity: 0,
    scale: 1.2,
    filter: 'blur(20px)',
    rotate: 5,
  }
};

// Different transition types for variety
const transitions = [
  {
    duration: 0.8,
    type: "spring",
    stiffness: 100,
    damping: 15
  },
  {
    duration: 0.7,
    ease: [0.43, 0.13, 0.23, 0.96] // Custom cubic bezier
  },
  {
    duration: 0.9,
    type: "spring",
    bounce: 0.4
  }
];

export const CrazyTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [transitionIndex, setTransitionIndex] = useState(0);
  
  // Change transition style with each navigation
  useEffect(() => {
    const newIndex = (transitionIndex + 1) % transitions.length;
    setTransitionIndex(newIndex);
  }, [pathname]);
  
  return (
    <div className="perspective">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="exit"
          variants={pageVariants}
          transition={transitions[transitionIndex]}
          className="page-content"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};