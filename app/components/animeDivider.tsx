'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView, useReducedMotion } from 'framer-motion';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export type Character = 'naruto' | 'pikachu' | 'spiritedaway' | 'animeGirl';

/**
 * The recurring thread of the page: a small animated character standing on a
 * hairline between sections. Loads its animation only when scrolled near,
 * and holds still for visitors who prefer reduced motion.
 */
export const AnimeDivider = ({ character, label }: { character: Character; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: '300px 0px' });
  const reduce = useReducedMotion();
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    fetch(`/anim/${character}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => !cancelled && json && setData(json))
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [near, character]);

  return (
    <div ref={ref} role="img" aria-label={label} className="relative mx-auto flex h-36 w-full max-w-6xl items-end px-6 sm:px-8">
      <div className="absolute inset-x-6 bottom-6 h-px bg-[var(--line)] sm:inset-x-8" />
      <div className="relative mx-auto -mb-1 h-32 w-32">
        {data && <Lottie animationData={data} loop autoplay={!reduce} className="h-full w-full" />}
      </div>
    </div>
  );
};
