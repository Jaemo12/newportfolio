import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import "./AboutSection.css";

const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={ref} className="about-section">
      <div className="hero">
        <motion.div 
          className="profile-image-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Image
            src="https://assets.lummi.ai/assets/QmRyemCVGyhZ21QQUZaQh2gyJFepunhb3sgrdfe9ih5QFS?auto=format&w=1500"
            alt="Profile"
            width={300}
            height={300}
            className="profile-image"
          />
        </motion.div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            <TypeAnimation
              sequence={[
                "I'M A Web Developer",
                1000,
                "I'M A UX Designer",
                1000,
                "I'M A Problem Solver",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle"
          >
            Passionate about creating beautiful and functional web experiences
          </motion.p>
        </div>
      </div>

      <motion.div className="journey-section" style={{ y }}>
        <h2 className="section-title">My Journey</h2>
        <div className="journey-content">
          <Image
            src="https://assets.lummi.ai/assets/QmeH5tKTmET9c4JeDfTTWb7fzmMLapxuSoDTXmp53ic6vp?auto=format&w=1500"
            alt="My Journey Image"
            width={400}
            height={300}
            className="journey-image"
          />
          <p className="journey-text">
            I hold a degree in Computer Science from [Your University]. My educational background has provided me with a strong foundation in software development principles and problem-solving skills.
          </p>
        </div>
      </motion.div>

      <div className="skills-section">
        <h2 className="section-title">My Expertise</h2>
        <div className="skills-grid">
          <motion.div 
            className="skill-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3>Frontend Development</h3>
            <p>Specializing in React, TypeScript, and modern CSS techniques to create responsive and user-friendly interfaces.</p>
          </motion.div>
          <motion.div 
            className="skill-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3>Backend Development</h3>
            <p>Proficient in Node.js and database management, ensuring robust and scalable server-side solutions.</p>
          </motion.div>
          <motion.div 
            className="skill-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3>Full Stack Development</h3>
            <p>Experienced in integrating frontend and backend technologies to create complete web applications.</p>
          </motion.div>
          <motion.div 
            className="skill-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3>DevOps & Deployment</h3>
            <p>Skilled in CI/CD pipelines, containerization, and cloud deployment for efficient application delivery.</p>
          </motion.div>
        </div>
      </div>

      
    </section>
  );
};

export default AboutSection;