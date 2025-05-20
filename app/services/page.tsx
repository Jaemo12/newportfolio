'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Define Service Interface
interface Service {
  id: number;
  title: string;
  icon: string; // Emoji or SVG path
  description: string;
  features: string[];
  color: string; // Accent color for the card
}

// Services Data
const servicesData: Service[] = [
  {
    id: 1,
    title: "Web Development",
    icon: "💻",
    description: "Creating responsive, user-friendly websites and web applications with modern technologies and frameworks.",
    features: [
      "Custom website development",
      "E-commerce solutions",
      "Progressive Web Apps (PWA)",
      "Frontend & backend development",
      "CMS integration (WordPress, Shopify)",
      "UI/UX optimization"
    ],
    color: "#6366f1" // Indigo
  },
  {
    id: 2,
    title: "Mobile Development",
    icon: "📱",
    description: "Building native and cross-platform mobile applications that provide seamless user experiences across devices.",
    features: [
      "iOS & Android applications",
      "React Native development",
      "Flutter applications",
      "App maintenance & updates",
      "API integration",
      "Performance optimization"
    ],
    color: "#8b5cf6" // Violet
  },
  {
    id: 3,
    title: "API Development",
    icon: "🔌",
    description: "Designing and implementing robust, scalable APIs that power modern applications and services.",
    features: [
      "RESTful API development",
      "GraphQL implementation",
      "API documentation",
      "Security & authentication",
      "Performance optimization",
      "Third-party integrations"
    ],
    color: "#ec4899" // Pink
  },
  {
    id: 4,
    title: "Cloud Solutions",
    icon: "☁️",
    description: "Leveraging cloud technologies to build scalable, reliable, and cost-effective infrastructure for your applications.",
    features: [
      "AWS, Azure, Google Cloud",
      "Serverless architecture",
      "Infrastructure as Code",
      "Cloud migration",
      "DevOps automation",
      "Continuous deployment"
    ],
    color: "#14b8a6" // Teal
  },
  {
    id: 5,
    title: "Commissioned Art",
    icon: "🎨",
    description: "Creating custom digital art pieces tailored to your specific vision, style, and requirements.",
    features: [
      "Character illustrations",
      "Portrait commissions",
      "Concept art",
      "Digital paintings",
      "NFT artwork creation",
      "Commercial usage rights"
    ],
    color: "#f59e0b" // Amber
  },
  {
    id: 6,
    title: "UI/UX Design",
    icon: "✨",
    description: "Crafting intuitive, beautiful user interfaces and experiences that delight users and drive engagement.",
    features: [
      "User research and analysis",
      "Wireframing and prototyping",
      "Visual design systems",
      "Interaction design",
      "Usability testing",
      "Design implementation support"
    ],
    color: "#10b981" // Emerald
  }
];

// Animated Heading Component
const AnimatedHeading = ({ 
  children, 
  className = ""
}: { 
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px", amount: 0.2 });
  
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 30 }} // Slightly reduced y offset
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Faster duration
      className={`text-6xl md:text-7xl font-jersey ${className}`} // Reduced font size slightly
    >
      {children}
    </motion.h2>
  );
};

// Service Card Component with Optimized Hover Effects
const ServiceCard = ({ 
  service, 
  index, 
  isExpanded, 
  setExpandedId 
}: { 
  service: Service;
  index: number;
  isExpanded: boolean;
  setExpandedId: (id: number | null) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px", amount: 0.1 });
  
  const handleClick = () => {
    setExpandedId(isExpanded ? null : service.id);
  };
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      layout // Keep layout for the expansion animation
      layoutId={`service-${service.id}`}
      className={`rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-400 group relative shadow-lg hover:shadow-xl
        ${isExpanded 
          ? 'col-span-1 md:col-span-2 row-span-2 bg-white/10 backdrop-blur-lg' // Adjusted col-span for expanded
          : 'bg-white/5 hover:bg-white/10'
        }`}
      onClick={handleClick}
      style={{ 
        border: `1px solid ${service.color}40`, // Base border
        // Hover shadow will be handled by whileHover for better performance
      }}
      whileHover={{
        boxShadow: isExpanded ? `0 10px 30px -10px ${service.color}30` : `0 0 25px ${service.color}40, 0 5px 15px -5px ${service.color}20`,
        borderColor: `${service.color}70`, // Darken border on hover
        y: isExpanded ? 0 : -4 // Slight lift on hover for non-expanded cards
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={isExpanded ? `expanded-${service.id}` : `collapsed-${service.id}`} // Ensure key changes for AnimatePresence
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`p-6 sm:p-8 h-full flex flex-col ${isExpanded ? 'justify-start items-start' : 'justify-between items-start'}`} // Ensure items-start
        >
          {/* Service Icon and Title */}
          <div>
            <motion.div 
              className={`text-3xl sm:text-4xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl mb-5 sm:mb-6 transition-all duration-300 relative`}
              style={{ 
                backgroundColor: `${service.color}25`, // Slightly more opaque base
                boxShadow: `0 4px 12px -4px ${service.color}40` // Base shadow for icon
              }}
              whileHover={{ 
                scale: isExpanded ? 1 : 1.08, // Only scale if not expanded
                rotate: isExpanded ? 0 : [0, 3, -3, 0], 
                boxShadow: `0 6px 18px -3px ${service.color}60` // Enhanced shadow on icon hover
              }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 15}}
            >
              <span className="relative z-10">{service.icon}</span>
            </motion.div>
            
            <motion.h3 
              className={`font-jersey text-2xl sm:text-3xl mb-3 sm:mb-4 relative inline-block`}
              style={{ color: isExpanded ? service.color : 'white' }}
              whileHover={{ x: isExpanded ? 0 : 3 }} // Slight text nudge if not expanded
            >
              {service.title}
              {!isExpanded && ( // Underline only when not expanded
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 origin-left" // Use origin-left for scaleX
                  style={{ backgroundColor: service.color }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isExpanded ? 0 : 0 }} // Keep it 0 unless hovered
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </motion.h3>
            
            <p className="text-white/70 text-sm sm:text-base mb-4 sm:mb-6">{service.description}</p>
          </div>
          
          {/* Service Features - Only visible when expanded */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay:0.1, ease: "easeOut" }}
              className="mt-auto pt-4 w-full" // Use mt-auto to push to bottom if needed, ensure full width
            >
              <div className="w-16 h-px mb-4 sm:mb-5" style={{ backgroundColor: service.color }} />
              
              <h4 className="text-lg sm:text-xl font-jersey mb-3 sm:mb-4" style={{color: service.color}}>What&apos;s Included:</h4>
              
              <ul className="space-y-2 sm:space-y-2.5">
                {service.features.map((feature, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 + i * 0.04, ease:"circOut" }}
                    className="flex items-center text-white/80 text-xs sm:text-sm group/item"
                    whileHover={{ x: 3, color: service.color }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full mr-2.5 sm:mr-3 flex-shrink-0 transition-colors duration-200 group-hover/item:scale-125" 
                      style={{ backgroundColor: service.color }}
                    />
                    <span className="transition-colors duration-200">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + service.features.length * 0.04 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: `0 0 20px ${service.color}70, 0 0 10px ${service.color}40` // Enhanced hover glow
                }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 sm:mt-8 px-5 py-2.5 rounded-full text-white text-sm font-medium relative overflow-hidden border"
                style={{borderColor: `${service.color}80`, background: `${service.color}20`}}
              >
                <span className="relative z-10">Discuss Project</span>
              </motion.button>
            </motion.div>
          )}
          
          {/* View More Indicator - Only visible when not expanded */}
          {!isExpanded && (
            <div className="flex items-center text-xs sm:text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300 mt-auto pt-4"> {/* Pushed to bottom */}
              <motion.span 
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease:"easeInOut" }}
                className="group-hover:text-white" style={{color: service.color}}
              >
                View details
              </motion.span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                className="ml-1.5 group-hover:text-white" style={{color: service.color}}
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease:"easeInOut", delay: 0.1 }}
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </motion.svg>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

// Optimized Animated Background
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" /> {/* Darker base gradient */}
      
      {/* Reduced number of orbs, simpler animation */}
      {servicesData.slice(0, 3).map((service, i) => ( // Only use first 3 for less load
        <motion.div
          key={`orb-${service.id}`}
          className="absolute rounded-full blur-[120px] md:blur-[180px]" // Slightly less blur
          animate={{ 
            scale: [1, 1.15, 1], // Simpler scale
            opacity: [0.03, 0.08, 0.03], // More subtle opacity
            x: [`${Math.random() * 40 - 20}%`, `${Math.random() * 40 - 20}%`], // Random horizontal movement
            y: [`${Math.random() * 40 - 20}%`, `${Math.random() * 40 - 20}%`], // Random vertical movement
          }}
          transition={{ 
            duration: 15 + i * 3, // Slower duration
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 2
          }}
          style={{ 
            backgroundColor: service.color,
            width: '35vw', // Slightly smaller
            height: '35vw',
            top: `${15 + i * 20}%`, // Spread them out
            left: `${(i % 2 === 0 ? 10 : 55) + Math.random()*10}%`, // Alternating sides
          }}
        />
      ))}
      
      <div 
        className="absolute inset-0 opacity-10" // More subtle grid
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.07) 0.5px, transparent 0.5px)', // Thinner dots
          backgroundSize: '30px 30px' // Smaller grid
        }}
      />
    </div>
  );
};

// Subtle Glowing Text Effect Component (Static Glow)
const SubtleGlowingText = ({ 
  children, 
  color = "#FFFFFFBF", // Default to a slightly off-white for better blending
  className = "" 
}: { 
  children: React.ReactNode; 
  color?: string; 
  className?: string 
}) => {
  return (
    <span
      className={`relative ${className}`}
      style={{ textShadow: `0 0 10px ${color}30, 0 0 15px ${color}20`}} // Static, subtle glow
    >
      {children}
    </span>
  );
};

// Main Services Page Component
export default function ServicesPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  return (
    <section className="min-h-screen py-24 sm:py-32 relative text-white overflow-hidden"> {/* Added overflow-hidden to main section */}
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> {/* Ensure content is above background */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease:"circOut" }}
            className="text-sm sm:text-base uppercase tracking-wider text-white/70 mb-3 sm:mb-4"
          >
            What I Offer
          </motion.span>
          
          <AnimatedHeading className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400 mb-4 sm:mb-6">
            <SubtleGlowingText>My Services</SubtleGlowingText>
          </AnimatedHeading>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease:"circOut" }}
            className="max-w-lg sm:max-w-xl text-white/80 text-sm sm:text-base"
          >
            Specialized solutions tailored to your needs, bringing your ideas to life with
            cutting-edge technology and exceptional design.
          </motion.p>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "120px" }} // Shorter line
            transition={{ duration: 1.2, delay: 0.4, ease:"circOut" }}
            className="h-px mt-10 sm:mt-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" // Adjusted gap
          layout // Keep layout for the grid itself for expansion
          transition={{
            layout: { duration: 0.5, type: "spring", bounce: 0.15 } // Softer spring
          }}
        >
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isExpanded={expandedId === service.id}
              setExpandedId={setExpandedId}
            />
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease:"circOut" }}
          viewport={{ once: true, margin: "-100px 0px", amount: 0.2 }}
          className="mt-24 sm:mt-32 text-center"
        >
          <h3 className="text-4xl sm:text-5xl font-jersey mb-5 sm:mb-6">
            <SubtleGlowingText color="#8b5cf6">Ready to Build Something Amazing?</SubtleGlowingText>
          </h3>
          
          <p className="text-white/70 max-w-lg sm:max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base">
            Lets discuss your project requirements and turn your vision into reality.
            Im committed to delivering high-quality, tailored solutions that exceed expectations.
          </p>
          
          <motion.button
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 0 25px rgba(139, 92, 246, 0.6), 0 0 10px rgba(139, 92, 246, 0.3)" // Enhanced glow
            }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-white font-jersey text-lg sm:text-xl relative overflow-hidden border border-purple-500/70"
            style={{background: "linear-gradient(45deg, #8b5cf6DD, #6366f1DD)"}} // Solid gradient, less animation
          >
            <span className="relative z-10">Get in Touch</span>
          </motion.button>
        </motion.div>
      </div>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Jersey+10&display=swap');
        
        .font-jersey {
          font-family: 'Jersey 10', serif; /* Changed from sans-serif to serif for Jersey 10 */
        }
        /* Ensure html and body allow for full page scroll without creating extra scrollbars */
        html, body {
            overflow-x: hidden;
        }
      `}</style>
    </section>
  );
}
