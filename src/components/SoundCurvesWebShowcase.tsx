import React, { useState, useEffect, useRef } from 'react';

interface SoundCurvesWebShowcaseProps {
  base: string;
}

interface PageData {
  id: string;
  tabLabel: string;
  title: string;
  url: string;
  filename: string;
  dimensions: string;
  summary: string;
}

const PAGES: PageData[] = [
  {
    id: 'home',
    tabLabel: '01 · Home Page',
    title: 'Home Page · Brand Storytelling & Discovery',
    url: 'https://soundcurves.audio',
    filename: 'soundcurvespages/home-page.webp',
    dimensions: '1440 × 5923 px',
    summary: 'Brand intro, hero lifestyle audio, product carousel, community reviews, and footer ecosystem.',
  },
  {
    id: 'product',
    tabLabel: '02 · Product Page',
    title: 'Product Page · Curve One Flagship Earphones',
    url: 'https://soundcurves.audio/earphones/curve-one',
    filename: 'soundcurvespages/product-page.webp',
    dimensions: '1440 × 6246 px',
    summary: '360° product angles, driver exploded view, custom ear tips, frequency chart, and sticky purchase bar.',
  },
  {
    id: 'tech',
    tabLabel: '03 · Technology Page',
    title: 'Technology Page · Acoustic Engineering Deep Dive',
    url: 'https://soundcurves.audio/acoustic-engineering',
    filename: 'soundcurvespages/technology-page.webp',
    dimensions: '1440 × 6584 px',
    summary: 'Planar magnetic diaphragm physics, acoustic dampening chambers, materials science, and audiophile bench tests.',
  },
  {
    id: 'landing',
    tabLabel: '04 · Campaign Landing',
    title: 'Landing Page 1 · Special Launch Campaign',
    url: 'https://soundcurves.audio/special-launch',
    filename: 'soundcurvespages/landing-page-1.webp',
    dimensions: '1440 × 5091 px',
    summary: 'High-conversion campaign layout, limited edition serial numbering, press accolades, and direct order modules.',
  },
];

export function SoundCurvesWebShowcase({ base }: SoundCurvesWebShowcaseProps) {
  const [activePageId, setActivePageId] = useState<string>('home');
  const [viewMode, setViewMode] = useState<'frame' | 'full'>('frame');
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activePage = PAGES.find((p) => p.id === activePageId) ?? PAGES[0];

  // Reset scroll position on tab switch
  const handleTabChange = (pageId: string) => {
    setActivePageId(pageId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // Keyboard escape for inspector modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && inspectorOpen) {
        setInspectorOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectorOpen]);

  // Lock body scroll when inspector modal is open
  useEffect(() => {
    if (inspectorOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [inspectorOpen]);

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* SECTION EXPLANATORY CALLOUT */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-neon/10 border border-neon/30 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink mb-1.5">
            Full Website Architecture Compositions
          </span>
          <h3 className="font-display font-bold uppercase tracking-tight text-lg sm:text-xl text-white">
            Interactive Desktop Browser Viewport
          </h3>
          <p className="font-sans text-xs sm:text-sm text-ink/70 mt-1 max-w-2xl leading-relaxed">
            Scroll inside the 720px browser window below to experience the original desktop flow, switch between pages, or open the 100% Detail Inspector to audit fine typography, charts, and microcopy.
          </p>
        </div>

        {/* VIEW MODE TOGGLE */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/70 border border-white/15 self-start md:self-auto shrink-0">
          <button
            onClick={() => setViewMode('frame')}
            className={`px-3 py-1.5 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all ${
              viewMode === 'frame'
                ? 'bg-neon text-black font-bold shadow-sm'
                : 'text-ink/60 hover:text-white'
            }`}
          >
            Browser Frame (720px)
          </button>
          <button
            onClick={() => setViewMode('full')}
            className={`px-3 py-1.5 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all ${
              viewMode === 'full'
                ? 'bg-neon text-black font-bold shadow-sm'
                : 'text-ink/60 hover:text-white'
            }`}
          >
            Unfold Full Length
          </button>
        </div>
      </div>

      {/* PAGE SWITCH TABS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-black/80 p-2 sm:p-2.5 rounded-xl border border-white/10">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {PAGES.map((page) => {
            const isActive = page.id === activePageId;
            return (
              <button
                key={page.id}
                onClick={() => handleTabChange(page.id)}
                className={`px-3 py-2 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all ${
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

        {/* 100% DETAIL INSPECTOR BUTTON */}
        <button
          onClick={() => {
            setZoomLevel(1);
            setInspectorOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neon/15 hover:bg-neon/25 border border-neon/40 text-accent-ink font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all"
        >
          <span>🔍</span>
          <span>100% Detail Inspector</span>
        </button>
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
            {viewMode === 'frame' ? 'Scroll inside window ↕' : 'Full length view'}
          </div>
        </div>

        {/* BROWSER VIEWPORT */}
        <div
          ref={scrollContainerRef}
          className={`w-full bg-black relative select-none ${
            viewMode === 'frame'
              ? 'h-[540px] sm:h-[680px] md:h-[760px] overflow-y-auto overflow-x-hidden cursor-pointer'
              : 'h-auto overflow-hidden'
          }`}
          onClick={() => {
            setZoomLevel(1);
            setInspectorOpen(true);
          }}
          title="Click to open 100% Detail Inspector"
        >
          <img
            src={`${base}images/${activePage.filename}`}
            alt={activePage.title}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto object-top transition-opacity duration-300"
          />
        </div>

        {/* BROWSER FOOTER BAR */}
        <div className="px-4 py-2.5 bg-[#121215] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-ink/60">
          <div className="flex items-center gap-2.5">
            <span className="text-white font-semibold">{activePage.title}</span>
            <span className="text-white/20">•</span>
            <span className="text-accent-ink">{activePage.dimensions}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-ink/40">Click image to inspect at 1:1 pixel resolution</span>
            <button
              onClick={() => {
                setZoomLevel(1);
                setInspectorOpen(true);
              }}
              className="text-accent-ink hover:underline inline-flex items-center gap-1"
            >
              Expand Detail ↗
            </button>
          </div>
        </div>
      </div>

      {/* 3 DISTINCT ADVANTAGES CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink font-bold">01 · Frame Realism</p>
          <h4 className="font-display font-bold uppercase tracking-tight text-sm text-white">True Viewport Experience</h4>
          <p className="font-sans text-xs text-ink/65 leading-relaxed">
            Presents the site in a 720px contained frame with realistic scroll physics, exactly how users experience desktop web navigation without outer page fatigue.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink font-bold">02 · Detail Inspection</p>
          <h4 className="font-display font-bold uppercase tracking-tight text-sm text-white">100% Pixel Resolution</h4>
          <p className="font-sans text-xs text-ink/65 leading-relaxed">
            Clicking the inspector opens the full 1440px wide master file at 1:1 pixel perfection, letting recruiters examine frequency graphs, microcopy, and UI padding.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink font-bold">03 · Template Structure</p>
          <h4 className="font-display font-bold uppercase tracking-tight text-sm text-white">4 Distinct Page Types</h4>
          <p className="font-sans text-xs text-ink/65 leading-relaxed">
            Organized into dedicated templates (Home, Product, Technology, Campaign Landing) with live tab switching rather than cluttering the portfolio flow.
          </p>
        </div>
      </div>

      {/* FULL-RESOLUTION 100% DETAIL INSPECTOR LIGHTBOX MODAL */}
      {inspectorOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col animate-fade-in">
          {/* MODAL CONTROLS BAR */}
          <div className="px-5 sm:px-8 py-3.5 bg-[#0e0e11] border-b border-white/15 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="px-2 py-0.5 rounded bg-neon/15 border border-neon/30 text-accent-ink font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">
                100% Detail Inspector
              </span>
              <span className="font-display font-bold uppercase tracking-tight text-sm text-white truncate">
                {activePage.title}
              </span>
              <span className="font-mono text-xs text-ink/40 hidden sm:inline">
                ({activePage.dimensions})
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* ZOOM CONTROLS */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-black border border-white/15">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  className="px-2 py-1 rounded font-mono text-xs text-ink hover:text-white hover:bg-white/10"
                  title="Zoom Out"
                >
                  −
                </button>
                <span className="font-mono text-xs px-2 text-accent-ink font-bold">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.25))}
                  className="px-2 py-1 rounded font-mono text-xs text-ink hover:text-white hover:bg-white/10"
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="px-2 py-1 rounded font-mono text-[10px] uppercase text-ink/60 hover:text-white hover:bg-white/10 ml-1"
                  title="Reset to 100%"
                >
                  Reset
                </button>
              </div>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setInspectorOpen(false)}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                Close ✕
              </button>
            </div>
          </div>

          {/* MODAL IMAGE PAN & SCROLL CONTAINER */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-[#050507]">
            <img
              src={`${base}images/${activePage.filename}`}
              alt={activePage.title}
              className="shadow-2xl rounded-lg max-w-none transition-all duration-150"
              style={{
                width: `${1440 * zoomLevel}px`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
