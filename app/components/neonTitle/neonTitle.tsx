import React from 'react';
import { motion } from 'framer-motion';

const NeonTitle = () => {
  return (
    <div className="text-center">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap');

        .neon-sign {
          font-family: 'Cedarville Cursive', cursive;
          font-weight: 600;
          color: #fff;
          opacity: 0;
          animation: turnOn 2s ease-in-out forwards,
                     signFlicker 4s ease-in-out 2s infinite,
                     colorChange 12s linear infinite 2s;
        }

        @keyframes colorChange {
          0%, 100% {
            text-shadow: 
              0 0 7px #fff,
              0 0 10px #fff,
              0 0 21px #ff8c00,
              0 0 42px #ff8c00,
              0 0 82px #ff8c00,
              0 0 92px #ff8c00;
          }
          33% {
            text-shadow: 
              0 0 7px #fff,
              0 0 10px #fff,
              0 0 21px #ff0000,
              0 0 42px #ff0000,
              0 0 82px #ff0000,
              0 0 92px #ff0000;
          }
          66% {
            text-shadow: 
              0 0 7px #fff,
              0 0 10px #fff,
              0 0 21px #ff69b4,
              0 0 42px #ff69b4,
              0 0 82px #ff69b4,
              0 0 92px #ff69b4;
          }
        }

        @keyframes turnOn {
          0% {
            opacity: 0;
            text-shadow: none;
          }
          10% {
            opacity: 0;
            text-shadow: none;
          }
          10.1% {
            opacity: 1;
            text-shadow: 
              0 0 7px #fff,
              0 0 10px #fff;
          }
          10.2% {
            opacity: 0;
            text-shadow: none;
          }
          20% {
            opacity: 0;
            text-shadow: none;
          }
          20.1% {
            opacity: 1;
            text-shadow: 
              0 0 7px #fff,
              0 0 10px #fff,
              0 0 21px #ff8c00;
          }
          20.6% {
            opacity: 0;
            text-shadow: none;
          }
          30% {
            opacity: 0;
            text-shadow: none;
          }
          30.1% {
            opacity: 1;
            text-shadow: 
              0 0 7px #fff,
              0 0 10px #fff,
              0 0 21px #ff8c00,
              0 0 42px #ff8c00;
          }
          30.5% {
            opacity: 1;
          }
          30.6% {
            opacity: 0;
          }
          45% {
            opacity: 0;
          }
          45.1% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          55% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            text-shadow: 
              0 0 7px #fff,
              0 0 10px #fff,
              0 0 21px #ff8c00,
              0 0 42px #ff8c00,
              0 0 82px #ff8c00,
              0 0 92px #ff8c00;
          }
        }

        @keyframes signFlicker {
          0%, 100% { opacity: 1; }
          41% { opacity: 1; }
          42% { opacity: 0.8; }
          43% { opacity: 1; }
          45% { opacity: 0.3; }
          46% { opacity: 1; }
        }

        .neon-sign-delayed {
          animation: turnOn 2s ease-in-out 0.5s forwards,
                     signFlicker 4s ease-in-out 2.5s infinite,
                     colorChange 12s linear infinite 2.5s;
        }
      `}</style>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-7xl md:text-8xl lg:text-9xl neon-sign">
         Code Sleep
        </div>
        <div className="text-6xl md:text-7xl lg:text-8xl neon-sign neon-sign-delayed">
          Repeat
        </div>
      </motion.div>
    </div>
  );
};

export default NeonTitle;