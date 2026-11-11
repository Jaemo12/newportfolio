'use client';

import { Headline } from '../components/headline';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
}

const servicesData: Service[] = [
  {
    id: 1,
    title: 'Web development',
    description:
      'Creating responsive, user-friendly websites and web applications with modern technologies and frameworks.',
    features: [
      'Custom website development',
      'E-commerce solutions',
      'Progressive Web Apps (PWA)',
      'Frontend & backend development',
      'CMS integration (WordPress, Shopify)',
      'UI/UX optimization',
    ],
  },
  {
    id: 2,
    title: 'Mobile development',
    description:
      'Building native and cross-platform mobile applications that provide seamless user experiences across devices.',
    features: [
      'iOS & Android applications',
      'React Native development',
      'Flutter applications',
      'App maintenance & updates',
      'API integration',
      'Performance optimization',
    ],
  },
  {
    id: 3,
    title: 'API development',
    description: 'Designing and implementing robust, scalable APIs that power modern applications and services.',
    features: [
      'RESTful API development',
      'GraphQL implementation',
      'API documentation',
      'Security & authentication',
      'Performance optimization',
      'Third-party integrations',
    ],
  },
  {
    id: 4,
    title: 'Cloud solutions',
    description:
      'Leveraging cloud technologies to build scalable, reliable, and cost-effective infrastructure for your applications.',
    features: [
      'AWS, Azure, Google Cloud',
      'Serverless architecture',
      'Infrastructure as Code',
      'Cloud migration',
      'DevOps automation',
      'Continuous deployment',
    ],
  },
  {
    id: 5,
    title: 'Commissioned art',
    description: 'Creating custom digital art pieces tailored to your specific vision, style, and requirements.',
    features: [
      'Character illustrations',
      'Portrait commissions',
      'Concept art',
      'Digital paintings',
      'NFT artwork creation',
      'Commercial usage rights',
    ],
  },
  {
    id: 6,
    title: 'UI/UX design',
    description:
      'Crafting intuitive, beautiful user interfaces and experiences that delight users and drive engagement.',
    features: [
      'User research and analysis',
      'Wireframing and prototyping',
      'Visual design systems',
      'Interaction design',
      'Usability testing',
      'Design implementation support',
    ],
  },
];

const goContact = (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

export default function ServicesPage() {
  return (
    <div className="bg-bone text-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-36">
        <Headline className="">{'What I can build for you'}</Headline>
        <p className="mt-6 max-w-[52ch] text-xl leading-snug text-bone-dim">
          Specialized solutions tailored to your needs, from the first sketch to production.
        </p>

        <div className="mt-16 border-t-2 border-ink">
          {servicesData.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.05 }}
              className="grid gap-5 border-b border-ink/25 py-10 transition-colors duration-300 hover:bg-ink hover:text-bone md:grid-cols-12 md:gap-10 md:px-4 md:py-12 [&:hover_.sv-desc]:text-paper-dim"
            >
              <h3 className="display !text-[clamp(2.25rem,5vw,3.5rem)] md:col-span-5">{s.title}</h3>
              <p className="sv-desc max-w-[44ch] text-base leading-relaxed text-bone-dim md:col-span-3">{s.description}</p>
              <ul className="space-y-1.5 text-base md:col-span-4">
                {s.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-1 w-3 shrink-0 bg-signal" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <p className="display max-w-[14ch] !text-[clamp(2.5rem,6vw,4rem)]">Have a project in mind?</p>
          <a
            href="#contact"
            onClick={goContact}
            className="inline-flex items-center gap-3 rounded-full bg-signal px-8 py-5 text-xl font-bold text-ink transition-colors duration-200 hover:bg-ink hover:text-bone"
          >
            Start a project <ArrowRight size={22} aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
