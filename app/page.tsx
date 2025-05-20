'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './navbar/page';
import Hero from './hero/page';
import AboutSection from './about/page';
import WorkExperience from './workex/page';
import Projects from './projects/page';
import BlurringText from './blur/page';
import SocialsPage from './social/page';
import ContactMePage from './contact/page';
import ArtPortfolio from './art/page';
import Footer from './components/footer';
import LoadingPage from './LoadingPage/page';
import { SectionTransition } from './components/sectionTransition';
import ServicesPage from './services/page';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Head>
        <title>Amit Samant | Portfolio</title>
        <meta name="description" content="A showcase of my work and skills" />
      </Head>
      <main className="bg-black text-white">
        <Navbar />
        
        <SectionTransition id="home" effect="zoom">
          <Hero />
        </SectionTransition>
        
        <BlurringText />
        
        <SectionTransition id="about" effect="slide">
          <AboutSection />
        </SectionTransition>
        
        <SectionTransition id="workex" effect="slide">
          <WorkExperience />
        </SectionTransition>
        
        <SectionTransition id="projects" effect="flip">
          <Projects />
        </SectionTransition>
        
          <ArtPortfolio />
        
        
        
        <SectionTransition id="services" effect="slide">
          <ServicesPage />
        </SectionTransition>
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