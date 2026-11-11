'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import { TestRunScene } from './scenes';
import { JournalScene } from './projectScenes';

interface Act {
  label: string;
  title: string;
  body: string;
  image?: string;
  alt: string;
  Scene?: React.ComponentType;
  field: string; // background + text classes
  frame: string;
}

const acts: Act[] = [
  {
    label: 'Quality',
    title: 'I break things on purpose.',
    body: 'As Quality Engineering Lead at Cognixia, I automate the testing: manual cycles down 35%, coverage up 30%, so software ships more reliably.',
    Scene: TestRunScene,
    alt: 'Illustration of an automated test run',
    field: 'bg-ink text-bone',
    frame: 'border-bone/20',
  },
  {
    label: 'AI',
    title: 'I build things that think.',
    body: "A Master's in Artificial Intelligence and the products to show for it: AI Diary, ReviewFlix, RecipeGenius, and a Chrome extension that grew daily active users 45% at TIMIO.",
    Scene: JournalScene,
    alt: 'Illustration of the AI Diary app',
    field: 'bg-signal text-ink',
    frame: 'border-ink/30',
  },
  {
    label: 'Art',
    title: "I draw things that don't exist yet.",
    body: 'Ink, charcoal and digital paint. The same obsession with detail, on paper and on screen.',
    image: '/art/artwork2.jpg',
    alt: 'Charcoal artwork by Amit Samant',
    field: 'bg-bone text-ink',
    frame: 'border-ink/20',
  },
];

// Opacity windows: each act holds, then cross-fades into the next.
const windows: [number[], number[]][] = [
  [[0, 0.28, 0.36], [1, 1, 0]],
  [[0.28, 0.36, 0.62, 0.7], [0, 1, 1, 0]],
  [[0.62, 0.7, 1], [0, 1, 1]],
];

const Layer = ({ act, index, p }: { act: Act; index: number; p: MotionValue<number> }) => {
  const opacity = useTransform(p, windows[index][0], windows[index][1]);
  const imgY = useTransform(p, [index * 0.33, index * 0.33 + 0.4], [40, -40]);
  return (
    <motion.div style={{ opacity }} className={`absolute inset-0 ${act.field}`}>
      <div className="mx-auto grid h-full max-w-6xl content-center gap-6 px-6 pb-16 pt-24 sm:px-8 md:grid-cols-12 md:items-center md:gap-10">
        <div className="md:col-span-7">
          <h2 className="display">{act.title}</h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-snug sm:text-xl md:mt-8">{act.body}</p>
        </div>
        <motion.div
          style={{ y: imgY }}
          className={`relative aspect-[16/10] w-full overflow-hidden rounded-lg border md:col-span-5 md:aspect-[4/5] ${act.frame}`}
        >
          {act.Scene ? (
            <act.Scene />
          ) : (
            <Image src={act.image!} alt={act.alt} fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover" />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Tick = ({ label, index, p }: { label: string; index: number; p: MotionValue<number> }) => {
  const fill = useTransform(p, [index * 0.33, index * 0.33 + 0.33], [0, 1], { clamp: true });
  return (
    <li className="flex-1">
      <p className="text-sm font-semibold uppercase tracking-wide">{label}</p>
      <div className="mt-2 h-[3px] w-full bg-current/20">
        <motion.div style={{ scaleX: fill }} className="h-full origin-left bg-current" />
      </div>
    </li>
  );
};

/**
 * The page's story: one pinned stage. As you scroll, three statements
 * trade places and the whole screen changes color with them.
 */
export const Story = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const tickColor = useTransform(scrollYProgress, [0, 0.33, 0.36, 0.66, 0.69, 1], [
    '#f1eee6', '#f1eee6', '#0b0b0d', '#0b0b0d', '#0b0b0d', '#0b0b0d',
  ]);

  return (
    <div ref={ref} className="relative h-[330vh]" aria-label="What I do, in three parts">
      <div className="sticky top-0 h-screen overflow-hidden">
        {acts.map((a, i) => (
          <Layer key={a.label} act={a} index={i} p={scrollYProgress} />
        ))}
        <motion.ul
          style={{ color: tickColor }}
          className="absolute inset-x-0 bottom-6 mx-auto flex max-w-6xl gap-4 px-6 sm:px-8"
          aria-hidden
        >
          {acts.map((a, i) => (
            <Tick key={a.label} label={a.label} index={i} p={scrollYProgress} />
          ))}
        </motion.ul>
      </div>
    </div>
  );
};
