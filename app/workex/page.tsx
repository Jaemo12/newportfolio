'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Eye, ExternalLink } from 'lucide-react';

// --- Data Interface and Sample Data (Beige Aesthetic Colors) ---
interface WorkExperience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  images: string[];
  tech: string[];
  color: string; // Main accent color
  glowColor: string; // For glow effects
  thumbnail: string; 
  heroImage?: string; 
  website?: string;
}

const workExperienceData: WorkExperience[] = [
  {
    id: 1,
    company: "Cognixia",
    role: "Quality Engineering Lead",
    period: "Feb 2025 - Present",
    description: "Spearheading automated testing initiatives using Selenium and Tosca. Successfully reduced manual testing cycles by 35% and increased test coverage by 30%, significantly improving software reliability and deployment speed.",
    images: ["/cognixia1.jpeg", "/cognixia2.webp", "/cognixia3.png"], // REPLACE
    tech: ["Selenium", "Tosca", "Java", "Jira API", "Postman Pro", "Agile", "SQL Server"],
    color: "#D8A38B", // Muted Terracotta/Dusty Rose
    glowColor: "rgba(216, 163, 139, 0.5)", 
    thumbnail: "cognixia1.jpeg", // REPLACE
    heroImage: "cognixia3.png", // REPLACE
    website: "https://www.cognixia.com",
  },
  {
    id: 2,
    company: "TIMIO",
    role: "AI Chrome Extension Architect",
    period: "May 2024 - Feb 2025",
    description: "Architected and developed an AI-driven Chrome extension for contextual news analysis. Utilized AWS for scalable backend infrastructure and React with Tailwind CSS for a dynamic frontend, achieving a 45% increase in daily active users.",
    images: ["/workex/timio1.png", "/workex/timio2.png", "/workex/timio3.png"], // REPLACE
    tech: ["React", "TypeScript", "AWS", "Tailwind CSS", "Node.js", "GPT-3 API"],
    color: "#A3B18A", // Soft Sage Green
    glowColor: "rgba(163, 177, 138, 0.5)",
    thumbnail: "/workex/timio1.png", // REPLACE
    heroImage: "/workex/timio2.jpg", // REPLACE
  },
  {
    id: 3,
    company: "Cognizant",
    role: "Senior Software Engineer",
    period: "Jul 2020 - May 2022",
    description: "Delivered robust full-stack solutions for enterprise clients using React, Angular, and Java Spring Boot. Championed the adoption of Docker and Kubernetes for CI/CD on Azure, enhancing deployment efficiency by over 50%.",
    images: ["cognizant.jpg", "/cognizant1.jpg", "/cognizant3.jpg"], // REPLACE
    tech: ["React", "Angular", "Java", "Spring Boot", "Docker", "Kubernetes", "Azure"],
    color: "#B08D57", // Warm Muted Gold/Brown
    glowColor: "rgba(176, 141, 87, 0.5)",
    thumbnail: "/cognizant.jpg", // REPLACE
    heroImage: "/cognizant1.jpg", // REPLACE
    website: "https://www.cognizant.com",
  }
];

// --- Reusable UI Components ---

const TechChip = ({ name, color }: { name: string; color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: "circOut" }}
    whileHover={{ 
      y: -2, 
      scale: 1.03, 
      boxShadow: `0 4px 12px -2px ${color}60, 0 0 8px ${color}40`,
      borderColor: `${color}90`
    }}
    className="px-3.5 py-1.5 text-[11px] font-medium rounded-md mr-2 mb-2 border cursor-default shadow-sm"
    style={{
      borderColor: `${color}70`,
      backgroundColor: `${color}15`,
      color: color,
      boxShadow: `0 1px 3px ${color}20`,
    }}
  >
    {name}
  </motion.div>
);

const AnimatedText = ({
  text,
  delay = 0,
  className = "",
  as: Component = 'p',
  stagger = 0.008,
  yOffset = 8,
  duration = 0.5,
}: {
  text: string;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  stagger?: number;
  yOffset?: number;
  duration?: number;
}) => {
  const elements = text.split(/(\s+)/); 

  return (
    <Component className={className}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: yOffset }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: delay + index * stagger, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={element === ' ' ? { width: '0.25em' } : {}}
        >
          {element}
        </motion.span>
      ))}
    </Component>
  );
};

const AnimatedLine = ({ color, className = "" }: { color: string, className?: string }) => {
  return (
    <div className={`w-full h-px bg-stone-300/40 dark:bg-stone-700/40 relative ${className}`}>
      <motion.div
        className="h-[1.5px] absolute top-0 left-0"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{
          background: `linear-gradient(90deg, ${color}AA, ${color}30, transparent)`,
          boxShadow: `0 0 10px ${color}60`,
        }}
      />
    </div>
  );
};

const ImageModal = ({ isOpen, onClose, image, color }: { isOpen: boolean; onClose: () => void; image: string; color: string; }) => {
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-stone-900/85 dark:bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 280, duration: 0.35 }}
            className="relative max-w-4xl w-auto max-h-[90vh] rounded-lg overflow-hidden shadow-2xl border"
            style={{ borderColor: `${color}AA`, boxShadow: `0 0 50px -10px ${color}70` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-auto h-auto max-h-[85vh] aspect-auto bg-beige-50 dark:bg-stone-900">
              <Image 
                src={image} 
                alt="Project detail screenshot" 
                width={1200} height={800}
                style={{ width: 'auto', height: 'auto', maxHeight: '85vh', maxWidth: '90vw', objectFit: 'contain' }}
                className="rounded-md"
                priority
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180, backgroundColor: `${color}20` }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border bg-beige-100/80 dark:bg-stone-800/80"
              onClick={onClose} style={{ borderColor: `${color}AA`, color: color }} aria-label="Close image modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ImageGallery = ({ images, color }: { images: string[]; color: string; }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const openModal = (image: string) => { setSelectedImage(image); setModalOpen(true); };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {images.map((img, i) => (
          <motion.div
            key={img + i}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07, ease: "circOut" }}
            whileHover={{ 
              y: -5, 
              scale: 1.03, 
              boxShadow: `0 8px 20px -4px ${color}50, 0 0 15px ${color}40`,
              borderColor: `${color}80`
            }}
            className="group cursor-pointer relative aspect-[16/10] rounded-lg overflow-hidden border shadow-md bg-beige-100 dark:bg-stone-800"
            style={{ borderColor: `${color}50`, boxShadow: `0 0 8px ${color}20` }}
            onClick={() => openModal(img)}
          >
            <Image src={img} alt={`Project visual ${i + 1}`} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
              <Eye size={18} className="text-white opacity-70 group-hover:opacity-90" style={{filter: `drop-shadow(0 0 4px ${color})`}}/>
            </div>
          </motion.div>
        ))}
      </div>
      <ImageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} image={selectedImage} color={color} />
    </>
  );
};

const ExperienceSection = ({ experience, isActive, sectionRef }: { 
  experience: WorkExperience; 
  isActive: boolean; 
  sectionRef: React.RefObject<HTMLDivElement>;
}) => {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const heroImageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.06, 0]); 
  
  const contentInitial = { opacity: 0, y: 25 };
  const contentAnimate = { opacity: 1, y: 0 };
  const contentTransition = (delay: number) => ({ duration: 0.55, delay, ease: "circOut" });

  return (
    <section
      ref={sectionRef}
      id={`experience-${experience.id}`}
      className="min-h-[80vh] md:min-h-screen flex flex-col justify-center py-20 md:py-28 relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {experience.heroImage && (
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImageY, opacity: heroImageOpacity }}>
          <Image
            src={experience.heroImage}
            alt={`${experience.company} abstract background`}
            fill quality={65}
            className="object-cover blur-xl"
            priority={isActive}
          />
        </motion.div>
      )}
      
      <div className="container mx-auto w-full max-w-screen-lg z-10 relative">
        <motion.div 
          initial={contentInitial}
          whileInView={contentAnimate}
          viewport={{ once: true, amount: 0.1 }}
          transition={contentTransition(0)}
          className="bg-beige-50/80 dark:bg-stone-900/80 backdrop-blur-2xl p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl border border-stone-300/40 dark:border-stone-700/40"
          style={{
             boxShadow: isActive ? `0 0 30px -5px ${experience.glowColor}, 0 10px 20px -10px ${experience.glowColor}50` : `0 10px 20px -10px rgba(0,0,0,0.1)`,
             borderColor: isActive ? `${experience.color}70` : `${experience.color}30`,
             transition: 'box-shadow 0.4s ease-out, border-color 0.4s ease-out',
          }}
        >
          <header className="mb-6 md:mb-8 text-center md:text-left">
            <motion.h2 
              initial={contentInitial} whileInView={contentAnimate} viewport={{ once: true, amount: 0.2 }} transition={contentTransition(0.05)}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-dm-serif text-stone-700 dark:text-beige-100 mb-2 group"
              style={{color: experience.color}}
              whileHover={{textShadow: `0 0 10px ${experience.glowColor}`, transition: {duration: 0.2}}}
            >
              {experience.company}
            </motion.h2>
            <motion.h3 
              initial={contentInitial} whileInView={contentAnimate} viewport={{ once: true, amount: 0.2 }} transition={contentTransition(0.1)}
              className="text-xl sm:text-2xl font-manrope font-semibold text-stone-600 dark:text-stone-300 mb-1"
            >
              {experience.role}
            </motion.h3>
            <motion.p 
              initial={contentInitial} whileInView={contentAnimate} viewport={{ once: true, amount: 0.2 }} transition={contentTransition(0.15)}
              className="text-xs sm:text-sm font-mono text-stone-500 dark:text-stone-400"
            >
              {experience.period}
              {experience.website && (
                <a 
                  href={experience.website} target="_blank" rel="noopener noreferrer" 
                  className="inline-flex items-center ml-3 hover:underline transition-colors group"
                  style={{color: experience.color}}
                  onMouseEnter={(e) => (e.currentTarget.style.textShadow = `0 0 5px ${experience.glowColor}`)}
                  onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
                >
                  <ExternalLink size={12} className="mr-1 transition-transform group-hover:translate-x-0.5"/> Visit Site
                </a>
              )}
            </motion.p>
          </header>

          <AnimatedText
            text={experience.description}
            as="p"
            className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed md:leading-loose mb-8"
            delay={0.2}
            stagger={0.005}
          />

          <motion.div
            initial={contentInitial} whileInView={contentAnimate} viewport={{ once: true, amount: 0.15 }} transition={contentTransition(0.25)}
            className="mb-8"
          >
            <h4 className="text-sm font-manrope font-semibold uppercase tracking-wider mb-3" style={{ color: experience.color }}>Key Technologies</h4>
            <div className="flex flex-wrap">
              {experience.tech.map((tech) => (
                <TechChip key={tech} name={tech} color={experience.color} />
              ))}
            </div>
          </motion.div>

          {experience.images.length > 0 && (
            <motion.div initial={contentInitial} whileInView={contentAnimate} viewport={{ once: true, amount: 0.15 }} transition={contentTransition(0.3)}>
              <h4 className="text-sm font-manrope font-semibold uppercase tracking-wider mb-4" style={{ color: experience.color }}>Visual Showcase</h4>
              <ImageGallery images={experience.images} color={experience.color} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const StickySideNav = ({ experiences, activeIndex }: {
  experiences: WorkExperience[];
  activeIndex: number;
}) => {
  const scrollToSection = (id: number) => {
    const section = document.getElementById(`experience-${id}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <nav className="fixed top-1/2 right-3 sm:right-4 md:right-6 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center space-y-3.5">
      {experiences.map((exp, index) => (
        <div key={exp.id} className="relative flex items-center group">
          <motion.button
            onClick={() => scrollToSection(exp.id)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out border-2 hover:scale-125`}
            style={{
              backgroundColor: activeIndex === index ? exp.color : 'rgba(120, 113, 108, 0.2)',
              borderColor: activeIndex === index ? exp.color : 'rgba(120, 113, 108, 0.3)',
              boxShadow: activeIndex === index ? `0 0 10px ${exp.glowColor}, 0 0 5px ${exp.color}` : 'none'
            }}
            aria-label={`Go to ${exp.company} section`}
            whileHover={{ scale: 1.6, boxShadow: `0 0 12px ${exp.glowColor}`, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
          />
          <AnimatePresence>
            {/* Tooltip - using Tailwind group-hover for visibility */}
            <span
              className="absolute right-full mr-3 px-2.5 py-1 text-[10px] text-stone-700 bg-beige-100/95 dark:text-beige-100 dark:bg-stone-700/95 rounded-md shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 delay-75"
            >
              {exp.company}
            </span>
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
};

export default function PortfolioExperienceV2() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // --- CORRECTED Ref Initialization ---
  // Create individual refs at the top level
  const sectionRef1 = useRef<HTMLDivElement>(null);
  const sectionRef2 = useRef<HTMLDivElement>(null);
  const sectionRef3 = useRef<HTMLDivElement>(null);
  // ...add more refs if workExperienceData has more items

  // Assign them to an array. This array's identity is stable.
  const sectionRefs = [sectionRef1, sectionRef2, sectionRef3]; 
  // Make sure the number of refs matches workExperienceData.length
  // If workExperienceData.length can change, this approach needs to be more dynamic
  // but for a fixed length array, this is the most straightforward fix for the hook rule.

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40% 0px',
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = parseInt(entry.target.id.split('-')[1]);
          const index = workExperienceData.findIndex(exp => exp.id === id);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRefs = sectionRefs.filter(ref => ref.current); // Filter out any potentially null refs if logic changes
    
    currentRefs.forEach(ref => {
      if (ref.current) { // Double check ref.current before observing
          observer.observe(ref.current);
      }
    });

    return () => {
      currentRefs.forEach(ref => {
        if (ref.current) { // Double check ref.current before unobserving
            observer.unobserve(ref.current);
        }
      });
    };
  // IMPORTANT: The dependency array for useEffect.
  // If sectionRefs array is recreated on every render (e.g. if it was `workExperienceData.map(...)` directly inside the component body without useMemo),
  // this useEffect would run on every render.
  // By creating refs individually and putting them in an array whose reference is stable (or memoized), this is fine.
  // For this specific fix, since sectionRefs is now constructed from top-level useRef calls, its identity is stable.
  }, [sectionRefs]); // Dependency on sectionRefs array itself.


  return (
    <div className="w-full relative bg-beige-50 dark:bg-slate-950 text-stone-800 dark:text-slate-100 font-inter overflow-x-hidden">
      <header className="py-16 md:py-20 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: "circOut" }}
          className="text-4xl sm:text-5xl md:text-[3.25rem] font-bold font-dm-serif tracking-tight text-stone-700 dark:text-beige-50 mb-3 group"
          whileHover={{textShadow: `0 0 12px ${workExperienceData[activeIndex]?.glowColor || 'rgba(216, 163, 139, 0.4)'}`, transition: {duration: 0.2}}}
        >
          Professional <span style={{ color: workExperienceData[activeIndex]?.color || '#D8A38B' }}>Journey</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease: "circOut" }}
          className="text-base sm:text-lg text-stone-500 dark:text-stone-400 max-w-lg mx-auto font-manrope"
        >
          Exploring roles, projects, and technologies that have shaped my career.
        </motion.p>
        <AnimatedLine color={workExperienceData[activeIndex]?.color || '#D8A38B'} className="mt-8 max-w-md mx-auto" />
      </header>

      <main className="relative">
        {workExperienceData.map((exp, index) => (
          <ExperienceSection
            key={exp.id}
            experience={exp}
            isActive={index === activeIndex}
            sectionRef={sectionRefs[index]} // Pass the corresponding ref from the array
          />
        ))}
      </main>

      <StickySideNav experiences={workExperienceData} activeIndex={activeIndex} />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap');

        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }
        body {
          background-color: #FDFBF5;
          overflow-x: hidden;
          color: #4A403A;
        }
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #0A0F1E;
            color: #E2E8F0;
          }
        }

        .font-dm-serif { font-family: 'DM Serif Display', serif; }
        .font-manrope { font-family: 'Manrope', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'Roboto Mono', monospace; }
      `}</style>
    </div>
  );
}
