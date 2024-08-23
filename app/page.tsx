'use client';
// pages/index.tsx
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Hero from './hero/page';
import Navbar from './navbar/page';
import AboutSection from './about/page';
import WorkExperience from './workex/page';
import Projects from './projects/page';
import BlurringText from './blur/page';
import SocialsPage from './social/page';
import ContactMePage from './contact/page';
import ArtPortfolio from './art/page';

const HomePage: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Your Name | Portfolio</title>
        <meta name="description" content="A showcase of my work and skills" />
        <link rel="stylesheet" href="/styles/AboutSection.css" />
      </Head>

      <main>
        <header>
          <Hero />
        </header>

        <Navbar />

        
          <AboutSection />
          <BlurringText />
        <WorkExperience />
        
        <Projects />
        <ArtPortfolio />
        <SocialsPage />
        <ContactMePage />

        </main>
    </>
  );
};

export default HomePage;