'use client';

import { Headline } from '../components/headline';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import { Github } from '../components/brandIcons';
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

const ease = [0.16, 1, 0.3, 1] as const;

const ProjectsShowcase = () => {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

  // Escape closes; the page behind stops scrolling while a project is open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const p = open === null ? null : projects[open];

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-36">
        <Headline>{'Every project started with a conversation'}</Headline>

        <div className="mt-20 space-y-32 md:space-y-44">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.8, ease }}
            >
              <h3 className="display mb-6 !text-[clamp(3.5rem,13vw,6rem)] text-signal">{project.title}</h3>
              <div className="grid items-start gap-8 md:grid-cols-12 md:gap-12">
                <div className={`md:col-span-8 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      opener.current = e.currentTarget;
                      setOpen(index);
                    }}
                    aria-label={`Open ${project.title} details`}
                    className="group relative block w-full cursor-pointer text-left"
                  >
                    <motion.div layoutId={`scene-${index}`} style={{ borderRadius: 12 }} className="overflow-hidden">
                      <Tilt className="aspect-video w-full">
                        <project.Scene />
                      </Tilt>
                    </motion.div>
                    <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 text-sm font-bold text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100 md:translate-y-2">
                      View project <ArrowUpRight size={16} aria-hidden />
                    </span>
                  </button>
                </div>
                <div className={`md:col-span-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <p className="line-clamp-6 text-base leading-relaxed text-paper-dim">{project.story}</p>
                  <ul className="mt-6 space-y-2 text-base">
                    {project.features.slice(0, 3).map((f) => (
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
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {p && open !== null && (
          <motion.div
            key="detail"
            role="dialog"
            aria-modal="true"
            aria-label={`${p.title} details`}
            className="fixed inset-0 z-[70] overflow-y-auto bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:px-8">
              <motion.button
                type="button"
                onClick={close}
                autoFocus
                aria-label="Close project"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.25, type: 'spring', stiffness: 300, damping: 20 } }}
                className="fixed right-5 top-5 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-bone text-ink transition-colors hover:bg-signal"
              >
                <X size={22} />
              </motion.button>

              <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
                <motion.div
                  layoutId={`scene-${open}`}
                  style={{ borderRadius: 12 }}
                  className="aspect-video w-full overflow-hidden lg:col-span-7"
                  transition={{ duration: 0.6, ease }}
                >
                  <p.Scene />
                </motion.div>

                <motion.div
                  className="lg:col-span-5"
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } }, hidden: {} }}
                >
                  {[
                    <h3 key="t" className="display !text-[clamp(2.75rem,7vw,4.5rem)] text-signal">
                      {p.title}
                    </h3>,
                    <p key="s" className="mt-6 max-w-[56ch] text-lg leading-relaxed text-bone/90">
                      {p.story}
                    </p>,
                    <ul key="f" className="mt-7 space-y-2.5 text-base">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 h-1 w-3 shrink-0 bg-signal" />
                          {f}
                        </li>
                      ))}
                    </ul>,
                    <ul key="x" className="mt-7 flex flex-wrap gap-2" aria-label="Built with">
                      {p.technologies.map((t) => (
                        <li key={t} className="rounded-full border border-bone/25 px-3.5 py-1 text-sm text-paper-dim">
                          {t}
                        </li>
                      ))}
                    </ul>,
                    p.link || p.github ? (
                      <div key="l" className="mt-8 flex flex-wrap gap-3">
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-bold text-ink transition-colors hover:bg-signal-soft"
                          >
                            Live demo <ExternalLink size={16} aria-hidden />
                          </a>
                        )}
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-bone px-5 py-2.5 font-semibold transition-colors hover:bg-bone hover:text-ink"
                          >
                            <Github size={16} aria-hidden /> Source
                          </a>
                        )}
                      </div>
                    ) : null,
                  ].map((node, i) =>
                    node ? (
                      <motion.div
                        key={i}
                        variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                      >
                        {node}
                      </motion.div>
                    ) : null
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsShowcase;
