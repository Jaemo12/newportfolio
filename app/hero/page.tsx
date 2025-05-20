'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const NeonTitle = dynamic(() => import('../components/neonTitle/neonTitle'), {
  ssr: false,
  loading: () => <div className="w-full h-48 flex items-center justify-center"><p className="text-3xl text-center text-white/30">Loading Title...</p></div>, 
});

// Updated hero segments data
const heroSegments = [
  {
    id: 'intro',
    mainText: "Transforming Ideas into Digital Realities.",
    introQuote: "// The intersection of creativity and code is where innovation thrives.",
    accentColor: '#008080', // Deep Teal for intro accents
    glowColor: 'rgba(0, 128, 128, 0.4)',
  },
  {
    id: 'mainQuoteSection',
    quote: "The details are not the details. They make the design.",
    author: "Charles Eames",
    backgroundImage: '/h3.jpg', // REPLACE with your image for this section
    accentColor: '#D4AF37', // Warm Gold
    glowColor: 'rgba(212, 175, 55, 0.5)', // Slightly more opaque glow for better visibility
  }
];

// Component for animated digital rain/particles
const DigitalRainParticle = ({ delay, accentColor }: { delay: number; accentColor: string; }) => {
  const initialY = `${Math.random() * -70 - 30}%`;
  const duration = Math.random() * 8 + 8;

  return (
    <motion.span
      className="absolute text-sm opacity-20"
      style={{
        left: `${Math.random() * 100}%`,
        color: Math.random() > 0.4 ? accentColor : 'rgba(200,220,255,0.15)',
        textShadow: `0 0 6px ${accentColor}50`,
      }}
      initial={{ y: initialY }}
      animate={{ y: '130%' }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    >
      {['0', '1', '<', '>', '/', ';', '{', '}', '(', ')', '=', '+', '-'][Math.floor(Math.random() * 14)]}
    </motion.span>
  );
};

// Section component for the single Quote Section
const QuoteSection = ({ segment }: { segment: typeof heroSegments[1] }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'] 
  });

  // Parallax for the background image
  const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '10%']); // Adjust parallax range
  const imageOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0, 1, 1, 0]); // Control overall section visibility
  const imageScale = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [1.15, 1.05, 1.05, 1.15]); // Image scales slightly with scroll

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const contentVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(5px)' },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-24 md:py-36"
      // Apply scroll-based opacity and scale to the entire section for smoother transitions
      // style={{ opacity: imageOpacity, scale: imageScale }} 
      // This might be too much if content also animates opacity. Let's keep it on image for now.
    >
      {/* Background Image - Positioned to fill the section */}
      {segment.backgroundImage && (
        <motion.div 
          className="absolute inset-0 z-0" // Ensure it's behind the quote
          style={{ 
            opacity: imageOpacity, // Fade image in/out with scroll
            scale: imageScale,     // Scale image with scroll
            y: imageY              // Parallax image with scroll
          }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              x: mousePosition.x * -15, // Mouse parallax
              y: mousePosition.y * -15,
              scale: 1.15, // Base scale for parallax movement, slightly larger to avoid edges
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            <Image
              src={segment.backgroundImage}
              alt={`${segment.author} quote background`}
              fill
              quality={85}
              className="object-cover"
              priority 
            />
          </motion.div>
          {/* Darkening overlay for text legibility over the image */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div> 
        </motion.div>
      )}

      {/* Quote and Author - Positioned above the background image */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }} // Trigger when 25% is visible
        transition={{ staggerChildren: 0.3 }}
      >
        <motion.blockquote
          variants={contentVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-great-vibes tracking-normal leading-tight md:leading-snug mb-8"
          style={{ 
            color: segment.accentColor, 
            textShadow: `0 0 20px ${segment.glowColor}, 0 0 10px ${segment.accentColor}` // Enhanced text shadow for glow
          }}
          whileHover={{ 
            scale: 1.02, 
            textShadow: `0 0 30px ${segment.glowColor}, 0 0 15px ${segment.accentColor}`, 
            transition: {duration: 0.25, ease: "easeOut"} 
          }}
        >
          &quot;{segment.quote}&quot;
        </motion.blockquote>
        <motion.p
          variants={contentVariants}
          custom={0.2} // Delay for author
          className="text-md sm:text-lg text-white/80 font-roboto-mono" // Increased author text opacity
          style={{color: `${segment.accentColor}E0`}} // Slightly more opaque author color
        >
          — {segment.author}
        </motion.p>
      </motion.div>
    </section>
  );
};


const PremiumHeroSection = () => {
  const [neonTitleVisible, setNeonTitleVisible] = useState(false);
  
  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setNeonTitleVisible(true);
    }, 200); 
    return () => clearTimeout(titleTimer);
  }, []);

  const introTextRevealVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(2px)' },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        html, body {
          overflow-x: hidden;
        }
        body {
          font-family: 'Inter', sans-serif;
          background-color: #0A0A0A;
          color: #E5E7EB; 
        }
        .font-great-vibes { font-family: 'Great Vibes', cursive; }
        .font-roboto-mono { font-family: 'Roboto Mono', monospace; }
      `}</style>

      <div className="bg-[#0A0A0A] text-white overflow-x-hidden"> {/* Root overflow-x-hidden */}
        
        <section 
          className="h-screen flex flex-col items-center justify-center text-center p-4 relative"
        >
          <div className="absolute inset-0 z-[-1] overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <DigitalRainParticle key={`rain-${i}`} delay={Math.random() * 2.5} accentColor={heroSegments[0].accentColor} />
            ))}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[2.5px]"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{ 
              opacity: neonTitleVisible ? 1 : 0, 
              scale: neonTitleVisible ? 1 : 0.9,
              filter: neonTitleVisible ? "blur(0px)" : "blur(4px)"
            }}
            transition={{ duration: 1.0, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 md:mb-8"
          >
            <NeonTitle />
          </motion.div>
          
          <motion.p
            variants={introTextRevealVariants}
            initial="hidden"
            animate={neonTitleVisible ? "visible" : "hidden"}
            custom={0.3}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-3xl tracking-wide leading-relaxed"
          >
            {heroSegments[0].mainText}
          </motion.p>
          <motion.p
            variants={introTextRevealVariants}
            initial="hidden"
            animate={neonTitleVisible ? "visible" : "hidden"}
            custom={0.5}
            className="mt-8 text-md md:text-lg text-white/70 font-roboto-mono max-w-2xl italic px-4"
            style={{textShadow: `0 0 8px ${heroSegments[0].glowColor}`}}
          >
            {heroSegments[0].introQuote}
          </motion.p>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: neonTitleVisible ? [0, 0.6, 0, 0.6, 0] : 0 }}
            transition={{ duration: 2.8, delay: 0.8, repeat: Infinity, ease: "linear" }}
          >
            <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-auto text-white/40">
              <motion.path 
                d="M12 4V26M12 26L7 21M12 26L17 21" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: "circOut" }}
              />
            </svg>
          </motion.div>
        </section>

        {/* Single Quote Section */}
        <QuoteSection 
            segment={heroSegments[1] as typeof heroSegments[1]}
        />
      </div>
    </>
  );
};

export default PremiumHeroSection;
