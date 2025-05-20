'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

// Type definitions
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

interface ProjectModalProps {
  isOpen: boolean;
  project: Project;
  color: string;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, project, color, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'gallery'>('overview');
  const [mounted, setMounted] = useState(false);

  // Set mounted state to true on client-side
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen || !mounted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, mounted]);
  
  // Handle body scroll locking - only runs on client
  useEffect(() => {
    if (!mounted) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, mounted]);

  // Reset when project changes
  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
    }
  }, [project]);

  if (!isOpen || !project || !mounted) return null;
  
  const currentImage = project.images[currentImageIndex];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div 
        className="relative z-[10000] w-full max-w-6xl bg-black/70 backdrop-blur-md border rounded-xl overflow-hidden"
        style={{ 
          borderColor: `${color}40`,
          boxShadow: `0 0 30px ${color}30`
        }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ 
          type: "spring", 
          damping: 20,
          stiffness: 100
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border-2"
          style={{ 
            borderColor: color,
            color: color,
          }}
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Header Section - Always visible */}
        <div className="relative z-10 pt-6 pb-2 px-6 md:px-10 border-b border-[#ffffff]/10">
          <h2 
            className="text-3xl md:text-5xl font-bold tracking-wide"
            style={{ 
              color: 'white',
              textShadow: `0 0 10px ${color}`
            }}
          >
            {project.title}
          </h2>
          
          {/* Navigation Tabs */}
          <div className="flex mt-6 border-b border-[#ffffff]/10 pb-2">
            {(['overview', 'details', 'gallery'] as const).map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 mr-2 rounded-t-lg text-sm font-bold tracking-wide capitalize ${
                  activeTab === tab ? 'text-white' : 'text-white/50'
                }`}
                style={activeTab === tab ? { 
                  color: color,
                  textShadow: `0 0 5px ${color}`,
                  boxShadow: `0 2px 0 ${color}`
                } : {}}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="relative z-10">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 md:p-10">
              {/* Project Details - Left Side */}
              <div className="md:col-span-3 space-y-8">
                <div>
                  <p className="text-white/80 text-lg">
                    {project.description}
                  </p>
                </div>
                
                <div>
                  <h4 
                    className="text-xl font-bold text-white/90 mb-4"
                    style={{ textShadow: `0 0 5px ${color}` }}
                  >
                    Key Highlights
                  </h4>
                  <div className="space-y-3">
                    {project.highlights.map((highlight, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 group"
                      >
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-white/70 group-hover:text-white/90 transition-colors">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    className="px-5 py-2 rounded-full flex items-center gap-2 bg-black/40 border-2 backdrop-blur-sm"
                    style={{ 
                      borderColor: color,
                      color: color,
                      boxShadow: `0 0 15px ${color}30`
                    }}
                  >
                    <span className="font-bold tracking-wide">LIVE DEMO</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  
                  <button
                    className="px-5 py-2 rounded-full flex items-center gap-2 bg-black/40 border-2 backdrop-blur-sm"
                    style={{ 
                      borderColor: `${color}60`,
                      color: 'white'
                    }}
                  >
                    <span className="font-bold tracking-wide">SOURCE CODE</span>
                    <Github className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Featured Image - Right Side */}
              <div className="md:col-span-2 relative">
                <div className="relative aspect-video md:aspect-square overflow-hidden rounded-lg border-2"
                     style={{ borderColor: `${color}40` }}>
                  <div className="absolute inset-0">
                    {/* Use standard img tag instead of Next.js Image */}
                    <img 
                      src={currentImage.src}
                      alt={currentImage.alt}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Image gloss effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
                  </div>
                </div>
                
                {/* Technologies section */}
                <div className="mt-6">
                  <h4 
                    className="text-lg font-bold text-white/90 mb-3"
                    style={{ textShadow: `0 0 5px ${color}` }}
                  >
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-sm border flex items-center gap-1"
                        style={{ 
                          borderColor: `${color}60`,
                          color: color,
                          backgroundColor: 'rgba(0,0,0,0.3)'
                        }}
                      >
                        <span className="font-bold text-xs">{tool}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="p-6 md:p-10 space-y-8">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white/90 mb-6"
                    style={{ textShadow: `0 0 8px ${color}` }}>
                  Project Overview
                </h3>
                <p className="text-white/80 text-lg mb-6">
                  {project.description}
                </p>
                
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-white/90 mb-6"
                      style={{ textShadow: `0 0 8px ${color}` }}>
                    Technical Challenges
                  </h3>
                  <p className="text-white/80">
                    This project involved overcoming several technical challenges, including 
                    implementing real-time data processing, creating an intuitive user interface
                    for complex data visualization, and ensuring the system performs efficiently with
                    large datasets.
                  </p>
                </div>
                
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-white/90 mb-6"
                      style={{ textShadow: `0 0 8px ${color}` }}>
                    Implementation Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center mt-1 flex-shrink-0 border"
                        style={{ borderColor: color }}
                      >
                        <span className="text-sm" style={{ color }}>1</span>
                      </div>
                      <p className="text-white/70">
                        Built the frontend using React with custom hooks for state management and data processing
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center mt-1 flex-shrink-0 border"
                        style={{ borderColor: color }}
                      >
                        <span className="text-sm" style={{ color }}>2</span>
                      </div>
                      <p className="text-white/70">
                        Developed a Node.js backend with Express to handle data processing and API requests
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center mt-1 flex-shrink-0 border"
                        style={{ borderColor: color }}
                      >
                        <span className="text-sm" style={{ color }}>3</span>
                      </div>
                      <p className="text-white/70">
                        Implemented advanced machine learning models for data analysis
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Key Features Table */}
                <div>
                  <h3 className="text-2xl font-bold text-white/90 mb-6"
                      style={{ textShadow: `0 0 8px ${color}` }}>
                    Key Features
                  </h3>
                  <div className="overflow-hidden rounded-lg border" style={{ borderColor: `${color}40` }}>
                    <table className="w-full">
                      <thead className="border-b" style={{ borderColor: `${color}40` }}>
                        <tr className="bg-black/40">
                          <th className="py-3 px-4 text-left text-sm font-bold" style={{ color }}>Feature</th>
                          <th className="py-3 px-4 text-left text-sm font-bold" style={{ color }}>Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: `${color}20` }}>
                        {project.highlights.map((highlight, idx) => (
                          <tr key={idx} className="hover:bg-black/40 transition-colors">
                            <td className="py-3 px-4 text-white/80 font-bold">Feature {idx + 1}</td>
                            <td className="py-3 px-4 text-white/60">{highlight}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="p-6 md:p-10">
              {/* Main Gallery Image */}
              <div className="relative aspect-video w-full max-w-5xl mx-auto border-2 rounded-lg overflow-hidden mb-6"
                   style={{ borderColor: `${color}40` }}>
                <div className="absolute inset-0">
                  <img 
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Navigation */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    {project.images.map((image, idx) => (
                      <button
                        key={image.id}
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          backgroundColor: idx === currentImageIndex ? color : `${color}40`,
                          boxShadow: idx === currentImageIndex ? `0 0 10px ${color}` : 'none'
                        }}
                        onClick={() => setCurrentImageIndex(idx)}
                      />
                    ))}
                  </div>
                  
                  {/* Navigation Arrows */}
                  <button 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border-2 z-10"
                    style={{ 
                      borderColor: color,
                      color: color
                    }}
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border-2 z-10"
                    style={{ 
                      borderColor: color,
                      color: color
                    }}
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-8">
                {project.images.map((image, idx) => (
                  <div
                    key={image.id}
                    className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-transform 
                              ${idx === currentImageIndex ? 'scale-105 z-10' : 'hover:scale-105'}`}
                    style={{ 
                      borderColor: idx === currentImageIndex ? color : `${color}40`,
                      boxShadow: idx === currentImageIndex ? `0 0 15px ${color}40` : 'none'
                    }}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    {idx === currentImageIndex && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;