import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './workex.css';

const WorkExperience = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const experiences = [
    {
      company: "Blipit",
      role: "Software Developer Intern",
      period: "June 2023 - August 2023",
      image: "https://assets.lummi.ai/assets/QmekRv8Q2gqh7HwiEwyq7RXXpjgegsSmLByi8pfUe12MDx?auto=format&w=1500",
      details: "Developed a web application using React and Node.js. Implemented user authentication and authorization. Integrated third-party APIs for enhanced functionality."
    },
    {
      company: "Noetic Systems",
      role: "Software Developer Intern",
      period: "May 2022 - July 2022",
      image: "https://assets.lummi.ai/assets/QmZhToW6K2Q5cHpcLzznc14GZJweYeb9B8ACJseHLH9sYi?auto=format&w=1500",
      details: "Assisted in the development of a mobile application using React Native. Worked on UI/UX improvements and bug fixes. Participated in code reviews and team meetings."
    }
  ];

  return (
    <div className="work-experience">
      <h2>Work Experience</h2>
      <div className="experience-container">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-card"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedJob(index)}
          >
            <img src={exp.image} alt={exp.company} />
            <div className="card-content">
              <h3>{exp.company}</h3>
              <p className="role">{exp.role}</p>
              <p className="period">{exp.period}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedJob !== null && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="iphone-modal"
              initial={{ y: "-50%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-50%", opacity: 0 }}
            >
              <div className="iphone-header">
                <div className="iphone-camera"></div>
              </div>
              <div className="modal-content">
                <h3>{experiences[selectedJob].company}</h3>
                <p className="role">{experiences[selectedJob].role}</p>
                <p className="period">{experiences[selectedJob].period}</p>
                <p className="details">{experiences[selectedJob].details}</p>
                <button onClick={() => setSelectedJob(null)}>Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkExperience;
