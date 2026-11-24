import React from 'react';
import { PageRoute } from '../types';

interface HeaderProps {
  base: string;
  currentRoute: PageRoute;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrolled: boolean;
  onNavigate: (route: PageRoute) => void;
}

export function Header({
  base,
  currentRoute,
  open,
  setOpen,
  scrolled,
  onNavigate,
}: HeaderProps) {
  const useDarkForeground = open || (!scrolled && currentRoute === 'work');

  const handleLogoClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (open) setOpen(false);

    if (currentRoute === 'work') {
      // User is on the homepage: hard refresh whole site and clear cache
      try {
        sessionStorage.clear();
      } catch {}

      if ('caches' in window) {
        try {
          const cacheKeys = await caches.keys();
          await Promise.all(cacheKeys.map((k) => caches.delete(k)));
        } catch {}
      }

      if ('serviceWorker' in navigator) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map((r) => r.unregister()));
        } catch {}
      }

      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set('t', Date.now().toString());
      url.hash = '#/work';
      window.location.replace(url.toString());
      return;
    }

    // On other pages: standard SPA navigation to homepage
    onNavigate('work');
  };

  return (
    <header 
      data-menu-open={open} 
      className={`fixed top-0 inset-x-0 z-[60] px-4 sm:px-6 md:px-8 flex items-center justify-between transition-all duration-300 ${
        open 
          ? "pt-4 pb-2.5 sm:pt-6 sm:pb-3.5 bg-transparent border-b border-transparent" 
          : scrolled 
            ? "py-2 sm:py-2.5 bg-black/90 backdrop-blur-xl border-b border-white/10" 
            : "pt-4 pb-2.5 sm:pt-6 sm:pb-3.5 bg-transparent border-b border-transparent"
      }`}
    >
      <a 
        href="#/work" 
        onClick={handleLogoClick} 
        aria-label="ondwariobiko home"
        className="flex items-center group cursor-pointer shrink-0"
      >
        <img 
          src={`${base}images/${useDarkForeground ? "logoblack.webp" : "logowhite.webp"}`} 
          alt="ondwariobiko monogram" 
          width={64} 
          height={64} 
          className={`nav-logo object-contain shrink-0 transition-all duration-300 ease-out transform-gpu ${
            useDarkForeground ? "rounded-full brightness-0 filter" : ""
          } ${
            scrolled && !open 
              ? "size-9 sm:size-10 md:size-11" 
              : "size-10 sm:size-11 md:size-12"
          }`} 
        />
      </a>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[60] flex items-center gap-2 sm:gap-3 group cursor-pointer"
        >
          <span className={`font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-colors ${
            useDarkForeground 
              ? "text-black font-semibold group-hover:opacity-70" 
              : "text-ink group-hover:text-accent-ink"
          }`}>
            {open ? "Close" : "Menu"}
          </span>
          <span className={`size-11 sm:size-12 md:size-14 rounded-full grid place-items-center transition-all duration-300 ${
            open 
              ? "bg-black rotate-90" 
              : useDarkForeground
                ? "bg-black group-hover:scale-110"
                : "bg-neon group-hover:scale-110"
          }`}>
            <span className="relative block w-4 sm:w-5 h-2.5 sm:h-3">
              <span className={`absolute left-0 h-0.5 w-4 sm:w-5 transition-all duration-300 ${
                open 
                  ? "top-1 sm:top-1.5 rotate-45 bg-neon" 
                  : useDarkForeground
                    ? "top-0 bg-neon"
                    : "top-0 bg-black"
              }`} />
              <span className={`absolute left-0 h-0.5 transition-all duration-300 ${
                open 
                  ? "top-1 sm:top-1.5 w-4 sm:w-5 -rotate-45 bg-neon" 
                  : useDarkForeground
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
