'use client';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SketchbookModal from '../components/SketchBookModal/SketchBookModal';
import './art.css';

// Define types for Artwork and Photo objects
interface Artwork {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface Photo {
  id: number;
  image: string;
  caption: string;
}

const ArtPortfolio: React.FC = () => {
  // Allow null or an Artwork object
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const artworks: Artwork[] = useMemo(() => [
    { id: 1, title: 'Abstract Harmony', image: '/artwork1.jpeg', description: 'A vibrant exploration of color and form, pushing the boundaries of perception. Intricate details reveal hidden narratives within the chaos of hues.' },
    { id: 2, title: 'Urban Reflections', image: '/artwork2.jpg', description: 'Cityscape captured in a moment of tranquility, where light dances on glass and steel. Each window tells a story, each reflection a glimpse into urban life.' },
    { id: 3, title: 'Nature\'s Whisper', image: '/artwork3.jpg', description: 'Delicate flora rendered in soft pastels, inviting viewers into a world of serenity. Subtle textures and intricate patterns mimic nature\'s complexity.' },
    { id: 4, title: 'Digital Dreams', image: '/artwork4.jpg', description: 'A fusion of technology and imagination, where pixels become poetry. Each digital brushstroke carries meaning, creating a tapestry of modern expression.' },
  ], []);

  const photos: Photo[] = useMemo(() => [
    { id: 1, image: '/photo1.jpg', caption: 'A moment frozen in time, telling stories through light and shadow.' },
    { id: 2, image: '/photo1.jpeg', caption: 'Every frame captures a unique perspective, revealing hidden beauty.' },
    { id: 3, image: '/photo3.jpeg', caption: 'In each click, a new world unfolds, inviting exploration and wonder.' },
    { id: 4, image: '/photo4.jpeg', caption: 'Photography: where reality meets art in perfect harmony.' },
    { id: 5, image: '/photo5.jpeg', caption: 'Through the lens, ordinary moments become extraordinary memories.' },
    { id: 6, image: '/photo6.jpeg', caption: 'Capturing life\'s fleeting instants, one shutter release at a time.' },
  ], []);

  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const AnimatedText = ({ text, className }: { text: string, className?: string }) => (
    <h1 className={className}>
      {text.split('').map((char, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>{char}</span>
      ))}
    </h1>
  );

  return (
    <div className="art-portfolio">
      <AnimatedText text="My SketchBook" className="portfolio-title animated-text" />
      
      <div className="artworks-container">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="artwork-item animated-card"
            onClick={() => setSelectedArtwork(artwork)}
          >
            <div className="artwork-image">
              <LazyLoadImage
                src={artwork.image}
                alt={artwork.title}
                effect="blur"
                width="100%"
                height="100%"
              />
            </div>
            <div className="artwork-details">
              <h2>{artwork.title}</h2>
              <p>{artwork.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="photography-section">
        <AnimatedText text="My Photography" className="photography-title animated-text" />
        <p className="photo-quote">Exploring the world through my lens, one frame at a time.</p>
        <div className="photo-slider">
          <button onClick={prevPhoto} className="slider-button">
            <ChevronLeft size={40} />
          </button>
          <div 
            className="photo-container animated-card"
            onClick={() => setSelectedPhoto(photos[currentPhotoIndex])}
          >
            <LazyLoadImage
              src={photos[currentPhotoIndex].image}
              alt="Photography"
              effect="blur"
              width="100%"
              height="100%"
            />
            <p className="photo-caption">{photos[currentPhotoIndex].caption}</p>
          </div>
          <button onClick={nextPhoto} className="slider-button">
            <ChevronRight size={40} />
          </button>
        </div>
      </div>

      {selectedArtwork && (
        <SketchbookModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}

      {selectedPhoto && (
        <SketchbookModal
          artwork={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
};

export default React.memo(ArtPortfolio);
