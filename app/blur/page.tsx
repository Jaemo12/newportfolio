'use client';
import React, { useState, useEffect } from 'react';

const BlurringText = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts to ensure initial blur state is captured
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="blurring-text-container">
      <section className="grid grid-3">
        <div className="text-item">CREATOR</div>
        <div className="text-item">DESIGNER</div>
        <div className="text-item">DEVELOPER</div>
        <div className="text-item">ARTIST</div>
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
          text-shadow: 
            0 0 7px #fff,
            0 0 10px #fff,
            0 0 21px #3498db,
            0 0 42px #3498db,
            0 0 82px #3498db;
          animation: ${isVisible ? 'blurAnimation 1s forwards' : 'none'};
          filter: blur(40px);
          opacity: 0.5;
          transform: translateZ(-100px);
        }
        
        @keyframes blurAnimation {
          0% {
            filter: blur(40px);
            opacity: 0.5;
            transform: translateZ(-100px);
          }
          100% {
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