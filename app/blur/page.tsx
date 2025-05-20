'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BlurringText = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const texts = ["CREATOR", "DESIGNER", "DEVELOPER", "ARTIST"];

  if (!isMounted) {
    return (
      <div className="blurring-text-container-placeholder bg-black py-20 md:py-28 text-center">
        {texts.map((text, index) => (
          <div key={index} className="py-10 text-4xl md:text-6xl lg:text-7xl text-transparent font-rock-3d">
            {text}
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="blurring-text-container bg-black text-white py-20 md:py-28 overflow-hidden">
      <section className="blur-grid-layout container mx-auto px-4">
        {texts.map((text, index) => (
          <TextItem key={index} text={text} index={index} />
        ))}
      </section>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rock+3D&display=swap');
        
        .font-rock-3d { /* Ensure this class is available if used directly on elements */
          font-family: 'Rock 3D', system-ui;
        }
      `}</style>
      <style jsx>{`
        .blurring-text-container {
          /* Tailwind classes handle base styling */
        }
        .blur-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem; /* Adjusted base gap */
        }
        
        .autoBLur {
          font-family: 'Rock 3D', system-ui; /* Applied font family */
          font-weight: 400;
          text-wrap: nowrap;
          /* Base text-shadow, will be overridden by keyframes for clear state */
          text-shadow: 0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(52,152,219,0.3);
          transform-style: preserve-3d;
          perspective: 1200px; /* Increased perspective */
          animation: autoBLurAnimation linear both;
          animation-timeline: view();
          animation-range-start: 10vh; 
          animation-range-end: 90vh;   
        }

        @keyframes autoBLurAnimation {
          0%, 100% { 
            filter: blur(20px); /* Slightly reduced blur */
            opacity: 0.35;      /* Slightly more opaque */
            transform: translateZ(-90px) scale(0.96);
            text-shadow: 0 0 3px rgba(255,255,255,0.15); /* Very minimal shadow when blurred */
          }
          15%, 85% { 
             filter: blur(8px); /* Reduced blur */
             opacity: 0.6;     /* More opaque */
             transform: translateZ(-35px) scale(0.98);
             text-shadow: 0 0 6px rgba(255,255,255,0.25), 0 0 12px rgba(52,152,219,0.15); /* Softer shadow */
          }
          40%, 60% { /* Wider clear state, as before */
            filter: blur(0px);
            opacity: 1;
            transform: translateZ(0) scale(1);
            text-shadow: /* Full, sharp shadow for clear state */
              0 0 7px #fff,
              0 0 10px #fff,
              0 0 21px #3498db,
              0 0 42px #3498db,
              0 0 82px #3498db;
          }
        }
        
        .autoBLur { 
          font-size: clamp(2.2em, 7vw, 3.8em); 
          line-height: 1.1;
        }

        @media screen and (min-width: 640px) { /* sm */
           .autoBLur {
            font-size: clamp(3.5em, 9vw, 5em);
          }
          .blur-grid-layout {
            gap: 3rem;
          }
        }
        
        @media screen and (min-width: 768px) { /* md */
          .autoBLur {
            font-size: clamp(4.5em, 10vw, 6.5em);
          }
        }
         @media screen and (min-width: 1024px) { /* lg */
          .autoBLur {
            font-size: clamp(5.5em, 11vw, 7.5em); 
          }
           .blur-grid-layout {
            gap: 3.5rem; 
          }
        }
      `}</style>
    </main>
  );
};

const TextItem = ({ text, index }: { text: string; index: number }) => {
  const ref = useRef(null);
  // useInView for individual item entrance. once:true means it animates in once.
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      className="autoBLur text-center" 
      initial={{ opacity: 0, y: 30 }}
      // Animate to a state that allows the CSS animation to take full control of opacity and transform afterwards.
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.div>
  );
};

export default BlurringText;