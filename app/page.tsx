'use client';

import React from 'react';
import Navbar from './sections/navbar';
import Hero from './sections/hero';
import AboutSection from './sections/about';
import WorkExperience from './sections/workex';
import Projects from './sections/projects';
import { AnimeDivider } from './components/animeDivider';
import { Marquee } from './components/marquee';
import { Story } from './components/story';
import { Konami } from './components/konami';
import { Testimonials } from './components/testimonials';
import { ScrollProgress } from './components/scrollProgress';
import SocialsPage from './sections/social';
import ContactMePage from './sections/contact';
import ArtPortfolio from './sections/art';
import Footer from './components/footer';
import { SectionTransition } from './components/sectionTransition';
import ServicesPage from './sections/services';

const HomePage: React.FC = () => {
  return (
    <>
      <main className="bg-ink text-bone">
        <ScrollProgress />
        <Konami />
        <Navbar />
        
        <SectionTransition id="home" effect="zoom">
          <Hero />
        </SectionTransition>
        
        <Marquee items={['Quality engineer', 'AI product builder', 'Artist']} />
        <AnimeDivider character="pikachu" label="Pikachu, an anime favorite" />

        <Story />

        <SectionTransition id="about" effect="slide">
          <AboutSection />
        </SectionTransition>
        
        <AnimeDivider character="spiritedaway" label="Spirited Away, an anime favorite" />

        <SectionTransition id="workex" effect="slide">
          <WorkExperience />
        </SectionTransition>
        
        <SectionTransition id="projects" effect="flip">
          <Projects />
        </SectionTransition>
        
        <Testimonials />
        <AnimeDivider character="animeGirl" label="An anime girl" />

        <SectionTransition id="art" effect="slide">
          <ArtPortfolio />
        </SectionTransition>
        
        
        
        <SectionTransition id="services" effect="slide">
          <ServicesPage />
        </SectionTransition>
        <AnimeDivider character="naruto" label="Naruto, an anime favorite" />

        <SectionTransition id="social" effect="slide">
          <SocialsPage />
        </SectionTransition>
        <SectionTransition id="contact" effect="zoom">
          <ContactMePage />
        </SectionTransition>
        
        <Footer />
      </main>
    </>
  );
};

export default HomePage;