import React, { useState, useEffect, useRef } from 'react';
import { PageHero } from '../components/PageHero';
import { PageRoute } from '../types';

interface AboutPageProps {
  base: string;
  onNavigate: (route: PageRoute) => void;
}

const pillars = [
  {
    n: "01",
    title: "Hand-drawn marks",
    body: "Original letterforms and symbols drawn from scratch with the pen tool. Genuinely bespoke for your brand alone.",
  },
  {
    n: "02",
    title: "Design + Code",
    body: "Designed and built by the same hands. What you approve in Figma translates pixel-for-pixel into production code.",
  },
  {
    n: "03",
    title: "Built to scale",
    body: "Complete vector assets and practical brand guidelines prepared for screens, signage, apparel, and print.",
  },
];

const markers = [
  { value: new Date().getFullYear() - 2016, label: "Years experience" },
  { value: 350, suffix: "+", label: "Projects completed" },
  { value: 3, label: "Core disciplines" },
  { value: 1, label: "Solo creative partner" },
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
    ideal: "Startups & new ventures",
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
    ideal: "Growing & rebranding brands",
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
    ideal: "Brands wanting memorable personality",
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
    ideal: "Founders needing design + code",
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
    ideal: "Teams scaling their marketing",
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
    ideal: "Product & apparel brands",
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
  "Illustrator", "Photoshop", "Figma", "VS Code", "After Effects", 
  "InDesign", "React", "TypeScript", "Tailwind CSS", "GitHub"
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

function AnimatedStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1400, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      setDisplay(0);
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  return (
    <div ref={root} className="min-w-0 text-center flex flex-col items-center">
      <div className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tighter text-accent-ink tabular-nums leading-none">
        <span>{display}{suffix}</span>
      </div>
      <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-3 text-ink/70 leading-snug">{label}</p>
    </div>
  );
}

function ProfilePhoto({ base }: { base: string }) {
  return (
    <div className="relative aspect-[4/5] max-h-[460px] sm:max-h-none bg-neutral-900 border border-ink/10 overflow-hidden group rounded-xl mx-auto w-full shadow-2xl">
      <img
        src={`${base}images/johnobiko_profilepic.webp`}
        alt="Ondwari Obiko"
        width={1200}
        height={1500}
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover grayscale contrast-105"
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-neon/20 pointer-events-none z-10" />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
          Nairobi, Kenya · Working worldwide
        </p>
      </div>
    </div>
  );
}

export function AboutPage({ base, onNavigate }: AboutPageProps) {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <PageHero 
        index="02" 
        eyebrow="About me & services" 
        title="Designer" 
        outline="Developer" 
      />

      {/* Quick Jump Subnav */}
      <div className="px-5 md:px-8 -mt-2 mb-10 sm:mb-12">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none font-mono text-[11px] sm:text-xs uppercase tracking-wider">
          <a href="#about-section" className="px-3.5 py-1.5 rounded-full bg-ink/10 text-accent-ink hover:bg-neon hover:text-black transition-colors shrink-0">
            About
          </a>
          <a href="#services-section" className="px-3.5 py-1.5 rounded-full bg-ink/5 text-ink/70 hover:bg-ink/15 hover:text-white transition-colors shrink-0">
            Services
          </a>
          <a href="#skills-section" className="px-3.5 py-1.5 rounded-full bg-ink/5 text-ink/70 hover:bg-ink/15 hover:text-white transition-colors shrink-0">
            Skills
          </a>
          <a href="#faq-section" className="px-3.5 py-1.5 rounded-full bg-ink/5 text-ink/70 hover:bg-ink/15 hover:text-white transition-colors shrink-0">
            FAQ
          </a>
        </div>
      </div>

      {/* 1 — Opening Hook: Philosophy */}
      <section id="about-section" className="px-5 md:px-8 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink mb-4 sm:mb-6">⟶ The philosophy</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-[20ch] break-words">
            Every logo starts with a <span className="text-accent-ink">pencil</span>, not a font.
          </h2>
          <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-ink/70 leading-relaxed font-light">
            Over 10 years crafting custom identities and bespoke websites for clients worldwide. Hand-drawn marks, clean code, no templates or shortcuts.
          </p>
        </div>
      </section>

      {/* 2 — Who I am, with Portrait Photo */}
      <section className="px-5 md:px-8 pb-14 sm:pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-8 md:gap-14 items-center">
          <div className="md:col-span-5 max-w-md mx-auto md:max-w-none w-full">
            <ProfilePhoto base={base} />
          </div>
          <div className="md:col-span-7">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink mb-4">⟶ Who I am</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-light leading-snug">
              I'm <span className="text-accent-ink font-semibold">Ondwari Obiko</span> — a solo graphic and web designer based in Nairobi, Kenya, serving clients worldwide. I craft custom vector logos, mascot systems, and <span className="text-accent-ink font-semibold">design & build</span> the responsive websites that power them.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto text-center bg-neon text-black font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-full hover:scale-105 transition-transform font-bold cursor-pointer"
              >
                Start a project ⟶
              </button>
              <button
                onClick={() => onNavigate('consultation')}
                className="w-full sm:w-auto text-center border border-ink/30 text-ink font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-full hover:border-neon hover:text-accent-ink transition-colors cursor-pointer"
              >
                Free 1-hr call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Craft Pillars */}
      <section className="px-5 md:px-8 pb-14 sm:pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink mb-6 sm:mb-8">⟶ What makes it different</p>
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
                <p className="text-sm text-ink/65 group-hover:text-black/80 leading-relaxed transition-colors">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Track Record & Stats */}
      <section className="px-5 md:px-8 pb-14 sm:pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink mb-6 sm:mb-8">⟶ Track record</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 border-y border-ink/15 py-8 sm:py-12">
            {markers.map((stat) => <AnimatedStat key={stat.label} {...stat} />)}
          </div>
        </div>
      </section>

      {/* 5 — SERVICES SECTION (THE 6 CORE PACKAGES) */}
      <section id="services-section" className="px-5 md:px-8 pt-8 pb-16 sm:pb-24 md:pb-32 border-t border-ink/15">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-3 sm:mb-4">⟶ What I craft</p>
            <h2 className="font-display uppercase tracking-tighter text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[0.9]">
              Services & <span className="text-stroke">Packages</span>
            </h2>
            <p className="mt-4 sm:mt-6 font-display text-lg sm:text-2xl leading-snug tracking-tight text-ink/80 max-w-2xl">
              Custom brand identities and logo systems <span className="text-accent-ink">built to last.</span> Hand-drawn, concept-driven, no shortcuts.
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
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/60 group-hover:text-black/70">{p.blurb}</p>

                <ul className="mt-4 flex flex-col gap-1.5">
                  {p.includes.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-xs sm:text-sm text-ink/70 group-hover:text-black/85">
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
      <section className="px-5 md:px-8 py-14 sm:py-20 md:py-24 border-y border-ink/10 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-3">No surprises</p>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tighter leading-[0.9] font-extrabold">
              What you<br /><span className="text-stroke">always get</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {guarantees.map((x) => (
              <div key={x.k}>
                <h4 className="font-display text-base sm:text-lg uppercase tracking-tight text-accent-ink font-bold">{x.k}</h4>
                <p className="mt-1.5 text-xs sm:text-sm text-ink/65 leading-relaxed">{x.v}</p>
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
      <section className="px-5 md:px-8 py-14 sm:py-20 md:py-24 border-t border-ink/10 bg-neon text-black">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16 items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-black/60 mb-2 font-bold">Clear pricing</p>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tighter leading-[0.9] font-extrabold">
              A note on<br />investment
            </h2>
          </div>
          <div className="flex flex-col gap-4 sm:gap-5">
            <p className="font-display text-xl sm:text-2xl leading-snug tracking-tight font-bold">
              Every project is scoped individually around your goals and budget.
            </p>
            <p className="text-black/75 text-sm sm:text-base leading-relaxed">
              Rather than rigid price lists, you receive an upfront milestone quote tailored to what your brand actually needs. No hidden fees, no surprises.
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
                <p className="text-xs sm:text-sm text-ink/65 leading-relaxed">{skill.detail}</p>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-ink/60 mb-4 sm:mb-6">⟶ Tools & stack</p>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {tools.map((t) => (
              <span
                key={t}
                className="font-display font-medium text-xs sm:text-sm border border-ink/20 px-3.5 py-2 text-ink/80 hover:border-neon hover:text-accent-ink transition-colors rounded-lg bg-surface/50"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — FAQ block */}
      <section id="faq-section" className="px-5 md:px-8 py-14 sm:py-20 md:py-24 border-t border-ink/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-3">FAQ</p>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tighter leading-[0.9] font-extrabold">
              Service<br /><span className="text-stroke">Questions</span>
            </h2>
            <p className="mt-4 text-ink/50 text-xs sm:text-sm leading-relaxed max-w-sm">
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
                <p className="mt-3 text-ink/65 leading-relaxed max-w-2xl text-xs sm:text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
