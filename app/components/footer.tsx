import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ink px-6 py-14 text-bone sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <p className="font-script text-5xl leading-none">Amit Samant</p>
        <p className="text-sm text-paper-dim">© {new Date().getFullYear()} Amit Samant · Arlington, Texas</p>
      </div>
    </footer>
  );
};

export default Footer;
