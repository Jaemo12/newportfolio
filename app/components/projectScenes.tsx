'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, Send } from 'lucide-react';
import { Frame } from './scenes';

/** Steps a counter 0..max+hold on a loop while the scene is on screen. */
const useCycle = (max: number, hold: number, ms: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10%' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setN((v) => (v >= max + hold ? 0 : v + 1)), ms);
    return () => clearInterval(id);
  }, [inView, reduce, max, hold, ms]);
  // With reduced motion the scene simply shows its finished state.
  return { ref, n: reduce ? max + hold : n, inView, reduce };
};

const moods = ['Calm', 'Anxious', 'Hopeful'];

/** AI Diary: an entry being written, a mood trend, and a gentle reflection. */
export const JournalScene = () => {
  const { ref, n, inView, reduce } = useCycle(4, 3, 700);
  const line = 'M4,70 C30,62 46,80 76,52 S120,60 150,32 S196,40 216,14';
  return (
    <div ref={ref} className="h-full w-full">
      <Frame title="illustration: journal with AI reflection">
        <div className="grid h-full grid-cols-5 gap-5">
          <div className="col-span-3 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-wide text-paper-dim">Today</p>
            <div className="mt-3 space-y-2.5">
              {[92, 78, 86, 54].map((w, i) => (
                <div key={i} className="h-2.5 rounded-full bg-bone/10" style={{ width: `${w}%` }}>
                  <div
                    className="h-full origin-left rounded-full bg-bone/45 transition-transform duration-500"
                    style={{ transform: `scaleX(${n > i ? 1 : 0})` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              {moods.map((m, i) => (
                <span
                  key={m}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-300 ${
                    n > 4 && i === 2 ? 'border-signal bg-signal text-ink' : 'border-bone/25 text-paper-dim'
                  }`}
                >
                  {m}
                </span>
              ))}
            </div>
            <div
              className={`mt-auto max-w-[90%] rounded-xl rounded-bl-sm border border-signal/60 px-3 py-2 text-xs transition-all duration-500 ${
                n > 5 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              I noticed your mood lifts after time outside. Want to explore that?
            </div>
          </div>
          <div className="col-span-2 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-wide text-paper-dim">Mood trend</p>
            <svg viewBox="0 0 220 90" className="mt-3 h-full w-full" aria-hidden>
              {[22, 45, 68].map((y) => (
                <line key={y} x1="0" x2="220" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.1" className="text-bone" />
              ))}
              <motion.path
                d={line}
                fill="none"
                stroke="#ff4d1a"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={inView || reduce ? { pathLength: [0, 1, 1] } : { pathLength: 0 }}
                transition={{ duration: 4.6, repeat: reduce ? 0 : Infinity, times: [0, 0.6, 1], ease: 'easeOut' }}
              />
            </svg>
          </div>
        </div>
      </Frame>
    </div>
  );
};

const emotions = [
  { name: 'Joy', pct: 82 },
  { name: 'Tension', pct: 46 },
  { name: 'Awe', pct: 64 },
];

/** ReviewFlix: emotions read out of reviews, then a pick that matches. */
export const ReviewScene = () => {
  const { ref, n } = useCycle(3, 3, 800);
  return (
    <div ref={ref} className="h-full w-full">
      <Frame title="illustration: emotion-based recommendations">
        <div className="grid h-full grid-cols-5 gap-5">
          <div className="col-span-3">
            <p className="text-xs font-bold uppercase tracking-wide text-paper-dim">Review sentiment</p>
            <div className="mt-4 space-y-4">
              {emotions.map((e, i) => (
                <div key={e.name}>
                  <div className="mb-1 flex justify-between text-xs font-semibold">
                    <span>{e.name}</span>
                    <span className="font-mono tabular-nums text-paper-dim">{n > i ? `${e.pct}%` : ''}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-bone/10">
                    <div
                      className="h-full origin-left rounded-full bg-signal transition-transform duration-700 ease-out"
                      style={{ width: `${e.pct}%`, transform: `scaleX(${n > i ? 1 : 0})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-wide text-paper-dim">For your vibe</p>
            <div className="mt-4 grid flex-1 grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`rounded-lg border-2 transition-all duration-500 ${
                    n > 3 && i === 1 ? '-translate-y-1.5 border-signal bg-signal/20' : 'border-bone/15 bg-bone/5'
                  }`}
                >
                  <div className="m-2 h-1.5 w-3/4 rounded bg-bone/25" />
                  <div className="mx-2 h-1.5 w-1/2 rounded bg-bone/15" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
};

const ingredients = ['Tomato', 'Basil', 'Garlic', 'Pasta'];
const steps = ['Boil the pasta', 'Sauté garlic and tomato', 'Toss with basil'];

/** RecipeGenius: ingredients in, a personal recipe out. */
export const RecipeScene = () => {
  const { ref, n } = useCycle(ingredients.length + steps.length, 3, 650);
  return (
    <div ref={ref} className="h-full w-full">
      <Frame title="illustration: AI recipe generation">
        <div className="grid h-full grid-cols-5 gap-5">
          <div className="col-span-2">
            <p className="text-xs font-bold uppercase tracking-wide text-paper-dim">What you have</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ingredients.map((t, i) => (
                <span
                  key={t}
                  className={`rounded-full border border-bone/30 px-3 py-1 text-xs font-semibold transition-all duration-300 ${
                    n > i ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            <span
              className={`mt-5 inline-flex items-center gap-2 rounded-full bg-signal px-3 py-1.5 text-xs font-bold text-ink transition-opacity duration-300 ${
                n >= ingredients.length ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Send size={12} aria-hidden /> Generate
            </span>
          </div>
          <div className="col-span-3 rounded-xl border border-bone/15 bg-ink-3 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-signal">Your recipe</p>
            <ul className="mt-3 space-y-2.5 text-sm">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className={`flex items-center gap-2 transition-all duration-400 ${
                    n > ingredients.length + i ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                  }`}
                >
                  <Check size={14} className="shrink-0 text-signal" aria-hidden /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Frame>
    </div>
  );
};
