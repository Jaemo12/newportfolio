'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Code, Cloud, ChevronRight, Zap, ArrowRight, X, ExternalLink, Link2 } from 'lucide-react';

// Enhanced work experience data
const experiences = [
  {
    id: 1,
    company: "TIMIO",
    role: "Full Stack Developer",
    period: "Present",
    sectionNumber: "01",
    isActive: true,
    icon: <Code className="w-6 h-6" />,
    color: "#00D5FF",
    glowColor: "0 0 20px rgba(0, 213, 255, 0.3)",
    borderColor: "border-[#00D5FF]/20",
    image: "/timio1.png",
    achievements: [
      "Building an AI-powered Chrome extension that analyzes and identifies bias in news articles",
      "Implementing NLP models for real-time text analysis and bias detection",
      "Creating a scalable backend and intuitive frontend for bias analysis visualization"
    ],
    tags: ["Chrome Extension", "React", "Node.js", "Machine Learning", "NLP", "AI"],
    description: "Leading a cross-functional team to develop cutting-edge AI tools for media analysis, focusing on bias detection and content verification systems.",
    projects: [
      {
        id: 101,
        title: "News Bias Analyzer",
        description: "An AI-driven Chrome extension that automatically detects political and emotional bias in news articles, providing users with a balanced perspective.",
        images: [
          { id: 1, src: "/api/placeholder/800/500", alt: "Bias Analysis Dashboard" },
          { id: 2, src: "/api/placeholder/800/500", alt: "Real-time Analysis View" },
          { id: 3, src: "/api/placeholder/800/500", alt: "Chrome Extension UI" }
        ],
        tools: ["React", "TensorFlow.js", "Chrome Extensions API", "Node.js"],
        highlights: [
          "Developed a custom NLP model achieving 87% accuracy in bias detection",
          "Created an intuitive visualization system for displaying bias metrics",
          "Implemented real-time processing for instant analysis"
        ]
      },
      {
        id: 102,
        title: "Content Verification API",
        description: "A scalable backend service that verifies factual claims in articles against trusted sources using advanced NLP techniques.",
        images: [
          { id: 1, src: "/api/placeholder/800/500", alt: "API Dashboard" },
          { id: 2, src: "/api/placeholder/800/500", alt: "Fact Checking Process" },
          { id: 3, src: "/api/placeholder/800/500", alt: "Source Verification" }
        ],
        tools: ["Python", "FastAPI", "BERT", "Redis", "PostgreSQL"],
        highlights: [
          "Built a distributed system capable of processing 1000+ requests per minute",
          "Designed a comprehensive database of verified facts and sources",
          "Implemented intelligent caching to improve performance by 65%"
        ]
      }
    ]
  },
  {
    id: 2,
    company: "Cognizant",
    role: "Software Developer",
    period: "May 2022 - July 2022",
    sectionNumber: "02",
    isActive: false,
    icon: <Cloud className="w-6 h-6" />,
    color: "#9747FF",
    glowColor: "0 0 20px rgba(151, 71, 255, 0.3)",
    borderColor: "border-[#9747FF]/20",
    image: "/api/placeholder/500/300",
    achievements: [
      "Improved UX by 25% through development with React, Angular, & Java Spring Boot",
      "Accelerated deployment by 40% with Docker containerization",
      "Optimized AWS infrastructure & CI/CD pipelines for faster launches"
    ],
    tags: ["React", "Angular", "Spring Boot", "AWS", "Docker"],
    description: "Worked on enterprise solutions for financial services clients, focusing on performance optimization and cloud infrastructure.",
    projects: [
      {
        id: 201,
        title: "Financial Analytics Dashboard",
        description: "A comprehensive analytics platform for financial institutions to visualize customer data, transactions, and market trends.",
        images: [
          { id: 1, src: "/api/placeholder/800/500", alt: "Analytics Dashboard" },
          { id: 2, src: "/api/placeholder/800/500", alt: "Transaction Analysis" },
          { id: 3, src: "/api/placeholder/800/500", alt: "Market Trends" }
        ],
        tools: ["Angular", "D3.js", "Spring Boot", "AWS", "Kubernetes"],
        highlights: [
          "Reduced page load time by 60% through code optimization",
          "Implemented real-time data visualization with WebSockets",
          "Created an adaptive layout system for seamless cross-device experience"
        ]
      },
      {
        id: 202,
        title: "Deployment Pipeline Overhaul",
        description: "Redesigned the CI/CD pipeline for the financial services platform, reducing deployment time and improving reliability.",
        images: [
          { id: 1, src: "/api/placeholder/800/500", alt: "CI/CD Pipeline" },
          { id: 2, src: "/api/placeholder/800/500", alt: "Monitoring Dashboard" },
          { id: 3, src: "/api/placeholder/800/500", alt: "Deployment Process" }
        ],
        tools: ["Docker", "Jenkins", "AWS", "Terraform", "GitHub Actions"],
        highlights: [
          "Reduced deployment time from 45 minutes to 12 minutes",
          "Implemented comprehensive testing and monitoring",
          "Created infrastructure-as-code templates for quick scaling"
        ]
      }
    ]
  }
];

// Types for TypeScript
interface ProjectImage {
  id: number;
  src: string;
  alt: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  images: ProjectImage[];
  tools: string[];
  highlights: string[];
}

interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  sectionNumber: string;
  isActive: boolean;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  borderColor: string;
  image: string;
  achievements: string[];
  tags: string[];
  description: string;
  projects: Project[];
}

// Component for stylized glitch text effect
interface GlitchTextProps {
  children: React.ReactNode;
  color: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ children, color }) => (
  <motion.span
    className="relative inline-block font-['Lacquer']"
    whileHover={{
      scale: 1.05,
      textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}, 0 0 25px ${color}`,
    }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.span>
);

// Project Modal Component
const ProjectModal: React.FC<{
  project: Project | null;
  color: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, color, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (project) {
      setCurrentImageIndex((prev) => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
      setLoading(true);
    }
  };

  const handlePrev = () => {
    if (project) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
      setLoading(true);
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  // Close modal on ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop with cyberpunk grid */}
        <motion.div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            backgroundImage: `
              linear-gradient(to right, ${color}10 1px, transparent 1px),
              linear-gradient(to bottom, ${color}10 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Modal Container */}
        <motion.div 
          className="relative w-full max-w-6xl bg-black/70 rounded-2xl overflow-hidden z-10 mx-4 max-h-[90vh] flex flex-col"
          style={{ 
            border: `2px solid ${color}40`,
            boxShadow: `0 0 30px ${color}40`
          }}
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", bounce: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60"
            style={{ border: `1px solid ${color}40` }}
            onClick={onClose}
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: `${color}20`,
              boxShadow: `0 0 15px ${color}40`
            }}
          >
            <X style={{ color: color }} className="w-6 h-6" />
          </motion.button>

          {/* Project Title */}
          <motion.div 
            className="py-6 px-8 border-b"
            style={{ borderColor: `${color}40` }}
          >
            <motion.h2 
              className="text-3xl font-['Lacquer'] tracking-wider"
              style={{ 
                color: "white",
                textShadow: `0 0 10px ${color}60`
              }}
              whileHover={{
                textShadow: `0 0 15px ${color}`
              }}
            >
              {project.title}
            </motion.h2>
            <motion.div 
              className="h-1 w-24 rounded-full mt-2"
              style={{ backgroundColor: color }}
              whileHover={{ width: "140px", boxShadow: `0 0 10px ${color}` }}
            />
          </motion.div>

          <div className="flex flex-col md:flex-row overflow-hidden flex-grow">
            {/* Image Gallery Section */}
            <div className="w-full md:w-3/5 h-80 md:h-auto relative">
              {/* Image Navigation Controls */}
              <motion.button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/60"
                style={{ border: `1px solid ${color}40` }}
                onClick={handlePrev}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: `${color}20`,
                  boxShadow: `0 0 15px ${color}40`
                }}
              >
                <ChevronRight style={{ color: color, transform: 'rotate(180deg)' }} className="w-6 h-6" />
              </motion.button>
              
              <motion.button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/60"
                style={{ border: `1px solid ${color}40` }}
                onClick={handleNext}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: `${color}20`,
                  boxShadow: `0 0 15px ${color}40`
                }}
              >
                <ChevronRight style={{ color: color }} className="w-6 h-6" />
              </motion.button>

              {/* Image Container */}
              <div className="relative w-full h-full">
                {/* Loading Overlay */}
                <AnimatePresence>
                  {loading && (
                    <motion.div 
                      className="absolute inset-0 bg-black/60 flex items-center justify-center z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div 
                        className="w-10 h-10 border-4 rounded-full"
                        style={{ 
                          borderColor: `${color} transparent transparent transparent`,
                          boxShadow: `0 0 15px ${color}40`
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Current Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    className="relative w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={project.images[currentImageIndex].src}
                      alt={project.images[currentImageIndex].alt}
                      layout="fill"
                      objectFit="cover"
                      onLoadingComplete={handleImageLoad}
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:bg-gradient-to-b md:from-transparent md:to-black/60"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                  {project.images.map((_, index) => (
                    <motion.button
                      key={index}
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: index === currentImageIndex 
                          ? color 
                          : `${color}40`
                      }}
                      whileHover={{ scale: 1.5 }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Project Details Section */}
            <div className="w-full md:w-2/5 p-6 overflow-y-auto">
              <div className="space-y-6">
                <p className="text-white/80 text-lg">
                  {project.description}
                </p>

                {/* Tools Used */}
                <div className="space-y-3">
                  <h3 className="text-xl font-['Lacquer'] text-white">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 rounded-full text-sm font-mono border bg-black/40"
                        style={{ 
                          borderColor: `${color}60`,
                          color: color
                        }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: `${color}20`,
                          boxShadow: `0 0 10px ${color}40`
                        }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="space-y-3">
                  <h3 className="text-xl font-['Lacquer'] text-white">Key Highlights</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-2"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <motion.div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: color }}
                          whileHover={{
                            scale: 1.5,
                            boxShadow: `0 0 10px ${color}`
                          }}
                        />
                        <span className="text-white/80">
                          {highlight}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Project Preview Card Component
const ProjectPreview: React.FC<{
  project: Project;
  color: string;
  onView: () => void;
}> = ({ project, color, onView }) => {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden border bg-black/40 backdrop-blur-sm cursor-pointer group"
      style={{ 
        borderColor: `${color}40`,
        boxShadow: `0 0 10px ${color}20`
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 0 20px ${color}40`
      }}
      onClick={onView}
      layout
    >
      <div className="aspect-video relative">
        <Image
          src={project.images[0].src}
          alt={project.title}
          layout="fill"
          objectFit="cover"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"
          style={{ boxShadow: `inset 0 0 10px ${color}30` }}
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4 
            className="text-xl font-['Lacquer'] text-white mb-1"
            style={{ textShadow: `0 0 8px ${color}` }}
          >
            {project.title}
          </h4>
          <p className="text-white/70 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
        
        {/* View Details Button */}
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm"
          style={{ boxShadow: `inset 0 0 20px ${color}40` }}
        >
          <motion.button
            className="px-4 py-2 rounded-full border-2 flex items-center gap-2"
            style={{ 
              borderColor: color,
              color: color,
              textShadow: `0 0 5px ${color}`,
              boxShadow: `0 0 15px ${color}40`
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 25px ${color}60`
            }}
          >
            <span className="font-['Lacquer']">View Details</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Experience Card Component with Integrated Projects
const ExperienceCard: React.FC<{
  experience: Experience;
  index: number;
  onOpenProject: (project: Project, color: string) => void;
}> = ({ experience, index, onOpenProject }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const [isExpanded, setIsExpanded] = useState(experience.isActive);

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.9, 1, 1, 0.9]);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative min-h-screen py-20"
      style={{
        opacity,
        scale
      }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lacquer&display=swap');
      `}</style>

      {/* Title with Enhanced Glitch Effect */}
      <motion.div 
        className="sticky top-0 z-20 h-28 flex items-center pl-32 bg-black/90 backdrop-blur-lg"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="absolute left-8 flex items-center gap-2">
          <motion.div 
            className="w-12 h-[2px]"
            style={{ backgroundColor: experience.color }}
            whileHover={{ width: "60px", transition: { duration: 0.3 } }}
          />
          <motion.span 
            className="font-['Lacquer'] text-base"
            style={{ color: experience.color }}
            whileHover={{
              textShadow: `0 0 8px ${experience.color}`,
              scale: 1.1
            }}
          >
            S/{experience.sectionNumber.padStart(3, '0')}
          </motion.span>
        </div>
        
        <GlitchText color={experience.color}>
          <h3 className="text-[44px] leading-none tracking-wider">
            {experience.company}
          </h3>
        </GlitchText>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-32"
        style={{ y: contentY }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Content - Role Details */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <motion.p 
                className="text-3xl font-['Lacquer'] text-white/90 tracking-wide"
                whileHover={{
                  textShadow: `0 0 8px ${experience.color}, 0 0 16px ${experience.color}`,
                  transition: { duration: 0.2 }
                }}
              >
                {experience.role}
              </motion.p>
              <motion.div 
                className="flex items-center mt-4"
                style={{ color: experience.color }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                <span className="font-['Lacquer'] text-lg">{experience.period}</span>
              </motion.div>
            </div>

            <p className="text-white/80 text-lg">
              {experience.description}
            </p>

            <div className="space-y-6">
              <h4 className="text-2xl font-['Lacquer'] text-white/90 mb-4 tracking-wide"
                  style={{
                    textShadow: `0 0 10px ${experience.color}40`
                  }}>
                Key Achievements
              </h4>
              <div className="space-y-4">
                {experience.achievements.map((achievement, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-start gap-3 group"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: experience.color }}
                      whileHover={{
                        scale: 1.5,
                        boxShadow: `0 0 10px ${experience.color}`
                      }}
                    />
                    <p className="text-white/70 text-lg group-hover:text-white transition-colors">
                      {achievement}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-2xl font-['Lacquer'] text-white/90 mb-4 tracking-wide"
                  style={{
                    textShadow: `0 0 10px ${experience.color}40`
                  }}>
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    className="px-4 py-2 rounded-full text-sm font-['Lacquer'] tracking-wide border-2 bg-black/40"
                    style={{ 
                      borderColor: experience.color,
                      color: experience.color
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 15px ${experience.color}40`
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Projects */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-2xl font-['Lacquer'] text-white/90 tracking-wide"
                  style={{
                    textShadow: `0 0 10px ${experience.color}40`
                  }}>
                Key Projects
              </h4>
              
              <motion.button 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border"
                style={{ 
                  borderColor: `${experience.color}40`,
                  color: experience.color
                }}
                whileHover={{
                  backgroundColor: `${experience.color}20`,
                  boxShadow: `0 0 15px ${experience.color}40`
                }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span className="text-sm font-['Lacquer']">
                  {isExpanded ? 'Collapse' : 'Expand All'}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              layout
            >
              {experience.projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  layout
                >
                  <ProjectPreview
                    project={project}
                    color={experience.color}
                    onView={() => onOpenProject(project, experience.color)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main WorkExperience Component
const WorkExperience: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#00D5FF");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project: Project, color: string) => {
    setSelectedProject(project);
    setSelectedColor(color);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#0A0A0A] text-white pt-16">
      {/* Hero Section with Enhanced Title */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center"
            style={{
              filter: 'hue-rotate(60deg) saturate(1.5)'
            }}
          />
          
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `
                   linear-gradient(to right, ${experiences[0].color}10 1px, transparent 1px),
                   linear-gradient(to bottom, ${experiences[0].color}10 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px'
               }} 
          />
        </div>
        
        <motion.div 
          className="relative text-center z-10 space-y-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-['Lacquer'] tracking-wider"
            whileHover={{
              textShadow: `
                0 0 10px #fff,
                0 0 20px ${experiences[0].color},
                0 0 40px ${experiences[1].color},
                0 0 60px ${experiences[0].color}
              `
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional Journey
          </motion.h1>
          <motion.div 
            className="h-2 w-40 mx-auto rounded-full"
            style={{
              background: `linear-gradient(90deg, ${experiences[0].color}, ${experiences[1].color})`
            }}
            whileHover={{
              width: "280px",
              boxShadow: `0 0 20px ${experiences[0].color}`,
              transition: { duration: 0.3 }
            }}
          />
        </motion.div>
      </div>

      {/* Experience Cards */}
      <div className="relative pb-[20vh]">
        {experiences.map((exp, index) => (
          <ExperienceCard
            key={exp.id}
            experience={exp}
            index={index}
            onOpenProject={openProjectModal}
          />
        ))}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        color={selectedColor}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </div>
  );
};

export default WorkExperience;