import React, { useEffect, useState, useRef, useCallback } from 'react';

interface GlitchTextProps {
  text: string;
  variant?: 'dark' | 'light';
  className?: string;
  delayMs?: number;
  intervalMs?: number;
}

const GLITCH_GLYPHS = '█▓░/\\X01#%&Δ≠≡+';

function scrambleText(source: string, intensity: number): string {
  return source
    .split('')
    .map((ch) => {
      if (ch === ' ' || ch === "'" || ch === '’' || ch === '.') return ch;
      if (Math.random() < intensity) {
        return GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
      }
      return ch;
    })
    .join('');
}

export function GlitchText({
  text,
  variant = 'dark',
  className = '',
  delayMs = 0,
  intervalMs = 5400,
}: GlitchTextProps) {
  const [burstKey, setBurstKey] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [scrambleA, setScrambleA] = useState(text);
  const [scrambleB, setScrambleB] = useState(text);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const triggerBurst = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    clearTimers();
    setIsGlitching(true);
    setBurstKey((k) => k + 1);
    setScrambleA(scrambleText(text, 0.32));
    setScrambleB(scrambleText(text, 0.25));

    const steps: Array<[number, number, number]> = [
      [75, 0.52, 0.44],
      [155, 0.38, 0.5],
      [240, 0.26, 0.3],
      [330, 0.12, 0.14],
    ];

    steps.forEach(([ms, intA, intB]) => {
      const id = window.setTimeout(() => {
        setScrambleA(scrambleText(text, intA));
        setScrambleB(scrambleText(text, intB));
      }, ms);
      timersRef.current.push(id);
    });

    const endId = window.setTimeout(() => {
      setIsGlitching(false);
      setScrambleA(text);
      setScrambleB(text);
    }, 450);
    timersRef.current.push(endId);
  }, [text, clearTimers]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let loopId: number | undefined;
    const startId = window.setTimeout(() => {
      triggerBurst();
      loopId = window.setInterval(() => {
        triggerBurst();
      }, intervalMs);
    }, 2200 + delayMs);

    return () => {
      window.clearTimeout(startId);
      if (loopId !== undefined) window.clearInterval(loopId);
      clearTimers();
    };
  }, [delayMs, intervalMs, triggerBurst, clearTimers]);

  const isLight = variant === 'light';

  return (
    <span
      onMouseEnter={() => {
        if (!isGlitching && window.innerWidth >= 768) triggerBurst();
      }}
      className={`glitch-root ${isGlitching ? 'is-glitching' : ''}`}
    >
      {/* Base text keeps exact layout box width/height */}
      <span key={`base-${burstKey}`} className={`glitch-base inline-block ${className}`}>
        {text}
      </span>

      {/* Stepped digital tear overlays (only mounted during the 450ms burst) */}
      {isGlitching && (
        <>
          <span
            key={`a-${burstKey}`}
            aria-hidden="true"
            className={`glitch-layer ${isLight ? 'glitch-layer--a-light' : 'glitch-layer--a-dark'}`}
          >
            {scrambleA}
          </span>
          <span
            key={`b-${burstKey}`}
            aria-hidden="true"
            className={`glitch-layer ${isLight ? 'glitch-layer--b-light' : 'glitch-layer--b-dark'}`}
          >
            {scrambleB}
          </span>
          <span
            key={`bar-${burstKey}`}
            aria-hidden="true"
            className={`glitch-scanbar ${isLight ? 'glitch-scanbar--light' : 'glitch-scanbar--dark'}`}
          />
          <span
            key={`blk-${burstKey}`}
            aria-hidden="true"
            className={`glitch-block-flash ${isLight ? 'bg-black/90' : 'bg-neon/90'}`}
          />
        </>
      )}
    </span>
  );
}
