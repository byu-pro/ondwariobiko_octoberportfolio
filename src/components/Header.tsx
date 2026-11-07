import React from 'react';
import { PageRoute } from '../types';

interface HeaderProps {
  base: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrolled: boolean;
  onNavigate: (route: PageRoute) => void;
  currentRoute?: PageRoute;
  heroInView?: boolean;
}

export function Header({
  base,
  open,
  setOpen,
  scrolled,
  onNavigate,
  currentRoute = 'work',
  heroInView = true,
}: HeaderProps) {
  const isOverNeon = currentRoute === 'work' && heroInView && !open;

  return (
    <header 
      data-menu-open={open} 
      className={`fixed top-0 inset-x-0 z-[60] px-4 sm:px-6 md:px-8 flex items-center justify-between transition-all duration-500 ${
        open 
          ? "py-3 sm:py-4 md:py-5 bg-transparent" 
          : isOverNeon
            ? scrolled
              ? "py-2.5 sm:py-3 bg-neon/90 backdrop-blur-xl border-b border-black/10"
              : "py-3 sm:py-4 md:py-5 bg-transparent"
            : scrolled 
              ? "py-2.5 sm:py-3 bg-surface/70 backdrop-blur-xl border-b border-ink/10 md:bg-surface/50" 
              : "py-3 sm:py-4 md:py-5 bg-surface/70 backdrop-blur-xl border-b border-ink/10 md:bg-transparent md:backdrop-blur-none md:border-b-transparent"
      }`}
    >
      <a 
        href="#/work" 
        onClick={(e) => {
          e.preventDefault();
          onNavigate('work');
          if (open) setOpen(false);
        }} 
        className="flex items-center gap-2 group cursor-pointer shrink-0"
      >
        <img 
          key={isOverNeon ? "logo-black" : "logo-white"}
          src={`${base}images/${isOverNeon ? "logoblack.webp" : "logowhite.webp"}`} 
          alt="ondwariobiko monogram" 
          width={64} 
          height={64} 
          className={`nav-logo object-contain shrink-0 transition-all duration-500 ease-out transform-gpu ${
            scrolled && !open 
              ? "size-10 sm:size-11 md:size-12" 
              : "size-10 sm:size-12 md:size-14"
          }`} 
        />
        <span 
          className={`hidden sm:inline-block overflow-hidden whitespace-nowrap font-display font-extrabold text-xl md:text-2xl uppercase tracking-tight leading-none drop-shadow-md transition-all duration-500 pr-2 ${
            isOverNeon
              ? "text-black opacity-100 max-w-[600px] translate-x-0" 
              : scrolled && !open
                ? "opacity-0 max-w-0 -translate-x-3 pointer-events-none" 
                : "text-white group-hover:text-accent-ink opacity-100 max-w-[600px] translate-x-0"
          }`}
        >
          ondwari<span className={isOverNeon ? "text-black/60" : "text-accent-ink"}>obiko</span>
        </span>
      </a>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[60] flex items-center gap-2 sm:gap-3 group cursor-pointer"
        >
          <span className={`font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-colors ${
            open 
              ? "text-white font-semibold" 
              : isOverNeon 
                ? "text-black font-bold" 
                : "text-ink group-hover:text-accent-ink"
          }`}>
            {open ? "Close" : "Menu"}
          </span>
          <span className={`size-11 sm:size-12 md:size-14 rounded-full grid place-items-center transition-all duration-500 ${
            open 
              ? "bg-neon rotate-90" 
              : isOverNeon
                ? "bg-black group-hover:scale-110"
                : "bg-neon group-hover:scale-110"
          }`}>
            <span className="relative block w-4 sm:w-5 h-2.5 sm:h-3">
              <span className={`absolute left-0 h-0.5 w-4 sm:w-5 transition-all duration-500 ${
                open 
                  ? "top-1 sm:top-1.5 rotate-45 bg-black" 
                  : isOverNeon 
                    ? "top-0 bg-neon" 
                    : "top-0 bg-black"
              }`} />
              <span className={`absolute left-0 h-0.5 transition-all duration-500 ${
                open 
                  ? "top-1 sm:top-1.5 w-4 sm:w-5 -rotate-45 bg-black" 
                  : isOverNeon 
                    ? "top-2 sm:top-2.5 w-2.5 sm:w-3 bg-neon" 
                    : "top-2 sm:top-2.5 w-2.5 sm:w-3 bg-black"
              }`} />
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}
