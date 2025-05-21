'use client';
import React, { useState, useEffect } from 'react';

const BlurringText = () => {
  // Use state to track whether the component has been scrolled to
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    // Function to check if element is in viewport
    const isInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    
    // Function to handle scroll events
    const handleScroll = () => {
      const container = document.querySelector('.blurring-text-container');
      if (container && isInViewport(container)) {
        setInView(true);
        // Once in view, remove the scroll listener
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    // Check initial state
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="blurring-text-container">
      <section className="grid grid-3">
        <div className={`text-item ${inView ? 'visible' : 'blurred'}`}>CREATOR</div>
        <div className={`text-item ${inView ? 'visible' : 'blurred'}`}>DESIGNER</div>
        <div className={`text-item ${inView ? 'visible' : 'blurred'}`}>DEVELOPER</div>
        <div className={`text-item ${inView ? 'visible' : 'blurred'}`}>ARTIST</div>
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
          transform-style: preserve-3d;
          perspective: 1000px;
          transition: filter 1s ease, opacity 1s ease, transform 1s ease, text-shadow 1s ease;
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
        
        /* Blurred state - make sure this is very blurry */
        .text-item.blurred {
          filter: blur(40px) !important;
          opacity: 0.5 !important;
          transform: translateZ(-100px) !important;
          text-shadow: none !important;
        }
        
        /* Visible state with transition */
        .text-item.visible {
          filter: blur(0) !important;
          opacity: 1 !important;
          transform: translateZ(0) !important;
          text-shadow: 
            0 0 7px #fff,
            0 0 10px #fff,
            0 0 21px #3498db,
            0 0 42px #3498db,
            0 0 82px #3498db !important;
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