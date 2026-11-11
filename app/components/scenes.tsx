'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { Check } from 'lucide-react';

/** Window-style frame shared by the illustrations. */
export const Frame = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-bone/15 bg-ink">
    <div className="flex items-center gap-2 border-b border-bone/10 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-signal" />
      <span className="h-2.5 w-2.5 rounded-full bg-bone/25" />
      <span className="h-2.5 w-2.5 rounded-full bg-bone/25" />
      <span className="ml-2 truncate font-mono text-xs text-paper-dim">{title}</span>
    </div>
    <div className="relative min-h-0 flex-1 p-4">{children}</div>
  </div>
);

/** Slight 3D lean toward the cursor. */
export const Tilt = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

const tests = ['login.spec', 'checkout.spec', 'search.spec', 'api.contract', 'regression.suite', 'smoke.suite'];

/** Cognixia: an automated test run ticking through green. */
export const TestRunScene = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10%' });
  const reduce = useReducedMotion();
  const [step, setN] = useState(0);
  const n = reduce ? tests.length + 2 : step;

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setN((v) => (v >= tests.length + 3 ? 0 : v + 1)), 600);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="h-full w-full">
      <Frame title="illustration: automated regression run">
        <ul className="space-y-1.5 font-mono text-[13px]">
          {tests.map((t, i) => (
            <li key={t} className={`flex items-center gap-2 transition-opacity duration-300 ${n > i ? 'opacity-100' : 'opacity-0'}`}>
              <Check size={14} className="text-signal" aria-hidden /> {t}
            </li>
          ))}
        </ul>
        <div
          className={`absolute inset-x-4 bottom-3 flex gap-5 border-t border-bone/10 pt-2.5 text-xs transition-opacity duration-500 ${
            n > tests.length ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span>
            manual cycles <b className="text-signal">−35%</b>
          </span>
          <span>
            coverage <b className="text-signal">+30%</b>
          </span>
        </div>
      </Frame>
    </div>
  );
};

/** TIMIO: a growth curve drawing itself. */
export const GrowthScene = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10%' });
  const reduce = useReducedMotion();
  const line = 'M4,100 C40,96 62,84 92,76 S150,58 182,44 S252,22 296,10';
  return (
    <div ref={ref} className="h-full w-full">
      <Frame title="illustration: contextual news analysis">
        <svg viewBox="0 0 300 120" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
          {[30, 60, 90].map((y) => (
            <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.1" className="text-bone" />
          ))}
          <motion.path
            d={`${line} L296,120 L4,120 Z`}
            fill="#ff4d1a"
            initial={{ opacity: 0 }}
            animate={inView || reduce ? { opacity: [0, 0.18, 0.18, 0] } : { opacity: 0 }}
            transition={{ duration: 3.6, repeat: reduce ? 0 : Infinity, repeatDelay: 0.8, times: [0, 0.5, 0.85, 1] }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="#ff4d1a"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={inView || reduce ? { pathLength: [0, 1, 1] } : { pathLength: 0 }}
            transition={{ duration: 3.6, repeat: reduce ? 0 : Infinity, repeatDelay: 0.8, times: [0, 0.6, 1], ease: 'easeOut' }}
          />
        </svg>
        <p className="absolute right-4 top-3 text-right text-xs">
          daily active users <b className="block text-lg text-signal">+45%</b>
        </p>
      </Frame>
    </div>
  );
};

const stages = ['Code', 'Test', 'Docker', 'Kubernetes', 'Azure'];

/** Cognizant: a build flowing down a delivery pipeline. */
export const PipelineScene = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10%' });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setActive((v) => (v + 1) % (stages.length + 1)), 700);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="h-full w-full">
      <Frame title="illustration: CI/CD on Azure">
        <div className="relative flex h-full items-center">
          <div
            aria-hidden
            className="absolute inset-x-4 top-1/2 h-0.5 -translate-y-1/2 animate-[flow_0.9s_linear_infinite]"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, #ff4d1a 0 6px, transparent 6px 12px)' }}
          />
          <ol className="relative flex w-full justify-between gap-1">
            {stages.map((s, i) => (
              <li
                key={s}
                className={`rounded-lg border px-2 py-2 text-[11px] font-semibold transition-colors duration-300 sm:px-3 sm:text-xs ${
                  active > i || reduce ? 'border-signal bg-signal text-ink' : 'border-bone/25 bg-ink-3 text-bone'
                }`}
              >
                {s}
              </li>
            ))}
          </ol>
        </div>
        <p className="absolute bottom-3 right-4 text-xs">
          deployment efficiency <b className="text-signal">+50%</b>
        </p>
      </Frame>
    </div>
  );
};
