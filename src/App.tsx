import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X, Mail, Github, MapPin } from 'lucide-react';

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

const navLinks = [
  { href: "#work", label: "Work", hint: "Selected projects" },
  { href: "#about", label: "About", hint: "The designer" },
  { href: "#contact", label: "Contact", hint: "Start a project" },
  { href: "mailto:obi22004@byui.edu", label: "Direct Call", hint: "Email inquiry" }
] as const;

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState<FullWidthProject | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const scrolledRef = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      const isPast = window.scrollY > 20;
      if (isPast !== scrolledRef.current) {
        scrolledRef.current = isPast;
        setScrolled(isPast);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon selection:text-black">
      
      {/* HEADER MATCHING ondwariobiko-portfolio-website */}
      <header 
        data-menu-open={open} 
        className={`fixed top-0 inset-x-0 z-[60] px-5 md:px-8 flex items-center justify-between transition-all duration-500 ${
          open 
            ? "py-5 bg-transparent" 
            : scrolled 
              ? "py-3 bg-surface/80 backdrop-blur-xl border-b border-ink/10" 
              : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img 
            src={`${base}images/${open ? "logoblack.webp" : "logowhite.webp"}`} 
            alt="ondwariobiko monogram" 
            width={64} 
            height={64} 
            className={`nav-logo object-contain ${open ? "rounded-full" : ""} ${scrolled && !open ? "size-11 md:size-12" : "size-12 md:size-14"}`} 
            style={{ transition: "all 0.6s" }} 
          />
          <span className={`hidden sm:block font-display text-2xl uppercase tracking-tight leading-none ${open ? "text-black" : "text-ink"}`}>
            ondwari<span className={open ? "text-black/50" : "text-accent-ink"}>obiko</span>
          </span>
        </a>

        {/* Center Pill */}
        <div className={`${open ? "lg:hidden" : ""} hidden lg:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60 border border-ink/15 rounded-full px-4 py-2 backdrop-blur bg-surface/40`}>
          <span className="size-1.5 rounded-full bg-neon animate-pulse" />
          Available Remotely Worldwide
        </div>

        {/* Morphing Neon Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[60] flex items-center gap-3 group cursor-pointer"
          >
            <span className={`font-mono text-xs uppercase tracking-[0.25em] transition-colors ${open ? "text-black" : "text-ink group-hover:text-accent-ink"}`}>
              {open ? "Close" : "Menu"}
            </span>
            <span className={`size-14 rounded-full grid place-items-center transition-all duration-500 ${open ? "bg-black rotate-90" : "bg-neon group-hover:scale-110"}`}>
              <span className="relative block w-5 h-3">
                <span className={`absolute left-0 h-0.5 w-5 transition-all duration-500 ${open ? "top-1.5 rotate-45 bg-neon" : "top-0 bg-black"}`} />
                <span className={`absolute left-0 h-0.5 transition-all duration-500 ${open ? "top-1.5 w-5 -rotate-45 bg-neon" : "top-2.5 w-3 bg-black"}`} />
              </span>
            </span>
          </button>
        </div>
      </header>

      {/* FULL-SCREEN EXPANDING CIRCLE MENU IN BG-NEON */}
      {open && (
        <div 
          className="fixed inset-0 z-[55] bg-neon text-black animate-menu-in flex flex-col overflow-y-auto overscroll-contain" 
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="flex-1 flex flex-col justify-center px-5 md:px-16 pt-32 pb-12">
            <ul>
              {navLinks.map((l, i) => (
                <li key={l.label} className="overflow-hidden border-b border-black/15">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-6 py-2 md:py-3 animate-rise"
                    style={{ animationDelay: `${200 + i * 70}ms` }}
                  >
                    <span className="font-mono text-xs md:text-sm w-10">0{i + 1}</span>
                    <span className="font-display uppercase tracking-tighter leading-[0.9] text-[clamp(2.8rem,9vw,8rem)] transition-all duration-500 group-hover:translate-x-6 group-hover:italic">
                      {l.label}
                    </span>
                    <span className="ml-auto hidden md:block font-mono text-xs uppercase tracking-[0.25em] opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                      {l.hint} →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Marquee Ticker at the Bottom of Menu */}
          <div className="shrink-0 overflow-hidden bg-black text-accent-ink py-4">
            <div className="flex w-max animate-marquee font-display uppercase text-2xl tracking-tight whitespace-nowrap">
              {Array.from({ length: 2 }).map((_, k) => (
                <span key={k} className="flex">
                  {["Logo Design", "Brand Identity", "UI/UX", "Front-end", "Art Direction", "Remote Worldwide"].map((w) => (
                    <span key={w} className="px-8">{w} •</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8 FULL-WIDTH THUMBNAILS (NO NUMBERS, NO YEARS) */}
      <main id="work" className="w-full flex flex-col pt-24 sm:pt-28">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-85 group-hover:opacity-45 transition-opacity duration-500"></div>

            {/* Bottom Caption Bar: Title & Category (No Numbers, No Years) */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-12 sm:right-12 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase group-hover:text-accent-ink transition-colors drop-shadow-md">
                  {project.title}
                </h2>
                <div className="mt-2 text-xs sm:text-sm font-mono tracking-widest text-accent-ink uppercase font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon"></span>
                  {project.category}
                </div>
              </div>

              {/* View Action Pill */}
              <div className="self-end sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-neutral-800 group-hover:border-neon text-xs font-mono text-white group-hover:text-accent-ink transition-all">
                <span>VIEW</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Interactive Lime Accent Border on Hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon/60 pointer-events-none transition-colors duration-300"></div>
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
              <span className="text-white uppercase font-bold text-base font-display">{activeImage.title}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-accent-ink">{activeImage.category}</span>
            </div>
            
            <button 
              onClick={() => setActiveImage(null)}
              className="p-2 rounded-full border border-neutral-800 hover:border-neon text-neutral-400 hover:text-accent-ink transition-colors cursor-pointer"
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

      {/* ABOUT SECTION */}
      <section id="about" className="border-t border-neutral-900 bg-surface px-6 sm:px-12 py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-ink uppercase tracking-widest">
            <span className="size-1.5 rounded-full bg-neon"></span>
            ABOUT ONDWARI OBIKO
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display uppercase tracking-tight text-white leading-tight">
            Design that cuts through noise and commands authority.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-mono leading-relaxed">
            I am a brand identity designer, UI/UX architect, and frontend developer based in Nairobi, Kenya with 10 years of commercial experience. I work with founders and enterprise platforms globally to forge memorable brand identities, custom typography, and high-performance digital interfaces.
          </p>
        </div>
      </section>

      {/* MINIMAL FOOTER / CONTACT */}
      <footer id="contact" className="border-t border-neutral-900 bg-black px-6 sm:px-12 py-16 font-mono text-xs text-neutral-400">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          <div className="space-y-2">
            <div className="text-white font-display font-extrabold text-xl tracking-tight">
              ONDWARI OBIKO
            </div>
            <div className="text-neutral-500 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-accent-ink" />
              NAIROBI, KENYA • AVAILABLE REMOTELY WORLDWIDE
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a 
              href="mailto:obi22004@byui.edu" 
              className="text-white hover:text-accent-ink transition-colors flex items-center gap-1.5 font-bold"
            >
              <Mail className="w-4 h-4 text-accent-ink" />
              obi22004@byui.edu
            </a>
            <span className="text-neutral-800">•</span>
            <a 
              href="https://github.com/byu-pro/ondwariobiko_octoberportfolio" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-neutral-400 hover:text-accent-ink transition-colors flex items-center gap-1.5"
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
