import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  base: string;
  onComplete?: () => void;
}

const STATUS_MESSAGES = [
  'SYSTEM: BOOTING KINETIC ENGINE',
  'ASSETS: RESOLVING DISPLAY MATRIX',
  'TYPOGRAPHY: SYNE & SPACE GROTESK MOUNTED',
  'DESIGN SYSTEM: BRUTALIST GRID SYNCED',
  'ONDWARIOBIKO // ED. 2027 ONLINE',
];

export function Preloader({ base, onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Counter animation logic
  useEffect(() => {
    // Prevent scrolling while preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let current = 0;
    const startTime = performance.now();
    const duration = 1600; // Snappy 1.6s load

    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      
      // Custom easing curve: brisk start, tiny plateau around 85%, then quick surge to 100
      let eased = t;
      if (t < 0.6) {
        eased = (t / 0.6) * 0.75;
      } else if (t < 0.85) {
        eased = 0.75 + ((t - 0.6) / 0.25) * 0.12;
      } else {
        eased = 0.87 + ((t - 0.85) / 0.15) * 0.13;
      }

      current = Math.min(100, Math.floor(eased * 100));
      setProgress(current);

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Brief pause at 100% before opening the curtains
        setTimeout(() => {
          setIsExiting(true);
          // Wait for curtain transition to finish before unmounting
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = originalOverflow;
            if (onComplete) onComplete();
          }, 700);
        }, 220);
      }
    };

    frameId = requestAnimationFrame(tick);

    // Allow user to press ESC or Space to skip instantly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        setProgress(100);
        setIsExiting(true);
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = originalOverflow;
          if (onComplete) onComplete();
        }, 300);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (isDone) return null;

  // Determine which status message to display
  const statusIndex = Math.min(
    STATUS_MESSAGES.length - 1,
    Math.floor((progress / 100) * STATUS_MESSAGES.length)
  );

  return (
    <div
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[9999] select-none pointer-events-auto overflow-hidden"
    >
      {/* TOP CURTAIN SLAB */}
      <div
        className={`absolute top-0 inset-x-0 h-1/2 bg-black border-b border-white/10 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] origin-top ${
          isExiting ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* BOTTOM CURTAIN SLAB */}
      <div
        className={`absolute bottom-0 inset-x-0 h-1/2 bg-black border-t border-white/10 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] origin-bottom ${
          isExiting ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* CENTRAL CONTENT CONTAINER */}
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center p-6 transition-all duration-500 ${
          isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* AMBIENT NEON GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] bg-neon/10 rounded-full blur-[130px] pointer-events-none" />

        {/* TECHNICAL BACKGROUND GRID LINES */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* CENTER VISUAL: LOGO & TEXT ONLY BELOW LOGO */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          {/* LOGO WITH GLOWING ORBIT */}
          <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
            {/* Rotating dashed orbit */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-neon/30 animate-spin-slow pointer-events-none" />
            
            {/* Glow ring */}
            <div className="absolute -inset-1 rounded-full bg-neon/20 blur-md pointer-events-none" />
            
            <img
              src={`${base}images/logowhite.webp`}
              alt="Ondwari Obiko Monogram"
              width={80}
              height={80}
              className="relative size-16 sm:size-20 md:size-24 object-contain drop-shadow-[0_0_28px_rgba(217,253,23,0.35)]"
            />
          </div>

          {/* BELOW THE LOGO: LARGE KINETIC COUNTER */}
          <div className="flex items-baseline justify-center">
            <span className="font-display font-black text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tighter text-white tabular-nums leading-none">
              {progress.toString().padStart(2, '0')}
            </span>
            <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-neon ml-2">
              %
            </span>
          </div>

          {/* DYNAMIC SYSTEM STATUS TICKER BELOW THE LOGO */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400">
            <span className="text-neon">[SYS]</span>
            <span className="inline-block transition-all duration-150">
              {STATUS_MESSAGES[statusIndex]}
            </span>
          </div>
        </div>

        {/* BOTTOM VISUAL PROGRESS LINE (PURELY VISUAL, NO TEXT) */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-neon transition-all duration-100 ease-out shadow-[0_0_14px_#d9fd17]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
