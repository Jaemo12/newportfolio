'use client';

import { Headline } from '../components/headline';
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Tilt } from '../components/scenes';
import { JournalScene, RecipeScene, ReviewScene } from '../components/projectScenes';

interface Project {
  title: string;
  story: string;
  Scene: React.ComponentType;
  technologies: string[];
  features: string[];
  link?: string;
  github?: string;
}

// Each project opens with the real conversation that started it.
const projects: Project[] = [
  {
    title: 'AI Diary',
    story:
      "I was chatting with a friend who mentioned how journaling helped them, but they often struggled to see patterns or get deeper insights. That sparked an idea: what if a journal could offer gentle, AI-driven reflections? That's how MindScape (AI Diary) was born – an AI-powered journaling app designed to foster self-reflection and emotional well-being. It uses advanced natural language processing to analyze entries, offering personalized insights and support.",
    Scene: JournalScene,
    technologies: ['React.js', 'Firebase', 'Tailwind CSS', 'Gemini API', 'TypeScript'],
    features: [
      'AI-driven mood analysis and personalized insights',
      'Secure and private journaling environment',
      'Interactive chatbot for emotional support',
      'Track mood trends and identify triggers',
    ],
  },
  {
    title: 'ReviewFlix',
    story:
      "A movie buff buddy of mine was complaining about generic movie recommendations. 'They just don't get my vibe!' he said. It got me thinking: what if recommendations could understand the emotion behind reviews, not just star ratings? And so, ReviewFlix came to be – a platform leveraging sentiment analysis and emotional intelligence on TMDB reviews for truly personalized suggestions.",
    Scene: ReviewScene,
    technologies: ['Next.js', 'Framer Motion', 'Python', 'Sentiment Analysis', 'MongoDB'],
    features: [
      'Personalized movie recommendations',
      'Emotion-based filtering',
      'Deep dive into review sentiment',
      'User-friendly interface',
    ],
  },
  {
    title: 'RecipeGenius',
    story:
      "My cousin, a budding home cook, often felt overwhelmed by complex recipes and wished for something tailored to her tastes and available ingredients. 'I wish cooking was less guesswork and more... genius!' she joked. That conversation was the seed for RecipeGenius, a culinary companion that uses AI to generate unique, personalized recipes, making cooking creative and fun.",
    Scene: RecipeScene,
    technologies: ['Next.js', 'Firebase', 'Gemini API', 'TypeScript', 'Edamam API'],
    features: [
      'AI-powered recipe generation',
      'Intuitive search and filtering',
      'Personalized dietary recommendations',
      'Step-by-step cooking instructions',
    ],
  },
];

const ProjectsShowcase = () => (
  <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-36">
    <Headline className="">{'Every project started with a conversation'}</Headline>

    <div className="mt-20 space-y-32 md:space-y-44">
      {projects.map((project, index) => (
        <motion.article
          key={project.title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="display mb-6 !text-[clamp(3.5rem,13vw,6rem)] text-signal">{project.title}</h3>
          <div className="grid items-start gap-8 md:grid-cols-12 md:gap-12">
            <div className={`md:col-span-8 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
              <Tilt className="aspect-video w-full">
                <project.Scene />
              </Tilt>
            </div>
            <div className={`md:col-span-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
              <p className="text-base leading-relaxed text-paper-dim">{project.story}</p>
              <ul className="mt-6 space-y-2 text-base">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-1 w-3 shrink-0 bg-signal" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-paper-dim">
                <span className="sr-only">Built with: </span>
                {project.technologies.join(' · ')}
              </p>
              {(project.link || project.github) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-bold text-ink transition-colors hover:bg-signal-soft"
                    >
                      Live demo <ExternalLink size={16} aria-hidden />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border-2 border-bone px-5 py-2.5 font-semibold transition-colors hover:bg-bone hover:text-ink"
                    >
                      <Github size={16} aria-hidden /> Source
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  </div>
);

export default ProjectsShowcase;
