import React, { useEffect, useRef } from 'react';
import { PageRoute } from '../types';

interface HeaderProps {
  base: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrolled: boolean;
  onNavigate: (route: PageRoute) => void;
}

export function Header({
  base,
  open,
  setOpen,
  scrolled,
  onNavigate,
}: HeaderProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const updateProgress = () => {
      rafId = 0;
      const bar = progressBarRef.current;
      if (!bar) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header 
      data-menu-open={open} 
      className={`fixed top-0 inset-x-0 z-[60] px-4 sm:px-6 md:px-8 flex items-center justify-between transition-all duration-300 ${
        open 
          ? "py-2.5 sm:py-3.5 bg-transparent" 
          : scrolled 
            ? "py-2 sm:py-2.5 bg-black/90 backdrop-blur-xl border-b border-white/10" 
            : "py-2.5 sm:py-3.5 bg-black/90 backdrop-blur-xl border-b border-white/10"
      }`}
    >
      <a 
        href="#/work" 
        onClick={(e) => {
          e.preventDefault();
          onNavigate('work');
          if (open) setOpen(false);
        }} 
        aria-label="ondwariobiko home"
        className="flex items-center group cursor-pointer shrink-0"
      >
        <img 
          key={open ? "logo-black" : "logo-white"}
          src={`${base}images/${open ? "logoblack.webp" : "logowhite.webp"}`} 
          alt="ondwariobiko monogram" 
          width={64} 
          height={64} 
          className={`nav-logo object-contain shrink-0 transition-all duration-300 ease-out transform-gpu ${
            open ? "rounded-full brightness-0 filter" : ""
          } ${
            scrolled && !open 
              ? "size-9 sm:size-10 md:size-11" 
              : "size-10 sm:size-11 md:size-12"
          }`} 
        />
      </a>

      {/* CENTER STATUS INDICATOR BETWEEN LOGO & MENU (DESKTOP ONLY) */}
      {!open && (
        <div className="pointer-events-none hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-white/85 whitespace-nowrap select-none">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
          </span>
          <span className="font-medium">Available for new projects</span>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[60] flex items-center gap-2 sm:gap-3 group cursor-pointer"
        >
          <span className={`font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-colors ${
            open 
              ? "text-black font-semibold" 
              : "text-ink group-hover:text-accent-ink"
          }`}>
            {open ? "Close" : "Menu"}
          </span>
          <span className={`size-11 sm:size-12 md:size-14 rounded-full grid place-items-center transition-all duration-300 ${
            open 
              ? "bg-black rotate-90" 
              : "bg-neon group-hover:scale-110"
          }`}>
            <span className="relative block w-4 sm:w-5 h-2.5 sm:h-3">
              <span className={`absolute left-0 h-0.5 w-4 sm:w-5 transition-all duration-300 ${
                open 
                  ? "top-1 sm:top-1.5 rotate-45 bg-neon" 
                  : "top-0 bg-black"
              }`} />
              <span className={`absolute left-0 h-0.5 transition-all duration-300 ${
                open 
                  ? "top-1 sm:top-1.5 w-4 sm:w-5 -rotate-45 bg-neon" 
                  : "top-2 sm:top-2.5 w-2.5 sm:w-3 bg-black"
              }`} />
            </span>
          </span>
        </button>
      </div>

      {!open && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
        >
          <div
            ref={progressBarRef}
            className="h-full w-full bg-neon origin-left will-change-transform"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      )}
    </header>
  );
}
