'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ArrowUpRight, FileText, Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'workex' },
  { label: 'Projects', id: 'projects' },
  { label: 'Art', id: 'art' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

const goTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * A floating capsule. A highlight glides to whichever link you hover, a dot
 * marks the section you are in, and the bar tucks away when you scroll down
 * and returns when you scroll up.
 */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [hover, setHover] = useState<string | null>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 140 && y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6 || y < 140) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The section nearest the middle of the viewport is the current one.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ['home', ...LINKS.map((l) => l.id)].forEach((id) => {
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

  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4"
      animate={{ y: hidden && !open ? -110 : 0, opacity: hidden && !open ? 0 : 1 }}
      transition={{ duration: 0.45, ease }}
    >
      <LayoutGroup>
        <div className="pointer-events-auto relative w-full max-w-[calc(100vw-1.5rem)] lg:w-auto">
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between gap-2 rounded-full border px-3 py-2 pl-5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-colors duration-500 sm:gap-4 ${
              scrolled || open ? 'border-bone/20 bg-ink/85 backdrop-blur-md' : 'border-bone/10 bg-ink/40 backdrop-blur-sm'
            }`}
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                goTo('home');
              }}
              className="whitespace-nowrap font-script text-[1.7rem] leading-none text-bone transition-[text-shadow] duration-300 hover:[text-shadow:0_0_12px_#fff,0_0_26px_var(--signal)] sm:text-3xl"
            >
              Amit Samant
            </a>

            <ul className="relative hidden items-center lg:flex" onMouseLeave={() => setHover(null)}>
              {LINKS.map((l) => (
                <li key={l.id} className="relative">
                  {hover === l.id && (
                    <motion.span
                      layoutId="nav-hover"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-bone/10"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <a
                    href={`#${l.id}`}
                    aria-current={active === l.id ? 'true' : undefined}
                    onMouseEnter={() => setHover(l.id)}
                    onFocus={() => setHover(l.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(l.id);
                    }}
                    className={`relative block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      active === l.id ? 'text-bone' : 'text-paper-dim hover:text-bone'
                    }`}
                  >
                    {l.label}
                    {active === l.id && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-signal"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-paper-dim transition-colors duration-200 hover:bg-bone/10 hover:text-bone xl:inline-flex"
              >
                <FileText size={15} aria-hidden /> Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  goTo('contact');
                }}
                className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-signal px-4 py-2 text-sm font-bold text-ink transition-colors duration-200 hover:bg-bone"
              >
                Start a project
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <button
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-bone transition-colors hover:bg-bone/10 lg:hidden"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3, ease }}
                className="absolute inset-x-0 top-full mt-2 origin-top rounded-3xl border border-bone/20 bg-ink/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:hidden"
              >
                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } }, hidden: {} }}
                >
                  {LINKS.map((l) => (
                    <motion.li
                      key={l.id}
                      variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } } }}
                    >
                      <a
                        href={`#${l.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(false);
                          goTo(l.id);
                        }}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-xl font-semibold transition-colors ${
                          active === l.id ? 'bg-bone/10 text-bone' : 'text-paper-dim hover:bg-bone/5 hover:text-bone'
                        }`}
                      >
                        {l.label}
                        {active === l.id && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } } }}
                  >
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-2 rounded-2xl border border-bone/20 px-4 py-3 text-lg font-semibold text-bone transition-colors hover:bg-bone hover:text-ink"
                    >
                      <FileText size={18} aria-hidden /> Resume
                    </a>
                  </motion.li>
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </motion.header>
  );
};

export default Navbar;
