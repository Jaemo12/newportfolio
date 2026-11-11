'use client';

import React, { useEffect, useRef } from 'react';

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  a: number;
  seed: number;
  life: number; // seconds left, Infinity for ambient dust
  fade: number; // seconds of fade-in/out
}

/**
 * Warm dust drifting in the light of the sign. It reacts to you:
 *  - the cursor pushes particles aside in a soft swirl and leaves a trail of sparks
 *  - nearby particles light up and connect with thin threads
 *  - a click or tap sends out a burst
 * Runs only while visible; with reduced motion it draws one still frame.
 */
export const Particles = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let W = 0;
    let H = 0;
    let rect = canvas.getBoundingClientRect();
    const ps: P[] = [];
    const mouse = { x: -999, y: -999, vx: 0, vy: 0, active: false, last: 0 };

    const ambient = (initial: boolean): P => ({
      x: Math.random() * W,
      y: initial ? Math.random() * H : H + 10,
      vx: 0,
      vy: -(8 + Math.random() * 20),
      r: 0.6 + Math.random() * 1.9,
      hue: 16 + Math.random() * 24,
      a: 0.25 + Math.random() * 0.55,
      seed: Math.random() * 100,
      life: Infinity,
      fade: 0,
    });

    const spark = (x: number, y: number, speed: number, life: number): P => {
      const ang = Math.random() * Math.PI * 2;
      const s = speed * (0.4 + Math.random() * 0.6);
      return {
        x,
        y,
        vx: Math.cos(ang) * s,
        vy: Math.sin(ang) * s,
        r: 0.8 + Math.random() * 1.8,
        hue: 18 + Math.random() * 28,
        a: 0.9,
        seed: Math.random() * 100,
        life,
        fade: 0.5,
      };
    };

    const resize = () => {
      rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = W < 720 ? 80 : 170;
      ps.length = 0;
      for (let i = 0; i < n; i++) ps.push(ambient(true));
    };

    const onMove = (e: PointerEvent) => {
      rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= -20 && x <= W + 20 && y >= -20 && y <= H + 20;
      mouse.active = inside;
      if (!inside) return;
      const now = performance.now();
      const dt = Math.max((now - mouse.last) / 1000, 0.008);
      mouse.vx = (x - mouse.x) / dt;
      mouse.vy = (y - mouse.y) / dt;
      mouse.x = x;
      mouse.y = y;
      mouse.last = now;
      // trail of sparks while moving
      const speed = Math.hypot(mouse.vx, mouse.vy);
      const n = speed > 500 ? 4 : speed > 120 ? 3 : 0;
      for (let i = 0; i < n && ps.length < 520; i++) {
        const s = spark(x, y, 55, 1.1 + Math.random() * 0.8);
        s.vx += mouse.vx * 0.04;
        s.vy += mouse.vy * 0.04;
        ps.push(s);
      }
    };
    const onDown = (e: PointerEvent) => {
      rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > W || y < 0 || y > H) return;
      for (let i = 0; i < 40 && ps.length < 560; i++) ps.push(spark(x, y, 360, 1.3 + Math.random() * 0.7));
    };
    const onLeave = () => (mouse.active = false);

    const R = 150;
    const step = (dt: number, t: number) => {
      const near: P[] = [];
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        if (p.life !== Infinity) {
          p.life -= dt;
          if (p.life <= 0) {
            ps.splice(i, 1);
            continue;
          }
        }
        // gentle sway for ambient dust
        if (p.life === Infinity) {
          p.vx += (Math.sin(t * 0.5 + p.seed) * 10 - p.vx) * 0.6 * dt;
        } else {
          p.vx *= Math.pow(0.5, dt);
          p.vy *= Math.pow(0.5, dt);
        }
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < R && d > 0.5) {
            const f = Math.pow(1 - d / R, 2);
            p.vx += ((dx / d) * 900 + (-dy / d) * 320) * f * dt;
            p.vy += ((dy / d) * 900 + (dx / d) * 320) * f * dt;
            if (d < R * 0.8) near.push(p);
          }
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.life === Infinity && (p.y < -12 || p.x < -30 || p.x > W + 30)) ps[i] = ambient(false);
      }
      return near;
    };

    const draw = (near: P[]) => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of ps) {
        let a = p.a;
        if (p.life !== Infinity) a *= Math.min(1, p.life / p.fade);
        // brighter in the sign's light (centre of the scene)
        const cx = (p.x / W - 0.5) * 2;
        const cy = (p.y / H - 0.38) * 2;
        a *= 0.55 + 0.9 * Math.exp(-(cx * cx * 1.4 + cy * cy * 2.2));
        ctx.fillStyle = `hsla(${p.hue},100%,${p.life === Infinity ? 62 : 72}%,${Math.min(a, 1)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.r > 1.5) {
          ctx.fillStyle = `hsla(${p.hue},100%,60%,${Math.min(a, 1) * 0.14})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (mouse.active) {
        // soft glow under the cursor
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 110);
        g.addColorStop(0, 'rgba(255,120,60,0.24)');
        g.addColorStop(1, 'rgba(255,77,26,0)');
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 110, mouse.y - 110, 220, 220);
        // threads between nearby particles
        ctx.lineWidth = 1;
        const k = Math.min(near.length, 28);
        for (let i = 0; i < k; i++) {
          for (let j = i + 1; j < k; j++) {
            const d = Math.hypot(near[i].x - near[j].x, near[i].y - near[j].y);
            if (d < 85) {
              ctx.strokeStyle = `rgba(255,160,100,${0.5 * (1 - d / 85)})`;
              ctx.beginPath();
              ctx.moveTo(near[i].x, near[i].y);
              ctx.lineTo(near[j].x, near[j].y);
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (reduce) {
      draw([]);
      return () => ro.disconnect();
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;
      if (now - mouse.last > 1500) mouse.active = mouse.active && now - mouse.last < 4000;
      draw(step(dt, now / 1000));
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
};
