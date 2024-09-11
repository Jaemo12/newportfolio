'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Artwork {
  image: string;
  title?: string;
  caption?: string;
  description?: string;
}

interface SketchbookModalProps {
  artwork: Artwork;
  onClose: () => void;
}

const SketchbookModal: React.FC<SketchbookModalProps> = ({ artwork, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  console.log('Rendering SketchbookModal with artwork:', artwork);

  return (
    <AnimatePresence>
      <motion.div
        className="sketchbook-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="sketchbook-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="sketchbook-page left-page">
            <motion.div
              className="image-container"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <LazyLoadImage
                src={artwork.image}
                alt={artwork.title || artwork.caption}
                effect="blur"
              />
            </motion.div>
          </div>
          <div className="sketchbook-page right-page">
            <motion.div
              className="text-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <h2>{artwork.title || 'Photography'}</h2>
              <p>{artwork.description || artwork.caption}</p>
            </motion.div>
            <motion.button
              onClick={onClose}
              className="close-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SketchbookModal;
