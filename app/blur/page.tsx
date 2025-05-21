'use client';
import React, { useEffect, useRef } from 'react';

const BlurringText = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Function to handle animation once component is mounted
    const handleAnimation = () => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.autoBLur');
        
        // Create an observer to watch for elements in viewport
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Add class to trigger un-blur animation
              entry.target.classList.add('animate-in-view');
              
              // For debugging
              console.log('Element in view - adding animation class');
            } else {
              // Remove class when out of view
              entry.target.classList.remove('animate-in-view');
              
              // For debugging
              console.log('Element out of view - removing animation class');
            }
          });
        }, { 
          threshold: 0.1, // Trigger when 10% of element is visible
          rootMargin: '-10px' // Small negative margin to ensure it's really in view
        });
        
        // Start observing each element
        elements.forEach(el => {
          observer.observe(el);
          
          // Immediately check if element is already in viewport on load
          const rect = el.getBoundingClientRect();
          const isVisible = 
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth);
            
          if (isVisible) {
            // If already visible on load, add animation class immediately
            el.classList.add('animate-in-view');
            console.log('Element visible on load - adding animation class');
          }
        });
        
        // Clean up observer on unmount
        return () => observer.disconnect();
      }
    };
    
    // Run animation handler after a small delay to ensure component is fully rendered
    const timer = setTimeout(handleAnimation, 200);
    return () => clearTimeout(timer);
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
        .autoBLur {
          filter: blur(40px);
          opacity: 0.5;
          transform: translateZ(-100px);
          transition: filter 1s ease, opacity 1s ease, transform 1s ease;
        }
        
        .autoBLur.animate-in-view {
          filter: blur(0);
          opacity: 1;
          transform: translateZ(0);
          text-shadow: 
            0 0 7px #fff,
            0 0 10px #fff,
            0 0 21px #3498db,
            0 0 42px #3498db,
            0 0 82px #3498db;
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