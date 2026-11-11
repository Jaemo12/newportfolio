'use client';

import { Headline } from '../components/headline';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GrowthScene, PipelineScene, TestRunScene, Tilt } from '../components/scenes';

interface WorkExperience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  website?: string;
  Scene: React.ComponentType;
}

const workExperienceData: WorkExperience[] = [
  {
    id: 1,
    company: 'Cognixia',
    role: 'Quality Engineering Lead',
    period: 'Feb 2025 – Present',
    description:
      'Spearheading automated testing initiatives using Selenium and Tosca. Successfully reduced manual testing cycles by 35% and increased test coverage by 30%, significantly improving software reliability and deployment speed.',
    tech: ['Selenium', 'Tosca', 'Java', 'Jira API', 'Postman Pro', 'Agile', 'SQL Server'],
    website: 'https://www.cognixia.com',
    Scene: TestRunScene,
  },
  {
    id: 2,
    company: 'TIMIO',
    role: 'AI Chrome Extension Architect',
    period: 'May 2024 – Feb 2025',
    description:
      'Architected and developed an AI-driven Chrome extension for contextual news analysis. Utilized AWS for scalable backend infrastructure and React with Tailwind CSS for a dynamic frontend, achieving a 45% increase in daily active users.',
    tech: ['React', 'TypeScript', 'AWS', 'Tailwind CSS', 'Node.js', 'GPT-3 API'],
    Scene: GrowthScene,
  },
  {
    id: 3,
    company: 'Cognizant',
    role: 'Senior Software Engineer',
    period: 'Jul 2020 – May 2022',
    description:
      'Delivered robust full-stack solutions for enterprise clients using React, Angular, and Java Spring Boot. Championed the adoption of Docker and Kubernetes for CI/CD on Azure, enhancing deployment efficiency by over 50%.',
    tech: ['React', 'Angular', 'Java', 'Spring Boot', 'Docker', 'Kubernetes', 'Azure'],
    website: 'https://www.cognizant.com',
    Scene: PipelineScene,
  },
];

export default function WorkExperienceSection() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [wide, setWide] = useState(false);

  // On wide screens the jobs become a film strip: vertical scroll drives a
  // sideways slide. On narrow screens it is a normal stacked list.
  useEffect(() => {
    const measure = () => {
      setWide(window.innerWidth >= 1024);
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={outer} className="lg:h-[340vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 pt-24 sm:px-8 lg:pt-20">
          <Headline>{"Where I've worked"}</Headline>
        </div>

        <motion.div
          ref={track}
          style={{ x: wide ? x : 0 }}
          className="mt-12 flex flex-col gap-0 px-6 sm:px-8 lg:mt-10 lg:w-max lg:flex-row lg:gap-8 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        >
          {workExperienceData.map((exp) => (
            <React.Fragment key={exp.id}>
            <div aria-hidden className="h-0.5 w-full bg-bone lg:hidden" />
            <article
              className="group grid gap-6 py-10 transition-colors duration-300 lg:w-[72vw] lg:max-w-[64rem] lg:shrink-0 lg:grid-cols-12 lg:gap-8 lg:rounded-2xl lg:border lg:border-bone/25 lg:bg-ink-2 lg:p-10 lg:hover:border-signal"
            >
              <div className="lg:col-span-5">
                <p className="font-mono text-sm tabular-nums text-signal">{exp.period}</p>
                <h3 className="display mt-3 !text-[clamp(2.75rem,7vw,4.5rem)] transition-colors duration-300 group-hover:text-signal">
                  {exp.company}
                </h3>
                <p className="mt-3 text-lg text-paper-dim">{exp.role}</p>
                {exp.website && (
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-base font-semibold text-signal underline underline-offset-4 transition-colors hover:text-bone"
                  >
                    Visit site <ExternalLink size={14} aria-hidden />
                  </a>
                )}
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${exp.company} technologies`}>
                  {exp.tech.map((t) => (
                    <li key={t} className="rounded-full border border-bone/25 px-3 py-1 text-sm text-paper-dim">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-6 lg:col-span-7">
                <p className="max-w-[60ch] text-lg leading-snug lg:text-xl">{exp.description}</p>
                <Tilt className="h-52 w-full lg:h-60">
                  <exp.Scene />
                </Tilt>
              </div>
            </article>
            </React.Fragment>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 hidden w-full max-w-6xl px-8 lg:block" aria-hidden>
          <div className="h-[3px] w-full bg-bone/15">
            <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-signal" />
          </div>
        </div>
      </div>
    </div>
  );
}
