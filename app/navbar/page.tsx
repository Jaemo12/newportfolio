'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, FolderOpen, FileText, Users, Mail, Linkedin, Github, Instagram, X } from 'lucide-react';
import { LucideProps } from 'lucide-react';

// CSS for font import - add this at the top of your CSS file
// @import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap');

interface NavItemProps {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  label: string;
  targetId: string;
  onItemClick: () => void;
}

interface SocialIconProps {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, targetId, onItemClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(`#${targetId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      onItemClick();
    }
  };

  return (
    <motion.a
      href={`#${targetId}`}
      onClick={handleClick}
      className="group relative flex items-center space-x-4 text-gray-400 hover:text-white transition-all duration-300 no-underline px-4 py-2 rounded-lg"
      whileHover={{ 
        x: 10,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-5 h-5" />
      </motion.span>
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </motion.a>
  );
};

const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, href }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-all duration-300 p-2"
      whileHover={{ 
        scale: 1.2,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "50%" 
      }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= 0 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
      
      // Set scrolled state for glass effect transition
      setScrolled(currentScrollY > 50);
      
      if (isOpen && currentScrollY > 0) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-black/30 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={false}
    >
      <div className="relative max-w-7xl mx-auto">
        <AnimatePresence>
          {isVisible && (
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative group focus:outline-none"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Base text layer */}
              <span 
                className="block text-5xl font-normal text-white opacity-90 transition-all duration-300"
                style={{ 
                  fontFamily: 'Cedarville Cursive, cursive',
                  filter: isHovered ? 'blur(0.5px)' : 'none',
                }}
              >
                Amit Samant
              </span>
              
              {/* Neon glow effect */}
              <span 
                className="absolute top-0 left-0 text-5xl font-normal transition-opacity duration-300"
                style={{ 
                  fontFamily: 'Cedarville Cursive, cursive',
                  opacity: isHovered ? 1 : 0,
                  color: '#fff',
                  textShadow: `
                    0 0 7px #fff,
                    0 0 10px #fff,
                    0 0 21px #fff,
                    0 0 42px rgb(56, 189, 248),
                    0 0 82px rgb(56, 189, 248),
                    0 0 92px rgb(56, 189, 248),
                    0 0 102px rgb(56, 189, 248),
                    0 0 151px rgb(56, 189, 248)
                  `,
                }}
              >
                Amit Samant
              </span>

              {/* Animated background glow */}
              <motion.div 
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: isHovered 
                    ? [
                        'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
                        'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)'
                      ]
                    : 'none'
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Menu overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at top left)" }}
              animate={{ 
                opacity: 1, 
                clipPath: "circle(150% at top left)",
                transition: {
                  duration: 0.5,
                  ease: "easeOut"
                }
              }}
              exit={{ 
                opacity: 0,
                clipPath: "circle(0% at top left)",
                transition: {
                  duration: 0.3,
                  ease: "easeIn"
                }
              }}
              className="absolute top-full left-0 right-0 mt-4 bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10"
            >
              {/* Close button */}
              <motion.button
                onClick={closeMenu}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Navigation Links */}
              <motion.div
                className="flex flex-col space-y-2 mb-8"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <NavItem icon={Home} label="Home" targetId="home" onItemClick={closeMenu} />
                <NavItem icon={Briefcase} label="Work Experience" targetId="workex" onItemClick={closeMenu} />
                <NavItem icon={FolderOpen} label="Projects" targetId="projects" onItemClick={closeMenu} />
                <NavItem icon={FileText} label="Resume" targetId="resume" onItemClick={closeMenu} />
                <NavItem icon={Users} label="Socials" targetId="social" onItemClick={closeMenu} />
                <NavItem icon={Mail} label="Contact" targetId="contact" onItemClick={closeMenu} />
              </motion.div>

              {/* Social Icons */}
              <motion.div
                className="flex justify-start space-x-4 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <SocialIcon icon={Linkedin} href="https://linkedin.com/in/amitsamant12" />
                <SocialIcon icon={Github} href="https://github.com/Jaemo12" />
                <SocialIcon icon={Instagram} href="https://www.instagram.com/_grim_jaw_" />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;