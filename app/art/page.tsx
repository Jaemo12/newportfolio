import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import './art.css';

const ArtPortfolio = () => {
  const [quote, setQuote] = useState('');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const artworks = [
    { id: 1, title: 'Abstract Harmony', image: 'https://assets.lummi.ai/assets/QmRiyUh7STc4NBoJpRkTUBUPYoy5wgRm54Q8AFPexx1vRR?auto=format&w=1500', description: 'A vibrant exploration of color and form, pushing the boundaries of perception.' },
    { id: 2, title: 'Urban Reflections', image: 'https://assets.lummi.ai/assets/QmRiyUh7STc4NBoJpRkTUBUPYoy5wgRm54Q8AFPexx1vRR?auto=format&w=1500', description: 'Cityscape captured in a moment of tranquility, where light dances on glass and steel.' },
    { id: 3, title: 'Nature\'s Whisper', image: 'https://assets.lummi.ai/assets/QmRiyUh7STc4NBoJpRkTUBUPYoy5wgRm54Q8AFPexx1vRR?auto=format&w=1500', description: 'Delicate flora rendered in soft pastels, inviting viewers into a world of serenity.' },
    { id: 4, title: 'Digital Dreams', image: 'https://assets.lummi.ai/assets/QmRiyUh7STc4NBoJpRkTUBUPYoy5wgRm54Q8AFPexx1vRR?auto=format&w=1500', description: 'A fusion of technology and imagination, where pixels become poetry.' },
  ];

  const photos = [
    { id: 1, image: 'https://assets.lummi.ai/assets/QmRiyUh7STc4NBoJpRkTUBUPYoy5wgRm54Q8AFPexx1vRR?auto=format&w=1500', caption: 'Capturing moments, one click at a time' },
    { id: 2, image: 'https://assets.lummi.ai/assets/QmRiyUh7STc4NBoJpRkTUBUPYoy5wgRm54Q8AFPexx1vRR?auto=format&w=1500', caption: 'Through my lens, the world becomes art' },
    { id: 3, image: 'https://assets.lummi.ai/assets/QmRiyUh7STc4NBoJpRkTUBUPYoy5wgRm54Q8AFPexx1vRR?auto=format&w=1500', caption: 'Every photo tells a story waiting to be heard' },
  ];

  const quotes = [
    "Art is the lie that enables us to realize the truth.",
    "The purpose of art is washing the dust of daily life off our souls.",
    "Every artist dips his brush in his own soul, and paints his own nature into his pictures.",
    "Art enables us to find ourselves and lose ourselves at the same time."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const ArtworkItem = ({ artwork, index }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

    useEffect(() => {
      if (inView) {
        controls.start('visible');
      }
    }, [controls, inView]);

    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
    };

    return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={variants}
        className={`artwork-item ${index === 2 ? 'center' : index % 2 === 0 ? 'left' : 'right'}`}
      >
        <div className="artwork-image">
          <motion.img 
            src={artwork.image} 
            alt={artwork.title} 
            className="shadow-neon" 
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          />
        </div>
        <div className="artwork-details">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {artwork.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {artwork.description}
          </motion.p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="art-portfolio">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="portfolio-title"
      >
        My Artistic Journey
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="quote"
      >
        {quote}
      </motion.div>

      <div className="artworks-container">
        {artworks.map((artwork, index) => (
          <ArtworkItem key={artwork.id} artwork={artwork} index={index} />
        ))}
      </div>

      <div className="photography-section">
        <motion.h2
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          My Photography
        </motion.h2>
        <motion.p 
          className="cheesy-line"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I don't just paint with brushes, I paint with light and moments.
        </motion.p>
        <div className="photo-slider">
          <button onClick={prevPhoto} className="slider-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <motion.div 
            className="photo-container"
            key={currentPhotoIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img 
              src={photos[currentPhotoIndex].image} 
              alt="Photography" 
              className="shadow-neon"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.p 
              className="photo-caption"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {photos[currentPhotoIndex].caption}
            </motion.p>
          </motion.div>
          <button onClick={nextPhoto} className="slider-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="cta-buttons">
        <motion.a 
          href="#" 
          className="btn-neon"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          View More Art
        </motion.a>
        <motion.a 
          href="#" 
          className="btn-neon"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Connect on Instagram
        </motion.a>
      </div>
    </div>
  );
};

export default ArtPortfolio;