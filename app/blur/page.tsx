'use client';
import React, { useState, useEffect, useRef } from 'react';

const BlurringText = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px', // Trigger earlier when item is 10% into viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = parseInt((entry.target as HTMLElement).dataset.index!);
        if (entry.isIntersecting) {
          setVisibleItems(prev => new Set([...Array.from(prev), index]));
        } else {
          setVisibleItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
          });
        }
      });
    }, observerOptions);

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const words = ['CREATOR', 'DESIGNER', 'DEVELOPER', 'ARTIST'];

  return (
    <main className="blurring-text-container" ref={containerRef}>
      <section className="grid grid-3">
        {words.map((word, index) => (
          <div 
            key={index}
            ref={el => { itemRefs.current[index] = el; }}
            data-index={index}
            className={`text-item ${visibleItems.has(index) ? 'visible' : ''}`}
          >
            {word}
          </div>
        ))}
      </section>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Rock+3D&display=swap');
        
        .blurring-text-container {
          background: black;
          color: white;
          padding-top: 100px;
          padding-bottom: 100px;
          z-index: 1;
          position: relative;
          min-height: 100vh;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: repeat(var(--row), 100px);
          margin-top: 50px;
          gap: 50px;
          position: relative;
        }
        
        .grid-3 {
          --row: 6;
          font-size: 8em;
          letter-spacing: 0.02em;
          word-spacing: 0.2em;
          font-family: 'Rock 3D', system-ui;
          font-weight: 400;
        }
        
        .text-item {
          grid-column: 2 / 6;
          text-wrap: nowrap;
          transform-style: preserve-3d;
          perspective: 1000px;
          filter: blur(15px);
          opacity: 0.4;
          transform: translateZ(-50px) scale(0.95);
          transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          text-shadow: 
            0 0 20px rgba(52, 152, 219, 0.3),
            0 0 40px rgba(52, 152, 219, 0.2);
          will-change: filter, opacity, transform;
        }
        
        .text-item.visible {
          filter: blur(0px);
          opacity: 1;
          transform: translateZ(0) scale(1);
          text-shadow: 
            0 0 7px #fff,
            0 0 10px #fff,
            0 0 21px #3498db,
            0 0 42px #3498db,
            0 0 82px #3498db;
        }
        
        /* Stagger the animation timing for each item */
        .text-item:nth-child(1) { 
          transition-delay: 0.05s;
        }
        .text-item:nth-child(2) { 
          transition-delay: 0.1s;
        }
        .text-item:nth-child(3) { 
          transition-delay: 0.15s;
        }
        .text-item:nth-child(4) { 
          transition-delay: 0.2s;
        }
        
        .text-item:nth-child(even) {
          text-align: right;
        }
        
        .text-item:nth-child(3) {
          grid-column: 1 / 6;
        }
        
        .text-item:nth-child(4) {
          grid-column: 1 / 7;
        }
        
        /* Smooth blur gradient for items partially in view */
        @supports (mask-image: linear-gradient(black, transparent)) {
          .text-item:not(.visible) {
            mask-image: linear-gradient(
              to bottom,
              transparent 0%,
              black 20%,
              black 80%,
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              to bottom,
              transparent 0%,
              black 20%,
              black 80%,
              transparent 100%
            );
          }
        }
        
        @media screen and (max-width: 1023px) {
          .grid-3 {
            font-size: 4em;
            line-height: 1.3em;
          }
        }
        
        @media screen and (max-width: 767px) {
          .grid-3 {
            font-size: 3em;
            display: block;
            margin-bottom: 100px;
          }
          .text-item {
            margin-bottom: 40px;
          }
        }
      `}</style>
    </main>
  );
};

export default BlurringText;