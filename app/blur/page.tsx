'use client';
import React, { useEffect, useRef } from 'react';

const BlurringText = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Force a reflow after component mounts to ensure the animation starts correctly
    const triggerAnimation = () => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.autoBLur');
        
        // Force reflow by accessing offsetHeight
        elements.forEach(el => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.animation = 'none';
          void htmlEl.offsetHeight; // This triggers reflow
          htmlEl.style.animation = '';
        });
        
        // Check if elements are in viewport and manually apply animation state
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in-view');
            } else {
              entry.target.classList.remove('animate-in-view');
            }
          });
        }, { threshold: 0.1 });
        
        elements.forEach(el => observer.observe(el));
      }
    };
    
    // Small delay to ensure DOM is fully rendered
    setTimeout(triggerAnimation, 100);
  }, []);

  return (
    <main className="blurring-text-container" ref={containerRef}>
      <section className="grid grid-3">
        <div className="autoBLur">CREATOR</div>
        <div className="autoBLur">DESIGNER</div>
        <div className="autoBLur">DEVELOPER</div>
        <div className="autoBLur">ARTIST</div>
      </section>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Rock+3D&display=swap');
        
        .blurring-text-container {
          background: black;
          color: white;
          padding-top: 100px;
          padding-bottom: 100px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: repeat(var(--row), 100px);
          margin-top: 50px;
          gap: 50px;
        }
        .grid-3 {
          --row: 6;
          font-size: 8em;
          letter-spacing: 0.02em;
          word-spacing: 0.2em;
          font-family: 'Rock 3D', system-ui;
          font-weight: 400;
        }
        .grid-3 div {
          grid-column: 2 / 6;
          text-wrap: nowrap;
          text-shadow: 
            0 0 7px #fff,
            0 0 10px #fff,
            0 0 21px #3498db,
            0 0 42px #3498db,
            0 0 82px #3498db;
          transform-style: preserve-3d;
          perspective: 1000px;
          filter: blur(40px);
          opacity: 0.5;
          transform: translateZ(-100px);
          transition: filter 0.8s ease, opacity 0.8s ease, transform 0.8s ease;
        }
        .grid-3 div:nth-child(even) {
          text-align: right;
        }
        .grid-3 div:nth-child(5) {
          grid-column: 1 / 6;
        }
        .grid-3 div:nth-child(4) {
          grid-column: 1 / 7;
        }
        .autoBLur.animate-in-view {
          filter: blur(0px);
          opacity: 1;
          transform: translateZ(0);
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
          .grid-3 div {
            margin-bottom: 40px;
          }
        }
      `}</style>
    </main>
  );
};

export default BlurringText;