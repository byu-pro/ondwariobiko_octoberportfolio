import React from 'react';
import { PageRoute } from '../types';

interface NavMenuProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onClose: () => void;
}

const navLinks: { id: PageRoute; label: string; hint: string }[] = [
  { id: "work", label: "Work", hint: "Selected projects" },
  { id: "about", label: "About", hint: "Who I am & what I craft" },
  { id: "contact", label: "Contact", hint: "Start a project" },
  { id: "consultation", label: "Free Call", hint: "1 hour, on me" },
];

export function NavMenu({ currentRoute, onNavigate, onClose }: NavMenuProps) {
  return (
    <div 
      className="fixed inset-0 z-[55] bg-neon text-black animate-menu-in flex flex-col overflow-y-auto overscroll-contain" 
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex-1 flex flex-col justify-center px-5 md:px-16 pt-32 pb-12">
        <ul className="max-w-[1400px] w-full mx-auto">
          {navLinks.map((l, i) => {
            const active = currentRoute === l.id;
            return (
              <li key={l.label} className="overflow-hidden border-b border-black/15">
                <a
                  href={`#/${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(l.id);
                    onClose();
                  }}
                  className="group flex items-baseline gap-4 sm:gap-6 py-2 md:py-3 animate-rise cursor-pointer"
                  style={{ animationDelay: `${180 + i * 65}ms` }}
                >
                  <span className="font-mono text-xs md:text-sm w-8 sm:w-10">0{i + 1}</span>
                  <span className={`font-display uppercase tracking-tighter leading-[0.9] text-[clamp(2.4rem,8.5vw,7.5rem)] transition-all duration-500 group-hover:translate-x-6 group-hover:italic ${active ? "text-stroke" : ""}`}>
                    {l.label}
                  </span>
                  <span className="ml-auto hidden md:block font-mono text-xs uppercase tracking-[0.25em] opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 font-medium">
                    {l.hint} →
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Marquee Ticker at the Bottom of Menu */}
      <div className="shrink-0 overflow-hidden bg-black text-accent-ink py-4">
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
