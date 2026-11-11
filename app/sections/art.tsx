'use client';

import { Headline } from '../components/headline';
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import Image from 'next/image';

const showcaseData = [
  {
    id: 1,
    src: '/art/artwork1.jpg',
    title: 'Ink & Quill Echoes',
    category: 'Pen & ink illustration',
    description: 'Delicate lines and intricate details whisper tales from a world born of ink and imagination.',
  },
  {
    id: 2,
    src: '/art/artwork2.jpg',
    title: 'Charcoal Dreams',
    category: 'Expressive charcoal study',
    description:
      'Shadows and light dance in monochrome, capturing raw emotion and fleeting moments in textured charcoal.',
  },
  {
    id: 3,
    src: '/art/artwork3.jpg',
    title: 'Digital Strokes',
    category: 'Concept art & digital painting',
    description:
      'Vibrant hues and imaginative forms converge on a digital canvas, bringing fantastical visions to life.',
  },
];

const ArtPortfolio = () => (
  <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-36">
    <div className="grid items-end gap-8 md:grid-cols-12">
      <Headline className="md:col-span-8">{'Drawing is the other half of what I do'}</Headline>
      <div className="md:col-span-4">
        <p className="text-lg text-paper-dim">A journey through hand-drawn worlds, where ink meets imagination.</p>
        <a
          href="https://instagram.com/_grim_jaw_"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-signal underline underline-offset-4 transition-colors hover:text-bone"
        >
          <Instagram size={20} aria-hidden /> See more on Instagram
        </a>
      </div>
    </div>

    <div className="mt-20 space-y-28 md:space-y-40">
      {showcaseData.map((item, index) => (
        <motion.figure
          key={item.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:aspect-[16/10]">
            <Image
              src={item.src}
              alt={`${item.title}: ${item.category}`}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
              priority={index === 0}
            />
          </div>
          <figcaption className="mt-6 grid gap-3 md:grid-cols-12 md:gap-10">
            <h3 className="display !text-[clamp(2.5rem,6vw,4rem)] md:col-span-7">{item.title}</h3>
            <div className="md:col-span-5">
              <p className="text-sm font-bold uppercase tracking-wide text-signal">{item.category}</p>
              <p className="mt-2 max-w-[44ch] text-base leading-relaxed text-paper-dim">{item.description}</p>
            </div>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  </div>
);

export default ArtPortfolio;
