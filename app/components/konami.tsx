'use client';

import React, { useEffect, useRef, useState } from 'react';

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const COLORS = ['#ff4d1a', '#f1eee6', '#ff7a4d', '#ffffff'];

/**
 * Hidden surprise: type the Konami code anywhere on the page.
 */
export const Konami = () => {
  const [fired, setFired] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress.current = k === CODE[progress.current] ? progress.current + 1 : k === CODE[0] ? 1 : 0;
      if (progress.current === CODE.length) {
        progress.current = 0;
        setFired((n) => n + 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!fired) return;
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const parts = Array.from({ length: reduce ? 0 : 160 }, () => ({
      x: c.width / 2 + (Math.random() - 0.5) * 80,
      y: c.height * 0.55,
      vx: (Math.random() - 0.5) * 1400,
      vy: -Math.random() * 1100 - 300,
      s: Math.random() * 10 + 6,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 12,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    let last = performance.now();
    const start = last;
    let raf = 0;
    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.033);
      last = t;
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of parts) {
        p.vy += 1800 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.r += p.vr * dt;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      }
      if (t - start < 3600) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, c.width, c.height);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fired]);

  return (
    <>
      <canvas ref={canvas} aria-hidden className="pointer-events-none fixed inset-0 z-[90]" />
      {fired > 0 && (
        <p
          key={fired}
          role="status"
          className="pointer-events-none fixed bottom-8 left-1/2 z-[91] -translate-x-1/2 rounded-full bg-signal px-6 py-3 text-lg font-bold text-ink shadow-lg"
        >
          You found the secret. Thanks for poking around.
        </p>
      )}
    </>
  );
};
