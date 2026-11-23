import React, { useState, useEffect, useRef } from 'react';
import { AboutHero } from '../components/AboutHero';
import { PageRoute } from '../types';
import { responsiveImageSrcSet } from '../utils/images';

interface AboutPageProps {
  base: string;
  onNavigate: (route: PageRoute) => void;
}

const pillars = [
  {
    n: "01",
    title: "Logo & Brand Identity (Core Specialty)",
    body: "Custom hand-drawn logos, distinctive marks, and cohesive visual identity systems built to help businesses, organizations, and personal projects stand out with memorable authenticity.",
  },
  {
    n: "02",
    title: "UI/UX & Web Design",
    body: "Intuitive user experience flows and thoughtful interface design crafted to communicate value clearly and guide visitors toward meaningful action.",
  },
  {
    n: "03",
    title: "Front-End Development",
    body: "Clean, responsive websites built with modern front-end code and smooth animations — ensuring your brand looks and performs flawlessly across every screen size.",
  },
];

const markers = [
  { value: new Date().getFullYear() - 2016, label: "Years" },
  { value: 350, suffix: "+", label: "Projects" },
  { value: 3, label: "Disciplines" },
  { value: 5.0, decimals: 1, label: "Rating" },
  { value: 12, label: "Industries" },
];

const packages = [
  {
    n: "01",
    t: "Logo System",
    blurb: "Complete logo suite: primary, secondary, and standalone icon/favicon versions.",
    includes: [
      "3 custom initial concepts",
      "Primary, secondary & icon marks",
      "Vector AI, EPS, SVG + PNG delivery",
    ],
    ideal: "Personal projects, creative founders & startups",
  },
  {
    n: "02",
    t: "Brand Identity",
    blurb: "Full visual language: typography, color palette, logo suite, and usage rules.",
    includes: [
      "Complete Logo System included",
      "Color palette & typography pairing",
      "Comprehensive brand guidelines PDF",
    ],
    ideal: "Growing brands & mission-driven organizations",
  },
  {
    n: "03",
    t: "Mascot Design",
    blurb: "Signature illustrated characters with expressive poses and versatile vector artwork.",
    includes: [
      "Original character directions",
      "Multiple pose variations",
      "High-res vector & transparent exports",
    ],
    ideal: "Brands & creators wanting iconic personality",
  },
  {
    n: "04",
    t: "Web Design & Build",
    blurb: "Custom websites designed and coded from scratch — fast, responsive, and animated.",
    includes: [
      "Bespoke design, no templates",
      "Responsive code with smooth animations",
      "SEO & performance optimized",
    ],
    ideal: "Bespoke portfolios, web apps & brand sites",
  },
  {
    n: "05",
    t: "Brand Guidelines",
    blurb: "Usage documentation covering typography, clear space, color values, and assets.",
    includes: [
      "Logo placement & clear space rules",
      "Digital & print color specs",
      "Hand-off ready style guide PDF",
    ],
    ideal: "Teams & ventures seeking cohesive standards",
  },
  {
    n: "06",
    t: "Custom Collateral",
    blurb: "Labels, packaging, apparel graphics, stationery, and bespoke campaign artwork.",
    includes: [
      "Tailored deliverables to your brief",
      "Print-ready dieline & digital files",
      "Direct creative collaboration",
    ],
    ideal: "Merch, packaging, editorial & campaign rollouts",
  },
];

const addons = [
  "Business Card Design",
  "Social Media Kit",
  "Packaging Mockups",
  "Stationery Suite",
  "Favicon & App Icons",
  "Pitch Deck Design",
];

const guarantees = [
  { k: "Clear Rationale", v: "Every design direction is presented with the strategic thinking behind it." },
  { k: "Agreed Scope", v: "Transparent milestone quote approved before work starts. No surprises." },
  { k: "Source Files", v: "Full ownership of AI, EPS, SVG, and PNG files ready for any printer or developer." },
  { k: "Direct Partner", v: "1-on-1 collaboration via WhatsApp and email, with responsive support after launch." },
];

const skills = [
  { name: "Custom Logo Design", detail: "Original symbols and hand-drawn letterforms" },
  { name: "Brand Identity", detail: "Color palettes, typography systems & visual guides" },
  { name: "Mascot Illustration", detail: "Expressive vector characters with personality" },
  { name: "UI/UX Design", detail: "Clean, intuitive interfaces for web and mobile" },
  { name: "Front-end Development", detail: "Fast, responsive websites built cleanly in modern code" },
  { name: "Print & Packaging", detail: "Labels, boxes, apparel graphics & production files" },
];

const tools = [
  "Illustrator", "Photoshop", "Figma", "Framer", "Affinity", "Inkscape", "Canva",
  "VS Code", "After Effects", "InDesign", "React", "TypeScript", "Tailwind CSS", "GitHub"
];

const serviceFaqs = [
  {
    q: "How long does a project take?",
    a: "Timelines depend on the project scope. Most logo and identity projects take 2–3 weeks, while websites typically take 3–5 weeks. We agree on clear milestones before starting.",
  },
  {
    q: "How much does a project cost?",
    a: "Every project is scoped and quoted individually around your goals and budget. You approve the complete quote before any work begins.",
  },
  {
    q: "How many revisions are included?",
    a: "Every package includes 2 dedicated rounds of revisions to ensure you love the final deliverables. Additional rounds can easily be accommodated if needed.",
  },
  {
    q: "What file formats do I receive?",
    a: "Full production-ready files: vector source (AI, EPS, SVG), high-res transparent web files (PNG, SVG), and a PDF guidelines document where applicable.",
  },
  {
    q: "Do you work with clients internationally?",
    a: "Yes — I work with clients worldwide. Calls happen on WhatsApp or Zoom in your timezone, with asynchronous updates keeping momentum high.",
  },
];

function AnimatedStat({
  value,
  label,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const factor = Math.pow(10, decimals);
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1400, 1);
        const eased = value * (1 - Math.pow(1 - progress, 3));
        setDisplay(Math.round(eased * factor) / factor);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      setDisplay(0);
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, decimals]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : String(display);

  return (
    <div ref={root} className="min-w-0 text-center flex flex-col items-center">
      <div className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tighter tabular-nums leading-none">
        <span className="inline-block text-neon-gradient">{formatted}{suffix}</span>
      </div>
      <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-3 text-ink/70 leading-snug">{label}</p>
    </div>
  );
}

function ProfilePhotoFullWidth({ base }: { base: string }) {
  return (
    <div className="relative w-full aspect-[16/9] max-h-[760px] bg-neutral-950 overflow-hidden group select-none">
      <img
        src={`${base}images/aboutprofileimage_fullwidth.webp`}
        alt="John Obiko — Studio & Creative Direction"
        width={1920}
        height={1080}
        srcSet={responsiveImageSrcSet(`${base}images/aboutprofileimage_fullwidth.webp`)}
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
      />
    </div>
  );
}

export function AboutPage({ base, onNavigate }: AboutPageProps) {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <AboutHero onNavigate={onNavigate} />

      {/* FULL-WIDTH PROFILE / STUDIO PHOTO */}
      <section className="w-full pb-14 sm:pb-20 md:pb-28 overflow-hidden" aria-label="John Obiko Studio">
        <ProfilePhotoFullWidth base={base} />
      </section>

      {/* 1 — Opening Hook: Philosophy */}
      <section id="about-section" className="px-5 md:px-8 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink mb-4 sm:mb-6">⟶ Logo &amp; Brand Identity Specialty</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-[20ch] break-words">
            Great design turns curiosity into <span className="text-accent-ink">lasting conviction</span>
          </h2>
          <p className="mt-6 sm:mt-8 max-w-2xl font-sans text-base sm:text-lg text-ink/70 leading-relaxed font-light">
            Whether for a commercial business, a purpose-driven organization, an emerging brand, or a personal project — a strong logo and visual identity is where credibility starts. Specializing in craft-driven logo systems and brand identity, complemented by UI/UX design and clean front-end web development, I ensure your work stands out and connects with genuine impact.
          </p>
        </div>
      </section>

      {/* 2 — Who I am (Full-Width Radial Lime Gradient Feature Band) */}
      <section className="relative w-full bg-neon-gradient text-black px-5 md:px-8 py-16 sm:py-22 md:py-28 mb-14 sm:mb-20 md:mb-28 overflow-hidden">
        {/* Subtle studio canvas dot-grid + organic grain matching Home Hero */}
        <div aria-hidden="true" className="absolute inset-0 hero-dot-grid opacity-70 pointer-events-none z-0" />
        <div aria-hidden="true" className="absolute inset-0 hero-grain opacity-40 pointer-events-none z-0" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-1.5 rounded-full bg-black text-neon font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] select-none">
            <span className="size-1.5 rounded-full bg-neon" aria-hidden="true" />
            <span>Who I am</span>
          </p>

          <p className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-normal leading-snug tracking-tight text-black/80">
            I'm <span className="font-bold text-black underline decoration-black/30 decoration-2 underline-offset-4">John Obiko</span> — a Nairobi-based graphic and web designer specializing in <span className="font-bold text-black">logo and brand identity design</span>, with hands-on practice in <span className="font-bold text-black">UI/UX design and front-end development</span>. I collaborate with <span className="font-bold text-black">businesses, organizations, brands, and personal projects</span> worldwide — shaping distinctive visual marks and building fast, responsive websites from concept to code.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-black text-neon font-mono text-xs uppercase tracking-[0.2em] px-8 sm:px-9 py-4 rounded-full hover:scale-105 hover:bg-neutral-900 transition-all duration-300 font-extrabold shadow-xl shadow-black/20 cursor-pointer"
            >
              <span>Start a project</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-normal">⟶</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('consultation')}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border-2 border-black bg-transparent text-black font-mono text-xs uppercase tracking-[0.2em] px-8 sm:px-9 py-4 rounded-full hover:bg-black hover:text-neon transition-all duration-300 font-extrabold cursor-pointer"
            >
              <span>Free 1-hr call</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-normal">⟶</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 — Craft Pillars */}
      <section className="px-5 md:px-8 pb-14 sm:pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink mb-6 sm:mb-8">⟶ Core disciplines &amp; capabilities</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {pillars.map((p) => (
              <div
                key={p.n}
                className="group bg-surface p-6 sm:p-8 flex flex-col transition-colors duration-500 hover:bg-neon hover:text-black"
              >
                <span className="font-display text-4xl sm:text-5xl text-accent-ink group-hover:text-black transition-colors mb-4 font-bold">
                  {p.n}
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl mb-2.5 leading-tight">{p.title}</h3>
                <p className="font-sans text-sm text-ink/65 group-hover:text-black/80 leading-relaxed transition-colors">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Track Record & Stats */}
      <section className="px-5 md:px-8 pb-4 sm:pb-20 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink mb-6 sm:mb-8">⟶ Track record</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-8 md:gap-10 py-4 sm:py-6">
            {markers.map((stat) => <AnimatedStat key={stat.label} {...stat} />)}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH ART SPEAKS EDITORIAL QUOTE POSTER */}
      <section className="relative w-full -mt-10 sm:mt-0 mb-4 sm:mb-6 md:mb-8 bg-[#0a0a0a] overflow-hidden select-none" aria-label="Art speaks where words are unable to explain">
        <div className="relative w-full max-w-[1680px] mx-auto">
          <img
            src={`${base}images/art-speaks-quote.webp`}
            alt="Art speaks where words are unable to explain — Ondwari Obiko"
            width={1920}
            height={1080}
            srcSet={responsiveImageSrcSet(`${base}images/art-speaks-quote.webp`)}
            sizes="100vw"
            loading="lazy"
            decoding="async"
            className="block w-full h-auto object-contain -translate-y-3 sm:translate-y-0"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent"
        />
      </section>

      {/* 5 — SERVICES SECTION (THE 6 CORE PACKAGES) */}
      <section id="services-section" className="px-5 md:px-8 pt-2 sm:pt-4 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-3 sm:mb-4">⟶ Solutions shaped around your goals</p>
            <h2 className="font-display uppercase tracking-tighter text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[0.9]">
              Services &amp; <span className="inline-block text-neon-gradient">Packages</span>
            </h2>
            <p className="mt-4 sm:mt-6 font-sans text-lg sm:text-xl leading-relaxed text-ink/80 max-w-2xl">
              From first impression to conversion, every deliverable has a job: make your value clear, strengthen brand visibility, and help customers take the next step.
            </p>
          </div>

          {/* 6 Core Packages */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {packages.map((p) => (
              <div
                key={p.t}
                className="group bg-surface p-6 sm:p-7 flex flex-col transition-colors duration-500 hover:bg-neon hover:text-black"
              >
                <div className="flex justify-between items-start font-mono text-xs">
                  <span className="text-accent-ink group-hover:text-black font-bold text-sm">{p.n}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 group-hover:text-black/60">Scoped per project</span>
                </div>

                <h3 className="mt-4 sm:mt-5 font-display uppercase tracking-tighter text-2xl sm:text-3xl leading-tight font-bold transition-transform duration-500 group-hover:-translate-y-0.5">
                  {p.t}
                </h3>
                <p className="mt-2 font-sans text-xs sm:text-sm leading-relaxed text-ink/60 group-hover:text-black/70">{p.blurb}</p>

                <ul className="mt-4 flex flex-col gap-1.5">
                  {p.includes.map((x) => (
                    <li key={x} className="flex items-start gap-2 font-sans text-xs sm:text-sm text-ink/70 group-hover:text-black/85">
                      <span className="text-accent-ink group-hover:text-black mt-0.5 shrink-0 font-bold">→</span>
                      {x}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-ink/10 group-hover:border-black/15">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink group-hover:text-black font-semibold">
                    {p.ideal}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — What's Included / Guarantee */}
      <section className="px-5 md:px-8 py-14 sm:py-20 md:py-24 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-3">No surprises</p>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tighter leading-[0.9] font-extrabold">
              What you<br />always <span className="inline-block text-neon-gradient">get</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {guarantees.map((x) => (
              <div key={x.k}>
                <h4 className="font-display text-base sm:text-lg uppercase tracking-tight text-accent-ink font-bold">{x.k}</h4>
                <p className="mt-1.5 font-sans text-xs sm:text-sm text-ink/65 leading-relaxed">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Add-ons */}
      <section className="px-5 md:px-8 py-14 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-2">Optional extras</p>
              <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tighter leading-[0.9] font-extrabold">Add-ons</h2>
            </div>
            <p className="text-ink/50 text-xs sm:text-sm leading-relaxed max-w-sm">
              Add any extra collateral to your project package.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {addons.map((a) => (
              <div key={a} className="bg-surface p-4 sm:p-5 flex items-center justify-between group hover:bg-ink/[0.06] transition-colors duration-300">
                <span className="font-display text-base sm:text-lg uppercase tracking-tight font-semibold">{a}</span>
                <span className="font-mono text-accent-ink text-lg leading-none transition-transform duration-300 group-hover:rotate-45">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Note on Investment */}
      <section className="px-5 md:px-8 py-14 sm:py-20 md:py-24 bg-neon text-black">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16 items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-black/60 mb-2 font-bold">Clear pricing</p>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tighter leading-[0.9] font-extrabold">
              A note on<br />investment
            </h2>
          </div>
          <div className="flex flex-col gap-4 sm:gap-5">
            <p className="font-sans text-lg sm:text-xl leading-relaxed font-medium">
              Every project is scoped individually around your goals and budget.
            </p>
            <p className="font-sans text-black/75 text-sm sm:text-base leading-relaxed">
              Whether you are an established enterprise, a community organization, an emerging brand, or launching an independent passion project, you receive a transparent, milestone-based quote tailored directly to your scope. No guesswork, no hidden retainers.
            </p>
            <button
              onClick={() => onNavigate('consultation')}
              className="inline-flex items-center gap-2 self-start bg-black text-neon font-mono text-xs uppercase tracking-[0.2em] px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-neutral-900 transition-colors duration-300 font-bold cursor-pointer rounded-full mt-2"
            >
              Start with a free 1-hr consult ↗
            </button>
          </div>
        </div>
      </section>

      {/* 9 — Skills & Tools */}
      <section id="skills-section" className="px-5 md:px-8 py-14 sm:py-20 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-6">⟶ Skills & disciplines</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-14 sm:mb-16">
            {skills.map((skill) => (
              <div key={skill.name} className="border-t border-ink/20 pt-4 sm:pt-5">
                <h3 className="font-display font-bold text-xl sm:text-2xl mb-1.5">{skill.name}</h3>
                <p className="font-sans text-xs sm:text-sm text-ink/65 leading-relaxed">{skill.detail}</p>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-ink/60 mb-4 sm:mb-6">⟶ Tools & stack</p>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {tools.map((t) => (
              <span
                key={t}
                className="font-mono font-medium text-xs sm:text-sm border border-ink/20 px-3.5 py-2 text-ink/80 hover:border-neon hover:text-accent-ink transition-colors rounded-lg bg-surface/50"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — FAQ block */}
      <section id="faq-section" className="px-5 md:px-8 py-14 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-3">FAQ</p>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tighter leading-[0.9] font-extrabold">
              Service<br /><span className="inline-block text-neon-gradient">Questions</span>
            </h2>
            <p className="mt-4 font-sans text-ink/50 text-xs sm:text-sm leading-relaxed max-w-sm">
              Key questions answered up front so we can jump straight into creating.
            </p>
          </div>
          <div className="divide-y divide-ink/15">
            {serviceFaqs.map((f) => (
              <details key={f.q} className="group py-4 sm:py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-display text-base sm:text-lg uppercase tracking-tight hover:text-accent-ink transition-colors duration-300">
                  <span>{f.q}</span>
                  <span className="font-mono text-accent-ink text-xl leading-none transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="mt-3 font-sans text-ink/65 leading-relaxed max-w-2xl text-xs sm:text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
