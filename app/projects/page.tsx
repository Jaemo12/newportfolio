import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ExternalLink, Github, Code, Users, Zap } from 'lucide-react';
import './projects.css';

const MacBookProjectsShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const controls = useAnimation();

  
    const projects = [
      {
        title: "NexusAI",
        description: "An advanced AI-powered platform that revolutionizes natural language processing and generation. NexusAI leverages cutting-edge machine learning algorithms to provide human-like text interactions, content creation, and data analysis.",
        image: "https://assets.lummi.ai/assets/QmWLgttKs6fgnxAUrxe4sznNg9vTdBWimTw45SdCiACMzW?auto=format&w=1500",
        technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
        link: "https://nexusai.tech",
        github: "https://github.com/yourusername/nexusai",
        features: [
          "State-of-the-art language models",
          "Real-time text generation and analysis",
          "Multi-language support with 50+ languages",
          "Customizable AI training pipelines"
        ],
        stats: {
          users: "100k+",
          accuracy: "99.7%",
          languages: "50+"
        }
      },
      {
        title: "EcoTrack",
        description: "A comprehensive environmental monitoring system that utilizes IoT sensors and big data analytics to track and analyze ecological parameters in real-time. EcoTrack empowers researchers, governments, and corporations to make data-driven decisions for sustainability.",
        image: "https://assets.lummi.ai/assets/QmbaVqi9crSVC95dcGG3x4g7zmiFy2jdoNseaa1REHYedN?auto=format&w=1500",
        technologies: ["IoT", "AWS", "React Native", "Python", "TensorFlow"],
        link: "https://ecotrack.earth",
        github: "https://github.com/yourusername/ecotrack",
        features: [
          "Global network of IoT environmental sensors",
          "Real-time data visualization and analytics",
          "Predictive modeling for environmental trends",
          "Mobile app for citizen science contributions"
        ],
        stats: {
          sensors: "1M+",
          dataPoints: "1B+/day",
          countries: "50+"
        }
      },
      {
        title: "CryptoNova",
        description: "A next-generation cryptocurrency trading platform that combines advanced trading tools with social features. CryptoNova uses AI to provide personalized trading insights and risk management strategies for both novice and expert traders.",
        image: "https://assets.lummi.ai/assets/QmRiyUh7STc4NBoJpRkTUBUPYoy5wgRm54Q8AFPexx1vRR?auto=format&w=1500",
        technologies: ["React", "Node.js", "WebSocket", "MongoDB", "TensorFlow"],
        link: "https://cryptonova.finance",
        github: "https://github.com/yourusername/cryptonova",
        features: [
          "AI-powered trading signals and portfolio management",
          "Real-time market data and social sentiment analysis",
          "Secure multi-currency wallet with hardware key support",
          "Community-driven education and mentorship programs"
        ],
        stats: {
          tradingVolume: "$500M+/day",
          users: "2M+",
          cryptos: "100+"
        }
      },
    ];


  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    }));
  }, [controls]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-black text-white font-sans p-8 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-7xl font-bold text-center mb-24 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 tracking-tight"
      >
        Innovative Projects Showcase
      </motion.h1>

      {/* Featured Projects */}
      <div className="w-full max-w-7xl mx-auto space-y-64 mb-32">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            animate={controls}
            custom={index}
            className="flex flex-col lg:flex-row items-center gap-16 relative"
          >
            <motion.div 
              className="w-full lg:w-1/2 relative z-10"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <img src={project.image} alt={project.title} className="w-full h-auto rounded-lg shadow-2xl" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 rounded-lg"
                whileHover={{ opacity: 0.3 }}
              />
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-8 relative z-20">
              <motion.h2 
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 8px rgb(192, 132, 252, 0.8)",
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
                {Object.entries(project.stats).map(([key, value], statIndex) => (
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
            {/* Background decorative elements */}
            <motion.div 
              className="absolute -top-20 -left-20 w-64 h-64 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
            <motion.div 
              className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -90, 0],
              }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1,
              }}
            />
          </motion.div>
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
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-full max-w-5xl perspective-1000"
            >
              {/* MacBook frame */}
              <div className="bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-3xl p-4 shadow-2xl transform-gpu rotateX-5 relative">
                <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-1/4 h-2 bg-gray-800 rounded-full" />
                {/* Screen */}
                <div className="bg-white rounded-2xl aspect-video p-8 relative overflow-hidden shadow-inner">
                  {/* Project content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.5 }}
                      className="h-full flex flex-col"
                    >
                      <motion.img 
                        src={projects[currentIndex].image} 
                        alt={projects[currentIndex].title} 
                        className="w-full h-48 object-cover rounded-lg mb-6 shadow-lg"
                        whileHover={{
                          scale: 1.05,
                          rotateY: 5,
                          transition: { duration: 0.3 }
                        }}
                      />
                      <motion.h2 
                        className="text-3xl font-bold mb-4 text-gray-800"
                        whileHover={{
                          scale: 1.05,
                          color: "#4F46E5",
                          transition: { duration: 0.3 }
                        }}
                      >
                        {projects[currentIndex].title}
                      </motion.h2>
                      <motion.p 
                        className="text-gray-600 mb-6 text-lg"
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.3 }
                        }}
                      >
                        {projects[currentIndex].description}
                      </motion.p>
                      <motion.div className="flex flex-wrap gap-2 mb-6">
                        {projects[currentIndex].technologies.map((tech) => (
                          <motion.span 
                            key={tech} 
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "#E5E7EB",
                              transition: { duration: 0.2 }
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                      
                      <motion.a 
                        href={projects[currentIndex].link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-blue-700"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#4F46E5",
                          boxShadow: "0 0 15px rgba(37, 99, 235, 0.5)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Project
                      </motion.a>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation buttons */}
                  <div className="absolute bottom-6 right-6 flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePrev}
                      className="p-3 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition duration-300"
                    >
                      <ChevronLeft size={24} color="#4B5563" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNext}
                      className="p-3 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300 transition duration-300"
                    >
                      <ChevronRight size={24} color="#4B5563" />
                    </motion.button>
                  </div>
                </div>
              </div>
              {/* MacBook base */}
              <div className="bg-gradient-to-b from-gray-300 to-gray-400 h-6 rounded-b-3xl shadow-2xl"></div>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-4 -right-4 p-2 bg-red-500 text-white rounded-full shadow-lg z-10"
              >
                <X size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MacBookProjectsShowcase;