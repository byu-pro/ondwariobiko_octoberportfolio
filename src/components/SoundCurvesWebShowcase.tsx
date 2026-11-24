import React, { useState, useRef } from 'react';

interface WebsiteShowcaseProps {
  base: string;
  desktopPages: PageData[];
  mobilePages: PageData[];
}

export interface PageData {
  id: string;
  tabLabel: string;
  title: string;
  url: string;
  filename: string;
}

const DESKTOP_PAGES: PageData[] = [
  {
    id: 'home',
    tabLabel: '01 · Home Page',
    title: 'Home Page · Desktop Experience',
    url: 'https://soundcurves.audio',
    filename: 'soundcurvespages/home-page.webp',
  },
  {
    id: 'product',
    tabLabel: '02 · Product Page',
    title: 'Product Page · Desktop Experience',
    url: 'https://soundcurves.audio/earphones/curve-one',
    filename: 'soundcurvespages/product-page.webp',
  },
  {
    id: 'tech',
    tabLabel: '03 · Technology Page',
    title: 'Technology Page · Desktop Experience',
    url: 'https://soundcurves.audio/acoustic-engineering',
    filename: 'soundcurvespages/technology-page.webp',
  },
  {
    id: 'landing',
    tabLabel: '04 · Campaign Landing',
    title: 'Landing Page 1 · Desktop Experience',
    url: 'https://soundcurves.audio/special-launch',
    filename: 'soundcurvespages/landing-page-1.webp',
  },
];

const MOBILE_PAGES: PageData[] = [
  {
    id: 'home-m',
    tabLabel: '01 · Home (Mobile)',
    title: 'Home Page · Mobile Architecture',
    url: 'https://soundcurves.audio',
    filename: 'soundcurvespages/home-mobile.webp',
  },
  {
    id: 'product-m',
    tabLabel: '02 · Product (Mobile)',
    title: 'Product Page · Mobile Architecture',
    url: 'https://soundcurves.audio/earphones/curve-one',
    filename: 'soundcurvespages/product-mobile.webp',
  },
  {
    id: 'tech-m',
    tabLabel: '03 · Technology (Mobile)',
    title: 'Technology Page · Mobile Architecture',
    url: 'https://soundcurves.audio/acoustic-engineering',
    filename: 'soundcurvespages/technology-mobile.webp',
  },
  {
    id: 'landing-m',
    tabLabel: '04 · Campaign (Mobile)',
    title: 'Landing Page 1 · Mobile Architecture',
    url: 'https://soundcurves.audio/special-launch',
    filename: 'soundcurvespages/landing-page-1-mobile.webp',
  },
];

const MOODS_N_MEDS_DESKTOP_PAGES: PageData[] = [
  {
    id: 'illustrated',
    tabLabel: '01 · Illustrated Theme',
    title: 'Moods n Meds · Illustrated Desktop Design',
    url: 'Moods n Meds · Illustrated Homepage',
    filename: 'moodsnmeds/Home Page.webp',
  },
  {
    id: 'photography',
    tabLabel: '02 · Photography Theme',
    title: 'Moods n Meds · Photography Desktop Design',
    url: 'Moods n Meds · Photography Homepage',
    filename: 'moodsnmeds/Home Page (1).webp',
  },
];

const MOODS_N_MEDS_MOBILE_PAGES: PageData[] = [
  {
    id: 'illustrated-mobile',
    tabLabel: '01 · Illustrated Theme',
    title: 'Moods n Meds · Illustrated Mobile Design',
    url: 'Moods n Meds · Illustrated Mobile Homepage',
    filename: 'moodsnmeds/Mobile - Illustrated 600dpi.webp',
  },
  {
    id: 'photography-mobile',
    tabLabel: '02 · Photography Theme',
    title: 'Moods n Meds · Photography Mobile Design',
    url: 'Moods n Meds · Photography Mobile Homepage',
    filename: 'moodsnmeds/Mobile - Photography 600dpi.webp',
  },
];

export function WebsiteCompositionsShowcase({ base, desktopPages, mobilePages }: WebsiteShowcaseProps) {
  const [activeDesktopId, setActiveDesktopId] = useState<string>(desktopPages[0]?.id ?? '');
  const [activeMobileId, setActiveMobileId] = useState<string>(mobilePages[0]?.id ?? '');

  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const activeDesktopPage = desktopPages.find((p) => p.id === activeDesktopId) ?? desktopPages[0];
  const activeMobilePage = mobilePages.find((p) => p.id === activeMobileId) ?? mobilePages[0];

  const handleDesktopTabChange = (pageId: string) => {
    setActiveDesktopId(pageId);
    if (desktopScrollRef.current) {
      desktopScrollRef.current.scrollTop = 0;
    }
  };

  const handleMobileTabChange = (pageId: string) => {
    setActiveMobileId(pageId);
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* ─────────────────────────────────────────────────────────────
          1. DESKTOP EXPERIENCE VIEWPORT
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-1">
              Desktop Platform Architecture
            </p>
            <h3 className="font-display font-bold uppercase tracking-tight text-xl sm:text-2xl text-white">
              Desktop Compositions
            </h3>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/40">
            Scroll inside window ↕
          </p>
        </div>

        {/* DESKTOP PAGE TABS */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2.5 bg-black/80 p-2 sm:p-2.5 rounded-xl border border-white/10">
          {desktopPages.map((page) => {
            const isActive = page.id === activeDesktopId;
            return (
              <button
                key={page.id}
                onClick={() => handleDesktopTabChange(page.id)}
                className={`px-2.5 sm:px-3.5 py-2 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all cursor-pointer text-center truncate ${
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

        {/* MACOS CHASSIS BROWSER */}
        <div className="rounded-xl sm:rounded-2xl border border-white/15 bg-black overflow-hidden shadow-2xl">
          {/* BROWSER CHROME HEADER */}
          <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#121215] border-b border-white/10 flex items-center justify-between gap-2.5 sm:gap-3">
            {/* Traffic Lights */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
            </div>

            {/* URL Badge */}
            <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-md bg-black/60 border border-white/10 text-[10px] sm:text-xs font-mono text-ink/60 min-w-0">
              <span className="text-accent-ink text-[10px] shrink-0">🔒</span>
              <span className="truncate text-white/80">{activeDesktopPage.url}</span>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-wider text-ink/40 hidden sm:block shrink-0">
              Desktop 1440w
            </div>
          </div>

          {/* BROWSER VIEWPORT */}
          <div
            ref={desktopScrollRef}
            className="w-full bg-black h-[420px] sm:h-[560px] md:h-[740px] overflow-y-auto overflow-x-hidden select-none overscroll-contain touch-pan-y"
          >
            <img
              src={`${base}images/${activeDesktopPage.filename}`}
              alt={activeDesktopPage.title}
              loading="lazy"
              decoding="async"
              className="block w-full h-auto object-top transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE EXPERIENCE VIEWPORT
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4 sm:space-y-6 pt-4 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-1">
              Mobile Responsive System
            </p>
            <h3 className="font-display font-bold uppercase tracking-tight text-xl sm:text-2xl text-white">
              Mobile Compositions
            </h3>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/40">
            Scroll inside device ↕
          </p>
        </div>

        {/* MOBILE PAGE TABS */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2.5 bg-black/80 p-2 sm:p-2.5 rounded-xl border border-white/10">
          {mobilePages.map((page) => {
            const isActive = page.id === activeMobileId;
            return (
              <button
                key={page.id}
                onClick={() => handleMobileTabChange(page.id)}
                className={`px-2.5 sm:px-3.5 py-2 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all cursor-pointer text-center truncate ${
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

        {/* SMARTPHONE DEVICE CHASSIS */}
        <div className="py-2 sm:py-4 flex justify-center">
          <div className="w-full max-w-[340px] sm:max-w-[390px] md:max-w-[420px] rounded-[36px] sm:rounded-[46px] p-2.5 sm:p-3.5 bg-[#17171c] border-2 border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(217,253,23,0.06)] relative">
            {/* INNER SCREEN BEZEL */}
            <div className="rounded-[28px] sm:rounded-[36px] overflow-hidden bg-black relative border border-white/10 flex flex-col">
              {/* TOP STATUS BAR & DYNAMIC ISLAND */}
              <div className="w-full pt-2.5 sm:pt-3 pb-1.5 sm:pb-2 px-3 sm:px-5 bg-black flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/80 z-20 shrink-0">
                <span className="font-bold tracking-tight">9:41</span>
                {/* Dynamic Island Pill */}
                <div className="w-20 sm:w-24 h-4.5 sm:h-5 bg-[#121215] rounded-full flex items-center justify-end px-2 gap-1 border border-white/10">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#1e1e24] inline-block border border-white/15" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                {/* Signal & Battery */}
                <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px]">
                  <span>5G</span>
                  <span className="w-3.5 sm:w-4 h-2 rounded-2xs border border-white/60 inline-flex items-center p-0.5">
                    <span className="w-full h-full bg-white rounded-3xs" />
                  </span>
                </div>
              </div>

              {/* PHONE VIEWPORT (SCROLLABLE) */}
              <div
                ref={mobileScrollRef}
                className="w-full h-[460px] sm:h-[560px] md:h-[660px] overflow-y-auto overflow-x-hidden bg-black select-none overscroll-contain touch-pan-y"
              >
                <img
                  src={`${base}images/${activeMobilePage.filename}`}
                  alt={activeMobilePage.title}
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto object-top transition-opacity duration-300"
                />
              </div>

              {/* BOTTOM HOME INDICATOR BAR */}
              <div className="w-full py-1.5 sm:py-2 bg-black flex justify-center z-20 shrink-0">
                <span className="w-24 sm:w-32 h-1 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SoundCurvesWebShowcase({ base }: { base: string }) {
  return <WebsiteCompositionsShowcase base={base} desktopPages={DESKTOP_PAGES} mobilePages={MOBILE_PAGES} />;
}

export function MoodsNMedWebShowcase({ base }: { base: string }) {
  return (
    <WebsiteCompositionsShowcase
      base={base}
      desktopPages={MOODS_N_MEDS_DESKTOP_PAGES}
      mobilePages={MOODS_N_MEDS_MOBILE_PAGES}
    />
  );
}
