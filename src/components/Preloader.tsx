import React, { useEffect, useRef, useState } from 'react';
import { PageRoute } from '../types';

interface PreloaderProps {
  base: string;
  currentRoute?: PageRoute;
  projectSlug?: string;
  onComplete?: () => void;
}

const chapters: Record<string, string> = {
  Home: '00',
  work: '01',
  services: '02',
  about: '03',
  contact: '04',
  consultation: '05',
};

const projectTitles: Record<string, string> = {
  'pelican-social': 'Pelican Social',
  'ikon-trailers': 'IKON Trailers',
  'iron-acre': 'Iron Acre Land Co',
  'friends-of-unionville': 'Friends of Unionville',
  'sound-curves': 'SoundCurves',
  'moods-and-nerds': 'Moods N Meds',
  'yellow-dot-energy': 'Yellow Dot Energy',
  'green-essential': 'Green Essentials',
  'lewis-park': 'Lewis Park Pickleball',
};

export function Preloader({ base, currentRoute = 'work', projectSlug = '', onComplete }: PreloaderProps) {
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) {
      setDone(true);
      document.body.style.overflow = originalOverflow;
      onCompleteRef.current?.();
      return;
    }

    const timer = window.setTimeout(() => {
      setDone(true);
      document.body.style.overflow = originalOverflow;
      onCompleteRef.current?.();
    }, 1000);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === ' ' || event.key === 'Tab') {
        setDone(true);
        window.clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
        onCompleteRef.current?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (done) return null;

  let label = 'Home';
  let chapter = '00';

  if (currentRoute === 'project' && projectSlug) {
    label = projectTitles[projectSlug] || projectSlug.replaceAll('-', ' ');
    chapter = '↗';
  } else {
    const hash = window.location.hash.toLowerCase();
    if (currentRoute === 'about' && hash.includes('services')) {
      label = 'services';
      chapter = chapters['services'] || '02';
    } else if (currentRoute === 'work') {
      label = 'Home';
      chapter = chapters['Home'] || '00';
    } else {
      label = currentRoute;
      chapter = chapters[currentRoute] || '↗';
    }
  }

  return (
    <div
      aria-label="Loading portfolio"
      aria-busy="true"
      className="monogram-passage"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="monogram-passage__aperture" />
      <div className="monogram-passage__art">
        <img
          src={`${base}images/logowhite.webp`}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="monogram-passage__orbit" />
      <div className="monogram-passage__caption">
        <span className="monogram-passage__index">{chapter}</span>
        <span className="monogram-passage__rule" />
        <span className="monogram-passage__destination">{label}</span>
      </div>
      <span className="monogram-passage__edition">ONDWARIOBIKO / SELECTED PERSPECTIVES</span>
    </div>
  );
}
