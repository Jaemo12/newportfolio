'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin signal-orange bar along the top that fills as you read. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-signal"
    />
  );
};
