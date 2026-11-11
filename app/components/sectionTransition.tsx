'use client';

import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionTransitionProps {
  children: ReactNode;
  id: string;
  /** Kept so existing call sites compile; every section now reveals the same way. */
  effect?: 'slide' | 'zoom' | 'flip' | 'rotate' | 'random';
}

// One quiet reveal: a short fade and rise, triggered early so a jump link or a
// fast scroll never lands on a blank screen.
export const SectionTransition = ({ children, id }: SectionTransitionProps) => {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01, margin: '0px 0px 15% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="section-container"
    >
      {children}
    </motion.section>
  );
};
