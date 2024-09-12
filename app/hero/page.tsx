'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation, MotionValue } from 'framer-motion';
import './hero.css';

const icons = [
  { name: 'love', path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z', color: '#990000' },
  { name: 'death', path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z', color: '#222222' },
  { name: 'robots', path: 'M22 14h-1c0-3.87-3.13-7-7-7h-1V5.73c1.16-.41 2-1.52 2-2.83 0-1.66-1.34-3-3-3S9 1.24 9 2.9c0 1.31.84 2.42 2 2.83V7h-1c-3.87 0-7 3.13-7 7H2v2h1v3c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4v-3h1v-2zM11 2.9c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zM7 17v-3h1v-2H7c0-2.76 2.24-5 5-5h1v2h2V9h1c2.76 0 5 2.24 5 5h-1v2h1v3c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2z', color: '#003366' },
];

interface SectionProps {
  title: string;
  content: string;
  media: React.ReactNode;
  right?: boolean;
  yValue: MotionValue<number>;
  xValue: MotionValue<string>;
}

const ParallaxHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const smoothYText = useSpring(yText, { stiffness: 100, damping: 30 });
  const smoothYImage = useSpring(yImage, { stiffness: 100, damping: 30 });
  const smoothYVideo = useSpring(yVideo, { stiffness: 100, damping: 30 });

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef1.current) {
      videoRef1.current.play();
    }
    if (videoRef2.current) {
      videoRef2.current.play();
    }
  }, []);

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div ref={containerRef} className="relative min-h-[400vh] overflow-hidden bg-black text-cyan-300">
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="back.jpeg"
            alt="Hero background"
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)} 
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </motion.div>

        {imageLoaded && ( 
          <motion.div 
            className="absolute top-40 inset-x-0 flex flex-col items-center justify-center z-10" 
          >
            <motion.div
              className="flex space-x-8 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {icons.map((icon, index) => (
                <motion.svg
                  key={icon.name}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="72"
                  height="72"
                  fill={icon.color}
                  className="cursor-pointer neon-glow"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0],
                    rotate: [0, 360, 0],
                    filter: [
                      "drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))",
                      "drop-shadow(0 0 20px rgba(255, 255, 255, 1))",
                      "drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  whileHover={{ 
                    scale: 1.5,
                    rotate: 360, 
                    filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 1))"
                  }}
                >
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff4d4d" />
                      <stop offset="100%" stopColor="#ff9a00" />
                    </linearGradient>
                  </defs>
                  <path d={icon.path} />
                </motion.svg>
              ))}
            </motion.div>
          </motion.div>
        )}

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          style={{ opacity: opacityValue }}
        >
          <motion.div
            className="flex space-x-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
          </motion.div>
          <motion.h1
            className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-100 neon-text"
            style={{ y: smoothYText }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            Hello
          </motion.h1>
          <motion.p
            className="text-3xl mb-4 text-cyan-300 neon-text"
            style={{ y: smoothYText }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.3 }}
          >
            Welcome to my website
          </motion.p>
          <motion.p
            className="text-xl mb-8 text-cyan-300 neon-text"
            style={{ y: smoothYText }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4.1 }}
          >
            Scroll down to know more about me
          </motion.p>
        </motion.div>
      </motion.div>

      <Section
        title="Crafting Digital Experiences That Resonate"
        content="Turning visions into reality, building websites and applications that leave a lasting impression."
        media={
          <motion.img
            src="/hero.jpeg"
            alt="Creative Vision"
            className="w-full h-full object-cover rounded-lg shadow-lg image-glow"
            style={{ y: smoothYImage, x: xLeft }}
          />
        }
        right
        yValue={smoothYText}
        xValue={xLeft}
      />

      <Section
        title="Where Innovation Meets Imagination"
        content="We craft web experiences that spark curiosity and drive results."
        media={
          <motion.video
            ref={videoRef1}
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-lg shadow-lg image-glow"
            style={{ y: smoothYVideo, x: xRight }}
          >
            <source src="/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        }
        yValue={smoothYText}
        xValue={xRight}
      />

      <Section
        title= "Staying Ahead of the Curve"
        content="Building seamless, high-performance web solutions."
        media={
          <motion.img
            src="/hero2.jpeg"
            alt="Technical Expertise"
            className="w-full h-full object-cover rounded-lg shadow-lg image-glow"
            style={{ y: smoothYImage, x: xLeft }}
          />
        }
        right
        yValue={smoothYText}
        xValue={xLeft}
      />

      <Section
        title="Open Minds, Open Doors"
        content="We're more than just developers – we're your partners on the path to digital success. Let's embark on this journey together!"
        media={
          <motion.video
            ref={videoRef2}
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-lg shadow-lg image-glow"
            style={{ y: smoothYVideo, x: xRight }}
          >
            <source src="/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        }
        yValue={smoothYText}
        xValue={xRight}
      />
    </div>
  );
};

const Section: React.FC<SectionProps> = ({ title, content, media, right = false, yValue, xValue }) => (
  <motion.div
    className="min-h-screen flex items-center justify-center p-8"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
  >
    <div className={`max-w-6xl mx-auto flex flex-col ${right ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: right ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        style={{ y: yValue, x: xValue }}
      >
        <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-100 neon-text">{title}</h2>
        <p className="text-xl text-cyan-300 neon-text">{content}</p>
      </motion.div>
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: right ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg shadow-2xl container-glow">
          {media}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default ParallaxHero;