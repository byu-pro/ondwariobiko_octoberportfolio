import React from 'react';

interface PageHeroProps {
  index: string;
  eyebrow: string;
  title: string;
  outline: string;
}

export function PageHero({ index, eyebrow, title, outline }: PageHeroProps) {
  const outlineWords = outline.trim().split(/\s+/);
  const lastWord = outlineWords.pop() ?? '';
  const leadingWords = outlineWords.join(' ');

  return (
    <section className="relative w-full bg-black text-white pt-28 sm:pt-36 md:pt-44 pb-10 sm:pb-14 md:pb-16 mb-10 sm:mb-14 px-5 md:px-8 border-b border-white/15 overflow-hidden">
      {/* SUBTLE DARK STUDIO CANVAS DOT-GRID + AMBIENT LIME RADIAL GLOW */}
      <div aria-hidden="true" className="absolute inset-0 hero-dot-grid-dark opacity-70 pointer-events-none z-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 75% 65% at 78% 18%, rgba(217, 253, 23, 0.11) 0%, rgba(217, 253, 23, 0.03) 45%, rgba(0, 0, 0, 0) 75%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="flex flex-wrap gap-3 justify-between font-mono text-xs uppercase tracking-[0.25em] text-ink/50 mb-6 sm:mb-8">
          <span>
            <span className="text-accent-ink">{index}</span> / {eyebrow}
          </span>
        </div>
        <h1 className="page-hero-title font-display font-extrabold uppercase tracking-tighter leading-[0.9] text-[clamp(1.9rem,8.5vw,8.5rem)]">
          <span className="block overflow-hidden">
            <span className="block animate-rise">{title}</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block animate-rise [animation-delay:120ms]">
              {leadingWords ? <>{leadingWords}{' '}</> : null}
              <span className="inline-block text-neon-gradient">{lastWord}</span>
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
