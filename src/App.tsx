import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

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
  { href: "#contact", label: "Contact", hint: "Start a project" },
  { href: "mailto:obi22004@byui.edu", label: "Direct Call", hint: "1 hour, on me" }
] as const;

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState<FullWidthProject | null>(null);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keyboard accessibility
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

  // Scroll detection for header and back-to-top button
  const scrolledRef = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      const isPast = window.scrollY > 20;
      if (isPast !== scrolledRef.current) {
        scrolledRef.current = isPast;
        setScrolled(isPast);
      }
      const threshold = Math.min(320, window.innerHeight * 0.4);
      setBackToTopVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Video Intersection Observer for performance
  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    element.muted = true;
    const playVideo = () => {
      void element.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          playVideo();
        } else {
          element.pause();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon selection:text-black">
      
      {/* HEADER MATCHING ondwariobiko-portfolio-website */}
      <header 
        data-menu-open={open} 
        className={`fixed top-0 inset-x-0 z-[60] px-4 sm:px-6 md:px-8 flex items-center justify-between transition-all duration-500 ${
          open 
            ? "py-4 sm:py-5 bg-transparent" 
            : scrolled 
              ? "py-2.5 sm:py-3 bg-surface/80 backdrop-blur-xl border-b border-ink/10" 
              : "py-4 sm:py-5 bg-transparent border-b border-transparent"
        }`}
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img 
            src={`${base}images/${open ? "logoblack.webp" : "logowhite.webp"}`} 
            alt="ondwariobiko monogram" 
            width={64} 
            height={64} 
            className={`nav-logo object-contain ${open ? "rounded-full" : ""} ${scrolled && !open ? "size-9 sm:size-11 md:size-12" : "size-10 sm:size-12 md:size-14"}`} 
            style={{ transition: "all 0.6s" }} 
          />
          <span className={`hidden sm:block font-display text-xl sm:text-2xl uppercase tracking-tight leading-none ${open ? "text-black" : "text-ink"}`}>
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
            className="relative z-[60] flex items-center gap-2 sm:gap-3 group cursor-pointer"
          >
            <span className={`font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] transition-colors ${open ? "text-black" : "text-ink group-hover:text-accent-ink"}`}>
              {open ? "Close" : "Menu"}
            </span>
            <span className={`size-11 sm:size-14 rounded-full grid place-items-center transition-all duration-500 ${open ? "bg-black rotate-90" : "bg-neon group-hover:scale-110"}`}>
              <span className="relative block w-4 sm:w-5 h-3">
                <span className={`absolute left-0 h-0.5 w-4 sm:w-5 transition-all duration-500 ${open ? "top-1.5 rotate-45 bg-neon" : "top-0 bg-black"}`} />
                <span className={`absolute left-0 h-0.5 transition-all duration-500 ${open ? "top-1.5 w-4 sm:w-5 -rotate-45 bg-neon" : "top-2.5 w-2.5 sm:w-3 bg-black"}`} />
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
          <div className="flex-1 flex flex-col justify-center px-4 sm:px-10 md:px-16 pt-24 sm:pt-32 pb-8 sm:pb-12">
            <ul>
              {navLinks.map((l, i) => (
                <li key={l.label} className="overflow-hidden border-b border-black/15">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-3 sm:gap-6 py-2.5 sm:py-3 md:py-4 animate-rise"
                    style={{ animationDelay: `${200 + i * 70}ms` }}
                  >
                    <span className="font-mono text-xs sm:text-sm w-7 sm:w-10">0{i + 1}</span>
                    <span className="font-display uppercase tracking-tighter leading-[0.9] text-[clamp(2.1rem,7.5vw,7.5rem)] transition-all duration-500 group-hover:translate-x-6 group-hover:italic break-words">
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
          <div className="shrink-0 overflow-hidden bg-black text-accent-ink py-3 sm:py-4">
            <div className="flex w-max animate-marquee font-display uppercase text-lg sm:text-2xl tracking-tight whitespace-nowrap">
              {Array.from({ length: 2 }).map((_, k) => (
                <span key={k} className="flex">
                  {["Logo Design", "Brand Identity", "UI/UX", "Front-end", "Art Direction", "Remote Worldwide"].map((w) => (
                    <span key={w} className="px-6 sm:px-8">{w} •</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8 FULL-WIDTH THUMBNAILS (PURE VISUAL - PROJECT NAME REVEALED ON HOVER/TOUCH) */}
      <main id="work" className="w-full flex flex-col pt-16 sm:pt-24">
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

            {/* Dark Bottom Gradient that smoothly fades in on hover/touch to ensure text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Project Name and Category - ONLY Appears on Hover / Touch */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 lg:p-14 z-10 flex flex-col items-start opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
              <h2 className="text-2xl sm:text-4xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase group-hover:text-accent-ink transition-colors duration-500 drop-shadow-xl leading-tight">
                {project.title}
              </h2>
              <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-sm font-mono tracking-widest text-accent-ink uppercase font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                {project.category}
              </div>
            </div>

            {/* Razor-thin Neon Sweep Line along the bottom edge */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-neon group-hover:w-full transition-all duration-700 ease-out pointer-events-none" />
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
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0 pr-2">
              <span className="text-white uppercase font-bold text-sm sm:text-base font-display truncate max-w-[200px] sm:max-w-none">{activeImage.title}</span>
              <span className="text-neutral-500 hidden sm:inline">•</span>
              <span className="text-accent-ink text-[11px] sm:text-xs">{activeImage.category}</span>
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

      {/* LOGO VIDEO ANIMATION SECTION */}
      <section className="w-full overflow-hidden bg-black h-[220px] sm:h-[320px] md:h-[420px] lg:h-[480px] relative border-0 outline-none -my-px" aria-label="John Obiko logo animation">
        <video
          ref={videoRef}
          src={`${base}images/logo-animation.webm`}
          poster={`${base}images/logo-animation-poster.webp`}
          className="block w-full h-full object-cover pointer-events-none border-0 outline-none"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      </section>

      {/* THE FOOTER SECTION AFTER THE VIDEO (MATCHING ondwariobiko-portfolio-website) */}
      <footer id="contact" className="px-4 sm:px-6 md:px-8 pt-16 sm:pt-24 md:pt-32 pb-24 md:pb-24 border-t border-ink/10 bg-black text-ink">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50 mb-4 sm:mb-6">Have a vision?</p>
          <a 
            href="mailto:obi22004@byui.edu" 
            className="group block font-display uppercase tracking-tighter leading-[0.85] text-[clamp(2.3rem,10.5vw,10rem)] break-words"
          >
            <span className="block transition-all duration-500 group-hover:text-accent-ink group-hover:translate-x-4">
              Let's build
            </span>
            <span className="block text-stroke group-hover:text-accent-ink transition-all duration-700 group-hover:translate-x-10">
              something •
            </span>
          </a>

          <div className="mt-10 border-t border-ink/15 pt-6 font-mono text-xs uppercase tracking-widest">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-ink/80">
              <span>© {new Date().getFullYear()} ondwariobiko. All Rights Reserved.</span>
              <div className="flex gap-6 text-ink">
                <a href="#terms" className="hover:text-accent-ink transition-colors">Terms</a>
                <a href="#privacy" className="hover:text-accent-ink transition-colors">Privacy</a>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-3 text-ink/50">
              <a href="mailto:obi22004@byui.edu" className="hover:text-accent-ink transition-colors">Email</a>
              <a href="https://wa.me/254702255575" target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink transition-colors">WhatsApp</a>
              <a href="https://www.linkedin.com/in/ondwariobiko/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink transition-colors">LinkedIn</a>
              <a href="https://www.behance.net/johnobiko" target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink transition-colors">Behance</a>
              <a href="#faq" className="hover:text-accent-ink transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING BACK TO TOP BUTTON (BOTTOM-LEFT, MATCHING ondwariobiko-portfolio-website) */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        aria-hidden={!backToTopVisible}
        tabIndex={backToTopVisible ? 0 : -1}
        className={`back-to-top fixed bottom-4 left-3 sm:left-6 md:bottom-6 md:left-6 z-50 flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface/60 backdrop-blur-md size-10 sm:size-auto sm:px-3 sm:py-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink transition-all duration-500 hover:border-neon hover:text-accent-ink cursor-pointer ${
          backToTopVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <span className="grid size-5 sm:size-6 place-items-center rounded-full border border-ink/20 leading-none transition-transform duration-500 group-hover:rotate-0 -rotate-45">
          ↑
        </span>
        <span className="hidden sm:inline">Top</span>
      </button>

      {/* FLOATING CONSULT / START A PROJECT PILL (BOTTOM-RIGHT, MATCHING ondwariobiko-portfolio-website) */}
      <a 
        href="mailto:obi22004@byui.edu" 
        aria-label="Start a project" 
        className="floating-consult group fixed bottom-4 right-3 sm:right-6 md:bottom-6 md:right-6 z-50 flex items-center gap-2 sm:gap-3 rounded-full bg-neon text-black pl-3 sm:pl-4 pr-1 sm:pr-1.5 py-1 sm:py-1.5 shadow-sm transition-transform duration-300 hover:scale-105"
      >
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">Start a project</span>
        <span className="size-7 sm:size-9 rounded-full bg-black text-accent-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45 text-xs sm:text-base">
          ↗
        </span>
      </a>

    </div>
  );
}
