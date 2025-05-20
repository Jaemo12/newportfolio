'use client';

import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { motion, useInView } from 'framer-motion'; // Added useInView

const BlurringText = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const texts = ["CREATOR", "DESIGNER", "DEVELOPER", "ARTIST"];

  // Fallback for SSR or before client-side mount.
  // This is important because animation-timeline: view() is client-side.
  if (!isMounted) {
    return (
      <div className="blurring-text-container-placeholder bg-black py-20 md:py-28 text-center">
        {/* Static placeholder to maintain similar space */}
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
        
        .font-rock-3d { /* Added a class for the font */
          font-family: 'Rock 3D', system-ui;
        }
      `}</style>
      <style jsx>{`
        .blurring-text-container {
          /* Main container styles already applied via Tailwind */
        }
        .blur-grid-layout {
          display: grid;
          grid-template-columns: 1fr; /* Default to single column for stacking */
          gap: 2rem; /* Base gap */
        }
        
        /* Styling for individual text items will be in TextItem component or handled by .autoBLur */

        .autoBLur {
          font-family: 'Rock 3D', system-ui; /* Applied font family */
          font-weight: 400;
          text-wrap: nowrap;
          text-shadow: 
            0 0 6px #fff,
            0 0 9px #fff,
            0 0 18px #3498db, /* Maintained your blue shadow */
            0 0 36px #3498db,
            0 0 70px #3498db;
          transform-style: preserve-3d;
          perspective: 1200px; /* Increased perspective */
          animation: autoBLurAnimation linear both;
          animation-timeline: view();
          /* Adjust animation range for when effect is most prominent */
          animation-range-start: 10vh; 
          animation-range-end: 90vh;   
        }

        @keyframes autoBLurAnimation {
          0%, 100% { /* States when further from the center of its view range */
            filter: blur(20px);
            opacity: 0.35;
            transform: translateZ(-90px) scale(0.97);
          }
          15%, 85% { /* Transitioning states */
             filter: blur(8px);
             opacity: 0.6;
             transform: translateZ(-30px) scale(0.99);
          }
          45%, 55% { /* Clearest state */
            filter: blur(0px);
            opacity: 1;
            transform: translateZ(0) scale(1);
            text-shadow: /* Keep original sharp shadow for clear state */
              0 0 7px #fff,
              0 0 10px #fff,
              0 0 21px #3498db,
              0 0 42px #3498db,
              0 0 82px #3498db;
          }
        }
        
        /* Responsive font sizes and layout adjustments */
        /* Mobile first, then larger screens */
        .autoBLur { /* Default (mobile) font size */
          font-size: clamp(2.5em, 8vw, 4em); /* Responsive font size */
          line-height: 1.1;
        }

        @media screen and (min-width: 768px) { /* md */
          .blur-grid-layout {
            /* Re-introduce multi-column layout if desired for larger screens */
            /* For simplicity and to avoid complex overrides, keeping it stacked by default. */
            /* If you want the original grid layout for md+, uncomment and adjust: */
            /* grid-template-columns: repeat(6, 1fr); */
            gap: 3rem;
          }
          .autoBLur {
            font-size: clamp(5em, 10vw, 7em);
             /* Default span for md+ if using grid-template-columns */
            /* grid-column: span 4 / span 4;  */
            /* grid-column-start: 2;  */
          }
          /* Example for alternating alignment if using multi-column grid */
          /* .blur-grid-layout > div:nth-child(even) { text-align: right; grid-column-start: 3; } */
        }
         @media screen and (min-width: 1024px) { /* lg */
          .autoBLur {
            font-size: clamp(6em, 12vw, 8em); 
          }
           .blur-grid-layout {
            gap: 4rem;
          }
        }
      `}</style>
    </main>
  );
};


// Separate TextItem component for individual animation control
const TextItem = ({ text, index }: { text: string; index: number }) => {
  const ref = useRef(null);
  // useInView for individual item entrance, though the CSS animation is primary
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      className="autoBLur text-center" // Text-center for all sizes, can be overridden if needed
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      // Specific grid column styling can be applied here if a multi-column layout is restored for md+
      // Example: style={ index === 3 ? { gridColumn: 'md:col-span-6' } : {} }
    >
      {text}
    </motion.div>
  );
};

export default BlurringText;
