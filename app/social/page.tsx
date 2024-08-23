import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react';

const SocialIcon = ({ icon: Icon, link, delay }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="text-white hover:text-blue-400 transition-colors"
  >
    <Icon size={48} />
  </motion.a>
);

const SocialsPage = () => {
  const socialLinks = [
    { icon: Twitter, link: 'https://twitter.com/yourusername' },
    { icon: Facebook, link: 'https://facebook.com/yourusername' },
    { icon: Instagram, link: 'https://instagram.com/yourusername' },
    { icon: Linkedin, link: 'https://linkedin.com/in/yourusername' },
    { icon: Github, link: 'https://github.com/yourusername' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        Connect With Me
      </motion.h1>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {socialLinks.map((social, index) => (
          <SocialIcon
            key={index}
            icon={social.icon}
            link={social.link}
            delay={0.1 * (index + 1)}
          />
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 text-center max-w-md"
      >
        Feel free to reach out and connect with me on any of these platforms.
        I'm always excited to meet new people and discuss interesting ideas!
      </motion.p>
    </div>
  );
};

export default SocialsPage;