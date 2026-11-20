import React, { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  base: string;
  onComplete?: () => void;
}

export function Preloader({ base, onComplete }: PreloaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let finishTimer: number | undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let startTimer: number;

    const finish = () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(finishTimer);
      setIsExiting(true);
      finishTimer = window.setTimeout(() => {
        document.body.style.overflow = originalOverflow;
        onCompleteRef.current?.();
      }, reducedMotion ? 40 : 260);
    };

    startTimer = window.setTimeout(finish, reducedMotion ? 80 : 620);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === ' ') finish();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      aria-label="Loading portfolio"
      aria-busy="true"
      className={`fixed inset-0 z-[9999] grid place-items-center overflow-hidden bg-black transition-opacity duration-300 ${isExiting ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(217,253,23,0.075),transparent_38%)]" />
      <div className={`relative flex w-[min(82vw,20rem)] flex-col items-center transition-transform duration-300 ${isExiting ? '-translate-y-2' : 'translate-y-0'}`}>
        <div className="relative mb-7 grid size-20 place-items-center rounded-full border border-white/15 p-3 sm:size-24">
          <span aria-hidden="true" className="absolute inset-[-1px] rounded-full border border-transparent border-t-neon animate-spin-slow" />
          <img src={`${base}images/logowhite.webp`} alt="Ondwari Obiko" width={80} height={80} className="size-12 object-contain sm:size-14" />
          <span aria-hidden="true" className="absolute -right-1 top-3 size-2 rounded-full bg-neon shadow-[0_0_14px_rgba(217,253,23,0.7)]" />
        </div>

        <p className="font-display text-lg font-semibold uppercase tracking-[0.16em] text-white sm:text-xl">Ondwari Obiko</p>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.26em] text-white/45 sm:text-[10px]">Brand · Digital · Experience</p>

        <div role="progressbar" aria-label="Loading portfolio" aria-valuemin={0} aria-valuemax={100} className="mt-8 h-px w-full overflow-hidden bg-white/15">
          <span className="preloader-progress block h-full w-full origin-left bg-neon" />
        </div>
      </div>
    </div>
  );
}
