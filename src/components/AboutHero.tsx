import React, { useRef } from 'react';
import { PageRoute } from '../types';
import { GlitchText } from './GlitchText';

interface AboutHeroProps {
  onNavigate: (route: PageRoute) => void;
}

export function AboutHero({ onNavigate }: AboutHeroProps) {
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryBtnRef = useRef<HTMLButtonElement>(null);

  const handleMagneticMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    ref: React.RefObject<HTMLButtonElement | null>
  ) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) * 0.14;
    const relY = (e.clientY - rect.top - rect.height / 2) * 0.2;
    el.style.transform = `translate3d(${relX}px, ${relY}px, 0) scale(1.04)`;
  };

  const handleMagneticLeave = (ref: React.RefObject<HTMLButtonElement | null>) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <section
      id="about-hero"
      className="relative w-full bg-black text-white pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-5 md:px-8 border-b border-white/15 overflow-hidden"
    >
      {/* LAYER 1: SUBTLE DARK STUDIO CANVAS DOT-GRID + AMBIENT LIME GLOW */}
      <div aria-hidden="true" className="absolute inset-0 hero-dot-grid-dark opacity-70 pointer-events-none z-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 75% 65% at 78% 18%, rgba(217, 253, 23, 0.11) 0%, rgba(217, 253, 23, 0.03) 45%, rgba(0, 0, 0, 0) 75%)',
        }}
      />

      {/* LAYER 2: DUAL COUNTER-SCROLLING KINETIC BACKGROUND MARQUEES */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-[52%] -translate-y-1/2 w-screen max-w-none overflow-hidden pointer-events-none select-none z-0 flex flex-col gap-1 [mask-image:linear-gradient(to_right,transparent,black_64px,black_calc(100%-64px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_64px,black_calc(100%-64px),transparent)]"
      >
        {/* Row 1: Faint Solid Track Gliding Left */}
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
              <span>John Obiko</span>
              <span className="text-[0.6em] text-neon/20">✦</span>
              <span>Solo Creative Partner</span>
              <span className="text-[0.6em] text-neon/20">✦</span>
              <span>Strategy &amp; Identity</span>
              <span className="text-[0.6em] text-neon/20">✦</span>
              <span>Design + Front-End Code</span>
              <span className="text-[0.6em] text-neon/20">✦</span>
            </div>
          ))}
        </div>

        {/* Row 2: Crisp Outlined Counter-Scrolling Track Gliding Right */}
        <div className="flex w-max animate-marquee-reverse-slow items-center will-change-transform">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center gap-8 sm:gap-14 shrink-0 pr-8 sm:pr-14 font-display font-extrabold uppercase tracking-tight text-stroke-white-faint text-[clamp(3rem,9vw,7rem)] leading-none select-none"
            >
              <span>Nairobi To Worldwide</span>
              <span className="text-[0.6em]">✺</span>
              <span>350+ Projects Delivered</span>
              <span className="text-[0.6em]">✺</span>
              <span>100% Bespoke Craft</span>
              <span className="text-[0.6em]">✺</span>
              <span>Built To Convert</span>
              <span className="text-[0.6em]">✺</span>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* FOREGROUND CONTENT                                             */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-ink/60 mb-6 sm:mb-8">
          <span className="text-accent-ink font-semibold">02</span> / Creative partner for business growth
        </div>

        {/* Main 2-Column Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px] gap-8 lg:gap-12 items-end">
          {/* LEFT: Commanding Syne 800 Display Title */}
          <h1 className="page-hero-title font-display font-extrabold uppercase tracking-tighter leading-[0.84] text-[clamp(2.35rem,7.2vw,6.8rem)] select-none">
            <span className="block overflow-clip">
              <span className="block animate-rise text-white">
                <GlitchText text="Business" variant="dark" delayMs={0} />
              </span>
            </span>
            <span className="block overflow-clip">
              <span className="block animate-rise [animation-delay:80ms] text-white">
                <GlitchText text="Problem" variant="dark" delayMs={70} />
              </span>
            </span>
            <span className="block overflow-clip">
              <span className="block animate-rise [animation-delay:150ms]">
                <GlitchText text="Solver" variant="dark" delayMs={130} className="text-neon-gradient" />
              </span>
            </span>
          </h1>

          {/* RIGHT: Concise Studio Positioning + Direct CTAs */}
          <div className="flex flex-col items-start gap-5 lg:pb-2">
            <p className="font-mono text-sm sm:text-base text-white/80 leading-relaxed">
              One dedicated partner from first sketch to shipped code — turning unclear brands and underperforming websites into sharp, conversion-ready assets.
            </p>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                ref={primaryBtnRef}
                type="button"
                onClick={() => onNavigate('contact')}
                onMouseMove={(e) => handleMagneticMove(e, primaryBtnRef)}
                onMouseLeave={() => handleMagneticLeave(primaryBtnRef)}
                className="group inline-flex items-center justify-center gap-2.5 bg-neon text-black font-mono text-xs uppercase tracking-[0.2em] px-6 sm:px-7 py-3.5 rounded-full font-extrabold transition-all duration-200 hover:bg-[#ebff57] cursor-pointer shadow-lg shadow-neon/15 will-change-transform"
              >
                <span>Start a project</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-normal">⟶</span>
              </button>

              <button
                ref={secondaryBtnRef}
                type="button"
                onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
                onMouseMove={(e) => handleMagneticMove(e, secondaryBtnRef)}
                onMouseLeave={() => handleMagneticLeave(secondaryBtnRef)}
                className="group inline-flex items-center justify-center gap-2 border border-white/25 bg-white/[0.04] text-white font-mono text-xs uppercase tracking-[0.2em] px-6 py-3.5 rounded-full font-bold transition-all duration-200 hover:border-neon hover:text-neon cursor-pointer will-change-transform"
              >
                <span>View services</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5 font-normal">↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
