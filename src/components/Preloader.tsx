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
      className="fixed inset-0 z-[9999] select-none pointer-events-auto"
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
        className={`relative w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-12 transition-all duration-500 ${
          isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* AMBIENT NEON GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-neon/10 rounded-full blur-[120px] pointer-events-none" />

        {/* TECHNICAL BACKGROUND GRID LINES */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* HEADER BAR */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-white/60">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
            </span>
            <span className="text-white font-medium">ONDWARIOBIKO // STUDIO</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white/40">
            <span>01°17′S 36°49′E</span>
            <span>•</span>
            <span className="text-neon/80">EDITION 2027</span>
          </div>
        </div>

        {/* CENTER MONOGRAM & COUNTER DISPLAY */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto py-8">
          {/* LOGO WITH GLOWING ORBIT */}
          <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
            {/* Rotating dashed orbit */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-neon/30 animate-spin-slow pointer-events-none" />
            
            {/* Glow ring */}
            <div className="absolute -inset-1 rounded-full bg-neon/20 blur-md pointer-events-none" />
            
            <img
              src={`${base}images/logowhite.webp`}
              alt="Ondwari Obiko Monogram"
              width={72}
              height={72}
              className="relative size-14 sm:size-16 md:size-20 object-contain drop-shadow-[0_0_24px_rgba(217,253,23,0.35)]"
            />
          </div>

          {/* LARGE KINETIC COUNTER */}
          <div className="flex items-baseline justify-center">
            <span className="font-display font-black text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tighter text-white tabular-nums leading-none">
              {progress.toString().padStart(2, '0')}
            </span>
            <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-neon ml-2">
              %
            </span>
          </div>

          {/* DYNAMIC SYSTEM STATUS TICKER */}
          <div className="mt-4 sm:mt-6 flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400">
            <span className="text-neon">[SYS]</span>
            <span className="inline-block transition-all duration-150">
              {STATUS_MESSAGES[statusIndex]}
            </span>
          </div>
        </div>

        {/* FOOTER BAR WITH PROGRESS TRACK */}
        <div className="relative z-10 w-full space-y-3">
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/50">
            <div className="flex items-center gap-2">
              <span className="text-neon">INITIALIZING</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="hidden sm:inline text-white/50">BRAND • UI/UX • CODE</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/40 hidden md:inline">PRESS ESC TO SKIP</span>
              <span className="text-white font-semibold">[{progress}%]</span>
            </div>
          </div>

          {/* ULTRA-PRECISION PROGRESS BAR */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-neon transition-all duration-100 ease-out shadow-[0_0_12px_#d9fd17]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
