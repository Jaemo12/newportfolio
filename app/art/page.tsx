'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Instagram, Globe } from 'lucide-react'; // Assuming these are for social links
import Image from 'next/image';

// Showcase Data - Updated for Drawings/Art Pieces
const showcaseData = [
  {
    id: 1,
    src: '/artwork1.jpeg', // REPLACE with your image path
    title: 'Ink & Quill\nEchoes', // Evocative title for drawings
    category: 'Pen & Ink Illustration',
    description: 'Delicate lines and intricate details whisper tales from a world born of ink and imagination.'
  },
  {
    id: 2,
    src: '/artwork2.jpg', // REPLACE with your image path
    title: 'Charcoal\nDreams',
    category: 'Expressive Charcoal Study',
    description: 'Shadows and light dance in monochrome, capturing raw emotion and fleeting moments in textured charcoal.'
  },
  {
    id: 3,
    src: '/artwork3.jpg', // REPLACE with your image path
    title: 'Digital\nStrokes',
    category: 'Concept Art & Digital Painting',
    description: 'Vibrant hues and imaginative forms converge on a digital canvas, bringing fantastical visions to life.'
  }
];

const ScrollShowcase = () => {
  const gradientRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll(); // scrollYProgress for the whole window

  // Opacity for the gradient background, fades slightly in the middle of the scroll
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.7, 0.5, 0.5, 0.7]);
  
  useEffect(() => {
    const updateGradient = () => {
      const progress = scrollYProgress.get();
      if (gradientRef.current) {
        // Hues for the conic gradient, shifting with scroll
        const hue1 = (progress * 200) % 360; // Slower hue shift for more subtle changes
        const hue2 = (hue1 + 50) % 360;
        // Center point of the conic gradient, moves in a circular path
        const x = 50 + Math.sin(progress * Math.PI * 1.5) * 25; // Adjusted path
        const y = 50 + Math.cos(progress * Math.PI * 1.5) * 25;
        
        // Directly updating style can be performance-intensive.
        // For very complex or frequent updates, consider other techniques if jank occurs.
        gradientRef.current.style.background = `
          radial-gradient(circle at ${x}% ${y}%, 
            hsl(${hue1}, 70%, 15%), 
            hsl(${hue2}, 70%, 10%), 
            hsl(${hue1}, 70%, 5%) 70% /* Darker outer edge */
          )
        `;
      }
    };

    // Subscribe to scrollYProgress changes
    const unsubscribe = scrollYProgress.on("change", updateGradient);
    // Initial call to set the gradient
    updateGradient(); 
    
    return () => unsubscribe();
  }, [scrollYProgress]); // scrollYProgress is stable, no need to re-run effect for it

  return (
    <div className="relative bg-black text-white overflow-x-hidden"> {/* Added overflow-x-hidden to root */}
      {/* Font Import */}
      <style jsx global>{` 
        @import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
        body { /* Apply font to body or a specific wrapper if preferred */
          font-family: 'Finger Paint', cursive;
        }
        .finger-paint {
          font-family: 'Finger Paint', cursive;
        }
      `}</style>

      <motion.div 
        ref={gradientRef}
        className="fixed inset-0 -z-10" // Changed to fixed for a persistent background
        style={{ opacity: gradientOpacity }}
      />

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="h-screen flex flex-col justify-center items-center relative text-center px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 80, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} // Smoother ease
          className="finger-paint text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight"
        >
          Ethereal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "circOut" }}
          className="text-xl sm:text-2xl text-white/70 mt-6 sm:mt-8 max-w-xl sm:max-w-2xl"
        >
          {/* Updated subtitle for drawings */}
          A journey through hand-drawn worlds, where ink meets imagination.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "circOut" }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-10 sm:mt-12"
        >
          <motion.a 
            href="https://instagram.com" // Replace with your Instagram link
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3, color: '#E1306C' }} // Instagram pink on hover
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors duration-300 finger-paint text-lg sm:text-xl"
          >
            <Instagram size={22} strokeWidth={1.5} />
            <span>@your.art</span> {/* Replace with your handle */}
          </motion.a>
          <motion.a 
            href="https://your-blog.com" // Replace with your blog/portfolio link
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3, color: '#60A5FA' }} // A nice blue for blog
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors duration-300 finger-paint text-lg sm:text-xl"
          >
            <Globe size={22} strokeWidth={1.5} />
            <span>Art Portfolio</span>
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Artwork Sections - AnimatePresence not strictly needed if not adding/removing items dynamically */}
      <div> 
        {showcaseData.map((item, index) => (
          <ArtworkSection key={item.id} item={item} index={index} />
        ))}
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
        transition={{ duration: 0.8, ease: "circOut" }}
        className="py-20 sm:py-24 text-center relative z-10" // Ensure footer is above gradient
      >
        <p className="text-white/60 mb-6 finger-paint text-lg sm:text-xl">
          {/* Updated footer text */}
          Explore more of my creations on
        </p>
        <div className="flex justify-center gap-6 sm:gap-8">
          <motion.a
            href="https://instagram.com" // Replace
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -5, color: '#E1306C' }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
          >
            <Instagram size={26} strokeWidth={1.5} />
            <span className="text-base sm:text-lg finger-paint">Instagram</span>
          </motion.a>
          <motion.a
            href="https://your-blog.com" // Replace
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -5, color: '#60A5FA' }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
          >
            <Globe size={26} strokeWidth={1.5} />
            <span className="text-base sm:text-lg finger-paint">Portfolio</span>
          </motion.a>
        </div>
      </motion.footer>
    </div>
  );
};

const ArtworkSection = ({ item, index }: { item: typeof showcaseData[0], index: number }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null); // Renamed from imageRef for clarity
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Animate as section enters/leaves viewport
  });

  // Parallax for the entire section content (text + image card)
  const sectionContentY = useTransform(scrollYProgress, [0, 1], [-30, 30]); // Reduced parallax range
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]); // Adjusted fade profile

  // Spring for smoother parallax on the section content
  const ySpringSection = useSpring(sectionContentY, { damping: 25, stiffness: 120, mass: 0.8 });

  // Mouse parallax for the image card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring settings for 3D tilt - made slightly less sensitive, smoother
  const tiltSpringConfig = { damping: 25, stiffness: 180, mass: 0.7 }; 
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), tiltSpringConfig); // Reduced rotation range
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), tiltSpringConfig); // Reduced rotation range

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageCardRef.current) return;
    const rect = imageCardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Animation variants for text elements
  const textItemVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(3px)" },
    visible: (delay:number = 0) => ({ 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } // Consistent smooth ease
    })
  };

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen relative flex flex-col justify-center items-center px-6 sm:px-8 py-24 sm:py-32"
      style={{ opacity: sectionOpacity, y: ySpringSection }} // Apply parallax and opacity to the whole section
    >
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center px-4 mb-12 sm:mb-16"
        variants={{
            hidden: {}, // Parent variant for stagger
            visible: { transition: { staggerChildren: 0.15 }}
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.span 
          variants={textItemVariants}
          className="finger-paint text-lg sm:text-xl md:text-2xl font-medium tracking-wider text-white/80 mb-4 sm:mb-6 block"
        >
          {item.category}
        </motion.span>
        
        <motion.h2 
          variants={textItemVariants}
          custom={0.1} // Delay for title
          className="finger-paint text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight whitespace-pre-line mb-6 sm:mb-8"
        >
          {item.title}
        </motion.h2>
      </motion.div>

      <motion.div
        ref={imageCardRef} // Ref for mouse move calculations
        className="w-full max-w-4xl xl:max-w-5xl h-[24rem] sm:h-[28rem] md:h-[32rem] relative mx-auto"
        style={{ perspective: '1200px' }} // Apply perspective to the parent for 3D effect
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transform-gpu" // Added shadow
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d", // Important for 3D transforms
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.4)" // Deeper shadow
          }}
        >
          <Image // Using Next/Image for optimized images
            src={item.src}
            alt={item.title}
            fill // Use fill to cover the container
            className="absolute inset-0 w-full h-full object-cover"
            priority={index < 2} // Prioritize loading first few images
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px" // Example sizes
          />
          {/* Subtle overlay on the image itself */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"
            style={{
              opacity: useTransform(mouseY, [-200, 0, 200], [0.4, 0.1, 0.4]) // Dynamic opacity based on tilt
            }}
          />
        </motion.div>
      </motion.div>

      <motion.p
        variants={textItemVariants}
        custom={0.3} // Delay for description
        className="finger-paint text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl xl:max-w-3xl mx-auto leading-relaxed mt-12 sm:mt-16 text-center"
      >
        {item.description}
      </motion.p>

      {/* Decorative Numbering */}
      <motion.span
        className="finger-paint absolute bottom-6 sm:bottom-8 right-6 sm:right-8 text-7xl sm:text-8xl font-bold text-white/5 opacity-80 pointer-events-none" // More subtle
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0.05, x: 0 }} // Target opacity for subtle effect
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "circOut"}}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>
    </motion.section>
  );
};

export default ScrollShowcase;
