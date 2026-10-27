import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FullWidthProject } from '../types';

interface WorkPageProps {
  base: string;
}

export function WorkPage({ base }: WorkPageProps) {
  const [activeImage, setActiveImage] = useState<FullWidthProject | null>(null);

  const fullWidthProjects: FullWidthProject[] = [
    {
      id: 'ikon',
      title: 'IKON TRAILERS',
      category: 'BRAND IDENTITY & LIVERY',
      image: `${base}images/ikontrailers_thumbnail.webp`
    },
    {
      id: 'aquapet',
      title: 'AQUAPET VETERINARY',
      category: 'PACKAGING & BRAND SYSTEM',
      image: `${base}images/aquapet_thumbnail.webp`
    },
    {
      id: 'oceanline',
      title: 'OCEAN-LINE CARGO',
      category: 'MARITIME DIGITAL PLATFORM',
      image: `${base}images/oceanline_thumbnail.webp`
    },
    {
      id: 'fastkat',
      title: 'FASTKAT LOGISTICS',
      category: 'COURIER DISPATCH UI/UX',
      image: `${base}images/fastkat_thumbnail.webp`
    },
    {
      id: 'iron-acre',
      title: 'IRON ACRE LAND CO',
      category: 'BRAND ARCHITECTURE & PRINT',
      image: `${base}images/project-thumb-1.webp`
    },
    {
      id: 'green-essentials',
      title: 'GREEN ESSENTIALS',
      category: 'ECO BRAND SYSTEM & WEB',
      image: `${base}images/project-thumb-2.webp`
    },
    {
      id: 'pelican-social',
      title: 'PELICAN SOCIAL',
      category: 'HOSPITALITY BRANDING & SIGNAGE',
      image: `${base}images/project-thumb-3.webp`
    },
    {
      id: 'aerauliqa',
      title: 'AERAULIQA ENGINEERING',
      category: 'ENTERPRISE AIRFLOW TELEMETRY',
      image: `${base}images/project-thumb-4.webp`
    }
  ];

  return (
    <>
      {/* 8 FULL-WIDTH THUMBNAILS (PURE VISUAL - PROJECT NAME REVEALED ON HOVER/TOUCH) */}
      <main id="work" className="w-full flex flex-col pt-24">
        {fullWidthProjects.map((project, idx) => (
          <section 
            key={project.id}
            onClick={() => setActiveImage(project)}
            className="group relative w-full aspect-[16/9] sm:aspect-[21/9] lg:h-[75vh] min-h-[220px] sm:min-h-[320px] lg:min-h-[420px] bg-neutral-950 border-b border-neutral-900 overflow-hidden cursor-pointer touch-manipulation"
          >
            {/* Background Full-Width Image with Cinematic Zoom */}
            <img 
              src={project.image} 
              alt={project.title}
              width={1920}
              height={1080}
              loading={idx < 2 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.03] filter brightness-95 group-hover:brightness-105 transform-gpu will-change-transform"
            />

            {/* Bottom Gradient: hidden on mobile, reveals on hover on desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Project Name and Category: hidden on mobile, reveals on hover on desktop */}
            <div className="hidden md:flex absolute inset-x-0 bottom-0 p-4 sm:p-8 lg:p-14 z-10 flex-col items-start opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
              <h2 className="text-2xl sm:text-4xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase group-hover:text-accent-ink transition-colors duration-500 drop-shadow-xl leading-tight">
                {project.title}
              </h2>
              <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-sm font-mono tracking-widest text-accent-ink uppercase font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                {project.category}
              </div>
            </div>

            {/* Razor-thin Neon Sweep Line along the bottom edge */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full md:w-0 md:group-hover:w-full transition-all duration-700 ease-out pointer-events-none" />
          </section>
        ))}
      </main>

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
            
            <button 
              onClick={() => setActiveImage(null)}
              className="p-2 rounded-full border border-neutral-800 hover:border-neon text-neutral-400 hover:text-accent-ink transition-colors cursor-pointer shrink-0"
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Image Preview */}
          <div className="my-auto max-h-[78vh] flex items-center justify-center p-1 sm:p-2">
            <img 
              src={activeImage.image} 
              alt={activeImage.title} 
              className="max-h-[72vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-lg border border-neutral-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
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
