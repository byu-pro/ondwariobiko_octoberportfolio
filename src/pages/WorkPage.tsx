import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { FullWidthProject, PageRoute } from '../types';
import { responsiveImageSrcSet } from '../utils/images';
import { HomeHero } from '../components/HomeHero';

interface WorkPageProps {
  base: string;
  onNavigate?: (route: PageRoute) => void;
}

const clientBrands = [
  { name: 'Bosch', file: 'bosch.webp' },
  { name: 'Ritter Sport', file: 'rittersport.webp' },
  { name: 'PropertyGuru', file: 'propertyguru.webp' },
  { name: '99.co', file: '99co.webp' },
  { name: 'EdgeProp', file: 'edgeprop.webp' },
  { name: 'Far East Organization', file: 'fareast.webp' },
  { name: 'Holland Village', file: 'hollandvillage.webp' },
  { name: 'The Church of Jesus Christ', file: 'The%20Church%20of%20Jesus%20Christ%20Logo.webp' },
  { name: 'Legibra', file: 'legibra.webp' },
  { name: 'Aquapet', file: 'aquapet.webp' },
  { name: 'Beyond The Image', file: 'beyondtheimage.webp' },
  { name: 'Fast Kat Connect', file: 'fastkatconnect.webp' },
  { name: 'Hi Hoteles', file: 'hihoteles.webp' },
  { name: 'Oceanline', file: 'oceanline.webp' },
  { name: 'Paluxy River', file: 'paluxyriver.webp' },
];

interface ProjectCardProps {
  project: FullWidthProject;
  idx: number;
  onOpenProject: (project: FullWidthProject) => void;
}

function ProjectCard({ project, idx, onOpenProject }: ProjectCardProps) {
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
      id={project.id}
      onClick={() => onOpenProject(project)}
      className="group relative w-full aspect-[18/9] sm:aspect-[19/9] lg:aspect-[21/10] max-h-[600px] min-h-[200px] bg-neutral-950 border-b border-neutral-900 overflow-hidden cursor-pointer touch-manipulation select-none"
    >
      {/* LAYER 1: PROJECT SHOWCASE THUMBNAIL (Full Width, GPU-accelerated) */}
      <div 
        className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ease-out transform-gpu backface-hidden ${
          activeView === 'thumbnail' ? 'opacity-100 z-[1] pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        <img 
          src={project.image} 
          alt={project.title}
          width={1920}
          height={1080}
          srcSet={responsiveImageSrcSet(project.image)}
          sizes="100vw"
          loading={idx === 0 ? "eager" : "lazy"}
          fetchPriority={idx === 0 ? "high" : "auto"}
          decoding="async"
          className={`w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform backface-hidden ${
            activeView === 'thumbnail' ? 'scale-100' : 'scale-[1.03]'
          } group-hover:scale-[1.03]`}
        />
      </div>

      {/* LAYER 2: PROJECT LOGO THUMBNAIL (Full Width, Seamless Cinematic Zoom-In) */}
      {project.logoImage && (
        <div 
          className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ease-out transform-gpu backface-hidden ${
            logoAvailable && activeView === 'logo' ? 'opacity-100 z-[1] pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img 
            src={project.logoImage} 
            alt={`${project.title} Logo`}
            width={1920}
            height={1080}
            srcSet={responsiveImageSrcSet(project.logoImage)}
            sizes="100vw"
            loading="lazy"
            decoding="async"
            onLoad={() => setLogoAvailable(true)}
            onError={() => setLogoAvailable(false)}
            className={`w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform backface-hidden ${
              activeView === 'logo' ? 'scale-[1.03]' : 'scale-100'
            } group-hover:scale-[1.05]`}
          />
        </div>
      )}

      {/* Subtle bottom gradient on hover to ensure "View project" pill stands out */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Subtle "View project" indicator on hover */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out translate-y-1.5 group-hover:translate-y-0">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] group-hover:border-neon/70 group-hover:text-neon shadow-xl transition-colors duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          <span>View project</span>
          <span className="text-neon transition-transform duration-300 group-hover:translate-x-1 font-normal">⟶</span>
        </div>
      </div>

      {/* Razor-thin Neon Sweep Line along the bottom edge */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-neon transition-all duration-400 ease-out pointer-events-none z-20" />
    </section>
  );
}

export function WorkPage({ base, onNavigate }: WorkPageProps) {
  const [activePreview, setActivePreview] = useState<{ project: FullWidthProject; image: string } | null>(null);
  const caseStudyIds = new Set(['pelican-social', 'ikon-trailers', 'iron-acre', 'friends-of-unionville', 'sound-curves', 'moods-and-nerds', 'green-essential', 'lewis-park']);

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
      image: `${base}images/pelicansocial_thumbnaildesktop.webp`,
      mobileImage: `${base}images/pelicansocial_mobilethumbnail.webp`,
      logoImage: `${base}images/pelicansociallogo_thumbnail.webp`
    },
    {
      id: 'ikon-trailers',
      title: 'IKON TRAILERS.COM',
      category: 'FULL BRAND AND LOGO IDENTITY CREATION',
      image: `${base}images/ikontrailers_thumbnailldesktop.webp`,
      mobileImage: `${base}images/ikontrailers_mobilethumbnail.webp`,
      logoImage: `${base}images/ikontrailerslogo_thumbnail.webp`
    },
    {
      id: 'iron-acre',
      title: 'IRON ACRE LAND CO',
      category: 'FULL BRAND AND LOGO IDENTITY CREATION',
      image: `${base}images/ironacre_thumbnaildesktop.webp`,
      mobileImage: `${base}images/ironacre_mobilethumbnail.webp`,
      logoImage: `${base}images/ironacrelogo_thumbnail.webp`
    },
    {
      id: 'friends-of-unionville',
      title: 'FRIENDS OF UNIONVILLE',
      category: 'FULL BRAND AND LOGO IDENTITY CREATION',
      image: `${base}images/friendsofunionville_desktopthumbnail.webp`,
      mobileImage: `${base}images/friendsofunionville_mobilethumbnail.webp`,
      logoImage: `${base}images/friendsofunionvillelogo_thumbnail.webp`
    },
    {
      id: 'sound-curves',
      title: 'SOUND CURVES WEBSITE',
      category: 'WEBSITE DESIGN & DIGITAL PLATFORM',
      image: `${base}images/soundcurves_thumbnaildesktop.webp`,
      mobileImage: `${base}images/soundcurves_mobilethumbnail.webp`,
      logoImage: `${base}images/soundcurveslogo_thumbnail.webp`
    },
    {
      id: 'moods-and-nerds',
      title: 'MOODS AND NERDS WEBSITE',
      category: 'WEBSITE DESIGN & WEB APP UI/UX',
      image: `${base}images/moodnmeds_thumbnaildesktop.webp`,
      mobileImage: `${base}images/moodnmeds_mobilethumbnail.webp`,
      logoImage: `${base}images/moodnmedslogo_thumbnail.webp`
    },
    {
      id: 'yellow-dot-energy',
      title: 'YELLOW DOT ENERGY MOBILE APP',
      category: 'MOBILE APP UI/UX & PRODUCT STRATEGY',
      image: `${base}images/yellowdot_desktopthumbnail.webp`,
      mobileImage: `${base}images/yellowdot_mobilethumbnail.webp`,
      logoImage: `${base}images/yellowdotlogo_thumbnail.webp`
    },
    {
      id: 'green-essential',
      title: 'GREEN ESSENTIAL TURF AND MOSQUITO',
      category: 'LOGO DESIGN',
      image: `${base}images/greenessential_thumbnaildesktop.webp`,
      mobileImage: `${base}images/greenessentials_mobilethumbnail.webp`,
      logoImage: `${base}images/greenessentiallogo_thumbnail.webp`
    },
    {
      id: 'lewis-park',
      title: 'LEWIS PARK SACRAMENTO',
      category: 'T-SHIRT & APPAREL DESIGN',
      image: `${base}images/lewispark_thumbnaildesktop.webp`,
      mobileImage: `${base}images/lewispark_mobilethumbnail.webp`,
      logoImage: `${base}images/lewisparklogo_thumbnail.webp`
    }
  ];

  const handleOpenProject = (project: FullWidthProject) => {
    if (caseStudyIds.has(project.id)) {
      window.location.hash = `#/case-study/${project.id}`;
      return;
    }
    setActivePreview({ project, image: project.image });
  };

  return (
    <>
      {/* CREATIVE FULL-WIDTH HERO HEADER SECTION */}
      <HomeHero onNavigate={onNavigate} />

      {/* 9 FULL-WIDTH PROJECT CARDS WITH NATURAL THUMBNAIL & LOGO TRANSITIONS */}
      <main id="work-projects" className="w-full flex flex-col">
        {fullWidthProjects.map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            idx={idx} 
            onOpenProject={handleOpenProject} 
          />
        ))}
      </main>

      {/* EDITORIAL QUOTE MANIFESTO POSTER */}
      <section
        id="art-speaks-quote"
        aria-label="Art speaks where words are unable to explain"
        className="relative w-full bg-[#0a0a0a] border-t border-neutral-900 overflow-hidden select-none"
      >
        <div className="relative w-full max-w-[1680px] mx-auto">
          <img
            src={`${base}images/art-speaks-quote.webp`}
            srcSet={responsiveImageSrcSet(`${base}images/art-speaks-quote.webp`)}
            sizes="100vw"
            alt="Art speaks where words are unable to explain — Ondwari Obiko"
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto object-contain"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent"
        />
      </section>

      {/* BRANDS AND ORGANIZATIONS SHOWCASE */}
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden bg-black border-t border-neutral-900">
        {/* Section Heading on top */}
        <div className="max-w-[1400px] mx-auto text-center mb-10 sm:mb-14 md:mb-16 px-4">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-accent-ink font-semibold flex items-center justify-center gap-2 mb-3">
            <span className="inline-block size-1.5 rounded-full bg-neon animate-pulse" />
            <span>Experience across industries</span>
            <span className="inline-block size-1.5 rounded-full bg-neon animate-pulse" />
          </p>
          <h2 className="font-display font-extrabold uppercase tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">
            Helping brands show up with clarity
          </h2>
        </div>

        {/* Continuous Slow Looping Marquee (Runs indefinitely with zero cursor interruption) */}
        <div 
          className="relative w-full overflow-hidden select-none pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)]"
        >
          <div 
            style={{ animationDuration: '50s' }}
            className="flex w-max animate-marquee-slow items-center will-change-transform"
          >
            {/* Track 1 */}
            <div className="flex items-center gap-10 sm:gap-14 md:gap-20 shrink-0 pr-10 sm:pr-14 md:pr-20">
              {clientBrands.map((brand) => (
                <div 
                  key={`track1-${brand.name}`}
                  className="h-10 sm:h-12 md:h-14 w-28 sm:w-36 md:w-44 flex items-center justify-center shrink-0"
                >
                  <img
                    src={`${base}images/brandworkedwith/${brand.file}`}
                    alt={`${brand.name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full w-auto h-auto object-contain brightness-0 invert opacity-80"
                  />
                </div>
              ))}
            </div>

            {/* Track 2 (Exact duplicate for seamless infinite loop) */}
            <div className="flex items-center gap-10 sm:gap-14 md:gap-20 shrink-0 pr-10 sm:pr-14 md:pr-20" aria-hidden="true">
              {clientBrands.map((brand) => (
                <div 
                  key={`track2-${brand.name}`}
                  className="h-10 sm:h-12 md:h-14 w-28 sm:w-36 md:w-44 flex items-center justify-center shrink-0"
                >
                  <img
                    src={`${base}images/brandworkedwith/${brand.file}`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full w-auto h-auto object-contain brightness-0 invert opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            {caseStudyIds.has(activePreview.project.id) && (
              <a
                href={`#/case-study/${activePreview.project.id}`}
                onClick={() => setActivePreview(null)}
                className="inline-flex items-center gap-3 rounded-full bg-neon px-6 py-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-black hover:scale-[1.03] transition-transform"
              >
                Read the case study <span aria-hidden="true">↗</span>
              </a>
            )}
            <p className="text-[10px] sm:text-xs font-mono text-neutral-500">
              TAP ANYWHERE OR PRESS ESC TO CLOSE
            </p>
          </div>
        </div>
      )}
    </>
  );
}
