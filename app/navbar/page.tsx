import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, FolderOpen, FileText, Users, Mail } from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface NavItemProps {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  label: string;
  targetId: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, targetId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a href={`#${targetId}`} onClick={handleClick} className="no-underline">
      <motion.div
        className="relative flex items-center cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Icon className="w-5 h-5 text-gray-400" />
        <motion.span
          className="ml-2 text-sm font-medium text-gray-400"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </a>
  );
};

const AnimatedName = ({ name }: { name: string }) => {
  return (
    <div className="flex">
      {name.split('').map((char, index) => (
        <motion.span
          key={index}
          className="text-white text-xl font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <AnimatedName name="Amit Samant" />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem icon={Home} label="Home" targetId="home" />
              <NavItem icon={Briefcase} label="Work Experience" targetId="workex" />
              <NavItem icon={FolderOpen} label="Projects" targetId="projects" />
              <NavItem icon={FileText} label="Resume" targetId="social" />
              <NavItem icon={Users} label="Socials" targetId="social" />
              <NavItem icon={Mail} label="Contact" targetId="contact" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;