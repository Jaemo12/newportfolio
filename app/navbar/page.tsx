"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, FolderOpen, FileText, Users, Mail } from 'lucide-react';
import Link from 'next/link';
import { LucideProps } from 'lucide-react';

interface NavItemProps {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  label: string;
  href: string; 
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href} legacyBehavior>
      <a className="no-underline"> 
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
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white text-xl font-semibold">Amit Samant</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem icon={Home} label="Home" href="/" /> 
              <NavItem icon={Briefcase} label="Work Experience" href="/workex" /> 
              <NavItem icon={FolderOpen} label="Projects" href="/projects" /> 
              <NavItem icon={FileText} label="Resume" href="/resume" /> 
              <NavItem icon={Users} label="Socials" href="/social" /> 
              <NavItem icon={Mail} label="Contact" href="/contact" /> 
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;