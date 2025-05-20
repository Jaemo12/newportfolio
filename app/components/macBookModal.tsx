'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, ExternalLink, Github, ZoomIn, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Define the Project interface that the modal expects
interface Project {
  title: string;
  description: string;
  images: string[]; // Crucial for the galleries
  technologies: string[];
  features: string[];
  stats: { [key: string]: string };
  link: string;
  github: string;
  color: string; 
  glowColor: string; 
}

interface ModernProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ModernProjectModal: React.FC<ModernProjectModalProps> = ({ project, onClose, onNext, onPrev }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setCurrentImageIndex(0); // Reset image index when project changes
    if (project) { // Apply custom scrollbar color when project is available
      const scrollbarStyle = document.getElementById('custom-scrollbar-style');
      if (scrollbarStyle) {
        scrollbarStyle.innerHTML = `
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${project.color}99 !important;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: ${project.color} !important;
          }
          .custom-scrollbar {
            scrollbar-color: ${project.color}99 transparent !important;
          }
        `;
      }
    }
  }, [project]);

  if (!project) return null;

  // Ensure projectImages always has at least one valid source
  const projectImages = project.images && project.images.length > 0 
    ? project.images 
    : ['/api/placeholder/1280/720?text=Project+Image+Not+Found']; // More descriptive placeholder

  const handleImageClick = () => setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);

  const navigateImage = (direction: 'next' | 'prev') => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentImageIndex + 1) % projectImages.length;
    } else {
      newIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
    }
    setCurrentImageIndex(newIndex);
  };

  // --- Sub-Components ---

  const FullscreenImageView = () => (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "circOut" }}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex items-center justify-center p-3 sm:p-4"
      onClick={closeFullscreen}
    >
      <motion.button
        whileHover={{ scale: 1.15, rotate: 90, boxShadow: `0 0 15px ${project.glowColor}` }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); closeFullscreen(); }}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full"
        style={{ border: `1.5px solid ${project.color}`, color: project.color, backgroundColor: `rgba(16, 16, 16, 0.7)` }}
        aria-label="Close fullscreen image"
      >
        <X size={20} />
      </motion.button>

      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <motion.div 
          className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center" // Ensure image is centered
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`${project.title}-fullscreen-${currentImageIndex}`}
              src={projectImages[currentImageIndex]}
              alt={`${project.title} - Fullscreen ${currentImageIndex + 1}`}
              className="block max-w-full max-h-full object-contain rounded-md shadow-2xl"
              style={{ boxShadow: `0 0 35px ${project.glowColor}`}}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "circOut" }}
            />
          </AnimatePresence>
        </motion.div>

        {projectImages.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-sm p-1.5 rounded-lg border" style={{borderColor: `${project.color}50`}}>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: `${project.color}40`, boxShadow: `0 0 8px ${project.glowColor}` }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="p-2 rounded-md" style={{ border: `1px solid ${project.color}70`}}
            aria-label="Previous image"
          >
            <ArrowLeft size={16} style={{ color: project.color }}/>
          </motion.button>

          <div className="flex gap-1.5 items-center px-1">
            {projectImages.map((_, index) => (
              <button
                key={`dot-fs-${index}`}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out hover:opacity-100
                  ${index === currentImageIndex ? 'scale-125 w-3.5 opacity-100' : 'opacity-50'}
                `}
                style={{backgroundColor: project.color }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: `${project.color}40`, boxShadow: `0 0 8px ${project.glowColor}` }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="p-2 rounded-md" style={{ border: `1px solid ${project.color}70`}}
            aria-label="Next image"
          >
            <ArrowRight size={16} style={{ color: project.color }}/>
          </motion.button>
        </div>
        )}
         <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/70 rounded-full text-xs text-white/80 font-roboto-mono border" style={{borderColor: `${project.color}50`}}>
          {currentImageIndex + 1} / {projectImages.length}
        </div>
      </div>
    </motion.div>
  );

  const ModalImageDisplay = () => (
    <div 
      className="relative aspect-[16/10] rounded-lg overflow-hidden group border-2 cursor-pointer shadow-lg transition-all duration-300 hover:shadow-2xl"
      style={{ borderColor: `${project.color}70`, boxShadow: `0 0 20px -5px ${project.glowColor}` }}
      onClick={handleImageClick}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${project.title}-modal-${currentImageIndex}`}
          className="w-full h-full"
          initial={{ opacity: 0.7, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0.7, x: -25 }}
          transition={{ duration: 0.4, ease: "circOut" }}
        >
          <Image
            src={projectImages[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            width={800} height={450} // Aspect ratio 16:9
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority // Prioritize loading current image
          />
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        aria-hidden="true"
      >
        <ZoomIn size={36} className="text-white opacity-90" style={{filter: `drop-shadow(0 0 8px ${project.color})`}}/>
      </motion.div>

      {projectImages.length > 1 && (
        <>
        <motion.button
          onClick={(e) => { e.stopPropagation(); navigateImage('prev');}}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 p-1.5 bg-[#1a1a1a]/60 hover:bg-opacity-80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none"
          style={{borderColor: project.color, boxShadow: `0 0 8px ${project.glowColor}`}}
          whileHover={{ scale: 1.1, x: -2 }} whileTap={{ scale: 0.9 }} aria-label="Previous image"
        > <ChevronLeft size={20} style={{color: project.color}}/>
        </motion.button>
        <motion.button
          onClick={(e) => { e.stopPropagation(); navigateImage('next');}}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 p-1.5 bg-[#1a1a1a]/60 hover:bg-opacity-80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none"
          style={{borderColor: project.color, boxShadow: `0 0 8px ${project.glowColor}`}}
          whileHover={{ scale: 1.1, x: 2 }} whileTap={{ scale: 0.9 }} aria-label="Next image"
        > <ChevronRight size={20} style={{color: project.color}}/>
        </motion.button>

        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/50 backdrop-blur-sm p-1 rounded-full">
          {projectImages.map((_, index) => (
            <button
              key={`dot-modal-${index}`}
              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
              className={`h-1.5 rounded-full transition-all duration-300 ease-in-out hover:opacity-100
                ${index === currentImageIndex ? 'w-4 opacity-100' : 'w-1.5 opacity-60'}
              `}
              style={{backgroundColor: project.color }}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-lg" />
        
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} // Quintic ease-out
          className="relative w-full max-w-4xl bg-[#161618] rounded-xl overflow-hidden border flex flex-col max-h-[90vh] shadow-2xl"
          style={{ borderColor: `${project.color}50`, boxShadow: `0 0 50px -10px ${project.glowColor}` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 opacity-90" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, ${project.color}, transparent)`}} />
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180, boxShadow: `0 0 12px ${project.glowColor}` }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full"
            style={{ border: `1px solid ${project.color}90`, color: project.color, backgroundColor: `rgba(22, 22, 24, 0.7)` }}
            aria-label="Close modal"
          >
            <X size={18} />
          </motion.button>

          <div className="p-6 sm:p-8 flex-grow overflow-y-auto custom-scrollbar space-y-6 sm:space-y-8">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight font-manrope text-center md:text-left" // Centered on small, left on md+
              style={{ color: project.color, textShadow: `0 0 12px ${project.glowColor}` }}
              initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1, duration: 0.4}}
            >
              {project.title}
            </motion.h2>

            <div className="grid md:grid-cols-[1.3fr,1fr] gap-6 sm:gap-8 items-start">
              <div className="space-y-4 sm:space-y-5 order-2 md:order-1">
                <motion.p 
                  className="text-slate-300/90 text-sm sm:text-[0.95rem] leading-relaxed"
                  initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.15, duration: 0.4}}
                >
                  {project.description}
                </motion.p>

                {project.features && project.features.length > 0 && (
                  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2, duration: 0.4}}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 font-manrope" style={{ color: project.color }}>Key Features</h3>
                    <ul className="space-y-1.5">
                      {project.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + index * 0.04, ease: "circOut", duration: 0.3 }}
                          className="flex items-start gap-2 text-slate-300/80 text-xs sm:text-sm"
                        >
                          <CheckCircle size={14} className="mt-0.5 flex-shrink-0 opacity-80" style={{ color: project.color }} />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3, duration: 0.4}}>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2.5 font-manrope" style={{ color: project.color }}>Technologies</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05, y: -1, boxShadow: `0 0 10px ${project.glowColor}`, borderColor: project.color }}
                        className="px-2.5 py-1 bg-slate-700/60 border rounded text-[11px] sm:text-xs font-roboto-mono text-slate-300/90"
                        style={{ borderColor: `${project.color}60` }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                )}
              </div>

              <div className="space-y-4 sm:space-y-5 order-1 md:order-2">
                <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.2, duration: 0.4}}>
                  <ModalImageDisplay />
                </motion.div>

                {project.stats && Object.keys(project.stats).length > 0 && (
                  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.35, duration: 0.4}}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2.5 font-manrope" style={{ color: project.color }}>Impact & Stats</h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <motion.div
                          key={key}
                          whileHover={{ scale: 1.03, y: -1, boxShadow: `0 0 12px ${project.glowColor}`, borderColor: project.color }}
                          className="p-2 sm:p-2.5 bg-slate-700/60 border rounded-lg text-center"
                          style={{ borderColor: `${project.color}60` }}
                        >
                          <span className="block text-lg sm:text-xl font-bold" style={{color: project.color}}>{value}</span>
                          <span className="text-[10px] sm:text-xs text-slate-400/90 capitalize font-roboto-mono">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t p-4 sm:p-5 bg-[#131315]/80" style={{borderColor: `${project.color}40`}}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex gap-2 sm:gap-3">
                <motion.button
                  whileHover={{ scale: 1.04, x: -2, boxShadow: `0 0 12px ${project.glowColor}` }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onPrev}
                  className="px-3 py-2 bg-slate-700/70 hover:bg-opacity-90 rounded-lg text-slate-300 text-xs sm:text-sm flex items-center gap-1.5 border"
                  style={{ borderColor: `${project.color}70`, color: project.color}}
                > <ArrowLeft size={14} /> <span>Prev</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04, x: 2, boxShadow: `0 0 12px ${project.glowColor}` }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onNext}
                  className="px-3 py-2 bg-slate-700/70 hover:bg-opacity-90 rounded-lg text-slate-300 text-xs sm:text-sm flex items-center gap-1.5 border"
                  style={{ borderColor: `${project.color}70`, color: project.color}}
                > <span>Next</span> <ArrowRight size={14} />
                </motion.button>
              </div>

              <div className="flex gap-2 sm:gap-3">
                {project.link && project.link !== "#" && (
                  <motion.a
                    href={project.link} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, opacity: 0.95, boxShadow: `0 0 18px ${project.glowColor}` }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 sm:px-5 py-2 rounded-lg font-semibold text-black text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all duration-300"
                    style={{ background: `linear-gradient(45deg, ${project.color}, ${project.color}D0)`, color: '#0A0A0A' }} // Darker text for light button
                  > <ExternalLink size={14} /> <span>Live Demo</span>
                  </motion.a>
                )}
                {project.github && project.github !== "#" && (
                  <motion.a
                    href={project.github} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, boxShadow: `0 0 18px ${project.glowColor}` }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 sm:px-5 py-2 bg-slate-600/80 hover:bg-opacity-100 rounded-lg font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 border"
                    style={{ borderColor: `${project.color}80`}}
                  > <Github size={14} /> <span>Source Code</span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isFullscreen && <FullscreenImageView />}
      </AnimatePresence>
      
      {/* Inject dynamic scrollbar styles */}
      <style id="custom-scrollbar-style"></style>
    </>
  );
};

export default ModernProjectModal;
