import React from 'react';
import { PageRoute } from '../types';

interface NavMenuProps {
  currentRoute: PageRoute;
  projectSlug?: string;
  onNavigate: (route: PageRoute) => void;
  onClose: () => void;
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

const navLinks: { id: PageRoute; label: string; hint: string }[] = [
  { id: "work", label: "Work", hint: "Selected projects" },
  { id: "about", label: "About", hint: "Who I am & what I craft" },
  { id: "contact", label: "Contact", hint: "Start a project" },
  { id: "consultation", label: "Free Call", hint: "1 hour, on me" },
];

export function NavMenu({ currentRoute, projectSlug = '', onNavigate, onClose }: NavMenuProps) {
  const activeProjectName =
    currentRoute === 'project' && projectSlug
      ? projectTitles[projectSlug] || projectSlug.replaceAll('-', ' ')
      : '';

  return (
    <div 
      className="fixed inset-0 z-[55] bg-neon-gradient text-black animate-menu-in flex flex-col overflow-y-auto md:overflow-hidden overscroll-contain" 
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex-1 flex flex-col justify-center px-5 md:px-16 pt-24 sm:pt-28 md:pt-20 pb-10 md:pb-6 min-h-0">
        <ul className="max-w-[1400px] w-full mx-auto my-auto">
          {navLinks.map((l, i) => {
            const isProjectWork = currentRoute === 'project' && l.id === 'work';
            const active = currentRoute === l.id || isProjectWork;
            const hintText = isProjectWork && activeProjectName ? activeProjectName : l.hint;

            return (
              <li key={l.label} className="overflow-hidden border-b border-black/15">
                <a
                  href={`#/${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(l.id);
                    onClose();
                    if (l.id === "work") {
                      window.setTimeout(() => {
                        const showcase = document.getElementById("pelican-social");
                        if (!showcase) return;
                        const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
                        const top = showcase.getBoundingClientRect().top + window.scrollY - headerHeight;
                        window.scrollTo({ top, behavior: "smooth" });
                      }, 160);
                    }
                  }}
                  className="group flex items-baseline gap-4 sm:gap-6 py-2 md:py-2.5 lg:py-3 animate-rise cursor-pointer"
                  style={{ animationDelay: `${180 + i * 65}ms` }}
                >
                  <span className="font-mono text-xs md:text-sm w-8 sm:w-10">0{i + 1}</span>
                  <span
                    className={`transition-all duration-500 group-hover:translate-x-6 ${
                      active
                        ? "font-editorial font-normal italic normal-case tracking-normal leading-[0.88] text-[clamp(2.8rem,8.5vw,7.2rem)] opacity-75"
                        : "font-display font-extrabold uppercase tracking-tighter leading-[0.9] text-[clamp(2.2rem,7vw,6rem)] group-hover:italic"
                    }`}
                  >
                    {l.label}
                  </span>
                  <span
                    className={`ml-auto font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all duration-500 ${
                      isProjectWork && activeProjectName
                        ? "block opacity-85 translate-x-0 font-semibold text-right max-w-[45vw] truncate"
                        : "hidden md:block opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 font-medium"
                    }`}
                  >
                    {hintText} →
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Marquee Ticker at the Bottom of Menu */}
      <div className="shrink-0 overflow-hidden bg-black text-accent-ink py-3.5 md:py-4">
        <div className="flex w-max animate-marquee font-display uppercase text-2xl tracking-tight whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex">
              {["Logo Design", "Brand Identity", "UI/UX", "Front-end", "Art Direction", "Remote Worldwide"].map((w) => (
                <span key={w} className="px-8">{w} ✺</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
