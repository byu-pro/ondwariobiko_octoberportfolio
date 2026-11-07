import React, { useState, useEffect, useRef } from 'react';
import { X, PenTool, Sparkles, Star, Code2, Zap } from 'lucide-react';
import { FullWidthProject, PageRoute } from '../types';

interface WorkPageProps {
  base: string;
  onNavigate?: (route: PageRoute) => void;
}

const rotatingWords = ["Creative", "Logo", "Brand", "Visual", "UI/UX", "Digital", "Web", "Art"];

function RotatingWord() {
  const [i, setI] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Only animate when visible in viewport to prevent idle CPU usage
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setI((n) => (n + 1) % rotatingWords.length), 2200);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <span ref={spanRef} className="relative inline-block overflow-hidden align-bottom h-[0.9em] min-w-[5ch] text-center">
      <span key={rotatingWords[i]} className="block animate-rise text-accent-ink text-center">
        {rotatingWords[i]}
      </span>
    </span>
  );
}

interface ProjectCardProps {
  project: FullWidthProject;
  idx: number;
  onOpenLightbox: (project: FullWidthProject, currentImage: string) => void;
}

function ProjectCard({ project, idx, onOpenLightbox }: ProjectCardProps) {
  const [logoAvailable, setLogoAvailable] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'thumbnail' | 'logo'>('thumbnail');
  const [isInView, setIsInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Viewport detection: only run transitions when the project card is visible on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Naturally transitions between thumbnail and logo only when card is in viewport
  useEffect(() => {
    if (!logoAvailable || !isInView) return;

    // Stagger initial delay across cards so they transition organically
    const initialDelay = (idx % 3) * 1200 + 3500;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setActiveView((prev) => (prev === 'thumbnail' ? 'logo' : 'thumbnail'));
      }, 5500);
    }, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [logoAvailable, isInView, idx]);

  return (
    <section 
      ref={sectionRef}
      onClick={() => onOpenLightbox(project, activeView === 'logo' && project.logoImage ? project.logoImage : project.image)}
      className="group relative w-full aspect-[18/9] sm:aspect-[19/9] lg:aspect-[21/10] max-h-[600px] min-h-[200px] bg-neutral-950 border-b border-neutral-900 overflow-hidden cursor-pointer touch-manipulation select-none"
    >
      {/* Invisible preloader to verify whether logo file exists without displaying broken image icons */}
      {project.logoImage && (
        <img 
          src={project.logoImage} 
          alt="" 
          aria-hidden="true" 
          onLoad={() => setLogoAvailable(true)} 
          onError={() => setLogoAvailable(false)}
          className="hidden" 
        />
      )}

      {/* LAYER 1: PROJECT SHOWCASE THUMBNAIL (Full Width, GPU-accelerated) */}
      <div 
        className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-out transform-gpu backface-hidden ${
          activeView === 'thumbnail' ? 'opacity-100 z-[1] pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        <img 
          src={project.image} 
          alt={project.title}
          width={1920}
          height={1080}
          loading={idx < 2 ? "eager" : "lazy"}
          decoding="async"
          className={`w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform backface-hidden ${
            activeView === 'thumbnail' ? 'scale-100' : 'scale-[1.03]'
          } group-hover:scale-[1.03]`}
        />
      </div>

      {/* LAYER 2: PROJECT LOGO THUMBNAIL (Full Width, Seamless Cinematic Zoom-In) */}
      {logoAvailable && project.logoImage && (
        <div 
          className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-out transform-gpu backface-hidden ${
            activeView === 'logo' ? 'opacity-100 z-[1] pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img 
            src={project.logoImage} 
            alt={`${project.title} Logo`}
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform backface-hidden ${
              activeView === 'logo' ? 'scale-[1.03]' : 'scale-100'
            } group-hover:scale-[1.05]`}
          />
        </div>
      )}

      {/* Bottom Gradient: subtle on mobile, reveals on hover on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Project Name and Category: visible & compact on mobile, reveals on hover on desktop */}
      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 md:p-7 lg:p-10 z-20 flex flex-col items-start opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
        <h2 className="text-sm sm:text-base md:text-4xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase md:group-hover:text-accent-ink transition-colors duration-500 drop-shadow-lg leading-tight">
          {project.title}
        </h2>
        <div className="mt-1 sm:mt-1.5 md:mt-2 text-[9px] sm:text-[10px] md:text-sm font-mono tracking-widest text-accent-ink uppercase font-semibold flex items-center gap-1.5">
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-neon animate-pulse" />
          {project.category}
        </div>
      </div>

      {/* Razor-thin Neon Sweep Line along the bottom edge */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full md:w-0 md:group-hover:w-full transition-all duration-700 ease-out pointer-events-none z-20" />
    </section>
  );
}

export function WorkPage({ base, onNavigate }: WorkPageProps) {
  const [activePreview, setActivePreview] = useState<{ project: FullWidthProject; image: string } | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePreview(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fullWidthProjects: FullWidthProject[] = [
    {
      id: 'pelican-social',
      title: 'PELICAN SOCIAL BAR AND GRILL',
      category: 'FULL BRAND AND LOGO IDENTITY CREATION',
      image: `${base}images/pelicansocial_thumbnaildesktop.png`,
      mobileImage: `${base}images/pelicansocial_mobilethumbnail.png`,
      logoImage: `${base}images/pelicansociallogo_thumbnail.png`
    },
    {
      id: 'ikon-trailers',
      title: 'IKON TRAILERS.COM',
      category: 'FULL BRAND AND LOGO IDENTITY CREATION',
      image: `${base}images/ikontrailers_thumbnailldesktop.png`,
      mobileImage: `${base}images/ikontrailers_mobilethumbnail.png`,
      logoImage: `${base}images/ikontrailerslogo_thumbnail.png`
    },
    {
      id: 'iron-acre',
      title: 'IRON ACRE LAND CO',
      category: 'FULL BRAND AND LOGO IDENTITY CREATION',
      image: `${base}images/ironacre_thumbnaildesktop.png`,
      mobileImage: `${base}images/ironacre_mobilethumbnail.png`,
      logoImage: `${base}images/ironacrelogo_thumbnail.png`
    },
    {
      id: 'friends-of-unionville',
      title: 'FRIENDS OF UNIONVILLE',
      category: 'FULL BRAND AND LOGO IDENTITY CREATION',
      image: `${base}images/friendsofunionville_desktopthumbnail.png`,
      mobileImage: `${base}images/friendsofunionville_mobilethumbnail.png`,
      logoImage: `${base}images/friendsofunionvillelogo_thumbnail.png`
    },
    {
      id: 'sound-curves',
      title: 'SOUND CURVES WEBSITE',
      category: 'WEBSITE DESIGN & DIGITAL PLATFORM',
      image: `${base}images/soundcurves_thumbnaildesktop.png`,
      mobileImage: `${base}images/soundcurves_mobilethumbnail.png`,
      logoImage: `${base}images/soundcurveslogo_thumbnail.png`
    },
    {
      id: 'moods-and-nerds',
      title: 'MOODS AND NERDS WEBSITE',
      category: 'WEBSITE DESIGN & WEB APP UI/UX',
      image: `${base}images/moodnmeds_thumbnaildesktop.png`,
      mobileImage: `${base}images/moodnmeds_mobilethumbnail.png`,
      logoImage: `${base}images/moodnnerdslogo_thumbnail.png`
    },
    {
      id: 'yellow-dot-energy',
      title: 'YELLOW DOT ENERGY MOBILE APP',
      category: 'MOBILE APP UI/UX & PRODUCT STRATEGY',
      image: `${base}images/yellowdot_desktopthumbnail.png`,
      mobileImage: `${base}images/yellowdot_mobilethumbnail.png`,
      logoImage: `${base}images/yellowdotlogo_thumbnail.png`
    },
    {
      id: 'green-essential',
      title: 'GREEN ESSENTIAL TURF AND MOSQUITO',
      category: 'LOGO DESIGN',
      image: `${base}images/greenessential_thumbnaildesktop.png`,
      mobileImage: `${base}images/greenessentials_mobilethumbnail.png`,
      logoImage: `${base}images/greenessentials_thumbnail.png`
    },
    {
      id: 'lewis-park',
      title: 'LEWIS PARK SACRAMENTO',
      category: 'T-SHIRT & APPAREL DESIGN',
      image: `${base}images/lewispark_thumbnaildesktop.png`,
      mobileImage: `${base}images/lewispark_mobilethumbnail.png`,
      logoImage: `${base}images/lewisparklogo_thumbnail.png`
    }
  ];

  const handleOpenLightbox = (project: FullWidthProject, currentImage: string) => {
    setActivePreview({ project, image: currentImage });
  };

  return (
    <>
      {/* FULL-WIDTH HERO HEADER SECTION WITH LIME GREEN BACKGROUND & GRAPHIC STICKERS */}
      <section 
        id="home-hero" 
        className="relative w-full bg-neon text-black flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-12 pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14 md:pb-16 border-b-2 border-black overflow-hidden"
      >
        {/* ============================================================== */}
        {/* DESKTOP FLANKING DESIGNER STICKERS (HIGH CONTRAST & READABLE)  */}
        {/* ============================================================== */}

        {/* Left Flank Column (Desktop - Positioned slightly below center to clear headline) */}
        <div className="hidden lg:flex flex-col gap-3.5 absolute left-4 xl:left-7 2xl:left-12 top-1/2 -translate-y-1/2 translate-y-7 xl:translate-y-9 z-20 select-none">
          {/* Sticker 1: 100% Bespoke */}
          <div className="group cursor-pointer">
            <div className="flex flex-col gap-1.5 bg-white text-black border-2 border-black p-3.5 xl:p-4 rounded-2xl shadow-[4px_4px_0px_#000] -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 w-[210px] xl:w-[220px] text-left">
              <div className="flex items-center gap-2">
                <div className="size-7 xl:size-8 rounded-lg bg-neon border border-black grid place-items-center shrink-0">
                  <PenTool className="size-3.5 xl:size-4 text-black" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                  100% Bespoke
                </span>
              </div>
              <div className="font-display font-extrabold text-sm xl:text-base uppercase tracking-tight text-neutral-900">
                No Templates
              </div>
              <div className="font-mono text-xs font-medium text-neutral-700 flex items-center gap-1.5 pt-1 border-t border-black/10">
                <Sparkles className="size-3 text-black shrink-0" />
                <span>Drawn From Scratch</span>
              </div>
            </div>
          </div>

          {/* Sticker 2: Figma to VS Code to Web */}
          <div className="group cursor-pointer">
            <div className="flex flex-col gap-1.5 bg-white text-black border-2 border-black p-3.5 xl:p-4 rounded-2xl shadow-[4px_4px_0px_#000] rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 w-[210px] xl:w-[220px] text-left">
              <div className="flex items-center gap-2">
                <div className="size-7 xl:size-8 rounded-lg bg-black text-neon border border-black grid place-items-center shrink-0">
                  <Code2 className="size-3.5 xl:size-4" />
                </div>
                <span className="font-mono text-[11px] xl:text-xs font-bold uppercase tracking-wider text-black">
                  Figma ➔ VS Code
                </span>
              </div>
              <div className="font-display font-extrabold text-sm xl:text-base uppercase tracking-tight text-neutral-900">
                Figma ➔ Code ➔ Web
              </div>
              <div className="font-mono text-xs font-medium text-neutral-700 flex items-center gap-1.5 pt-1 border-t border-black/10">
                <span>✦</span>
                <span>VS Code &amp; Custom Build</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Flank Column (Desktop - Positioned slightly below center to clear headline) */}
        <div className="hidden lg:flex flex-col gap-3.5 absolute right-4 xl:right-7 2xl:right-12 top-1/2 -translate-y-1/2 translate-y-7 xl:translate-y-9 z-20 select-none">
          {/* Sticker 3: 10+ Years Craft */}
          <div className="group cursor-pointer">
            <div className="flex flex-col gap-1.5 bg-black text-white border-2 border-black p-3.5 xl:p-4 rounded-2xl shadow-[4px_4px_0px_#000] rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 w-[210px] xl:w-[220px] text-left">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neon">
                  Solo Studio
                </span>
                <div className="flex items-center gap-0.5 text-neon text-xs leading-none">
                  {"★".repeat(5)}
                </div>
              </div>
              <div className="font-display font-black text-sm xl:text-base uppercase tracking-tight text-white">
                10+ Years Craft
              </div>
              <div className="font-mono text-xs font-medium text-neutral-300 flex items-center gap-1.5 pt-1 border-t border-white/15">
                <Star className="size-3 fill-neon text-neon shrink-0" />
                <span>350+ Brand Marks</span>
              </div>
            </div>
          </div>

          {/* Sticker 4: Fast Turnaround */}
          <div className="group cursor-pointer">
            <div className="flex flex-col gap-1.5 bg-black text-white border-2 border-black p-3.5 xl:p-4 rounded-2xl shadow-[4px_4px_0px_#000] -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 w-[210px] xl:w-[220px] text-left">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Direct Collab
                </span>
                <Zap className="size-3.5 fill-neon text-neon" />
              </div>
              <div className="font-display font-black text-sm xl:text-base uppercase tracking-tight text-neon">
                Fast Turnaround
              </div>
              <div className="font-mono text-xs font-medium text-neutral-300 flex items-center gap-1.5 pt-1 border-t border-white/15">
                <span>⚡</span>
                <span>Zero Agency Middleman</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Graphic Accents / Stars in margins */}
        <span 
          aria-hidden="true" 
          className="hidden xl:block absolute top-12 left-1/4 text-black/60 text-2xl font-black select-none pointer-events-none -rotate-12"
        >
          ✦
        </span>
        <span 
          aria-hidden="true" 
          className="hidden xl:block absolute top-14 right-1/4 text-black/60 text-xl font-black select-none pointer-events-none rotate-12"
        >
          ✧
        </span>

        {/* ============================================================== */}
        {/* CENTER HERO CONTENT (HEADLINE, SUBTITLE, BUTTONS & STICKERS)   */}
        {/* ============================================================== */}
        <div className="relative z-10 max-w-[1100px] w-full mx-auto flex flex-col items-center justify-center text-center">
          {/* Eyebrow Status Pill with Requested Worldwide/Remote text & generous bottom space (no 2026 date) */}
          <div className="inline-flex items-center gap-2.5 bg-black text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-black font-mono text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider shadow-[3px_3px_0px_#000] -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 select-none cursor-default mb-6 sm:mb-8 max-w-full">
            <span className="size-2.5 rounded-full bg-neon animate-pulse shrink-0" />
            <span className="leading-snug">Available for projects worldwide, remotely</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-extrabold uppercase tracking-tight sm:tracking-tighter leading-[0.94] sm:leading-[0.9] text-[clamp(2.1rem,5.5vw,4.6rem)] text-black text-center break-words [overflow-wrap:anywhere] select-none">
            <span className="block">Custom logos &amp;</span>
            <span className="block mt-1 sm:mt-2">
              brand identities<span className="text-black">.</span>
            </span>
          </h1>

          {/* Subtitle / Bio Description */}
          <div className="mt-4 sm:mt-5 max-w-xl text-center mx-auto px-2">
            <p className="font-mono text-xs sm:text-base md:text-lg font-medium tracking-tight text-black/85 leading-relaxed text-center">
              ondwariobiko, brand designer &amp; web developer. 10 years, 100% custom.
            </p>
          </div>

          {/* Action Buttons - Distinct, prominent interactive controls (not styled like stickers) */}
          <div className="mt-6 sm:mt-7 flex flex-row items-center justify-center gap-3 sm:gap-5 w-auto mx-auto flex-wrap px-2">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="group inline-flex items-center justify-center gap-2.5 bg-black text-neon font-mono text-xs sm:text-sm uppercase tracking-[0.2em] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-extrabold transition-all duration-300 hover:scale-105 hover:bg-neutral-900 cursor-pointer shadow-xl shadow-black/25"
              >
                <span>Start a project</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-neon font-normal">⟶</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('work-projects');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center justify-center gap-2.5 border-2 border-black bg-transparent text-black font-mono text-xs sm:text-sm uppercase tracking-[0.2em] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-extrabold transition-all duration-300 hover:bg-black hover:text-neon cursor-pointer"
            >
              <span>View work</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-1 font-normal">↓</span>
            </button>
          </div>

          {/* ============================================================== */}
          {/* STICKER CLOUD / BADGES (PROMINENTLY DISPLAYED ON MOBILE & DESKTOP) */}
          {/* ============================================================== */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-7 sm:mt-9 max-w-2xl px-2">
            {/* Mobile/All Sticker 1: 100% Bespoke */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white text-black border-2 border-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold shadow-[3px_3px_0px_#000] -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer select-none">
              <PenTool className="size-3.5 text-black shrink-0" />
              <span>100% Bespoke</span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-600">No Templates</span>
            </div>

            {/* Mobile/All Sticker 2: 10+ Years */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-black text-neon border-2 border-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold shadow-[3px_3px_0px_#000] rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer select-none">
              <Star className="size-3.5 fill-neon text-neon shrink-0" />
              <span>10+ Years</span>
              <span className="text-neutral-500">•</span>
              <span className="text-white">350+ Brands</span>
            </div>

            {/* Mobile/All Sticker 3: Fast Turnaround */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-black text-white border-2 border-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold shadow-[3px_3px_0px_#000] -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer select-none">
              <Zap className="size-3.5 fill-neon text-neon shrink-0" />
              <span className="text-neon">Fast Turnaround</span>
              <span className="text-neutral-500">•</span>
              <span>1-on-1 Collab</span>
            </div>

            {/* Mobile/All Sticker 4: Figma to VS Code to Web */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white text-black border-2 border-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold shadow-[3px_3px_0px_#000] rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer select-none">
              <Code2 className="size-3.5 text-black shrink-0" />
              <span>Figma ➔ VS Code ➔ Web</span>
            </div>

            {/* Mobile/All Sticker 5: 5-Star Satisfaction */}
            <div className="inline-flex items-center gap-1.5 bg-white text-black border-2 border-black px-3 py-1.5 rounded-lg font-mono text-xs font-bold shadow-[2px_2px_0px_#000] -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer select-none">
              <span className="text-amber-500 text-sm leading-none">★★★★★</span>
              <span>5.0 Rating</span>
            </div>

            {/* Mobile/All Sticker 6: Barcode Seal */}
            <div className="inline-flex items-center gap-2 bg-black text-white border-2 border-black px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold shadow-[2px_2px_0px_#000] rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer select-none">
              <span className="font-mono text-xs tracking-tighter text-neon font-black">||| | |||||</span>
              <span className="tracking-wider uppercase text-neutral-200">Verified Bespoke</span>
            </div>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <div className="shrink-0 pt-6 sm:pt-8 opacity-70 relative z-10">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-black font-bold flex items-center justify-center gap-1.5">
            Scroll to view work ↓
          </span>
        </div>
      </section>

      {/* 9 FULL-WIDTH PROJECT CARDS WITH NATURAL THUMBNAIL & LOGO TRANSITIONS */}
      <main id="work-projects" className="w-full flex flex-col">
        {fullWidthProjects.map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            idx={idx} 
            onOpenLightbox={handleOpenLightbox} 
          />
        ))}
      </main>

      {/* KINETIC ROTATING HEADLINE */}
      <section className="relative py-16 sm:py-24 md:py-32 px-8 overflow-hidden bg-black border-t border-neutral-900">
        <div className="max-w-[1400px] mx-auto text-center flex flex-col items-center justify-center">
          <h2 className="font-extrabold tracking-tight font-display uppercase drop-shadow-lg text-[clamp(2.5rem,11vw,10rem)] leading-[0.85] break-words text-center">
            <RotatingWord /> <br />
            <span className="text-stroke text-white">Designer</span>
          </h2>
        </div>
      </section>

      {/* FULLSCREEN PREVIEW LIGHTBOX */}
      {activePreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-3 sm:p-8 md:p-12 animate-fadeIn"
          onClick={() => setActivePreview(null)}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between gap-3 text-xs font-mono border-b border-neutral-800 pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0 pr-2">
              <span className="text-white uppercase font-bold text-sm sm:text-base font-display">
                {activePreview.project.title}
              </span>
              <span className="text-neutral-500 hidden sm:inline">•</span>
              <span className="text-accent-ink text-[11px] sm:text-xs">
                {activePreview.project.category}
              </span>
            </div>

            <button 
              onClick={() => setActivePreview(null)}
              className="p-2 rounded-full border border-neutral-800 hover:border-neon text-neutral-400 hover:text-accent-ink transition-colors cursor-pointer shrink-0"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Image Preview */}
          <div 
            className="my-auto max-h-[78vh] flex items-center justify-center p-1 sm:p-2 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={activePreview.image} 
              alt={activePreview.project.title} 
              className="max-h-[72vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-lg border border-neutral-800 shadow-2xl transition-all duration-500"
            />
          </div>

          {/* Lightbox Footer */}
          <div className="text-center text-[10px] sm:text-xs font-mono text-neutral-500">
            TAP ANYWHERE OR PRESS ESC TO CLOSE
          </div>
        </div>
      )}
    </>
  );
}