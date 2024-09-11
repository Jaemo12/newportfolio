// components/MacBookModal.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ExternalLink, Github } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  stats: Record<string, string | number>;
  link: string;
  github: string;
}

interface MacBookModalProps {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const MacBookModal: React.FC<MacBookModalProps> = ({ project, onClose, onNext, onPrev }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center p-4 z-50"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, rotateX: -10 }}
      animate={{ scale: 1, opacity: 1, rotateX: 0 }}
      exit={{ scale: 0.9, opacity: 0, rotateX: 10 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="relative w-full max-w-5xl perspective-1000"
    >
      {/* MacBook frame */}
      <div className="bg-[#e2e2e7] rounded-t-[20px] p-4 shadow-2xl transform-gpu rotateX-5 relative">
        <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-1/4 h-1 bg-[#050506] rounded-full" />
        {/* Screen */}
        <div className="bg-[#050506] rounded-[10px] aspect-[16/10] p-1 relative overflow-hidden shadow-inner">
          {/* Scrollable content */}
          <div className="h-full overflow-y-auto pr-4 bg-white" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <motion.div initial={{ opacity: 0, rotateY: -90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: 90 }} transition={{ duration: 0.5 }} className="flex flex-col p-8">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-16 h-16 object-cover rounded-lg mb-6 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              />
              <motion.h2
                className="text-3xl font-bold mb-4 text-gray-800"
                whileHover={{
                  scale: 1.05,
                  color: '#4F46E5',
                  transition: { duration: 0.3 },
                }}
              >
                {project.title}
              </motion.h2>
              <motion.p
                className="text-gray-600 mb-6 text-lg"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                {project.description}
              </motion.p>
              <motion.div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: '#E5E7EB',
                      transition: { duration: 0.2 },
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              <motion.h3 className="text-2xl font-semibold mb-4 text-gray-800">Key Features</motion.h3>
              <motion.ul className="list-disc pl-5 mb-6 text-gray-600">
                {project.features.map((feature, index) => (
                  <motion.li key={index} whileHover={{ scale: 1.02, color: '#4F46E5', transition: { duration: 0.2 } }}>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.h3 className="text-2xl font-semibold mb-4 text-gray-800">Project Stats</motion.h3>
              <motion.div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(project.stats).map(([key, value]) => (
                  <motion.div key={key} className="bg-gray-100 p-4 rounded-lg text-center" whileHover={{ scale: 1.05, backgroundColor: '#E5E7EB', transition: { duration: 0.2 } }}>
                    <span className="text-2xl font-bold text-gray-800">{value}</span>
                    <span className="block text-sm text-gray-600 capitalize">{key}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex space-x-4 mb-6">
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-blue-700"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: '#4F46E5',
                    boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project <ExternalLink size={18} className="ml-2" />
                </motion.a>
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-gray-300"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: '#E5E7EB',
                    boxShadow: '0 0 15px rgba(107, 114, 128, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  GitHub <Github size={18} className="ml-2" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute bottom-6 right-6 flex space-x-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onPrev} className="p-3 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition duration-300">
              <ChevronLeft size={24} color="#4B5563" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onNext} className="p-3 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition duration-300">
              <ChevronRight size={24} color="#4B5563" />
            </motion.button>
          </div>
        </div>
      </div>
      {/* MacBook base */}
      <div className="bg-[#e2e2e7] h-3 rounded-b-[20px] shadow-2xl relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-1/5 h-1 bg-[#b1b2b7] rounded-full" />
      </div>

      {/* Close button */}
      <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="absolute -top-4 -right-4 p-2 bg-red-500 text-white rounded-full shadow-lg z-10">
        <X size={24} />
      </motion.button>
    </motion.div>
  </motion.div>
);

export default MacBookModal;