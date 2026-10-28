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
  onOpenLightbox: (project: FullWidthProject, initialView: 'thumbnail' | 'logo', hasLogo: boolean) => void;
}

function ProjectCard({ project, idx, onOpenLightbox }: ProjectCardProps) {
  const [logoAvailable, setLogoAvailable] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'thumbnail' | 'logo'>('thumbnail');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Smooth periodic crossfade cycle when logo exists and user is not actively hovering
  useEffect(() => {
    if (!logoAvailable) return;

    // Stagger transition timing per card so adjacent projects don't toggle at the same instant
    const initialDelay = (idx % 3) * 1200 + 4000;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      // Toggle views periodically
      intervalId = setInterval(() => {
        if (!isHovered) {
          setActiveView((prev) => (prev === 'thumbnail' ? 'logo' : 'thumbnail'));
        }
      }, 5500);
    }, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [logoAvailable, isHovered, idx]);

  const handleToggle = (e: React.MouseEvent, view: 'thumbnail' | 'logo') => {
    e.stopPropagation();
    setActiveView(view);
  };

  return (
    <section 
      onClick={() => onOpenLightbox(project, activeView, logoAvailable)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full aspect-[16/9] sm:aspect-[21/9] lg:h-[75vh] min-h-[220px] sm:min-h-[320px] lg:min-h-[420px] bg-neutral-950 border-b border-neutral-900 overflow-hidden cursor-pointer touch-manipulation select-none"
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

      {/* LAYER 1: PROJECT SHOWCASE THUMBNAIL */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          activeView === 'thumbnail' ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
        }`}
      >
        <img 
          src={project.image} 
          alt={project.title}
          width={1920}
          height={1080}
          loading={idx < 2 ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.03] filter brightness-95 group-hover:brightness-105 transform-gpu will-change-transform"
        />
      </div>

      {/* LAYER 2: PROJECT LOGO SHOWCASE (Crossfades in seamlessly when logo exists) */}
      {logoAvailable && project.logoImage && (
        <div 
          className={`absolute inset-0 bg-neutral-950 flex items-center justify-center overflow-hidden transition-opacity duration-700 ease-out ${
            activeView === 'logo' ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Ambient color reflection from the project's hero mockup */}
          <img 
            src={project.image} 
            alt="" 
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover filter blur-3xl opacity-20 scale-125 transform-gpu pointer-events-none"
          />
          {/* Subtle vignette radial layer */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

          {/* Centered logo presentation */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-6 sm:p-12 md:p-20">
            <img 
              src={project.logoImage} 
              alt={`${project.title} Logo`}
              loading="lazy"
              decoding="async"
              className="max-w-[78%] sm:max-w-[65%] md:max-w-[50%] max-h-[72%] sm:max-h-[65%] object-contain filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      )}

      {/* Bottom Gradient: subtle on mobile, reveals on hover on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Project Name and Category: visible & compact on mobile, reveals on hover on desktop */}
      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 md:p-8 lg:p-14 z-20 flex flex-col items-start opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
        <h2 className="text-sm sm:text-base md:text-4xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase md:group-hover:text-accent-ink transition-colors duration-500 drop-shadow-lg leading-tight">
          {project.title}
        </h2>
        <div className="mt-1 sm:mt-1.5 md:mt-2 text-[9px] sm:text-[10px] md:text-sm font-mono tracking-widest text-accent-ink uppercase font-semibold flex items-center gap-1.5">
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-neon animate-pulse" />
          {project.category}
        </div>
      </div>

      {/* Modern Interactive View Switcher Pill (Top Right) - Appears dynamically when logo is present */}
      {logoAvailable && (
        <div 
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 md:top-8 md:right-8 z-30 flex items-center bg-black/70 backdrop-blur-md border border-neutral-800 rounded-full p-1 text-[9px] sm:text-[11px] font-mono tracking-wider transition-all duration-300 opacity-90 hover:opacity-100 hover:border-neutral-700"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={(e) => handleToggle(e, 'thumbnail')}
            className={`px-2.5 sm:px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
              activeView === 'thumbnail'
                ? 'bg-neutral-800 text-white font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            MOCKUP
          </button>
          <button
            type="button"
            onClick={(e) => handleToggle(e, 'logo')}
            className={`px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
              activeView === 'logo'
                ? 'bg-accent-ink text-black font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeView === 'logo' ? 'bg-black' : 'bg-neon animate-pulse'}`} />
            LOGO
          </button>
        </div>
      )}

      {/* Razor-thin Neon Sweep Line along the bottom edge */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full md:w-0 md:group-hover:w-full transition-all duration-700 ease-out pointer-events-none z-20" />
    </section>
  );
}

export function WorkPage({ base }: WorkPageProps) {
  const [activeImage, setActiveImage] = useState<FullWidthProject | null>(null);
  const [lightboxView, setLightboxView] = useState<'thumbnail' | 'logo'>('thumbnail');
  const [lightboxHasLogo, setLightboxHasLogo] = useState<boolean>(false);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImage(null);
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
      logoImage: `${base}images/pelicansocial_logo.png`
    },
    {
      id: 'ikon-trailers',
      title: 'IKON TRAILERS.COM',
      category: 'FULL BRAND AND LOGO IDENTITY CREATION',
      image: `${base}images/ikontrailers_thumbnailldesktop.png`,
      mobileImage: `${base}images/ikontrailers_mobilethumbnail.png`,
      logoImage: `${base}images/ikontrailers_logo.png`
    },
    {
      id: 'iron-acre',
      title: 'IRON ACRE LAND CO',
      category: 'FULL BRAND AND LOGO IDENTITY CREATION',
      image: `${base}images/ironacre_thumbnaildesktop.png`,
      mobileImage: `${base}images/ironacre_mobilethumbnail.png`,
      logoImage: `${base}images/ironacre_logo.png`
    },
    {
      id: 'friends-of-unionville',
      title: 'FRIENDS OF UNIONVILLE',
      category: 'FULL BRAND AND LOGO IDENTITY CREATION',
      image: `${base}images/friendsofunionville_desktopthumbnail.png`,
      mobileImage: `${base}images/friendsofunionville_mobilethumbnail.png`,
      logoImage: `${base}images/friendsofunionville_logo.png`
    },
    {
      id: 'sound-curves',
      title: 'SOUND CURVES WEBSITE',
      category: 'WEBSITE DESIGN & DIGITAL PLATFORM',
      image: `${base}images/soundcurves_thumbnaildesktop.png`,
      mobileImage: `${base}images/soundcurves_mobilethumbnail.png`,
      logoImage: `${base}images/soundcurves_logo.png`
    },
    {
      id: 'moods-and-nerds',
      title: 'MOODS AND NERDS WEBSITE',
      category: 'WEBSITE DESIGN & WEB APP UI/UX',
      image: `${base}images/moodnmeds_thumbnaildesktop.png`,
      mobileImage: `${base}images/moodnmeds_mobilethumbnail.png`,
      logoImage: `${base}images/moodnmeds_logo.png`
    },
    {
      id: 'yellow-dot-energy',
      title: 'YELLOW DOT ENERGY MOBILE APP',
      category: 'MOBILE APP UI/UX & PRODUCT STRATEGY',
      image: `${base}images/yellowdot_desktopthumbnail.png`,
      mobileImage: `${base}images/yellowdot_mobilethumbnail.png`,
      logoImage: `${base}images/yellowdot_logo.png`
    },
    {
      id: 'green-essential',
      title: 'GREEN ESSENTIAL TURF AND MOSQUITO',
      category: 'LOGO DESIGN',
      image: `${base}images/greenessential_thumbnaildesktop.png`,
      mobileImage: `${base}images/greenessentials_mobilethumbnail.png`,
      logoImage: `${base}images/greenessential_logo.png`
    },
    {
      id: 'lewis-park',
      title: 'LEWIS PARK SACRAMENTO',
      category: 'T-SHIRT & APPAREL DESIGN',
      image: `${base}images/lewispark_thumbnaildesktop.png`,
      mobileImage: `${base}images/lewispark_mobilethumbnail.png`,
      logoImage: `${base}images/lewispark_logo.png`
    }
  ];

  const handleOpenLightbox = (project: FullWidthProject, initialView: 'thumbnail' | 'logo', hasLogo: boolean) => {
    setActiveImage(project);
    setLightboxView(initialView);
    setLightboxHasLogo(hasLogo);
  };

  return (
    <>
      {/* 9 FULL-WIDTH PROJECT CARDS WITH DUAL THUMBNAIL & LOGO CROSSFADE */}
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
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-3 sm:p-8 md:p-12 animate-fadeIn"
          onClick={() => setActiveImage(null)}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between gap-3 text-xs font-mono border-b border-neutral-800 pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0 pr-2">
              <span className="text-white uppercase font-bold text-sm sm:text-base font-display">
                {activeImage.title}
              </span>
              <span className="text-neutral-500 hidden sm:inline">•</span>
              <span className="text-accent-ink text-[11px] sm:text-xs">
                {activeImage.category}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Optional Lightbox View Toggle if logo is available */}
              {lightboxHasLogo && activeImage.logoImage && (
                <div 
                  className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full p-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    type="button"
                    onClick={() => setLightboxView('thumbnail')}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono transition-colors cursor-pointer ${
                      lightboxView === 'thumbnail'
                        ? 'bg-neutral-800 text-white font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    MOCKUP
                  </button>
                  <button 
                    type="button"
                    onClick={() => setLightboxView('logo')}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono transition-colors cursor-pointer ${
                      lightboxView === 'logo'
                        ? 'bg-accent-ink text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    LOGO
                  </button>
                </div>
              )}

              <button 
                onClick={() => setActiveImage(null)}
                className="p-2 rounded-full border border-neutral-800 hover:border-neon text-neutral-400 hover:text-accent-ink transition-colors cursor-pointer"
                aria-label="Close image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Large Image Preview */}
          <div 
            className="my-auto max-h-[78vh] flex items-center justify-center p-1 sm:p-2 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxView === 'thumbnail' ? (
              <img 
                src={activeImage.image} 
                alt={activeImage.title} 
                className="max-h-[72vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-lg border border-neutral-800 shadow-2xl transition-all duration-500"
              />
            ) : (
              <div className="relative max-h-[72vh] sm:max-h-[75vh] w-full max-w-4xl flex items-center justify-center p-8 sm:p-14 bg-neutral-950/90 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden">
                <img 
                  src={activeImage.image} 
                  alt="" 
                  aria-hidden="true" 
                  className="absolute inset-0 w-full h-full object-cover filter blur-3xl opacity-15 pointer-events-none" 
                />
                <img 
                  src={activeImage.logoImage} 
                  alt={`${activeImage.title} Logo`}
                  className="relative z-10 max-h-[60vh] max-w-full object-contain filter drop-shadow-2xl transition-all duration-500"
                />
              </div>
            )}
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