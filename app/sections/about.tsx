'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { Headline } from '../components/headline';

const ease = [0.16, 1, 0.3, 1] as const;

const skills = [
  { name: 'Next.js & React ecosystem', detail: 'Advanced proficiency, building scalable SPAs and SSR apps.' },
  { name: 'TypeScript & JavaScript (ESNext)', detail: 'Strong expertise in modern JS and static typing.' },
  { name: 'UI/UX design & prototyping', detail: 'Figma, Adobe XD. User-centered design principles.' },
  { name: 'Node.js, Express & NestJS', detail: 'Building robust RESTful and GraphQL APIs.' },
  { name: 'Databases (SQL & NoSQL)', detail: 'PostgreSQL, MongoDB, Firebase.' },
  { name: 'Cloud & DevOps (AWS, Docker)', detail: 'CI/CD, serverless, containerization.' },
];

const education = [
  {
    title: "Master's in Artificial Intelligence",
    where: 'Texas A&M University, Corpus Christi',
    period: '2022 – 2024',
    detail:
      'Deep dived into advanced AI, machine learning, and distributed systems, culminating in a significant research project on Natural Language Processing applications.',
  },
  {
    title: "Bachelor's in Computer Science",
    where: 'DIT University, India',
    period: '2016 – 2020',
    detail:
      'Established a comprehensive foundation in core computer science principles, data structures, algorithms, and modern software engineering methodologies.',
  },
];

const rings = [
  { inset: 'inset-0', dur: '40s', dir: 'normal', items: ['React', 'Next.js'] },
  { inset: 'inset-[14%]', dur: '28s', dir: 'reverse', items: ['AI', 'Testing'] },
  { inset: 'inset-[28%]', dur: '20s', dir: 'normal', items: ['Ink', 'Pixels'] },
];

/** Replaces the stock photo: a monogram with my three worlds orbiting it. */
const Orbit = () => (
  <div
    className="relative mx-auto aspect-square w-full max-w-[28rem]"
    role="img"
    aria-label="Monogram AS orbited by React, Next.js, AI, testing, ink and pixels"
  >
    {rings.map((r) => (
      <div
        key={r.inset}
        className={`absolute ${r.inset} rounded-full border border-dashed border-ink/30`}
        style={{ animation: `spin ${r.dur} linear infinite ${r.dir}` }}
      >
        {r.items.map((t, i) => (
          <span key={t} className={`absolute left-1/2 ${i === 0 ? '-top-4' : '-bottom-4'} -translate-x-1/2`}>
            <span
              className="block rounded-full bg-ink px-3 py-1.5 text-sm font-bold text-bone"
              style={{ animation: `spin ${r.dur} linear infinite ${r.dir === 'normal' ? 'reverse' : 'normal'}` }}
            >
              {t}
            </span>
          </span>
        ))}
      </div>
    ))}
    <div className="absolute inset-[42%] grid place-items-center rounded-full bg-signal">
      <span className="display !text-[clamp(1.5rem,5vw,3rem)] text-ink">AS</span>
    </div>
  </div>
);

const AboutSection: React.FC = () => (
  <div className="bg-bone text-ink">
    <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:px-8 md:py-36 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="px-10 sm:px-8">
            <Orbit />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <Headline>{'Roots in the Himalayas. Working from Texas.'}</Headline>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="mt-8 space-y-5"
        >
          <p className="max-w-[58ch] text-xl leading-snug">
            I&apos;m a developer with roots in the Himalayas and wings that have taken me across continents. My journey in
            technology is fueled by curiosity and creativity, blending technical expertise with an artistic vision.
          </p>
          <p className="max-w-[58ch] text-lg leading-relaxed text-bone-dim">
            I approach problems from unique perspectives, always striving to craft elegant and effective digital
            solutions. Whether it&apos;s intricate code or intuitive design, I find joy in the process of creation.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://github.com/Jaemo12"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 font-semibold transition-colors hover:bg-ink hover:text-bone"
            >
              <Github size={18} aria-hidden /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/amitsamant12"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 font-semibold transition-colors hover:bg-ink hover:text-bone"
            >
              <Linkedin size={18} aria-hidden /> LinkedIn
            </a>
          </div>
        </motion.div>

        <div className="mt-20">
          <Headline as="h3" className="!text-[clamp(2.25rem,5vw,3.5rem)]">
            {'What I work with'}
          </Headline>
          <dl className="mt-8 border-t-2 border-ink">
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease, delay: (i % 3) * 0.05 }}
                className="group relative grid gap-1 overflow-hidden border-b border-ink/20 py-5 sm:grid-cols-2 sm:gap-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-signal transition-transform duration-300 group-hover:scale-y-100"
                />
                <dt className="text-lg font-bold transition-transform duration-300 group-hover:translate-x-3">{s.name}</dt>
                <dd className="text-base text-bone-dim transition-transform duration-300 group-hover:translate-x-3">
                  {s.detail}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <div className="mt-20">
          <Headline as="h3" className="!text-[clamp(2.25rem,5vw,3.5rem)]">
            {'Education'}
          </Headline>
          <div className="relative mt-8 pl-8">
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.4, ease }}
              className="absolute bottom-2 left-[5px] top-2 w-0.5 origin-top bg-ink/70"
            />
            {education.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                className="relative pb-10 last:pb-0"
              >
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 380, damping: 14, delay: 0.3 + i * 0.1 }}
                  className="absolute -left-8 top-1.5 h-3 w-3 rounded-full bg-signal ring-4 ring-bone"
                />
                <p className="font-mono text-sm tabular-nums text-signal">{e.period}</p>
                <h4 className="mt-1 text-2xl font-bold">{e.title}</h4>
                <p className="text-base text-bone-dim">{e.where}</p>
                <p className="mt-3 max-w-[60ch] text-base leading-relaxed">{e.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutSection;
