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
import Footer from './components/footer/footer';
import LoadingPage from './LoadingPage/page';

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
        <title>Your Name | Portfolio</title>
        <meta name="description" content="A showcase of my work and skills" />
      </Head>

      <main className="bg-black text-white">
        <Navbar />
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <BlurringText />
        <section id="workex">
          <WorkExperience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="art">
          <ArtPortfolio />
        </section>
        <section id="social">
          <SocialsPage />
        </section>
        <section id="contact">
          <ContactMePage />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default HomePage;