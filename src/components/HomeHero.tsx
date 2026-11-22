import React, { useState, useRef } from 'react';
import { PenTool, Star, Code2, Zap, RotateCcw } from 'lucide-react';
import { PageRoute } from '../types';

interface HomeHeroProps {
  onNavigate?: (route: PageRoute) => void;
}

interface StickerOffset {
  x: number;
  y: number;
  tilt: number;
  z: number;
}

const STICKER_BASE_ROTATIONS = [-2, 2, -1, 1, -1, 1];

export function HomeHero({ onNavigate }: HomeHeroProps) {
  const [stickerOffsets, setStickerOffsets] = useState<Record<number, StickerOffset>>({});
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [hasMovedSticker, setHasMovedSticker] = useState(false);

  const topZRef = useRef(30);
  const dragStateRef = useRef<{
    idx: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryBtnRef = useRef<HTMLButtonElement>(null);

  // Magnetic button hover handler (subtle, disabled on reduced motion)
  const handleMagneticMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    ref: React.RefObject<HTMLButtonElement | null>
  ) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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

  // Draggable sticker pointer handlers (desktop mouse only — stickers stay fixed on mobile)
  const handleStickerPointerDown = (idx: number, e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || window.innerWidth < 768) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    topZRef.current += 1;
    const current = stickerOffsets[idx] ?? { x: 0, y: 0, tilt: 0, z: topZRef.current };
    dragStateRef.current = {
      idx,
      startX: e.clientX,
      startY: e.clientY,
      origX: current.x,
      origY: current.y,
    };
    setDraggingIdx(idx);
    setStickerOffsets((prev) => ({
      ...prev,
      [idx]: { ...current, z: topZRef.current },
    }));
  };

  const handleStickerPointerMove = (idx: number, e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || window.innerWidth < 768) return;
    const drag = dragStateRef.current;
    if (!drag || drag.idx !== idx) return;
    const dx = drag.origX + (e.clientX - drag.startX);
    const dy = drag.origY + (e.clientY - drag.startY);
    const tilt = Math.max(-10, Math.min(10, (e.clientX - drag.startX) * 0.055));
    if (Math.abs(e.clientX - drag.startX) > 4 || Math.abs(e.clientY - drag.startY) > 4) {
      setHasMovedSticker(true);
    }
    setStickerOffsets((prev) => ({
      ...prev,
      [idx]: {
        x: dx,
        y: dy,
        tilt,
        z: prev[idx]?.z ?? topZRef.current,
      },
    }));
  };

  const handleStickerPointerUp = (idx: number) => {
    if (dragStateRef.current?.idx !== idx) return;
    dragStateRef.current = null;
    setDraggingIdx(null);
    setStickerOffsets((prev) => {
      const cur = prev[idx];
      if (!cur) return prev;
      return {
        ...prev,
        [idx]: { ...cur, tilt: 0 },
      };
    });
  };

  const resetStickers = () => {
    setStickerOffsets({});
    setHasMovedSticker(false);
    setDraggingIdx(null);
  };

  const getStickerStyle = (idx: number): React.CSSProperties => {
    const offset = stickerOffsets[idx];
    const baseRot = STICKER_BASE_ROTATIONS[idx] ?? 0;
    const isDragging = draggingIdx === idx;
    if (!offset) {
      return { transform: `rotate(${baseRot}deg)` };
    }
    return {
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${baseRot + offset.tilt}deg)${isDragging ? ' scale(1.06)' : ''}`,
      zIndex: isDragging ? 50 : offset.z,
      transition: isDragging ? 'none' : undefined,
    };
  };

  const stickerBaseClass =
    'select-none md:touch-none md:cursor-grab md:active:cursor-grabbing md:transition-[transform,box-shadow] md:duration-200 md:hover:scale-105';

  return (
    <section
      id="home-hero"
      className="relative w-full bg-neon-gradient text-black flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-12 pt-[5.5rem] sm:pt-24 md:pt-28 lg:pt-[7.5rem] pb-10 sm:pb-12 md:pb-13 border-b-2 border-black overflow-hidden"
    >
      {/* LAYER 1: SUBTLE DESIGNER'S CANVAS DOT-GRID + ORGANIC PAPER GRAIN */}
      <div aria-hidden="true" className="absolute inset-0 hero-dot-grid opacity-75 pointer-events-none z-0" />
      <div aria-hidden="true" className="absolute inset-0 hero-grain opacity-45 pointer-events-none z-0" />

      {/* ============================================================== */}
      {/* CENTER HERO CONTENT (HEADLINE, SUBTITLE, BUTTONS & STICKERS)   */}
      {/* ============================================================== */}
      <div className="relative z-20 max-w-[1140px] w-full mx-auto flex flex-col items-center justify-center text-center">

        {/* Main Headline Container + Dual Counter-Scrolling Marquees */}
        <div className="relative w-full flex flex-col items-center justify-center py-2 sm:py-3">

          {/* LARGE DUAL-LAYER COUNTER-SCROLLING KINETIC MARQUEES */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-screen max-w-none overflow-hidden pointer-events-none select-none z-0 flex flex-col gap-1 [mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)]"
          >
            {/* Row 1: Solid Faint Track Gliding Left */}
            <div
              style={{ animationDuration: '82s' }}
              className="flex w-max animate-marquee-slow items-center will-change-transform"
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex items-center gap-8 sm:gap-14 shrink-0 pr-8 sm:pr-14 font-display font-extrabold uppercase tracking-tight text-black/[0.11] sm:text-black/[0.13] text-[clamp(3.6rem,11vw,8.8rem)] leading-none select-none"
                >
                  <span>Brand Designer &amp; Web Developer</span>
                  <span className="text-[0.6em] text-black/20">✦</span>
                  <span>Custom Logo Systems</span>
                  <span className="text-[0.6em] text-black/20">✦</span>
                  <span>Brand Identity Design</span>
                  <span className="text-[0.6em] text-black/20">✦</span>
                  <span>UI/UX &amp; Web Development</span>
                  <span className="text-[0.6em] text-black/20">✦</span>
                  <span>Figma ➔ Code ➔ Web</span>
                  <span className="text-[0.6em] text-black/20">✦</span>
                </div>
              ))}
            </div>

            {/* Row 2: Crisp Outlined Counter-Scrolling Track Gliding Right */}
            <div className="flex w-max animate-marquee-reverse-slow items-center will-change-transform">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex items-center gap-8 sm:gap-14 shrink-0 pr-8 sm:pr-14 font-display font-extrabold uppercase tracking-tight text-stroke-black-faint text-[clamp(3rem,9.5vw,7.4rem)] leading-none select-none"
                >
                  <span>100% Bespoke Craft</span>
                  <span className="text-[0.6em]">✺</span>
                  <span>350+ Brands Built</span>
                  <span className="text-[0.6em]">✺</span>
                  <span>Strategy To Launch</span>
                  <span className="text-[0.6em]">✺</span>
                  <span>Nairobi To Worldwide</span>
                  <span className="text-[0.6em]">✺</span>
                </div>
              ))}
            </div>
          </div>

          {/* Swahili Welcome Badge */}
          <div className="relative z-10 inline-flex items-center gap-2.5 mb-4 sm:mb-5 px-5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-black text-neon font-display font-extrabold text-sm sm:text-base md:text-lg uppercase tracking-[0.26em] shadow-[4px_4px_0px_rgba(0,0,0,0.28)] select-none animate-rise">
            <span className="size-2 rounded-full bg-neon shrink-0" aria-hidden="true" />
            <span>Karibu</span>
          </div>

          {/* MAIN FOREGROUND HEADLINE WITH FIGMA VECTOR FRAME ON "MOVES" */}
          <h1 className="relative z-10 font-display font-extrabold uppercase tracking-tight sm:tracking-tighter leading-[0.98] sm:leading-[0.94] text-[clamp(2rem,5vw,4.35rem)] text-black text-center select-none">
            <span className="block">
              <span className="inline-block animate-rise">Design that</span>
            </span>

            <span className="block mt-2.5 sm:mt-3.5">
              <span className="inline-flex flex-wrap sm:flex-nowrap items-baseline justify-center gap-x-2.5 sm:gap-x-4 gap-y-2.5 animate-rise [animation-delay:110ms]">
                {/* Figma-style Vector Selection Bounding Box around "moves" */}
                <span className="relative inline-block px-2 sm:px-3 py-0.5">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1 border-[1.5px] border-black/80 bg-white/25"
                  >
                    {/* 4 Corner Vector Anchor Squares */}
                    <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-[1.5px] border-black" />
                    <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-[1.5px] border-black" />
                    <span className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-[1.5px] border-black" />
                    <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-[1.5px] border-black" />
                  </span>

                  <span className="relative z-10">moves</span>
                </span>
                <span className="inline-block">
                  business
                </span>
              </span>
            </span>
          </h1>
        </div>

        {/* Subtitle / Bio Description */}
        <div className="mt-4 sm:mt-5 max-w-xl text-center mx-auto px-2">
          <p className="font-mono text-xs sm:text-base md:text-lg font-medium tracking-tight text-black/85 leading-relaxed text-center">
            I help businesses solve brand and digital challenges with clear strategy, distinctive design, and websites built to turn attention into action.
          </p>
        </div>

        {/* Action Buttons with Subtle Magnetic Pull */}
        <div className="mt-6 sm:mt-7 flex flex-row items-center justify-center gap-3 sm:gap-5 w-auto mx-auto flex-wrap px-2">
          {onNavigate && (
            <button
              ref={primaryBtnRef}
              type="button"
              onClick={() => onNavigate('contact')}
              onMouseMove={(e) => handleMagneticMove(e, primaryBtnRef)}
              onMouseLeave={() => handleMagneticLeave(primaryBtnRef)}
              className="group inline-flex items-center justify-center gap-2.5 bg-black text-neon font-mono text-xs sm:text-sm uppercase tracking-[0.2em] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-extrabold transition-all duration-200 hover:bg-neutral-900 cursor-pointer shadow-xl shadow-black/25 will-change-transform"
            >
              <span>Discuss your challenge</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-neon font-normal">⟶</span>
            </button>
          )}

          <button
            ref={secondaryBtnRef}
            type="button"
            onClick={() => (onNavigate ? onNavigate('consultation') : (window.location.hash = '#/consultation'))}
            onMouseMove={(e) => handleMagneticMove(e, secondaryBtnRef)}
            onMouseLeave={() => handleMagneticLeave(secondaryBtnRef)}
            className="group inline-flex items-center justify-center gap-2.5 border-2 border-black bg-transparent text-black font-mono text-xs sm:text-sm uppercase tracking-[0.2em] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-extrabold transition-all duration-200 hover:bg-black hover:text-neon cursor-pointer will-change-transform"
          >
            <span>Explore how I can help</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-normal">⟶</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE DRAGGABLE STICKERS + ROTATING SEAL + SCROLL CTA    */}
        {/* ============================================================== */}
        <div className="relative w-full flex flex-col items-center justify-center mt-6 sm:mt-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl px-2">
            {/* Sticker 1: 100% Bespoke */}
            <div
              onPointerDown={(e) => handleStickerPointerDown(0, e)}
              onPointerMove={(e) => handleStickerPointerMove(0, e)}
              onPointerUp={() => handleStickerPointerUp(0)}
              onPointerCancel={() => handleStickerPointerUp(0)}
              style={getStickerStyle(0)}
              title="Drag me"
              className={`${stickerBaseClass} inline-flex items-center gap-1.5 sm:gap-2 bg-white text-black border-2 border-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold ${
                draggingIdx === 0 ? 'shadow-[7px_7px_0px_#000]' : 'shadow-[3px_3px_0px_#000]'
              }`}
            >
              <PenTool className="size-3.5 text-black shrink-0" />
              <span>100% Bespoke</span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-600">No Templates</span>
            </div>

            {/* Sticker 2: 10+ Years */}
            <div
              onPointerDown={(e) => handleStickerPointerDown(1, e)}
              onPointerMove={(e) => handleStickerPointerMove(1, e)}
              onPointerUp={() => handleStickerPointerUp(1)}
              onPointerCancel={() => handleStickerPointerUp(1)}
              style={getStickerStyle(1)}
              title="Drag me"
              className={`${stickerBaseClass} inline-flex items-center gap-1.5 sm:gap-2 bg-black text-neon border-2 border-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold ${
                draggingIdx === 1 ? 'shadow-[7px_7px_0px_#000]' : 'shadow-[3px_3px_0px_#000]'
              }`}
            >
              <Star className="size-3.5 fill-neon text-neon shrink-0" />
              <span>10+ Years</span>
              <span className="text-neutral-500">•</span>
              <span className="text-white">350+ Brands</span>
            </div>

            {/* Sticker 3: Fast Turnaround */}
            <div
              onPointerDown={(e) => handleStickerPointerDown(2, e)}
              onPointerMove={(e) => handleStickerPointerMove(2, e)}
              onPointerUp={() => handleStickerPointerUp(2)}
              onPointerCancel={() => handleStickerPointerUp(2)}
              style={getStickerStyle(2)}
              title="Drag me"
              className={`${stickerBaseClass} inline-flex items-center gap-1.5 sm:gap-2 bg-black text-white border-2 border-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold ${
                draggingIdx === 2 ? 'shadow-[7px_7px_0px_#000]' : 'shadow-[3px_3px_0px_#000]'
              }`}
            >
              <Zap className="size-3.5 fill-neon text-neon shrink-0" />
              <span className="text-neon">Fast Turnaround</span>
              <span className="text-neutral-500">•</span>
              <span>1-on-1 Collab</span>
            </div>

            {/* Sticker 4: Figma to VS Code to Web */}
            <div
              onPointerDown={(e) => handleStickerPointerDown(3, e)}
              onPointerMove={(e) => handleStickerPointerMove(3, e)}
              onPointerUp={() => handleStickerPointerUp(3)}
              onPointerCancel={() => handleStickerPointerUp(3)}
              style={getStickerStyle(3)}
              title="Drag me"
              className={`${stickerBaseClass} inline-flex items-center gap-1.5 sm:gap-2 bg-white text-black border-2 border-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold ${
                draggingIdx === 3 ? 'shadow-[7px_7px_0px_#000]' : 'shadow-[3px_3px_0px_#000]'
              }`}
            >
              <Code2 className="size-3.5 text-black shrink-0" />
              <span>Figma ➔ VS Code ➔ Web</span>
            </div>

            {/* Sticker 5: 5-Star Satisfaction */}
            <div
              onPointerDown={(e) => handleStickerPointerDown(4, e)}
              onPointerMove={(e) => handleStickerPointerMove(4, e)}
              onPointerUp={() => handleStickerPointerUp(4)}
              onPointerCancel={() => handleStickerPointerUp(4)}
              style={getStickerStyle(4)}
              title="Drag me"
              className={`${stickerBaseClass} inline-flex items-center gap-1.5 bg-white text-black border-2 border-black px-3 py-1.5 rounded-lg font-mono text-xs font-bold ${
                draggingIdx === 4 ? 'shadow-[6px_6px_0px_#000]' : 'shadow-[2px_2px_0px_#000]'
              }`}
            >
              <span className="text-amber-500 text-sm leading-none">★★★★★</span>
              <span>5.0 Rating</span>
            </div>

            {/* Sticker 6: Barcode Seal */}
            <div
              onPointerDown={(e) => handleStickerPointerDown(5, e)}
              onPointerMove={(e) => handleStickerPointerMove(5, e)}
              onPointerUp={() => handleStickerPointerUp(5)}
              onPointerCancel={() => handleStickerPointerUp(5)}
              style={getStickerStyle(5)}
              title="Drag me"
              className={`${stickerBaseClass} inline-flex items-center gap-2 bg-black text-white border-2 border-black px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold ${
                draggingIdx === 5 ? 'shadow-[6px_6px_0px_#000]' : 'shadow-[2px_2px_0px_#000]'
              }`}
            >
              <span className="font-mono text-xs tracking-tighter text-neon font-black">||| | |||||</span>
              <span className="tracking-wider uppercase text-neutral-200">Verified Bespoke</span>
            </div>
          </div>

          {hasMovedSticker && (
            <button
              type="button"
              onClick={resetStickers}
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black text-neon font-mono text-[10px] uppercase tracking-[0.18em] font-bold shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <RotateCcw className="size-3" />
              <span>Snap stickers back</span>
            </button>
          )}

          {/* Desktop Right-Aligned Scroll Indicator level with sticker cloud */}
          <div className="hidden xl:flex items-center justify-end absolute left-1/2 -translate-x-1/2 w-screen pointer-events-none top-1/2 -translate-y-1/2 px-6 sm:px-8 md:px-10 lg:px-12 z-20">
            <button
              type="button"
              onClick={() => document.getElementById('work-projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="pointer-events-auto group flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-black font-bold opacity-80 hover:opacity-100 transition-opacity cursor-pointer select-none"
              aria-label="Scroll to view work"
            >
              <span>Scroll to view work</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
