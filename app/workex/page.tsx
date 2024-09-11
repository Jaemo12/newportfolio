'use client';
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./workex.css";

interface Experience {
  image: string;
  company: string;
  role: string;
  period: string;
  details: string;
}

const WorkExperience: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Experience | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headingRef.current?.classList.add("show-heading");
        }
      },
      { threshold: 0.3 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  const experiences: Experience[] = [
    {
      image: "photo1.jpeg",
      company: "Iam-Intelligence",
      role: "Gen AI / Full-Stack Development Intern",
      period: "June 2023 - August 2023",
      details: `
- Boosted MAIT app's user engagement & retention by 30% with Flutter & Dart.
- Improved Image Processing model's data extraction by 30% using Google Cloud Vision & OpenCV.
- Enhanced MAIT app security & privacy by 50% through Firebase integration.
- Automating data pipelines to cut deployment time by 50% & increase model accuracy.
- Exploring generative AI with Alpaca to elevate the MAIT app's user experience.`
    },
    {
      image: "photo2.jpeg",
      company: "Cognizant",
      role: "Software Developer",
      period: "May 2022 - July 2022",
      details: `
- Improved UX by 25% through full-stack development with React, Angular, & Java Spring Boot.
- Accelerated deployment by 40% with Docker containerization.
- Optimized AWS infrastructure & CI/CD, resulting in 15% faster launches & 20% cost reduction. 
- Enhanced software quality with Selenium, speeding up testing by 30% & reducing bugs by 20%. 
- Built API test suites with Postman & Jenkins integration for improved reliability.`
    }
  ];

  const handleOpenModal = (experience: Experience) => {
    setSelectedJob(experience);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <section className="work-experience">
      <h1 ref={headingRef} className="animated-heading">
  <span className="animated-heading__letter">M</span>
  <span className="animated-heading__letter">y</span>
  <span className="animated-heading__letter"> </span>
  <span className="animated-heading__letter">W</span>
  <span className="animated-heading__letter">o</span>
  <span className="animated-heading__letter">r</span>
  <span className="animated-heading__letter">k</span>
  <span className="animated-heading__letter"> </span>
  <span className="animated-heading__letter">E</span>
  <span className="animated-heading__letter">x</span>
  <span className="animated-heading__letter">p</span>
  <span className="animated-heading__letter">e</span>
  <span className="animated-heading__letter">r</span>
  <span className="animated-heading__letter">i</span>
  <span className="animated-heading__letter">e</span>
  <span className="animated-heading__letter">n</span>
  <span className="animated-heading__letter">c</span>
  <span className="animated-heading__letter">e</span>
</h1>

      <div className="experience-container">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-card"
            onClick={() => handleOpenModal(exp)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="card-image"
              style={{ backgroundImage: `url(${exp.image})` }}
            ></div>
            <div className="card-content">
              <h3>{exp.company}</h3>
              <p className="role">{exp.role}</p>
              <p className="period">{exp.period}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedJob && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="iphone-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="iphone-header">
                <div className="iphone-camera"></div>
                <div className="iphone-speaker"></div>
              </div>
              <div className="app-navbar">
                <h3>Work Experience</h3>
              </div>
              <div className="modal-content">
                <div
                  className="modal-image"
                  style={{ backgroundImage: `url(${selectedJob.image})` }}
                ></div>
                <div className="text-content">
                  <h3>{selectedJob.company}</h3>
                  <p className="role">{selectedJob.role}</p>
                  <p className="period">{selectedJob.period}</p>
                  <div className="details">
                    <ul>
                      {selectedJob.details.split('-').filter(detail => detail.trim() !== '').map((detail, index) => (
                        <li key={index}>{detail.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <button className="close-button" onClick={() => setSelectedJob(null)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkExperience;