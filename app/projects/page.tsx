'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Zap } from 'lucide-react';
import { ParallaxProvider, useParallax } from 'react-scroll-parallax';
import dynamic from 'next/dynamic';

import './projects.css';

const MacBookModal = dynamic(() => import('../components/macBookModal/macBookModal'), {
  ssr: false // Ensure client-side rendering
});
interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  stats: Record<string, string | number>;
  link: string;
  github: string;
}

const projects: Project[] = [
  {
    title: "AI DIARY",
    description: "An AI-powered journaling app designed to foster self-reflection and emotional well-being. MindScape uses advanced natural language processing to analyze journal entries, offering personalized insights and support to users on their mental health journeys.",
    image: "/aidiary.png", 
    technologies: ["React.js", "Firebase", "Tailwind CSS", "Gemini API", "TypeScript","Artificial Intelligence"],
    link: "https://journalapp-cyan.vercel.app/", 
    github: "https://github.com/yourusername/mindscape",
    features: [
      "AI-driven mood analysis and personalized insights",
      "Secure and private journaling environment",
      "Interactive chatbot for emotional support and reflection",
      "Track mood trends and identify potential triggers"
    ],
    stats: {
      reviews: "50",
      satisfactionRate: "92%",
      insightsGenerated: "200+" 
    }
  },
  {
    title: "ReviewFlix",
    description: "A movie recommendation platform that leverages sentiment analysis and emotional intelligence to provide personalized suggestions based on user preferences and the emotional tone of TMDB reviews.",
    image: "reviewflix.png", 
    technologies: ["Next.js", "Framer Motion", "Python", "Sentiment Analysis", "Emotional Intelligence","MongoDB", "JavaScript/TypeScript"],
    link: "https://www.reviewflix.com", 
    github: "https://github.com/yourusername/reviewflix", 
    features: [
      "Personalized movie recommendations",
      "Emotion-based filtering",
      "Deep dive into review sentiment",
      "User-friendly interface with smooth animations"
    ],
    stats: {
      users: "50+",
      moviesAnalyzed: "100K+",
      positiveRecommendations: "90%" 
    }
  },
  {
    title: "RecipeGenius",
    description: "A culinary companion that uses AI to generate unique and delicious recipes based on your dietary preferences, available ingredients, and desired cuisine style. Built with Next.js, Firebase, and the Gemini API, RecipeGenius transforms meal planning from a chore into a delightful experience.",
    image: "/recipe.png", 
    technologies: ["Next.js", "Firebase", "Gemini API", "JavaScript/TypeScript"], 
    link: "https://recipe-generator-opal.vercel.app/",
    github: "https://github.com/yourusername/recipegenius", // Replace with your actual GitHub repo
    features: [
        "AI-powered recipe generation tailored to your needs",
        "Intuitive search and filtering options",
        "Personalized recipe recommendations",
        "Step-by-step cooking instructions with images",
        "Save and share your favorite recipes"
    ],
    
    stats: {
        recipesGenerated: "10,000+",
        users: "50+",
        averageRating: "4.5/5"
     }
  }
];

const MacBookProjectsShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const controls = useAnimation();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex   
 + 1));
  };

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    }));
  }, [controls]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white font-sans p-8 overflow-hidden">
      <motion.h1
        className="text-4xl font-thin text-center mb-24 relative" 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Animate each letter individually */}
        {["C", "o", "n", "c", "e", "p", "t"].map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 2.05, transition: { duration: 0.15 } }}
          >
            {letter}
          </motion.span>
        ))}

        <motion.span
          className="inline-block mx-4" 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 7 * 0.1 }} 
          whileHover={{ scale: 2.05, transition: { duration: 0.15} }}
        >
          To
        </motion.span>

        {["C", "r", "e", "a", "t", "i", "o", "n"].map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (8 + index) * 0.1 }} 
            whileHover={{ scale: 2.05, transition: { duration: 0.15 } }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
      <div className="mt-48"></div>

      {/* Featured Projects */}
      <div className="w-full max-w-6xl mx-auto space-y-64 mb-32">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} controls={controls} />
        ))}
      </div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Explore More Projects
        </motion.button>
      </motion.div>

      {/* MacBook Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <MacBookModal
            project={projects[currentIndex]}
            onClose={() => setIsModalOpen(false)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number; controls: any }> = ({ project, index, controls }) => {
  const parallax = useParallax<HTMLDivElement>({ speed: -10 });

  return (
    <motion.div
      ref={parallax.ref}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
      custom={index}
      className="flex flex-col lg:flex-row items-center gap-16 relative"
    >
      <motion.div 
        className="w-full lg:w-1/3 relative z-10"
        whileHover={{ scale: 1.65, rotateY: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <img src={project.image} alt={project.title} className="w-full h-auto rounded-lg shadow-2xl" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 rounded-lg"
          whileHover={{ opacity: 0.3 }}
        />
      </motion.div>
      <div className="w-full lg:w-2/3 space-y-8 relative z-20">
        <motion.h2 
          className="text-5xl font-bold text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          {project.title}
        </motion.h2>
        <motion.p 
          className="text-gray-300 text-xl leading-relaxed"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          {project.description}
        </motion.p>
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.3 }}
        >
          {project.technologies.map((tech) => (
            <motion.span 
              key={tech} 
              className="px-4 py-2 bg-gray-800 text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{
                scale: 1.1,
                backgroundColor: "#4B5563",
                transition: { duration: 0.2 }
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
        <motion.ul 
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.4 }}
        >
          {project.features.map((feature, featureIndex) => (
            <motion.li 
              key={featureIndex}
              className="flex items-start space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.1 }}
              whileHover={{
                x: 10,
                transition: { duration: 0.2 }
              }}
            >
              <Zap className="text-yellow-400 mt-1 flex-shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div 
          className="flex flex-wrap gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.5 }}
        >
          {Object.entries(project.stats).map(([key, value]) => (
            <motion.div 
              key={key} 
              className="flex flex-col items-center"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              <span className="text-3xl font-bold text-purple-400">{value}</span>
              <span className="text-sm text-gray-400 capitalize">{key}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="flex gap-6 mt-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.6 }}
        >
          <motion.a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            View Project <ExternalLink size={18} className="ml-2" />
          </motion.a>
          <motion.a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-medium rounded-full hover:bg-gray-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(107, 114, 128, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub <Github size={18} className="ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectsShowcase = () => (
  <ParallaxProvider>
    <MacBookProjectsShowcase />
  </ParallaxProvider>
);

export default ProjectsShowcase;