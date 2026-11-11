'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, FileText } from 'lucide-react';
import { Magnetic } from '../components/magnetic';
import { NeonScene } from '../components/neonScene';

const ease = [0.16, 1, 0.3, 1] as const;

const facts = [
  { label: 'Now', value: 'Quality Engineering Lead at Cognixia' },
  { label: 'Based in', value: 'Arlington, Texas' },
  { label: 'Studied', value: "Master's in Artificial Intelligence" },
];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

const PremiumHeroSection = () => {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden lg:min-h-screen">
      {/* The scene: sign on a brick wall above a wet floor. Top block on phones, right side on wide screens. */}
      <div className="relative h-[60svh] w-full [mask-image:linear-gradient(to_bottom,#000_72%,transparent)] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%] lg:[mask-image:linear-gradient(to_right,transparent,#000_30%)]">
        <NeonScene />
      </div>

      <div className="relative z-10 mx-auto -mt-8 flex max-w-7xl flex-col justify-center px-6 pb-20 sm:px-8 lg:mt-0 lg:min-h-screen lg:pb-16 lg:pt-28">
        <div className="lg:max-w-[42%]">
          <h1 className="display" aria-label="Amit Samant">
            {['Amit', 'Samant'].map((w, i) => (
              <span key={w} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease }}
                >
                  {w}
                  {i === 0 ? ' ' : ''}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...rise(0.4)} className="mt-6 max-w-[34ch] text-xl leading-snug text-bone sm:text-2xl">
            I lead quality engineering, build AI products, and make art.
          </motion.p>

          <motion.div {...rise(0.55)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-lg font-bold text-ink transition-colors duration-200 hover:bg-signal-soft"
              >
                See the work <ArrowDown size={18} aria-hidden />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-bone px-6 py-3.5 text-lg font-medium text-bone transition-colors duration-200 hover:bg-bone hover:text-ink"
              >
                <FileText size={18} aria-hidden /> Resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl {...rise(0.7)} className="mt-12 border-t border-bone/20">
            {facts.map((f) => (
              <div key={f.label} className="flex items-baseline gap-6 border-b border-bone/20 py-3.5">
                <dt className="w-24 shrink-0 text-sm text-paper-dim">{f.label}</dt>
                <dd className="text-base font-medium text-bone">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
};

export default PremiumHeroSection;
