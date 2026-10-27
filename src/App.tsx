import React, { useState } from 'react';
import { ArrowUpRight, X, Mail, Github, MapPin } from 'lucide-react';

interface FullWidthProject {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  image: string;
}

const base = import.meta.env.BASE_URL.endsWith('/') 
  ? import.meta.env.BASE_URL 
  : `${import.meta.env.BASE_URL}/`;

const fullWidthProjects: FullWidthProject[] = [
  {
    id: 'ikon',
    index: '01',
    title: 'IKON TRAILERS',
    category: 'BRAND IDENTITY & LIVERY',
    year: '2025',
    image: `${base}images/ikontrailers_thumbnail.png`
  },
  {
    id: 'aquapet',
    index: '02',
    title: 'AQUAPET VETERINARY',
    category: 'PACKAGING & BRAND SYSTEM',
    year: '2025',
    image: `${base}images/aquapet_thumbnail.png`
  },
  {
    id: 'oceanline',
    index: '03',
    title: 'OCEAN-LINE CARGO',
    category: 'MARITIME DIGITAL PLATFORM',
    year: '2024',
    image: `${base}images/oceanline_thumbnail.png`
  },
  {
    id: 'fastkat',
    index: '04',
    title: 'FASTKAT LOGISTICS',
    category: 'COURIER DISPATCH UI/UX',
    year: '2025',
    image: `${base}images/fastkat_thumbnail.png`
  },
  {
    id: 'iron-acre',
    index: '05',
    title: 'IRON ACRE LAND CO',
    category: 'BRAND ARCHITECTURE & PRINT',
    year: '2024',
    image: `${base}images/project-thumb-1.png`
  },
  {
    id: 'green-essentials',
    index: '06',
    title: 'GREEN ESSENTIALS',
    category: 'ECO BRAND SYSTEM & WEB',
    year: '2024',
    image: `${base}images/project-thumb-2.png`
  },
  {
    id: 'pelican-social',
    index: '07',
    title: 'PELICAN SOCIAL',
    category: 'HOSPITALITY BRANDING & SIGNAGE',
    year: '2023',
    image: `${base}images/project-thumb-3.png`
  },
  {
    id: 'aerauliqa',
    index: '08',
    title: 'AERAULIQA ENGINEERING',
    category: 'ENTERPRISE AIRFLOW TELEMETRY',
    year: '2024',
    image: `${base}images/project-thumb-4.png`
  }
];

export default function App() {
  const [activeImage, setActiveImage] = useState<FullWidthProject | null>(null);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black">
      
      {/* Minimal Top Brand Bar */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-neutral-900 px-6 sm:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse"></span>
          <a href="#" className="font-syne font-extrabold text-base tracking-tight text-white hover:text-[#ccff00] transition-colors">
            ONDWARI OBIKO
          </a>
          <span className="text-neutral-700 hidden sm:inline">/</span>
          <span className="text-xs font-mono text-neutral-400 hidden sm:inline tracking-wider uppercase">
            SELECTED WORK
          </span>
        </div>

        <nav className="flex items-center gap-6 font-mono text-xs">
          <a href="#contact" className="text-neutral-400 hover:text-white transition-colors">
            INFO
          </a>
          <a 
            href="mailto:obi22004@byui.edu" 
            className="px-4 py-2 rounded-full border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black font-semibold transition-all"
          >
            CONTACT
          </a>
        </nav>
      </header>

      {/* 8 FULL-WIDTH THUMBNAILS */}
      <main className="w-full flex flex-col">
        {fullWidthProjects.map((project) => (
          <section 
            key={project.id}
            onClick={() => setActiveImage(project)}
            className="group relative w-full aspect-[16/9] sm:aspect-[21/9] lg:h-[75vh] min-h-[420px] bg-neutral-950 border-b border-neutral-900 overflow-hidden cursor-pointer"
          >
            {/* Background Full-Width Image */}
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 contrast-105 group-hover:brightness-100"
              loading="lazy"
            />

            {/* Gradient Overlays for Readability and Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 opacity-75 group-hover:opacity-50 transition-opacity duration-500"></div>

            {/* Top Index & Year Bar */}
            <div className="absolute top-6 left-6 right-6 sm:top-10 sm:left-12 sm:right-12 flex items-center justify-between text-xs font-mono z-10">
              <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-neutral-800 text-[#ccff00] font-bold tracking-widest">
                {project.index} // 08
              </span>
              <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-neutral-800 text-neutral-300 font-mono">
                {project.year}
              </span>
            </div>

            {/* Bottom Caption Bar: Title & Category (Ultra-Minimal) */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-12 sm:right-12 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white font-syne uppercase group-hover:text-[#ccff00] transition-colors drop-shadow-md">
                  {project.title}
                </h2>
                <div className="mt-2 text-xs sm:text-sm font-mono tracking-widest text-[#ccff00] uppercase font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
                  {project.category}
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="self-end sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-neutral-800 group-hover:border-[#ccff00] text-xs font-mono text-white group-hover:text-[#ccff00] transition-all">
                <span>VIEW</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Interactive Lime Accent Frame on Hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ccff00]/60 pointer-events-none transition-colors duration-300"></div>
          </section>
        ))}
      </main>

      {/* FULLSCREEN PREVIEW LIGHTBOX */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-6 sm:p-12 animate-fadeIn"
          onClick={() => setActiveImage(null)}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-xs font-mono border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-[#ccff00] font-bold">{activeImage.index} // 08</span>
              <span className="text-white uppercase font-bold text-sm font-syne">{activeImage.title}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400">{activeImage.category}</span>
            </div>
            
            <button 
              onClick={() => setActiveImage(null)}
              className="p-2 rounded-full border border-neutral-800 hover:border-[#ccff00] text-neutral-400 hover:text-[#ccff00] transition-colors"
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Image Preview */}
          <div className="my-auto max-h-[80vh] flex items-center justify-center p-2">
            <img 
              src={activeImage.image} 
              alt={activeImage.title} 
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg border border-neutral-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Lightbox Footer */}
          <div className="text-center text-xs font-mono text-neutral-500">
            CLICK ANYWHERE TO CLOSE
          </div>
        </div>
      )}

      {/* MINIMAL FOOTER / CONTACT */}
      <footer id="contact" className="border-t border-neutral-900 bg-black px-6 sm:px-12 py-16 font-mono text-xs text-neutral-400">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          <div className="space-y-2">
            <div className="text-white font-syne font-extrabold text-xl tracking-tight">
              ONDWARI OBIKO
            </div>
            <div className="text-neutral-500 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#ccff00]" />
              NAIROBI, KENYA • AVAILABLE GLOBALLY
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a 
              href="mailto:obi22004@byui.edu" 
              className="text-white hover:text-[#ccff00] transition-colors flex items-center gap-1.5 font-bold"
            >
              <Mail className="w-4 h-4 text-[#ccff00]" />
              obi22004@byui.edu
            </a>
            <span className="text-neutral-800">•</span>
            <a 
              href="https://github.com/byu-pro/ondwariobiko_octoberportfolio" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-neutral-400 hover:text-[#ccff00] transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              GITHUB
            </a>
            <span className="text-neutral-800">•</span>
            <span className="text-neutral-600">
              © {new Date().getFullYear()}
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
