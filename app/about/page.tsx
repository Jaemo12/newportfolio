'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from 'framer-motion';
import { Github, Linkedin, Code, Mountain, GraduationCap, Palette, ArrowDown } from 'lucide-react';
import Lottie from 'lottie-react';
import Image from 'next/image';
// Make sure the path to spaceman.json is correct relative to this file,
// or import it in a way that Next.js can handle (e.g., if it's in the public folder, use a direct path)
import spaceman from './SpaceMan.json'; 

// --- Configuration & Animation Variants ---

const FADE_UP_ANIMATION: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

const STAGGER_CHILDREN_ANIMATION: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// --- Re-styled Skill ---
interface SkillProps {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  icon?: React.ReactNode;
}

const ModernSkill: React.FC<SkillProps> = ({ name, level, icon }) => {
  const ref = useRef<HTMLDivElement>(null);
  // useInView is client-side, ensure it doesn't run prematurely
  const isInView = useInView(ref, { once: true, amount: 0.5, margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-center space-x-3 p-3 bg-neutral-800/40 dark:bg-neutral-900/50 rounded-lg border border-neutral-700/60 dark:border-neutral-800/60 shadow-md"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={FADE_UP_ANIMATION}
      custom={0.1} // Small delay for individual skill items
    >
      {icon && <span className="text-[var(--neon-blue)] opacity-80">{icon}</span>}
      <span className="text-neutral-300 dark:text-neutral-200 flex-grow text-sm sm:text-base">{name}</span>
      <div className="flex space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2.5 sm:w-3 rounded-full ${
              i < level ? 'bg-[var(--neon-blue)]' : 'bg-neutral-600 dark:bg-neutral-700'
            } transition-colors duration-300`}
          />
        ))}
      </div>
    </motion.div>
  );
};


// --- Main AboutSection Component ---
const AboutSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  // Conditionally initialize hooks or pass empty/default values if not client-side yet
  const { scrollYProgress: heroScrollYProgress } = useScroll(
    isClient ? { target: heroRef, offset: ['start start', 'end start'] } : {}
  );
  
  const heroTextOpacity = useTransform(heroScrollYProgress || motion.div, [0, 0.5, 0.8], [1, 1, 0]);
  const heroTextY = useTransform(heroScrollYProgress || motion.div, [0, 0.8], ['0%', '-50%']);
  const lottieScale = useTransform(heroScrollYProgress || motion.div, [0, 0.8], [1, 0.5]);
  const lottieY = useTransform(heroScrollYProgress || motion.div, [0, 0.8], ['0%', '50%']);

  const bioImageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bioImageScrollYProgress } = useScroll(
    isClient ? { target: bioImageRef, offset: ['start end', 'end start'] } : {}
  );

  const bioImageScale = useTransform(bioImageScrollYProgress || motion.div, [0, 0.5, 1], [0.9, 1, 0.9]); // Start slightly smaller
  const bioImageOpacity = useTransform(bioImageScrollYProgress || motion.div, [0, 0.15, 0.85, 1], [0, 1, 1, 0]); // Adjusted fade points


  // Data
  const skills: SkillProps[] = [
    { name: 'Next.js / React', level: 5, icon: <Code size={16} className="opacity-70"/> },
    { name: 'TypeScript', level: 4, icon: <Code size={16} className="opacity-70"/> },
    { name: 'UI/UX Design (Figma)', level: 4, icon: <Palette size={16} className="opacity-70"/> },
    { name: 'Node.js & Backend', level: 3, icon: <Code size={16} className="opacity-70"/> },
  ];

  const educationItems = [
    {
      icon: <GraduationCap size={22} className="text-[var(--neon-blue)]" />,
      title: "Master's Degree",
      subtitle: 'Texas A&M University Corpus Christi',
      period: '2022 - 2024',
      description: 'Specialized in advanced topics and research relevant to my field of study, focusing on AI and distributed systems.',
      accentColor: 'var(--neon-blue)',
      hoverBorderColorClass: 'group-hover:border-[var(--neon-blue)]/70', // For Tailwind group hover
    },
    {
      icon: <GraduationCap size={22} className="text-[var(--neon-pink)]" />,
      title: "Bachelor's Degree",
      subtitle: 'DIT University',
      period: '2016 - 2020',
      description: 'Gained a comprehensive foundation in computer science principles and modern software development practices.',
      accentColor: 'var(--neon-pink)',
      hoverBorderColorClass: 'group-hover:border-[var(--neon-pink)]/70',
    },
  ];

  // If not on client yet, you can return a loader or null to prevent errors
  if (!isClient) {
    return ( // Optional: Basic skeleton or loader
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-neutral-400">Loading About Section...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-neutral-300 font-inter antialiased">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
          --neon-blue: #00f3ff;
          --neon-pink: #ff00e5;
          --neon-purple: #9d00ff; 
          --font-body: 'Inter', sans-serif;
          --font-heading: 'Figtree', sans-serif; /* Using Figtree for headings */
        }

        body {
          font-family: var(--font-body);
          background-color: #0A0F1E; /* Darker base for body if this page is standalone */
          color: #E2E8F0; /* Default light text */
        }

        .font-figtree {
          font-family: var(--font-heading);
        }
        
        /* Custom scrollbar for a more integrated feel */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1E293B; /* slate-800 */
        }
        ::-webkit-scrollbar-thumb {
          background: #475569; /* slate-600 */
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #64748B; /* slate-500 */
        }
        /* For Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #475569 #1E293B;
        }
      `}</style>

      {/* Section 1: Hero */}
      <section ref={heroRef} className="min-h-screen h-screen flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
        {/* Subtle animated grid pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] 
          bg-[linear-gradient(to_right,theme(colors.slate.700)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.700)_1px,transparent_1px)] 
          bg-[size:40px_40px] 
          animate-[gridPulse_8s_ease-in-out_infinite]"
        />
        <style jsx>{`
          @keyframes gridPulse {
            0%, 100% { opacity: 0.03; transform: scale(1); }
            50% { opacity: 0.05; transform: scale(1.02); }
          }
        `}</style>


        <motion.div
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="text-center z-10"
        >
          <motion.h1
            className="font-figtree text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter mb-5 sm:mb-6"
            initial={{ opacity:0, y: 25 }}
            animate={{ opacity:1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "circOut" }}
          >
            {/* Using AnimatedText for character stagger */}
            {Array.from("Hello,").map((letter, i) => (
              <motion.span key={`h-${i}`} variants={FADE_UP_ANIMATION} custom={i * 0.025} className="inline-block">
                {letter}
              </motion.span>
            ))}
            <br />
            {Array.from("I'm [Your Name]").map((letter, i) => ( // REPLACE [Your Name]
              <motion.span 
                key={`n-${i}`} 
                variants={FADE_UP_ANIMATION} 
                custom={0.25 + i * 0.025} 
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-pink)]"
                style={{textShadow: `0 0 10px var(--neon-blue), 0 0 10px var(--neon-pink)`}} // Added text shadow for pop
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="text-neutral-400 dark:text-neutral-300 text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-8 sm:mb-10"
            initial={{ opacity:0, y: 20 }}
            animate={{ opacity:1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "circOut" }}
          >
            Digital craftsman, creative full-stack developer & problem solver.
            <br />
            Welcome to my digital playground.
          </motion.p>
        </motion.div>

        <motion.div
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 absolute bottom-[12vh] sm:bottom-[10vh] z-0 opacity-80" // Adjusted size and opacity
          style={{ scale: lottieScale, y: lottieY, opacity: heroTextOpacity }} // Link opacity to text for smoother fade with scroll
        >
          {spaceman && <Lottie animationData={spaceman} loop={true} />}
        </motion.div>

        <motion.div
            className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 text-neutral-500 dark:text-neutral-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
        >
          <ArrowDown size={20} className="animate-bounce"/>
        </motion.div>
      </section>

      {/* Section 2: Bio / Who I Am */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900 dark:bg-gray-950 relative">
        <div className="absolute -top-16 -left-16 w-60 h-60 sm:w-72 sm:h-72 bg-[var(--neon-blue)]/5 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-60 h-60 sm:w-72 sm:h-72 bg-[var(--neon-pink)]/5 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10 sm:gap-12 items-center">
          <motion.div
            ref={bioImageRef}
            className="md:col-span-2 relative group aspect-[3/4] sm:aspect-square md:aspect-[3/4] rounded-xl overflow-hidden border border-neutral-700/50 dark:border-neutral-800/50 shadow-xl"
            style={{ scale: bioImageScale, opacity: bioImageOpacity }}
            whileHover={{ scale: bioImageScale ? 1.02 : 1, transition: {duration: 0.3} }} // Apply hover only if scale is active
          >
            {/* Ensure hero.jpeg is in your public folder */}
            <Image
              src="/hero.jpeg" 
              alt="Profile Picture"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          </motion.div>

          <motion.div
            className="md:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% visible
            variants={STAGGER_CHILDREN_ANIMATION}
          >
            <motion.h2 
              variants={FADE_UP_ANIMATION} 
              className="font-figtree text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 text-neutral-100 dark:text-white cursor-default"
              whileHover={{
                scale: 1.01,
                textShadow: "0 0 12px var(--neon-blue), 0 0 18px rgba(0, 243, 255, 0.25)",
                transition: { duration: 0.25 }
              }}
            >
              A Bit About Me
            </motion.h2>
            <motion.p variants={FADE_UP_ANIMATION} custom={0.1} className="text-base sm:text-lg leading-relaxed text-neutral-400 dark:text-neutral-300 mb-4">
              I'm a passionate developer with roots in the Himalayas and wings that have taken me across continents. My journey in technology is fueled by curiosity and creativity, blending technical expertise with an artistic vision.
            </motion.p>
            <motion.p variants={FADE_UP_ANIMATION} custom={0.2} className="text-base sm:text-lg leading-relaxed text-neutral-400 dark:text-neutral-300 mb-6 sm:mb-8">
              I approach problems from unique perspectives, always striving to craft elegant and effective digital solutions. Whether it's intricate code or intuitive design, I find joy in the process of creation.
            </motion.p>
            <motion.div variants={FADE_UP_ANIMATION} custom={0.3} className="flex flex-wrap gap-3 sm:gap-4">
              {[
                { href: "https://github.com/Jaemo12", icon: <Github />, label: "GitHub", color: "var(--neon-blue)", glowColor: "rgba(0, 243, 255, 0.4)" }, // Example: Replace # with actual links
                { href: "https://linkedin.com/in/amitsamant12", icon: <Linkedin />, label: "LinkedIn", color: "var(--neon-pink)", glowColor: "rgba(255, 0, 229, 0.4)" },
              ].map(item => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-neutral-100 bg-neutral-800/70 dark:bg-neutral-900/70 hover:bg-neutral-700/90 dark:hover:bg-neutral-800/90 transition-all duration-300 ease-out group"
                  style={{'--item-color': item.color, '--item-glow': item.glowColor} as React.CSSProperties}
                  whileHover={{ y: -2, scale: 1.03, borderColor: 'var(--item-color)', boxShadow: `0 0 15px -3px var(--item-glow), 0 0 8px -4px var(--item-color)`}}
                  whileTap={{scale: 0.98}}
                >
                  {React.cloneElement(item.icon as React.ReactElement, { size: 18, className: "mr-2 opacity-80 group-hover:opacity-100 transition-opacity", style: {color: 'var(--item-color)'} })}
                  <span className="group-hover:text-white transition-colors">{item.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Skills */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-950 dark:bg-black"> {/* Alternating background */}
        <div className="max-w-3xl mx-auto"> {/* Slightly narrower for focus */}
          <motion.h2
            className="font-figtree text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-neutral-100 dark:text-white cursor-default"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={FADE_UP_ANIMATION}
            whileHover={{
              scale: 1.01,
              textShadow: "0 0 12px var(--neon-purple), 0 0 18px rgba(157, 0, 255, 0.25)",
              transition: { duration: 0.25 }
            }}
          >
            My Core Competencies
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Trigger earlier for grid
            variants={STAGGER_CHILDREN_ANIMATION}
          >
            {skills.map((skill, idx) => (
              // ModernSkill already uses FADE_UP_ANIMATION internally
              <ModernSkill key={skill.name} {...skill} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 4: Education */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900 dark:bg-gray-950 relative overflow-hidden">
         <div className="absolute -bottom-20 -left-20 w-64 h-64 sm:w-80 sm:h-80 bg-[var(--neon-blue)]/5 rounded-full blur-3xl opacity-30 pointer-events-none transform rotate-45"></div>
         <div className="absolute -top-20 -right-20 w-64 h-64 sm:w-80 sm:h-80 bg-[var(--neon-pink)]/5 rounded-full blur-3xl opacity-25 pointer-events-none transform -rotate-45"></div>

        <div className="max-w-4xl mx-auto"> {/* Wider for timeline */}
          <motion.h2
            className="font-figtree text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-neutral-100 dark:text-white cursor-default"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={FADE_UP_ANIMATION}
            whileHover={{
              scale: 1.01,
              textShadow: "0 0 12px var(--neon-blue), 0 0 18px rgba(0, 243, 255, 0.25)",
              transition: { duration: 0.25 }
            }}
          >
            Education
          </motion.h2>
          <div className="relative space-y-10 md:space-y-0"> {/* Space for mobile, timeline for md+ */}
            {/* Central timeline bar for medium screens and up */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-neutral-700/50 dark:bg-neutral-800/50 transform -translate-x-1/2 rounded-full"></div>
            
            {educationItems.map((item, index) => (
              <motion.div
                key={item.title + index}
                className="md:flex md:items-center w-full group relative" // Added relative for dot positioning
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={FADE_UP_ANIMATION}
                custom={index * 0.15} // Stagger delay for education items
              >
                {/* Timeline Dot for medium screens and up */}
                <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ring-4 ring-slate-900 dark:ring-gray-950 z-10 transition-all duration-300 group-hover:scale-110
                  ${index % 2 === 0 ? 'left-1/2 -translate-x-[calc(50%+0.5px)]' : 'left-1/2 -translate-x-[calc(50%-0.5px)]' }`} // Precise centering on the line
                  style={{ backgroundColor: item.accentColor, boxShadow: `0 0 10px ${item.accentColor}80`}}
                ></div>

                {/* Card Content */}
                <div className={`w-full md:w-[calc(50%-1rem)] p-1 ${index % 2 === 0 ? 'md:ml-auto md:text-right' : 'md:mr-auto md:text-left'}`}>
                  <motion.div 
                    className="p-5 sm:p-6 bg-neutral-800/60 dark:bg-neutral-900/60 rounded-xl border border-neutral-700/70 dark:border-neutral-800/70 shadow-lg transition-all duration-300 ease-out"
                    style={{'--item-color': item.accentColor, '--item-glow': item.accentColor.replace('var(','').replace(')','').includes('blue') ? 'rgba(0,243,255,0.4)' : 'rgba(255,0,229,0.4)'} as React.CSSProperties}
                    whileHover={{
                        y: -4,
                        borderColor: 'var(--item-color)',
                        boxShadow: `0 0 20px -3px var(--item-glow), 0 5px 15px -7px var(--item-color)`
                    }}
                  >
                    <div className={`flex items-center gap-3 mb-2 sm:mb-2.5 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      {item.icon}
                      <h3 className="font-figtree text-lg sm:text-xl font-semibold text-neutral-100 dark:text-white">{item.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm mb-1 sm:mb-1.5 font-mono" style={{color: item.accentColor}}>{item.period}</p>
                    <p className="text-neutral-400 dark:text-neutral-300 text-sm sm:text-[0.9rem] mb-2">{item.subtitle}</p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
