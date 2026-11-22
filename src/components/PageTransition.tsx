import React, { useEffect, useRef, useState } from 'react';
import { PageRoute } from '../types';

interface PageTransitionProps {
  base: string;
  currentRoute: PageRoute;
  projectSlug?: string;
}

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

/** The monogram's circular geometry opens into the next page. */
export function PageTransition({ base, currentRoute, projectSlug }: PageTransitionProps) {
  const currentKey = currentRoute === 'project' ? `project/${projectSlug}` : currentRoute;
  const previousKey = useRef(currentKey);
  const isFirstMount = useRef(true);
  const [transition, setTransition] = useState<{ key: string; label: string } | null>(null);

  useEffect(() => {
    // Avoid double preloader on initial page load (the Preloader component handles first paint)
    if (isFirstMount.current) {
      isFirstMount.current = false;
      previousKey.current = currentKey;
      return;
    }

    if (previousKey.current === currentKey) return;
    previousKey.current = currentKey;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTransition(null);
      return;
    }

    let label = 'Home';

    if (currentRoute === 'project' && projectSlug) {
      label = projectTitles[projectSlug] || projectSlug.replaceAll('-', ' ');
    } else {
      const hash = window.location.hash.toLowerCase();
      if (currentRoute === 'about' && hash.includes('services')) {
        label = 'services';
      } else if (currentRoute === 'work') {
        label = 'work';
      } else {
        label = currentRoute;
      }
    }

    setTransition({ key: currentKey, label });
    const timer = window.setTimeout(() => setTransition(null), 1000);
    return () => window.clearTimeout(timer);
  }, [currentKey, currentRoute, projectSlug]);

  if (!transition) return null;

  return (
    <div key={transition.key} className="monogram-passage" aria-hidden="true">
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
        <span className="monogram-passage__destination">{transition.label}</span>
      </div>
      <span className="monogram-passage__edition">ONDWARIOBIKO / SELECTED PERSPECTIVES</span>
    </div>
  );
}
