// components/SectionTransition.tsx
'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface SectionTransitionProps {
  children: ReactNode;
  id: string;
  effect?: 'slide' | 'zoom' | 'flip' | 'rotate' | 'random';
}

export const SectionTransition = ({ 
  children, 
  id, 
  effect = 'random' 
}: SectionTransitionProps) => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Define different animation variants
  const effectVariants = {
    slide: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
    },
    zoom: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } }
    },
    flip: {
      hidden: { rotateY: 90, opacity: 0 },
      visible: { rotateY: 0, opacity: 1, transition: { duration: 1 } }
    },
    rotate: {
      hidden: { rotate: -10, opacity: 0 },
      visible: { rotate: 0, opacity: 1, transition: { duration: 0.8 } }
    }
  };
  
  // Randomly select an effect if 'random' is specified
  const getRandomEffect = () => {
    const effects = Object.keys(effectVariants);
    return effects[Math.floor(Math.random() * effects.length)] as keyof typeof effectVariants;
  };
  
  const selectedEffect = effect === 'random' ? getRandomEffect() : effect;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);
  
  return (
    <motion.section
      id={id}
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={effectVariants[selectedEffect]}
      className="section-container"
    >
      {children}
    </motion.section>
  );
};