'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import './AboutSection.css';

const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const journeyRef = useRef(null);
  const skillsRef = useRef(null);
  const profileImageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, -100]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const profileImageY = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, -150]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const journeyOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 0]);
  const journeyY = useSpring(useTransform(scrollYProgress, [0.2, 0.4, 0.6], [100, 0, -100]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const skillsOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const skillsY = useSpring(useTransform(scrollYProgress, [0.6, 0.8], [100, 0]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 });
  const isJourneyInView = useInView(journeyRef, { once: false, amount: 0.5 });
  const isSkillsInView = useInView(skillsRef, { once: false, amount: 0.3 });

  const welcomeText = "The Story So Far".split(" ");
  const journeyTitle = "My Journey".split("");
  const skillsTitle = "My Expertise".split("");

  const skills = [
    { title: "Frontend Development", description: "React, TypeScript, CSS", icon: "💻" },
    { title: "Backend Development", description: "Node.js, Express, MongoDB", icon: "🖥️" },
    { title: "Mobile Development", description: "React Native, Flutter", icon: "📱" },
    { title: "DevOps", description: "Docker, Kubernetes, CI/CD", icon: "🚀" },
    { title: "UI/UX Design", description: "Figma, Adobe XD", icon: "🎨" },
    { title: "Cloud Services", description: "AWS, Google Cloud, Azure", icon: "☁️" },
  ];

  return (
    <section ref={sectionRef} className="about-section">
      <motion.div 
        className="hero"
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <motion.div 
          className="profile-image-container"
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ y: profileImageY }}
          ref={profileImageRef}
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
          <motion.h1 className="hero-title">
            {welcomeText.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {word}{' '}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <TypeAnimation
              sequence={[
                "I'm a Web Developer",
                1000,
                "I'm a UX Designer",
                1000,
                "I'm a Problem Solver",
                1000,
                "I'm a Creator",
                1000,
              ]}
              wrapper="h2"
              speed={50}
              repeat={Infinity}
              className="hero-subtitle"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-description"
          >
            Passionate about creating beautiful and functional web experiences
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        className="journey-section" 
        style={{ opacity: journeyOpacity, y: journeyY }}
        ref={journeyRef}
      >
        <h2 className="section-title">
          {journeyTitle.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isJourneyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {letter}
            </motion.span>
          ))}
        </h2>
        <div className="journey-content">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isJourneyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="https://assets.lummi.ai/assets/QmeH5tKTmET9c4JeDfTTWb7fzmMLapxuSoDTXmp53ic6vp?auto=format&w=1500"
              alt="My Journey Image"
              width={400}
              height={300}
              className="journey-image"
            />
          </motion.div>
          <motion.p
            className="journey-text"
            initial={{ opacity: 0, x: 100 }}
            animate={isJourneyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi there! I'm a software developer who loves turning caffeine into code.  With two years of experience and a Master's in Computer Science, I'm all about building elegant solutions.  But hey, it's not all about the tech.  I hail from a small mountain town in India (Pithoragarh, represent!), and I'm also a bit of an art enthusiast.  Currently soaking up the Texas sun in Dallas, and always open to exciting new projects!
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        className="skills-section"
        style={{ opacity: skillsOpacity, y: skillsY }}
        ref={skillsRef}
      >
        <h2 className="section-title">
          {skillsTitle.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {letter}
            </motion.span>
          ))}
        </h2>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isSkillsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              whileHover={{ 
                scale: 1.05, 
                rotate: [0, 2, -2, 0],
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;