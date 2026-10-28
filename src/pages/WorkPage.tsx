import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FullWidthProject } from '../types';

interface WorkPageProps {
  base: string;
}

const rotatingWords = ["Creative", "Logo", "Brand", "Visual", "UI/UX", "Digital", "Web", "Art"];

function RotatingWord() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % rotatingWords.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden align-bottom h-[0.9em] min-w-[5ch] text-center">
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

  // Naturally transitions between thumbnail and logo on its own
  useEffect(() => {
    if (!logoAvailable) return;

    // Stagger initial delay across cards so they transition organically
    const initialDelay = (idx % 3) * 1400 + 3500;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setActiveView((prev) => (prev === 'thumbnail' ? 'logo' : 'thumbnail'));
      }, 5000);
    }, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [logoAvailable, idx]);

  return (
    <section 
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

      {/* LAYER 1: PROJECT SHOWCASE THUMBNAIL (Full Width) */}
      <div 
        className={`absolute inset-0 overflow-hidden transition-all duration-1000 ease-in-out transform-gpu ${
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
          className={`w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 transition-all duration-1200 ease-out transform-gpu will-change-transform ${
            activeView === 'thumbnail' ? 'scale-100' : 'scale-[1.03]'
          } group-hover:scale-[1.03]`}
        />
      </div>

      {/* LAYER 2: PROJECT LOGO THUMBNAIL (Full Width, Seamless Cinematic Zoom-In) */}
      {logoAvailable && project.logoImage && (
        <div 
          className={`absolute inset-0 overflow-hidden transition-all duration-1000 ease-in-out transform-gpu ${
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
            className={`w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 transition-all duration-1200 ease-out transform-gpu will-change-transform ${
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

export function WorkPage({ base }: WorkPageProps) {
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
      logoImage: `${base}images/moodnmedslogo_thumbnail.png`
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
      logoImage: `${base}images/greenessentiallogo_thumbnail.png`
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
      {/* 9 FULL-WIDTH PROJECT CARDS WITH NATURAL THUMBNAIL & LOGO TRANSITIONS */}
      <main id="work" className="w-full flex flex-col pt-24">
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