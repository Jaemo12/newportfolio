'use client';

import { Headline } from '../components/headline';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';

const links = [
  { name: 'LinkedIn', handle: 'amitsamant12', href: 'https://linkedin.com/in/amitsamant12' },
  { name: 'GitHub', handle: 'Jaemo12', href: 'https://github.com/Jaemo12' },
  { name: 'Instagram', handle: '_grim_jaw_', href: 'https://instagram.com/_grim_jaw_' },
  { name: 'Twitter', handle: 'AmitSamant7146', href: 'https://twitter.com/AmitSamant7146' },
  { name: 'Facebook', handle: 'amitsamantscience', href: 'https://facebook.com/amitsamantscience' },
];

export default function SocialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-36">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Headline className="">{'Find me elsewhere'}</Headline>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-full border-2 border-bone px-6 py-3 text-lg font-semibold transition-colors duration-200 hover:bg-bone hover:text-ink md:self-auto"
        >
          <FileText size={18} aria-hidden /> Download my resume
        </a>
      </div>

      <ul className="mt-14 border-t-2 border-bone">
        {links.map(({ name, handle, href }, i) => (
          <motion.li
            key={name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
            className="border-b border-bone/20"
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 py-5 transition-colors duration-200 hover:bg-signal hover:text-ink md:px-4"
            >
              <span className="display !text-[clamp(2.5rem,7vw,4.5rem)]">{name}</span>
              <span className="ml-auto hidden text-lg sm:block">{handle}</span>
              <ArrowUpRight
                size={32}
                aria-hidden
                className="shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
