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
        className="relative w-full min-h-[100dvh] bg-neon text-black flex flex-col justify-between items-center text-center px-4 sm:px-8 md:px-12 pt-24 sm:pt-32 md:pt-36 lg:pt-40 pb-6 sm:pb-8 border-b border-black/15 overflow-hidden"
      >
        {/* ============================================================== */}
        {/* GRAPHIC DESIGN STICKERS & BADGES SCATTERED AROUND THE CANVAS   */}
        {/* ============================================================== */}

        {/* Sticker 1: Top-Left "100% Bespoke / No Templates" Stamp */}
        <div 
          className="absolute top-20 sm:top-24 md:top-28 left-3 sm:left-6 md:left-8 lg:left-12 z-20 select-none group cursor-pointer"
        >
          <div className="flex items-center gap-2 sm:gap-2.5 bg-white text-black border-2 border-black px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] -rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
            <div className="size-6 sm:size-8 rounded-lg sm:rounded-xl bg-neon border border-black grid place-items-center shrink-0">
              <PenTool className="size-3 sm:size-4 text-black" />
            </div>
            <div className="text-left font-mono">
              <div className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>100% Bespoke</span>
                <Sparkles className="size-2.5 sm:size-3 text-black fill-black" />
              </div>
              <div className="text-[7.5px] sm:text-[9px] uppercase tracking-tight text-neutral-600 font-semibold">
                No Templates • No AI
              </div>
            </div>
          </div>
        </div>

        {/* Sticker 2: Top-Right "10+ Yrs Craft" Circular Starburst Badge */}
        <div 
          className="absolute top-20 sm:top-24 md:top-28 right-3 sm:right-6 md:right-8 lg:right-12 z-20 select-none group cursor-pointer"
        >
          <div className="relative size-16 sm:size-20 md:size-24 rounded-full bg-black text-white border-2 border-black flex flex-col items-center justify-center p-1.5 sm:p-2 shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
            <Star className="size-3 sm:size-3.5 fill-neon text-neon mb-0.5 animate-pulse" />
            <span className="font-display font-black text-xs sm:text-sm md:text-base leading-none uppercase text-neon tracking-tight">
              10+ Yrs
            </span>
            <span className="font-mono text-[6.5px] sm:text-[7.5px] md:text-[8px] tracking-widest uppercase text-white/80 mt-0.5">
              Solo Studio
            </span>
            <div className="absolute inset-1 rounded-full border border-dashed border-white/30 pointer-events-none" />
          </div>
        </div>

        {/* Sticker 3: Mid-Left "Figma to Code" Tape Sticker */}
        <div 
          className="hidden md:block absolute top-[52%] -translate-y-1/2 left-4 md:left-6 lg:left-10 xl:left-14 z-20 select-none group cursor-pointer"
        >
          <div className="flex flex-col gap-1 bg-white text-black border-2 border-black p-3 rounded-xl shadow-[4px_4px_0px_#000] -rotate-12 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 max-w-[170px] text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                <Code2 className="size-3.5 text-black" />
                <span>Figma ➔ Code</span>
              </div>
              <span className="size-2 rounded-full bg-neon border border-black" />
            </div>
            <div className="font-display font-extrabold text-xs uppercase tracking-tight text-neutral-900">
              Pixel-Perfect Build
            </div>
            <div className="font-mono text-[8px] uppercase tracking-wider text-neutral-500 pt-0.5 border-t border-black/10">
              Design + Engineering
            </div>
          </div>
        </div>

        {/* Sticker 4: Mid-Right "350+ Marks Shipped" Badge */}
        <div 
          className="hidden md:block absolute top-[52%] -translate-y-1/2 right-4 md:right-6 lg:right-10 xl:right-14 z-20 select-none group cursor-pointer"
        >
          <div className="flex flex-col gap-1 bg-black text-white border-2 border-black p-3 rounded-xl shadow-[4px_4px_0px_#000] rotate-8 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 max-w-[170px] text-left">
            <div className="flex items-center gap-0.5 text-neon text-[11px] leading-none">
              {"★".repeat(5)}
            </div>
            <div className="font-display font-black text-sm uppercase tracking-tight text-neon">
              350+ Marks
            </div>
            <div className="font-mono text-[8.5px] uppercase tracking-wider text-neutral-300">
              Crafted Worldwide
            </div>
          </div>
        </div>

        {/* Sticker 5: Bottom-Left Barcode Spec Sticker */}
        <div 
          className="hidden lg:block absolute bottom-8 left-10 xl:left-14 z-20 select-none group cursor-pointer"
        >
          <div className="flex flex-col items-start bg-white text-black border-2 border-black p-2.5 rounded-lg shadow-[3px_3px_0px_#000] rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 font-mono">
            <div className="flex items-center justify-between w-full text-[8px] uppercase font-bold tracking-widest text-neutral-700">
              <span>SERIES: 01</span>
              <span>CUSTOM-ID</span>
            </div>
            <svg className="w-28 h-5 my-1 text-black" viewBox="0 0 112 20" fill="currentColor">
              <rect x="0" y="0" width="3" height="20"/>
              <rect x="5" y="0" width="1" height="20"/>
              <rect x="8" y="0" width="4" height="20"/>
              <rect x="14" y="0" width="2" height="20"/>
              <rect x="18" y="0" width="1" height="20"/>
              <rect x="21" y="0" width="3" height="20"/>
              <rect x="26" y="0" width="1" height="20"/>
              <rect x="29" y="0" width="4" height="20"/>
              <rect x="35" y="0" width="2" height="20"/>
              <rect x="39" y="0" width="3" height="20"/>
              <rect x="44" y="0" width="1" height="20"/>
              <rect x="47" y="0" width="4" height="20"/>
              <rect x="53" y="0" width="2" height="20"/>
              <rect x="57" y="0" width="1" height="20"/>
              <rect x="60" y="0" width="3" height="20"/>
              <rect x="65" y="0" width="2" height="20"/>
              <rect x="69" y="0" width="4" height="20"/>
              <rect x="75" y="0" width="1" height="20"/>
              <rect x="78" y="0" width="3" height="20"/>
              <rect x="83" y="0" width="2" height="20"/>
              <rect x="87" y="0" width="4" height="20"/>
              <rect x="93" y="0" width="1" height="20"/>
              <rect x="96" y="0" width="3" height="20"/>
              <rect x="101" y="0" width="2" height="20"/>
              <rect x="105" y="0" width="4" height="20"/>
              <rect x="110" y="0" width="2" height="20"/>
            </svg>
            <div className="text-[7.5px] uppercase font-bold tracking-[0.2em] text-neutral-800">
              ONDWARI OBIKO STUDIO
            </div>
          </div>
        </div>

        {/* Sticker 6: Bottom-Right "Fast Turnaround" Electric Tag */}
        <div 
          className="hidden lg:block absolute bottom-8 right-10 xl:right-14 z-20 select-none group cursor-pointer"
        >
          <div className="flex items-center gap-2.5 bg-black text-neon border-2 border-black px-3.5 py-2 rounded-xl shadow-[3px_3px_0px_#000] -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
            <div className="size-7 rounded-lg bg-neon border border-black grid place-items-center shrink-0">
              <Zap className="size-3.5 fill-black text-black" />
            </div>
            <div className="text-left font-mono">
              <div className="text-[10px] font-bold uppercase tracking-wider text-white">
                Fast Turnaround
              </div>
              <div className="text-[8px] uppercase tracking-tight text-neon font-semibold">
                Direct 1-on-1 Collab
              </div>
            </div>
          </div>
        </div>

        {/* Floating Graphic Accents / Stars */}
        <span 
          aria-hidden="true" 
          className="hidden sm:block absolute top-[24%] left-[24%] text-black/70 text-2xl md:text-3xl font-black select-none pointer-events-none -rotate-12 animate-pulse"
        >
          ✦
        </span>
        <span 
          aria-hidden="true" 
          className="hidden sm:block absolute top-[28%] right-[24%] text-black/70 text-xl md:text-2xl font-black select-none pointer-events-none rotate-12"
        >
          ✧
        </span>
        <span 
          aria-hidden="true" 
          className="hidden md:block absolute bottom-[22%] left-[28%] text-black/50 text-lg md:text-xl font-black select-none pointer-events-none rotate-45"
        >
          ✦
        </span>
        <span 
          aria-hidden="true" 
          className="hidden md:block absolute bottom-[26%] right-[28%] text-black/50 text-xl font-black select-none pointer-events-none -rotate-12"
        >
          ★
        </span>

        {/* ============================================================== */}
        {/* CENTER HERO CONTENT (HEADLINE, SUBTITLE & CALLS TO ACTION)      */}
        {/* ============================================================== */}
        <div className="relative z-10 max-w-[1300px] w-full mx-auto flex-1 flex flex-col items-center justify-center text-center my-auto py-2 sm:py-6">
          {/* Eyebrow Availability Pill */}
          <div className="inline-flex items-center gap-2 bg-black text-white px-3 sm:px-4 py-1.5 rounded-full border-2 border-black font-mono text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider shadow-[3px_3px_0px_#000] -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 select-none cursor-default mb-3 sm:mb-5">
            <span className="size-2 rounded-full bg-neon animate-pulse" />
            <span>Available for new projects</span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-neon hidden sm:inline">2026</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-extrabold uppercase tracking-tight sm:tracking-tighter leading-[0.92] sm:leading-[0.88] text-[clamp(2rem,6vw,5.5rem)] text-black text-center break-words [overflow-wrap:anywhere] select-none">
            <span className="block">Custom logos &amp;</span>
            <span className="block mt-1 sm:mt-2">
              brand identities<span className="text-black">.</span>
            </span>
          </h1>

          {/* Subtitle / Bio Description (Center Aligned) */}
          <div className="mt-4 sm:mt-6 md:mt-7 max-w-xl text-center mx-auto px-2">
            <p className="font-mono text-xs sm:text-base md:text-lg font-medium tracking-tight text-black/85 leading-relaxed text-center">
              ondwariobiko, brand designer &amp; web developer. 10 years, 100% custom.
            </p>
          </div>

          {/* Action Buttons (Center Aligned) */}
          <div className="mt-5 sm:mt-7 md:mt-8 flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-auto mx-auto flex-wrap px-2">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 bg-black text-neon font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] px-5 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold transition-transform duration-300 hover:scale-105 cursor-pointer shadow-md"
              >
                <span>Start a project</span>
                <span className="text-xs sm:text-sm">⟶</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('work-projects');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 border-2 border-black text-black font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] px-5 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold transition-all duration-300 hover:bg-black hover:text-neon cursor-pointer"
            >
              <span>View work</span>
              <span className="text-xs sm:text-sm">↓</span>
            </button>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <div className="shrink-0 pt-2 sm:pt-4 opacity-60 relative z-10">
          <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.25em] text-black/75 flex items-center justify-center gap-1.5 font-semibold">
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