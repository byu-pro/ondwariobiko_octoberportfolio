import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, Mail, Github, MapPin, Menu, Sparkles, Layers, Palette, Code2 } from 'lucide-react';

interface FullWidthProject {
  id: string;
  title: string;
  category: string;
  image: string;
}

const base = import.meta.env.BASE_URL.endsWith('/') 
  ? import.meta.env.BASE_URL 
  : `${import.meta.env.BASE_URL}/`;

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

export default function App() {
  const [activeImage, setActiveImage] = useState<FullWidthProject | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [aboutModalOpen, setAboutModalOpen] = useState<boolean>(false);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setActiveImage(null);
        setAboutModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when menu or modal is open
  useEffect(() => {
    if (menuOpen || activeImage || aboutModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen, activeImage, aboutModalOpen]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-neutral-900 px-6 sm:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse"></span>
          <a href="#" className="font-syne font-extrabold text-base tracking-tight text-white hover:text-[#ccff00] transition-colors">
            ONDWARI OBIKO
          </a>
          <span className="text-neutral-700 hidden sm:inline">/</span>
          <span className="text-xs font-mono text-neutral-400 hidden sm:inline tracking-wider uppercase">
            BRAND ARCHITECT & DEVELOPER
          </span>
        </div>

        {/* Navigation & Menu Button */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
          <a 
            href="mailto:obi22004@byui.edu" 
            className="hidden sm:inline-block px-4 py-2 rounded-full border border-neutral-800 text-neutral-300 hover:border-[#ccff00] hover:text-[#ccff00] transition-colors"
          >
            LET'S TALK
          </a>

          {/* Distinct Menu Trigger Button */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#ccff00] text-black font-extrabold tracking-widest uppercase hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
            aria-label="Open main menu"
          >
            <Menu className="w-4 h-4 stroke-[2.5]" />
            <span>MENU</span>
          </button>
        </div>
      </header>

      {/* FULLSCREEN MAIN MENU OVERLAY */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 lg:p-16 animate-fadeIn overflow-y-auto"
        >
          {/* Menu Top Bar */}
          <div className="flex items-center justify-between border-b border-neutral-900 pb-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00]"></span>
              <span className="font-syne font-bold text-white text-lg tracking-tight">
                ONDWARI OBIKO
              </span>
              <span className="text-xs font-mono text-[#ccff00] border border-[#ccff00]/40 px-2.5 py-0.5 rounded-full">
                MAIN MENU
              </span>
            </div>

            <button 
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded-full border border-neutral-800 hover:border-[#ccff00] text-neutral-400 hover:text-[#ccff00] flex items-center gap-2 font-mono text-xs transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Menu Core Links */}
          <div className="my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Large Navigation Links */}
            <nav className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-6">
              <a 
                href="#"
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold font-syne uppercase tracking-tight text-white hover:text-[#ccff00] transition-colors"
              >
                <span className="text-sm sm:text-base font-mono text-neutral-600 group-hover:text-[#ccff00] transition-colors">01</span>
                <span>WORK</span>
                <ArrowUpRight className="w-6 h-6 sm:w-10 sm:h-10 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#ccff00]" />
              </a>

              <button 
                onClick={() => {
                  setMenuOpen(false);
                  setAboutModalOpen(true);
                }}
                className="group flex items-baseline gap-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold font-syne uppercase tracking-tight text-white hover:text-[#ccff00] transition-colors text-left cursor-pointer"
              >
                <span className="text-sm sm:text-base font-mono text-neutral-600 group-hover:text-[#ccff00] transition-colors">02</span>
                <span>ABOUT & ETHOS</span>
                <ArrowUpRight className="w-6 h-6 sm:w-10 sm:h-10 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#ccff00]" />
              </button>

              <a 
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold font-syne uppercase tracking-tight text-white hover:text-[#ccff00] transition-colors"
              >
                <span className="text-sm sm:text-base font-mono text-neutral-600 group-hover:text-[#ccff00] transition-colors">03</span>
                <span>CONTACT</span>
                <ArrowUpRight className="w-6 h-6 sm:w-10 sm:h-10 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#ccff00]" />
              </a>
            </nav>

            {/* Right: Info, Capabilities, Direct Inquiries */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 border-t lg:border-t-0 lg:border-l border-neutral-900 pt-8 lg:pt-0 lg:pl-12 font-mono text-xs">
              
              <div className="space-y-6">
                <div>
                  <div className="text-[#ccff00] font-bold uppercase tracking-widest mb-2">
                    // DISCIPLINE & EXPERTISE
                  </div>
                  <div className="space-y-2 text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-[#ccff00]" />
                      <span>Brand Identity & Logo Systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#ccff00]" />
                      <span>Packaging & Spatial Signage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#ccff00]" />
                      <span>High-Fidelity UI/UX & React Frontend</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[#ccff00] font-bold uppercase tracking-widest mb-2">
                    // LOCATION & AVAILABILITY
                  </div>
                  <div className="text-neutral-300 space-y-1">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#ccff00]" />
                      Nairobi, Kenya • Available for Global Commissions
                    </p>
                    <p className="text-neutral-500">
                      10 Years Active Commercial Experience
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Action */}
              <div className="space-y-3 pt-6 border-t border-neutral-900">
                <div className="text-neutral-500 uppercase tracking-wider">DIRECT EMAIL</div>
                <a 
                  href="mailto:obi22004@byui.edu" 
                  className="text-lg sm:text-xl font-bold text-white hover:text-[#ccff00] transition-colors block font-mono"
                >
                  obi22004@byui.edu
                </a>
                <a 
                  href="https://github.com/byu-pro/ondwariobiko_octoberportfolio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neutral-400 hover:text-[#ccff00] transition-colors mt-2"
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/byu-pro/ondwariobiko_octoberportfolio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

          {/* Menu Bottom Bar */}
          <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
            <div>© {new Date().getFullYear()} ONDWARI OBIKO. ALL RIGHTS RESERVED.</div>
            <div className="text-[#ccff00] font-bold">ESC TO CLOSE</div>
          </div>
        </div>
      )}

      {/* ABOUT MODAL */}
      {aboutModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6 sm:p-12 animate-fadeIn"
          onClick={() => setAboutModalOpen(false)}
        >
          <div 
            className="bg-neutral-950 border border-[#ccff00]/40 rounded-3xl max-w-2xl w-full p-8 sm:p-12 relative shadow-[0_0_50px_rgba(204,255,0,0.15)] space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
              <span className="text-xs font-mono text-[#ccff00] font-bold uppercase tracking-wider">
                ABOUT // ONDWARI OBIKO
              </span>
              <button 
                onClick={() => setAboutModalOpen(false)}
                className="p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-[#ccff00] hover:border-[#ccff00] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <img 
                src={`${base}images/portrait-bw.webp`} 
                alt="Ondwari Obiko" 
                className="w-28 h-28 rounded-2xl object-cover border border-neutral-800"
              />
              <div>
                <h3 className="text-2xl font-extrabold font-syne text-white uppercase">
                  Ondwari (John) Obiko
                </h3>
                <p className="text-xs font-mono text-[#ccff00] mt-1">
                  Brand Architect & Frontend Developer • Nairobi, Kenya
                </p>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  10+ Years Commercial Experience
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              I am a graphic and web designer specializing in logo systems, packaging, and high-performance UI/UX interfaces. My philosophy centers on brutal contrast, typographic precision, and removing all fluff that doesn't advance the brand.
            </p>

            <div className="pt-4 border-t border-neutral-900 flex justify-end">
              <a 
                href="mailto:obi22004@byui.edu"
                className="px-6 py-3 rounded-full bg-[#ccff00] text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2"
              >
                Direct Email Inquiry
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 8 FULL-WIDTH THUMBNAILS (NO NUMBERS, NO YEARS) */}
      <main className="w-full flex flex-col">
        {fullWidthProjects.map((project, idx) => (
          <section 
            key={project.id}
            onClick={() => setActiveImage(project)}
            className="group relative w-full aspect-[16/9] sm:aspect-[21/9] lg:h-[75vh] min-h-[380px] bg-neutral-950 border-b border-neutral-900 overflow-hidden cursor-pointer"
          >
            {/* Background Full-Width Image */}
            <img 
              src={project.image} 
              alt={project.title}
              width={1920}
              height={1080}
              loading={idx < 2 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 contrast-105 group-hover:brightness-100 transform-gpu will-change-transform"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>

            {/* Bottom Caption Bar: Title & Category (No Numbers, No Years) */}
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

              {/* View Action Pill */}
              <div className="self-end sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-neutral-800 group-hover:border-[#ccff00] text-xs font-mono text-white group-hover:text-[#ccff00] transition-all">
                <span>VIEW</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Interactive Lime Accent Border on Hover */}
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
          {/* Lightbox Header (Clean, No Numbers/Years) */}
          <div className="flex items-center justify-between text-xs font-mono border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-white uppercase font-bold text-base font-syne">{activeImage.title}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-[#ccff00]">{activeImage.category}</span>
            </div>
            
            <button 
              onClick={() => setActiveImage(null)}
              className="p-2 rounded-full border border-neutral-800 hover:border-[#ccff00] text-neutral-400 hover:text-[#ccff00] transition-colors cursor-pointer"
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
            CLICK ANYWHERE OR PRESS ESC TO CLOSE
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
