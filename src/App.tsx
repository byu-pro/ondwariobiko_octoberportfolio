import React, { useState, useEffect, useRef } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { NavMenu } from './components/NavMenu';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { WorkPage } from './pages/WorkPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ConsultationPage } from './pages/ConsultationPage';

const base = import.meta.env.BASE_URL.endsWith('/') 
  ? import.meta.env.BASE_URL 
  : `${import.meta.env.BASE_URL}/`;

function getRouteFromHash(): PageRoute {
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('about') || hash.includes('services')) return 'about';
  if (hash.includes('contact')) return 'contact';
  if (hash.includes('consultation') || hash.includes('free-call')) return 'consultation';
  return 'work';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getRouteFromHash);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  // Sync route on hashchange
  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = getRouteFromHash();
      setCurrentRoute(nextRoute);
      
      // If hash specifically targeted #services, scroll down smoothly after mount
      if (window.location.hash.includes('services')) {
        setTimeout(() => {
          const el = document.getElementById('services-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Update document title dynamically based on active page
  useEffect(() => {
    switch (currentRoute) {
      case 'about':
        document.title = "About & Services | John Obiko — Graphic Designer & Web Developer";
        break;
      case 'contact':
        document.title = "Contact | John Obiko — Start a Project";
        break;
      case 'consultation':
        document.title = "Free 1-Hour Consultation | Book with John Obiko";
        break;
      case 'work':
      default:
        document.title = "Ondwari Obiko | Brand Designer, UI/UX Designer & Frontend Developer";
        break;
    }
  }, [currentRoute]);

  // Keyboard accessibility
  useEffect(() => {
    document.body.style.overflow = (open || legalModal !== null) ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setLegalModal(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, legalModal]);

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

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon selection:text-black flex flex-col justify-between">
      
      {/* FIXED HEADER WITH BRAND TYPOGRAPHY & BLURRED MOBILE GLASS */}
      <Header
        base={base}
        open={open}
        setOpen={setOpen}
        scrolled={scrolled}
        onNavigate={navigateTo}
      />

      {/* FULL-SCREEN EXPANDING CIRCLE NAVIGATION MENU */}
      {open && (
        <NavMenu
          currentRoute={currentRoute}
          onNavigate={navigateTo}
          onClose={() => setOpen(false)}
        />
      )}

      {/* CURRENT PAGE VIEW */}
      <div className="flex-1 w-full">
        {currentRoute === 'work' && <WorkPage base={base} />}
        {currentRoute === 'about' && <AboutPage base={base} onNavigate={navigateTo} />}
        {currentRoute === 'contact' && <ContactPage />}
        {currentRoute === 'consultation' && <ConsultationPage />}
      </div>

      {/* FOOTER SECTION WITH VIDEO ANIMATION & DIRECT CHANNELS */}
      <Footer
        base={base}
        currentRoute={currentRoute}
        backToTopVisible={backToTopVisible}
        scrollToTop={scrollToTop}
        onNavigate={navigateTo}
        onOpenLegal={setLegalModal}
      />

      {/* LEGAL MODAL (TERMS / PRIVACY) */}
      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
      />

    </div>
  );
}
