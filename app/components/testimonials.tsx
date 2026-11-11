'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/**
 * Add real quotes here, with the person's permission. While this list is
 * empty the whole section renders nothing, so no placeholder ever ships.
 */
const testimonials: Testimonial[] = [];

export const Testimonials = () => {
  if (testimonials.length === 0) return null;
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-32">
        <h2 className="display">What people say</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="border-t-2 border-bone pt-6"
            >
              <blockquote className="text-2xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-base text-paper-dim">
                <span className="font-semibold text-bone">{t.name}</span>, {t.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
