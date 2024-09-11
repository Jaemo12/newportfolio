'use client';
import React from 'react';

const BlurringText = () => {
  return (
    <main className="blurring-text-container">
      <section className="grid grid-3">
        <div className="autoBLur">CREATOR</div>
        <div className="autoBLur">DESIGNER</div>
        <div className="autoBLur">DEVELOPER</div>
        <div className="autoBLur">ARTIST</div>
        <div className="autoBLur">PROJECTS &#8599;</div>
      </section>
      <style jsx>{`
        .blurring-text-container {
          background-color: black;
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
          font-size: 10em;
          letter-spacing: 0.05em; /* Slightly increases space between letters */
          word-spacing: 0.3em; /* Adds horizontal space between words */
        }
        .grid-3 div {
          grid-column: 2 / 6;
          text-wrap: nowrap;
          text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 30px #00ffcc;
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
          animation: autoBLurAnimation linear both;
          animation-timeline: view();
        }
        @keyframes autoBLurAnimation {
          0% {
            filter: blur(40px);
            opacity: 0.5;
          }
          45%, 55% {
            filter: blur(0px);
            opacity: 1;
            text-shadow: 0 0 20px #00ffcc, 0 0 40px #00ffcc, 0 0 60px #00ffcc;
          }
          100% {
            filter: blur(40px);
            opacity: 0.5;
          }
        }
        @media screen and (max-width: 1023px) {
          .grid-3 {
            font-size: 5em;
            line-height: 1em;
          }
        }
        @media screen and (max-width: 767px) {
          .grid-3 {
            font-size: 4em;
            display: block;
            margin-bottom: 100px;
          }
        }
      `}</style>
    </main>
  );
};

export default BlurringText;