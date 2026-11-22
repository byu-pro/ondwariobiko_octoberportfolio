import React from 'react';
import { GlitchText } from './GlitchText';

interface PageHeroProps {
  index: string;
  eyebrow: string;
  title: string;
  outline: string;
  marqueeTop?: string[];
  marqueeBottom?: string[];
}

export function PageHero({
  index,
  eyebrow,
  title,
  outline,
  marqueeTop,
  marqueeBottom,
}: PageHeroProps) {
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

      {/* SUBTLE DUAL COUNTER-SCROLLING KINETIC BACKGROUND MARQUEES */}
      {(marqueeTop?.length || marqueeBottom?.length) && (
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 top-[34%] sm:top-[36%] -translate-y-1/2 w-screen max-w-none overflow-hidden pointer-events-none select-none z-0 flex flex-col gap-1 [mask-image:linear-gradient(to_right,transparent,black_64px,black_calc(100%-64px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_64px,black_calc(100%-64px),transparent)]"
        >
          {marqueeTop && marqueeTop.length > 0 && (
            <div
              style={{ animationDuration: '86s' }}
              className="flex w-max animate-marquee-slow items-center will-change-transform"
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex items-center gap-8 sm:gap-14 shrink-0 pr-8 sm:pr-14 font-display font-extrabold uppercase tracking-tight text-white/[0.045] text-[clamp(3.6rem,11vw,8.5rem)] leading-none select-none"
                >
                  {marqueeTop.map((item) => (
                    <React.Fragment key={item}>
                      <span>{item}</span>
                      <span className="text-[0.55em]">/</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          )}

          {marqueeBottom && marqueeBottom.length > 0 && (
            <div className="flex w-max animate-marquee-reverse-slow items-center will-change-transform">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex items-center gap-8 sm:gap-14 shrink-0 pr-8 sm:pr-14 font-display font-extrabold uppercase tracking-tight text-white/[0.03] text-[clamp(3rem,9vw,7rem)] leading-none select-none"
                >
                  {marqueeBottom.map((item) => (
                    <React.Fragment key={item}>
                      <span>{item}</span>
                      <span className="text-[0.55em]">/</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="flex flex-wrap gap-3 justify-between font-mono text-xs uppercase tracking-[0.25em] text-ink/50 mb-6 sm:mb-8">
          <span>
            <span className="text-accent-ink">{index}</span> / {eyebrow}
          </span>
        </div>
        <h1 className="page-hero-title font-display font-extrabold uppercase tracking-tighter leading-[0.82] text-[clamp(1.9rem,8.5vw,8.5rem)]">
          <span className="block overflow-clip">
            <span className="block animate-rise">
              <GlitchText text={title} variant="dark" delayMs={0} />
            </span>
          </span>
          <span className="block overflow-clip">
            <span className="block animate-rise [animation-delay:120ms]">
              {leadingWords ? (
                <>
                  <GlitchText text={leadingWords} variant="dark" delayMs={70} />{' '}
                </>
              ) : null}
              <GlitchText text={lastWord} variant="dark" delayMs={130} className="text-neon-gradient" />
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
