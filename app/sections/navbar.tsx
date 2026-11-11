'use client';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';

const LINKS = [
  { label: 'Work', id: 'workex' },
  { label: 'Projects', id: 'projects' },
  { label: 'Art', id: 'art' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

const goTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mark the section nearest the middle of the viewport as current.
  useEffect(() => {
    const ids = ['home', 'about', ...LINKS.map((l) => l.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const linkClass = (id: string) =>
    `rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors duration-200 ${
      active === id ? 'text-[var(--ember-soft)]' : 'text-[var(--paper-dim)] hover:text-[var(--paper)]'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-[var(--line)] bg-ink' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            goTo('home');
          }}
          className="whitespace-nowrap font-script text-[1.65rem] leading-none text-[var(--paper)] transition-[text-shadow] duration-300 hover:[text-shadow:0_0_12px_#fff,0_0_28px_var(--ember)] sm:text-4xl"
        >
          Amit Samant
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(l.id);
                }}
                className={linkClass(l.id)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-[var(--line)] px-4 py-2 text-[0.95rem] font-medium text-[var(--paper)] transition-colors duration-200 hover:border-[var(--ember)] hover:text-[var(--ember-soft)] sm:inline-flex"
          >
            <FileText size={16} aria-hidden /> Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              goTo('contact');
            }}
            className="inline-flex items-center whitespace-nowrap rounded-lg bg-[var(--ember)] px-3 py-2 text-[0.9rem] font-semibold sm:px-4 sm:text-[0.95rem] text-[var(--ink)] transition-colors duration-200 hover:bg-[var(--ember-soft)]"
          >
            Start a project
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--paper)] transition-colors hover:bg-white/5 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[var(--line)] px-5 pb-5 pt-2 lg:hidden"
          >
            <ul className="flex flex-col">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      goTo(l.id);
                    }}
                    className={`block py-3 text-lg ${linkClass(l.id)} px-0`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-3 text-lg text-[var(--paper)]"
                >
                  <FileText size={18} aria-hidden /> Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
