import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  base: string;
  onComplete?: () => void;
}

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

      {/* SIMPLE CENTERED LOADER */}
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center p-6 transition-all duration-500 ${
          isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="mb-8 flex items-center justify-center">
            <img
              src={`${base}images/logowhite.webp`}
              alt="Ondwari Obiko Monogram"
              width={80}
              height={80}
              className="size-14 sm:size-16 object-contain"
            />
          </div>

          <div className="flex items-baseline justify-center">
            <span className="font-display font-semibold text-5xl sm:text-6xl tracking-tight text-white tabular-nums leading-none">
              {progress.toString().padStart(2, '0')}
            </span>
            <span className="font-display text-xl sm:text-2xl text-neon ml-1">
              %
            </span>
          </div>

          <div className="mt-4 h-px w-40 sm:w-52 overflow-hidden bg-white/15">
            <div
              className="h-full bg-neon transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
