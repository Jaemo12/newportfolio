import React from 'react';

/** Endless ticker of what I do. Duplicated once so the loop is seamless. */
export const Marquee = ({ items }: { items: string[] }) => {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {items.map((t) => (
        <li key={t} className="flex items-center">
          <span className="display px-6 text-[clamp(2.5rem,7vw,5rem)] leading-[1.05]">{t}</span>
          <span className="h-4 w-4 shrink-0 rounded-full bg-signal" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-bone/15 bg-ink py-5 text-bone" role="img" aria-label={items.join(', ')}>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
};
