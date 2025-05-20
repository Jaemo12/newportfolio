'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, Variants, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Code, Mountain, GraduationCap, Palette, ArrowDown, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic'; // Import next/dynamic

// Dynamically import Lottie with SSR turned off
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-800/50 rounded-full animate-pulse"></div> // Optional: Simple placeholder during load
});

import spaceman from './SpaceMan.json'; 

// --- Animation Variants ---

const FADE_UP_VARIANT: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay,
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1], 
    },
  }),
};

const STAGGER_PARENT_VARIANT: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
      delayChildren: 0.1, 
    },
  },
};

// --- Skill Component ---
interface SkillProps {
  name: string;
  levelDescription?: string; 
  icon?: React.ReactNode;
  accentColor?: string; 
}

const ModernSkill: React.FC<SkillProps> = ({ name, levelDescription, icon, accentColor = 'var(--gold-accent)' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isInView = useInView(ref, { once: true, amount: 0.3, margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-start p-4 sm:p-5 bg-slate-800/50 dark:bg-slate-900/70 rounded-xl border border-slate-700/80 dark:border-slate-800/80 shadow-lg transition-all duration-300 ease-out"
      initial="hidden"
      animate={isMounted && isInView ? "visible" : "hidden"}
      variants={FADE_UP_VARIANT}
      custom={0.1} 
      whileHover={{ 
        y: -4, 
        scale: 1.02, 
        borderColor: accentColor, 
        boxShadow: `0 0 20px -5px ${accentColor}60, 0 0 10px -7px ${accentColor}40` 
      }}
      style={{ '--current-accent': accentColor } as React.CSSProperties}
    >
      <div className="flex items-center mb-2.5">
        {icon && <span className="text-[var(--current-accent)] mr-2.5 opacity-90">{React.cloneElement(icon as React.ReactElement, { size: 20 })}</span>}
        <span className="text-slate-100 dark:text-slate-50 text-base sm:text-lg font-semibold font-manrope">{name}</span>
      </div>
      {levelDescription && (
         <p className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm font-inter">{levelDescription}</p>
      )}
    </motion.div>
  );
};


// --- Main AboutSection Component ---
const AboutSection: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const bioSectionRef = useRef<HTMLDivElement>(null); 
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const educationSectionRef = useRef<HTMLDivElement>(null);


  const defaultScrollYProgress = useMotionValue(0);

  const { scrollYProgress: heroScrollYProgressServer } = useScroll(
    isMounted && heroRef.current ? { target: heroRef, offset: ['start start', 'end start'] } : {}
  );
  const heroScrollYProgress = isMounted && heroRef.current ? heroScrollYProgressServer : defaultScrollYProgress;
  
  const heroTextYSpring = useSpring(useTransform(heroScrollYProgress, [0, 0.8], ['0%', '-70%']), { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroTextOpacity = useTransform(heroScrollYProgress, [0, 0.5, 0.85], [1, 1, 0]);
  
  const lottieScaleSpring = useSpring(useTransform(heroScrollYProgress, [0, 0.8], [1, 0.2]), { stiffness: 100, damping: 30 });
  const lottieYSpring = useSpring(useTransform(heroScrollYProgress, [0, 0.8], ['0%', '80%']), { stiffness: 100, damping: 30 });
  const lottieOpacity = useTransform(heroScrollYProgress, [0, 0.65, 0.9], [0.9, 0.9, 0]);


  // Data
  const skills: SkillProps[] = [
    { name: 'Next.js & React Ecosystem', levelDescription: "Advanced proficiency, building scalable SPAs & SSR apps.", icon: <Code />, accentColor: 'var(--gold-accent)' },
    { name: 'TypeScript & JavaScript (ESNext)', levelDescription: "Strong expertise in modern JS and static typing.", icon: <Code />, accentColor: 'var(--teal-accent)' },
    { name: 'UI/UX Design & Prototyping', levelDescription: "Figma, Adobe XD. User-centered design principles.", icon: <Palette />, accentColor: 'var(--gold-accent)' },
    { name: 'Node.js, Express & NestJS', levelDescription: "Building robust RESTful & GraphQL APIs.", icon: <Code />, accentColor: 'var(--teal-accent)' },
    { name: 'Databases (SQL & NoSQL)', levelDescription: "PostgreSQL, MongoDB, Firebase.", icon: <Code />, accentColor: 'var(--gold-accent)' },
    { name: 'Cloud & DevOps (AWS, Docker)', levelDescription: "CI/CD, Serverless, Containerization.", icon: <Mountain />, accentColor: 'var(--teal-accent)' },
  ];

  const educationItems = [
    {
      icon: <GraduationCap size={24} style={{color: 'var(--gold-accent)'}}/>,
      title: "Master's in Artificial Intelligence",
      subtitle: 'Texas A&M University, Corpus Christi',
      period: '2022 - 2024',
      description: 'Deep dived into advanced AI, machine learning, and distributed systems, culminating in a significant research project on Natural Language Processing applications.',
      accentColor: 'var(--gold-accent)',
    },
    {
      icon: <GraduationCap size={24} style={{color: 'var(--teal-accent)'}}/>,
      title: "Bachelor's in Computer Science",
      subtitle: 'DIT University, India',
      period: '2016 - 2020',
      description: 'Established a comprehensive foundation in core computer science principles, data structures, algorithms, and modern software engineering methodologies.',
      accentColor: 'var(--teal-accent)',
    },
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <section className="h-screen flex items-center justify-center">
             <p className="text-slate-400 text-xl">Loading About Me...</p>
        </section>
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900">
            <p className="text-slate-400 text-xl text-center">Loading content...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-200 font-inter antialiased">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
          --gold-accent: #FFC300; 
          --teal-accent: #4FD1C5; 
          --font-body: 'Inter', sans-serif;
          --font-heading-display: 'Manrope', sans-serif;
          --font-heading-section: 'Manrope', sans-serif;
          --slate-700-grid: #334155; 
        }

        body {
          font-family: var(--font-body);
          background-color: #0D1B2A; 
          color: #E0E7FF; 
        }

        .font-manrope { font-family: var(--font-heading-section); }
        .font-manrope-display { font-family: var(--font-heading-display); }
        
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #1e293b; } 
        ::-webkit-scrollbar-thumb { background: #475569; border-radius: 3px; } 
        ::-webkit-scrollbar-thumb:hover { background: #64748b; } 
        * { scrollbar-width: thin; scrollbar-color: #475569 #1e293b; }
        
        @keyframes subtleGridPulse {
          0%, 100% { opacity: 0.02; transform: scale(1); }
          50% { opacity: 0.04; transform: scale(1.01); }
        }
        .animate-subtle-grid-pulse {
          animation: subtleGridPulse 10s ease-in-out infinite;
        }
      `}</style>

      {/* Section 1: Hero */}
      <section ref={heroRef} className="min-h-screen h-screen flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.02] 
          bg-[linear-gradient(to_right,var(--slate-700-grid)_0.5px,transparent_0.5px),linear-gradient(to_bottom,var(--slate-700-grid)_0.5px,transparent_0.5px)] 
          bg-[size:30px_30px] 
          animate-subtle-grid-pulse" 
        />

        <motion.div
          style={{ opacity: heroTextOpacity, y: heroTextYSpring }}
          className="text-center z-10 relative"
        >
          <motion.h1
            variants={FADE_UP_VARIANT} initial="hidden" animate="visible" custom={0}
            className="font-manrope-display text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter mb-4 sm:mb-5"
          >
            {Array.from("Hello,").map((letter, i) => (
              <motion.span key={`h-${i}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 + i * 0.03, ease: [0.22,1,0.68,1]}} className="inline-block text-slate-100">
                {letter}
              </motion.span>
            ))}
            <br />
            {Array.from("I'm [Your Name]").map((letter, i) => ( // REPLACE [Your Name]
              <motion.span key={`n-${i}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 + i * 0.03, ease: [0.22,1,0.68,1]}}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-accent)] via-[#FFD700] to-[var(--teal-accent)]"
                style={{textShadow: `0 0 15px var(--gold-accent)50, 0 0 10px var(--teal-accent)30`}}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            variants={FADE_UP_VARIANT} initial="hidden" animate="visible" custom={0.5} 
            className="text-slate-300 text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-8 sm:mb-10 font-light"
          >
            A creative Full-Stack Developer & UI/UX enthusiast, turning complex ideas into elegant digital experiences.
          </motion.p>
        </motion.div>

        {/* Conditionally render Lottie only on client and if spaceman data is available */}
        {isMounted && spaceman && (
          <motion.div
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 absolute bottom-[12vh] sm:bottom-[10vh] left-1/2 -translate-x-1/2 z-0"
            style={{ scale: lottieScaleSpring, y: lottieYSpring, opacity: lottieOpacity }}
          >
            <Lottie animationData={spaceman} loop={true} />
          </motion.div>
        )}

        <motion.div
            className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ 
                opacity: {delay: 1.0, duration: 0.8, ease: "circOut" },
                y: {duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1.2} // y transition for bounce
            }}
        >
          <ArrowDown size={20} className="opacity-60"/>
        </motion.div>
      </section>

      {/* Section 2: Bio / Who I Am */}
      <section ref={bioSectionRef} className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-900/70 dark:bg-gray-950/70 backdrop-blur-sm relative">
        <div className="absolute inset-0 -z-10 opacity-5">
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[var(--gold-accent)]/20 to-transparent blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[var(--teal-accent)]/20 to-transparent blur-3xl"></div>
        </div>
        
        <motion.div 
          className="max-w-5xl xl:max-w-6xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-16 items-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={STAGGER_PARENT_VARIANT}
        >
          <motion.div
            variants={FADE_UP_VARIANT}
            className="relative group aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl order-1 md:order-none"
            whileHover={{ scale: 1.02, transition: {duration:0.3} }}
          >
            {isMounted && ( // Conditionally render Image
              <Image
                src="/hero.jpeg" alt="Amit Samant - Profile" fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/10 group-hover:from-slate-900/30 transition-opacity duration-300"></div>
            <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{borderColor: 'var(--gold-accent)', boxShadow: `0 0 20px var(--gold-accent)70, inset 0 0 15px var(--gold-accent)40`}}
            />
          </motion.div>

          <motion.div variants={STAGGER_PARENT_VARIANT} className="space-y-5 sm:space-y-6">
            <motion.h2 variants={FADE_UP_VARIANT} className="font-manrope-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50"
              style={{textShadow: `0 0 10px var(--gold-accent)30`}}
            >
              A Bit About Me
            </motion.h2>
            <motion.p variants={FADE_UP_VARIANT} className="text-base sm:text-lg leading-relaxed text-slate-300 dark:text-slate-200">
              Im a passionate developer with roots in the Himalayas and wings that have taken me across continents. My journey in technology is fueled by curiosity and creativity, blending technical expertise with an artistic vision.
            </motion.p>
            <motion.p variants={FADE_UP_VARIANT} className="text-base sm:text-lg leading-relaxed text-slate-300 dark:text-slate-200">
              I approach problems from unique perspectives, always striving to craft elegant and effective digital solutions. Whether it&apos;s intricate code or intuitive design, I find joy in the process of creation.
            </motion.p>
            <motion.div variants={FADE_UP_VARIANT} className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              {[
                { href: "https://github.com/Jaemo12", icon: <Github />, label: "GitHub", color: "var(--gold-accent)"},
                { href: "https://linkedin.com/in/amitsamant12", icon: <Linkedin />, label: "LinkedIn", color: "var(--teal-accent)"},
              ].map(item => (
                <motion.a
                  key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2.5 border text-sm font-semibold rounded-lg text-slate-100 transition-all duration-300 ease-out group"
                  style={{borderColor: `${item.color}50`, background: `${item.color}10`}}
                  whileHover={{ y: -3, scale: 1.04, borderColor: item.color, background: `${item.color}20`, boxShadow: `0 0 15px -2px ${item.color}70`}}
                  whileTap={{scale: 0.97}}
                >
                  {React.cloneElement(item.icon as React.ReactElement, { size: 18, className: "mr-2 opacity-80 group-hover:opacity-100 transition-opacity", style: {color: item.color} })}
                  <span className="group-hover:text-white transition-colors">{item.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 3: Skills */}
      <section ref={skillsSectionRef} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 dark:bg-black">
        <motion.div 
          className="max-w-4xl mx-auto" 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={STAGGER_PARENT_VARIANT}
        >
          <motion.h2 variants={FADE_UP_VARIANT}
            className="font-manrope-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 text-slate-50"
            style={{textShadow: `0 0 10px var(--teal-accent)30`}}
          >
            My Core Competencies
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" 
            variants={STAGGER_PARENT_VARIANT}
          >
            {skills.map((skill) => (
              <ModernSkill key={skill.name} {...skill} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Section 4: Education */}
      <section ref={educationSectionRef} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900 dark:bg-gray-950 relative overflow-hidden">
         <div className="absolute -bottom-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 bg-[var(--gold-accent)]/5 rounded-full blur-3xl opacity-30 pointer-events-none transform rotate-12"></div>
         <div className="absolute -top-24 -right-24 w-80 h-80 sm:w-96 sm:h-96 bg-[var(--teal-accent)]/5 rounded-full blur-3xl opacity-25 pointer-events-none transform -rotate-12"></div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={STAGGER_PARENT_VARIANT}
        >
          <motion.h2 variants={FADE_UP_VARIANT}
            className="font-manrope-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 text-slate-50"
             style={{textShadow: `0 0 10px var(--gold-accent)30`}}
          >
            Education & Milestones
          </motion.h2>
          <div className="relative space-y-10 md:space-y-0">
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-700/70 dark:bg-slate-800/70 transform -translate-x-1/2 rounded-full"></div>
            
            {educationItems.map((item, index) => (
              <motion.div
                key={item.title + index}
                className="md:flex md:items-start w-full group relative" 
                variants={FADE_UP_VARIANT} 
              >
                <div className={`hidden md:flex absolute top-0 w-5 h-5 rounded-full ring-4 ring-slate-900 dark:ring-gray-950 z-10 transition-all duration-300 group-hover:scale-110 items-center justify-center
                  ${index % 2 === 0 ? 'left-1/2 -translate-x-[calc(50%+2px)] md:mt-1' : 'left-1/2 -translate-x-[calc(50%-2px)] md:mt-1' }`}
                  style={{ backgroundColor: item.accentColor, boxShadow: `0 0 12px ${item.accentColor}99`}}
                >
                   <div className="w-2 h-2 bg-slate-900 dark:bg-gray-950 rounded-full"></div>
                </div>

                <div className={`w-full md:w-[calc(50%-2.5rem)] p-1 ${index % 2 === 0 ? 'md:ml-auto md:pl-10 text-right' : 'md:mr-auto md:pr-10 text-left'}`}>
                  <motion.div 
                    className="p-5 sm:p-6 bg-slate-800/70 dark:bg-slate-900/70 rounded-2xl border border-slate-700/80 dark:border-slate-800/80 shadow-xl transition-all duration-300 ease-out"
                    style={{'--item-accent': item.accentColor} as React.CSSProperties}
                    whileHover={{
                        y: -5,
                        scale: 1.015,
                        borderColor: 'var(--item-accent)',
                        boxShadow: `0 0 28px -6px ${item.accentColor.replace('var(','').replace(')','')}50, 0 10px 20px -10px ${item.accentColor.replace('var(','').replace(')','')}30`
                    }}
                  >
                    <div className={`flex items-center gap-3 mb-2 sm:mb-2.5 ${index % 2 === 0 ? 'md:flex-row-reverse ' : ''} ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      {item.icon}
                      <h3 className="font-manrope text-lg sm:text-xl font-semibold text-slate-100 dark:text-white">{item.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm mb-1 sm:mb-1.5 font-mono" style={{color: item.accentColor}}>{item.period}</p>
                    <p className="text-slate-300 dark:text-slate-200 text-sm sm:text-[0.9rem] mb-2">{item.subtitle}</p>
                    <p className="text-slate-400 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutSection;