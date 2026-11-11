'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Section headline whose words rise out of a mask one after another when
 * it scrolls into view. The full text stays available to screen readers.
 */
export const Headline = ({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: string;
  className?: string;
  as?: 'h2' | 'h3';
}) => {
  const reduce = useReducedMotion();
  const words = children.split(' ');
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={`display ${className}`}
      aria-label={children}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.07 }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: reduce ? { y: 0 } : { y: '115%', rotate: 4 },
              show: { y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};
