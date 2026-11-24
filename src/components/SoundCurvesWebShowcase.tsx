import React, { useState, useRef } from 'react';

interface SoundCurvesWebShowcaseProps {
  base: string;
}

interface PageData {
  id: string;
  tabLabel: string;
  title: string;
  url: string;
  filename: string;
}

const PAGES: PageData[] = [
  {
    id: 'home',
    tabLabel: '01 · Home Page',
    title: 'Home Page · Brand Storytelling & Discovery',
    url: 'https://soundcurves.audio',
    filename: 'soundcurvespages/home-page.webp',
  },
  {
    id: 'product',
    tabLabel: '02 · Product Page',
    title: 'Product Page · Curve One Flagship Earphones',
    url: 'https://soundcurves.audio/earphones/curve-one',
    filename: 'soundcurvespages/product-page.webp',
  },
  {
    id: 'tech',
    tabLabel: '03 · Technology Page',
    title: 'Technology Page · Acoustic Engineering Deep Dive',
    url: 'https://soundcurves.audio/acoustic-engineering',
    filename: 'soundcurvespages/technology-page.webp',
  },
  {
    id: 'landing',
    tabLabel: '04 · Campaign Landing',
    title: 'Landing Page 1 · Special Launch Campaign',
    url: 'https://soundcurves.audio/special-launch',
    filename: 'soundcurvespages/landing-page-1.webp',
  },
];

export function SoundCurvesWebShowcase({ base }: SoundCurvesWebShowcaseProps) {
  const [activePageId, setActivePageId] = useState<string>('home');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activePage = PAGES.find((p) => p.id === activePageId) ?? PAGES[0];

  const handleTabChange = (pageId: string) => {
    setActivePageId(pageId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="w-full space-y-4 sm:space-y-5">
      {/* PAGE SWITCH TABS BAR */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 bg-black/80 p-2 sm:p-2.5 rounded-xl border border-white/10">
        {PAGES.map((page) => {
          const isActive = page.id === activePageId;
          return (
            <button
              key={page.id}
              onClick={() => handleTabChange(page.id)}
              className={`px-3.5 py-2 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-white/15 text-white font-bold border border-white/20'
                  : 'bg-white/[0.03] text-ink/55 hover:text-white hover:bg-white/[0.08] border border-transparent'
              }`}
            >
              {page.tabLabel}
            </button>
          );
        })}
      </div>

      {/* MACOS CHASSIS BROWSER COMPONENT */}
      <div className="rounded-xl sm:rounded-2xl border border-white/15 bg-black overflow-hidden shadow-2xl">
        {/* BROWSER CHROME HEADER */}
        <div className="px-4 py-3 bg-[#121215] border-b border-white/10 flex items-center justify-between gap-3">
          {/* macOS Traffic Lights */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
          </div>

          {/* Centered URL Badge */}
          <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-2 px-3 py-1 rounded-md bg-black/60 border border-white/10 text-[11px] sm:text-xs font-mono text-ink/60 truncate">
            <span className="text-accent-ink text-[10px]">🔒</span>
            <span className="truncate text-white/80">{activePage.url}</span>
          </div>

          {/* Quick status pill */}
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink/40 hidden sm:block shrink-0">
            Scroll inside window ↕
          </div>
        </div>

        {/* BROWSER VIEWPORT */}
        <div
          ref={scrollContainerRef}
          className="w-full bg-black h-[540px] sm:h-[680px] md:h-[780px] overflow-y-auto overflow-x-hidden select-none"
        >
          <img
            src={`${base}images/${activePage.filename}`}
            alt={activePage.title}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto object-top transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  );
}
