'use client';

import React, { useState, useRef, useEffect } from 'react'; // Added useEffect
import { motion, useInView, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MacBookModal = dynamic(() => import('../components/macBookModal'), {
  ssr: false
});

// Define Project Interface - ADDED color and glowColor
interface Project {
  title: string;
  description: string;
  images: string[]; 
  technologies: string[];
  features: string[]; 
  stats: { [key: string]: string }; 
  link: string; 
  github: string; 
  color: string; // Added for modal styling
  glowColor: string; // Added for modal styling
}

const ProjectsShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentModalProjectIndex, setCurrentModalProjectIndex] = useState(0); 
  
  const projects: Project[] = [
    {
      title: "AI DIARY",
      description: "I was chatting with a friend who mentioned how journaling helped them, but they often struggled to see patterns or get deeper insights. That sparked an idea: what if a journal could offer gentle, AI-driven reflections? That's how MindScape (AI Diary) was born – an AI-powered journaling app designed to foster self-reflection and emotional well-being. It uses advanced natural language processing to analyze entries, offering personalized insights and support.",
      images: ["/aidiary1.png", "/aidiary2.png", "/aidiary3.png","/aidiary4.png","/aidiary5.png","/aidiary6.png","/aidiary7.png","/aidiary8.png","/aidiary9.png","/aidiary10.png"],
      technologies: ["React.js", "Firebase", "Tailwind CSS", "Gemini API", "TypeScript"],
      features: [
        "AI-driven mood analysis & personalized insights",
        "Secure and private journaling environment",
        "Interactive chatbot for emotional support",
        "Track mood trends and identify triggers"
      ],
      stats: {
        reviews: "50+",
        satisfactionRate: "92%",
        insightsGenerated: "200+"
      },
      link: "#",
      github: "#",
      color: "#00FFCC", // Example Neon Cyan
      glowColor: "rgba(0, 255, 204, 0.5)" 
    },
    {
      title: "REVIEWFLIX",
      description: "A movie buff buddy of mine was complaining about generic movie recommendations. 'They just don't get my vibe!' he said. It got me thinking: what if recommendations could understand the *emotion* behind reviews, not just star ratings? And so, ReviewFlix came to be – a platform leveraging sentiment analysis and emotional intelligence on TMDB reviews for truly personalized suggestions.",
      images: ["/reviewflix.png", "/reviewflix_screen1.png", "/reviewflix_screen2.png"],
      technologies: ["Next.js", "Framer Motion", "Python", "Sentiment Analysis", "MongoDB"],
      features: [
        "Personalized movie recommendations",
        "Emotion-based filtering",
        "Deep dive into review sentiment",
        "User-friendly interface"
      ],
      stats: {
        users: "50+",
        moviesAnalyzed: "100K+",
        positiveRecommendations: "90%"
      },
      link: "#",
      github: "#",
      color: "#FF00A2", // Example Neon Magenta
      glowColor: "rgba(255, 0, 162, 0.5)"
    },
    {
      title: "RECIPEGENIUS",
      description: "My cousin, a budding home cook, often felt overwhelmed by complex recipes and wished for something tailored to *her* tastes and available ingredients. 'I wish cooking was less guesswork and more... genius!' she joked. That conversation was the seed for RecipeGenius, a culinary companion that uses AI to generate unique, personalized recipes, making cooking creative and fun.",
      images: ["/recipe.png", "/recipe_screen1.png", "/recipe_screen2.png"],
      technologies: ["Next.js", "Firebase", "Gemini API", "TypeScript", "Edamam API"],
      features: [
        "AI-powered recipe generation",
        "Intuitive search and filtering",
        "Personalized dietary recommendations",
        "Step-by-step cooking instructions"
      ],
      stats: {
        recipesGenerated: "10,000+",
        users: "50+",
        averageRating: "4.5/5"
      },
      link: "#",
      github: "#",
      color: "#9D00FF", // Example Neon Purple
      glowColor: "rgba(157, 0, 255, 0.5)"
    }
  ];

  const handleNextModal = () => {
    const nextIndex = (currentModalProjectIndex + 1) % projects.length;
    setCurrentModalProjectIndex(nextIndex);
    setSelectedProject(projects[nextIndex]);
  };

  const handlePrevModal = () => {
    const prevIndex = (currentModalProjectIndex - 1 + projects.length) % projects.length;
    setCurrentModalProjectIndex(prevIndex);
    setSelectedProject(projects[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f5e6d3] overflow-x-hidden">
      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nabla:EDPT,EHLT@79,8&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');
          
          .nabla-font {
            font-family: 'Nabla', system-ui;
            font-optical-sizing: auto;
            font-variation-settings: "EDPT" 79, "EHLT" 8;
          }
          .font-roboto-mono {
            font-family: 'Roboto Mono', monospace;
          }
          /* Custom scrollbar for webkit browsers (optional) */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #2a2a2a;
          }
          ::-webkit-scrollbar-thumb {
            background: #4a4a4a;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #ff6b6b;
          }
        `}
      </style>

      <div className="fixed inset-0 opacity-[0.025] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2Y1ZTZkMyI+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iNjAiIHg9IjE1IiB5PSIwIi8+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjEiIHg9IjAiIHk9IjE1Ii8+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iNjAiIHg9IjMwIiB5PSIwIi8+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjEiIHg9IjAiIHk9IjMwIi8+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      <div className="p-6 sm:p-8 md:p-12 lg:p-16 relative z-10">
        <AnimatedHeader />
        
        <div className="grid gap-20 md:gap-28 lg:gap-36 mt-20 md:mt-28 lg:mt-32">
          {projects.map((project, index) => (
            <ProjectItem 
              key={project.title} 
              project={project} 
              index={index}
              onOpenModal={() => {
                setSelectedProject(project);
                setCurrentModalProjectIndex(index);
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <MacBookModal
            project={selectedProject} // This now passes a Project object that includes color and glowColor
            onClose={() => setSelectedProject(null)}
            onNext={handleNextModal}
            onPrev={handlePrevModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const AnimatedHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  const words = ["SPARK", "DESIGN", "DELIVER"];
  const subtitle = "IDEAS BROUGHT TO LIFE";
  
  return (
    <motion.div 
      ref={ref}
      className="mb-16 md:mb-20 lg:mb-24 relative"
    >
      <div className="overflow-hidden">
        {words.map((word, i) => (
          <div key={word} className="overflow-hidden flex items-center gap-2 sm:gap-3 md:gap-4">
            <motion.div
              initial={{ x: "-100%" }}
              animate={isInView ? { x: 0 } : { x: "-100%" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="h-[2px] bg-[#ff6b6b] w-12 sm:w-16 md:w-24"
            />
            <motion.div
              initial={{ y: "100%", x: "-10%" }}
              animate={isInView ? { y: 0, x: 0 } : { y: "100%", x: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
            >
              <h2 className="nabla-font text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#f5e6d3] mix-blend-difference">
                {word}
              </h2>
            </motion.div>
          </div>
        ))}
      </div>

      <motion.div 
        className="absolute top-0 right-0 text-right"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.8, delay: 0.45 }}
      >
        <p className="nabla-font text-base sm:text-lg md:text-xl text-[#ff6b6b]">{subtitle}</p>
        <p className="text-sm sm:text-base md:text-lg text-[#f5e6d3]/90 font-roboto-mono mt-1">PROJECTS/2024</p>
      </motion.div>
    </motion.div>
  );
};

const ProjectItem = ({ project, index, onOpenModal }: { project: Project; index: number; onOpenModal: () => void; }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px -50px 0px", amount: 0.1 }); 
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.12 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(3px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative"
    >
      <div className="absolute inset-0 bg-[#2a2a2a]/40 rounded-xl shadow-xl transition-all duration-300 ease-out group-hover:bg-[#2a2a2a]/60 group-hover:shadow-2xl transform group-hover:scale-[1.005]"></div>

      <div className={`relative p-6 sm:p-8 md:p-10 grid md:grid-cols-12 gap-6 md:gap-10 items-center`}>
        <motion.div 
          variants={childVariants}
          className={`md:col-span-7 rounded-lg overflow-hidden shadow-lg aspect-video md:aspect-[16/9] relative
            ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} 
          `}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0.7, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.7, x: -30 }}
              transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
              className="w-full h-full"
            >
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
                width={1280} 
                height={720}
                className="w-full h-full object-cover"
                priority={index < 1 && currentImageIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a1a]/40"></div>

          {project.images.length > 1 && (
            <>
              <motion.button
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 p-2 bg-[#1a1a1a]/50 hover:bg-[#ff6b6b]/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 p-2 bg-[#1a1a1a]/50 hover:bg-[#ff6b6b]/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </motion.button>
            </>
          )}
           {project.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10 flex space-x-1.5">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out
                    ${currentImageIndex === idx ? 'bg-[#ff6b6b] scale-125' : 'bg-[#f5e6d3]/50 hover:bg-[#f5e6d3]/80'}
                  `}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>

        <div className={`md:col-span-5 space-y-3 sm:space-y-4 
            ${index % 2 === 0 ? 'md:order-2 md:pl-4 lg:pl-6' : 'md:order-1 md:pr-4 lg:pr-6'}
        `}>
          <motion.div variants={childVariants} className="flex items-center gap-3">
            <span className="text-lg sm:text-xl text-[#ff6b6b]/90 font-roboto-mono mt-1">
              {String(index + 1).padStart(2, '0')}
            </span>
            <motion.h3 
              className="nabla-font text-4xl sm:text-5xl md:text-[3.25rem] font-bold tracking-tighter text-[#f5e6d3] group-hover:text-[#ff6b6b] transition-colors duration-300"
            >
              {project.title}
            </motion.h3>
          </motion.div>
          
          <motion.p 
            variants={childVariants}
            className="text-sm sm:text-[0.9rem] leading-relaxed text-[#f5e6d3]/75"
          >
            {project.description}
          </motion.p>
          
          <motion.div 
            variants={childVariants}
            className="flex flex-wrap gap-2 pt-1 sm:pt-2"
          >
            {project.technologies.slice(0, 5).map((tech) => (
              <span 
                key={tech}
                className="px-2.5 py-1 bg-[#2f2f2f]/80 border border-[#f5e6d3]/25 rounded-full text-[10px] sm:text-xs font-roboto-mono text-[#f5e6d3]/70 group-hover:border-[#ff6b6b]/40 group-hover:text-[#ff6b6b]/80 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </motion.div>
           <motion.button 
            variants={childVariants} 
            className="group/button mt-4 sm:mt-5 inline-flex items-center text-xs font-roboto-mono text-[#ff6b6b]/90 hover:text-[#ff6b6b] transition-colors duration-300 py-2 px-1"
            onClick={(e) => { e.stopPropagation(); onOpenModal(); }}
            aria-label={`View details for ${project.title}`}
            >
                View Project Details
                <ChevronRight className="ml-1 w-3.5 h-3.5 transform group-hover/button:translate-x-1 transition-transform duration-200" />
           </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsShowcase;