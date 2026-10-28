import React, { useRef, useEffect } from 'react';
import { PageRoute } from '../types';

interface FooterProps {
  base: string;
  currentRoute: PageRoute;
  backToTopVisible: boolean;
  scrollToTop: () => void;
  onNavigate: (route: PageRoute) => void;
  onOpenLegal: (type: 'terms' | 'privacy') => void;
}

export function Footer({
  base,
  currentRoute,
  backToTopVisible,
  scrollToTop,
  onNavigate,
  onOpenLegal,
}: FooterProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <>
      {/* LOGO VIDEO ANIMATION SECTION */}
      <section className="w-full overflow-hidden bg-black h-[220px] sm:h-[320px] md:h-[420px] lg:h-[480px] relative border-0 outline-none -my-px" aria-label="Logo animation">
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

      {/* THE FOOTER SECTION AFTER THE VIDEO */}
      <footer id="contact-footer" className="px-5 md:px-8 pt-20 md:pt-32 pb-28 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">Have a vision?</p>
          <a 
            href="#/contact" 
            onClick={(e) => {
              e.preventDefault();
              if (currentRoute === 'contact') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                onNavigate('contact');
              }
            }}
            className="group block font-display uppercase tracking-tighter leading-[0.85] text-[clamp(2.5rem,11vw,10rem)] cursor-pointer"
          >
            <span className="block transition-all duration-500 group-hover:text-accent-ink group-hover:translate-x-4">
              Let's build
            </span>
            <span className="block text-stroke group-hover:text-accent-ink transition-all duration-700 group-hover:translate-x-10">
              something ✺
            </span>
          </a>

          <div className="mt-10 border-t border-ink/15 pt-6 font-mono text-xs uppercase tracking-widest">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-ink/80">
              <span>© 2026 ondwariobiko. All Rights Reserved.</span>
              <div className="flex gap-6 text-ink">
                <button 
                  onClick={() => onOpenLegal('terms')} 
                  className="hover:text-accent-ink transition-colors cursor-pointer"
                >
                  Terms
                </button>
                <button 
                  onClick={() => onOpenLegal('privacy')} 
                  className="hover:text-accent-ink transition-colors cursor-pointer"
                >
                  Privacy
                </button>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-ink/50">
              <a href="mailto:ondwariobiko@gmail.com" className="hover:text-accent-ink transition-colors">Email</a>
              <a href="https://wa.me/254702255575" target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink transition-colors">WhatsApp</a>
              <a href="https://www.linkedin.com/in/ondwariobiko/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink transition-colors">LinkedIn</a>
              <a href="https://www.behance.net/johnobiko" target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink transition-colors">Behance</a>
              <button 
                onClick={() => {
                  onNavigate('about');
                  setTimeout(() => {
                    const el = document.getElementById('faq-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} 
                className="hover:text-accent-ink transition-colors cursor-pointer"
              >
                FAQ
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING BACK TO TOP BUTTON (BOTTOM-LEFT) */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        aria-hidden={!backToTopVisible}
        tabIndex={backToTopVisible ? 0 : -1}
        className={`back-to-top min-h-11 min-w-11 fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex items-center gap-2 rounded-full border border-ink/15 bg-surface/60 backdrop-blur-md px-3 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink transition-all duration-500 hover:border-neon hover:text-accent-ink cursor-pointer ${
          backToTopVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <span className="grid size-6 place-items-center rounded-full border border-ink/20 leading-none transition-transform duration-500 group-hover:rotate-0 -rotate-45">
          ↑
        </span>
        <span className="hidden sm:inline">Top</span>
      </button>

      {/* FLOATING CONSULT / START A PROJECT PILL (BOTTOM-RIGHT) */}
      {currentRoute !== 'contact' && currentRoute !== 'consultation' && (
        <a 
          href="#/contact" 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('contact');
          }}
          aria-label="Start a project" 
          className="floating-consult group fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 sm:gap-3 rounded-full bg-neon text-black pl-3 sm:pl-4 pr-1.5 py-1.5 shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer font-bold"
        >
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">Start a project</span>
          <span className="size-9 rounded-full bg-black text-accent-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45">
            ↗
          </span>
        </a>
      )}
    </>
  );
}
