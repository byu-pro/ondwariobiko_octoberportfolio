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
    <section className="pt-28 sm:pt-36 md:pt-44 pb-10 sm:pb-14 md:pb-16 px-5 md:px-8">
      <div className="max-w-[1400px] mx-auto">
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
