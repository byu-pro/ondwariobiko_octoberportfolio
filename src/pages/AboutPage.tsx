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
    title: "Hand-drawn, not templated",
    body: "I draw letterforms and symbols manually with the pen tool rather than leaning on existing fonts. Every mark is genuinely custom — built from scratch for your brand alone, not assembled from someone else's shapes.",
  },
  {
    n: "02",
    title: "Designed and built by the same person",
    body: "When I also handle your website, there's no gap between what you approve in design and what actually ships in code. What you see in Figma is what your visitors see live — pixel for pixel.",
  },
  {
    n: "03",
    title: "Built for everyday use",
    body: "Every identity is considered across the places your customers encounter it — from a small screen to signage and print. You receive practical files and guidance to keep the brand consistent.",
  },
];

const markers = [
  { value: new Date().getFullYear() - 2016, label: "Years designing · since 2016" },
  { value: 350, suffix: "+", label: "Projects completed" },
  { value: 3, label: "Core disciplines · brand, graphic & web" },
  { value: 1, label: "Designer · your direct creative partner" },
];

const packages = [
  {
    n: "01",
    t: "Logo System",
    blurb: "Not just a mark — a proper system. Primary, secondary, icon and favicon versions, built to hold up at 16px and on a billboard.",
    includes: [
      "3 initial concepts, hand-drawn then vector",
      "2 rounds of revisions",
      "Primary, secondary & icon/favicon versions",
      "AI, EPS, SVG, PNG + PDF mini-guide",
    ],
    ideal: "Best for startups launching their first brand",
  },
  {
    n: "02",
    t: "Brand Identity Package",
    blurb: "The full world your brand grows into — logo system plus colour, typography, voice and the rules that hold it all together.",
    includes: [
      "Everything in the Logo System",
      "Colour palette + typography system",
      "Visual language & art direction",
      "30–40 page brand guidelines PDF",
    ],
    ideal: "Best for established businesses rebranding",
  },
  {
    n: "03",
    t: "Mascot Design",
    blurb: "A signature character — a specialty of mine, not a generic illustration line. Built as a flexible system with expressions and poses.",
    includes: [
      "2 character concept directions",
      "2 revision rounds",
      "3 pose / expression variations",
      "AI, EPS, SVG, PNG delivery",
    ],
    ideal: "Best for brands wanting a memorable personality",
  },
  {
    n: "04",
    t: "Web Design & Build",
    blurb: "Designed and developed by the same hands — no handoff losses. Fast, responsive, with motion and performance baked in.",
    includes: [
      "Custom design, no templates",
      "Up to 5 pages",
      "Responsive build + animations",
      "1 round of post-launch tweaks",
    ],
    ideal: "Best for founders who want one person owning it all",
  },
  {
    n: "05",
    t: "Brand Guidelines",
    blurb: "The full usage rulebook for clients who already have a logo but need the system documented so any team can apply it correctly.",
    includes: [
      "Logo usage, spacing & misuse",
      "Colour, type & imagery rules",
      "Application examples",
      "30–50 page PDF guide",
    ],
    ideal: "Best for teams scaling beyond the founder",
  },
  {
    n: "06",
    t: "Packaging & Collateral",
    blurb: "Labels, boxes, business cards, stationery — identity work extended into the physical world and the files your printer needs.",
    includes: [
      "Up to 5 collateral pieces",
      "Print-ready, dieline-aware files",
      "2 revision rounds",
      "Source + PDF delivery",
    ],
    ideal: "Best for product brands ready to ship",
  },
  { 
    n: "07", 
    t: "Custom Design Work", 
    blurb: "A specific creative challenge? I shape the design around your brief, whether you need bespoke artwork, campaign graphics or a one-off brand application.", 
    includes: [
      "Scope and deliverables agreed together",
      "Original concepts tailored to your brief",
      "2 rounds of revisions",
      "Final files prepared for the intended use"
    ], 
    ideal: "Best for projects that need a tailored approach" 
  },
];

const addons = [
  "Business Card Design",
  "Social Media Kit",
  "Packaging Mockups",
  "Stationery Suite",
  "Favicon & App Icon Set",
  "Pitch Deck Template",
];

const skills = [
  { name: "Custom design work", detail: "Bespoke artwork and design solutions shaped around your brief" },
  { name: "Custom logo design", detail: "Original symbols and hand-drawn letterforms" },
  { name: "Brand identity", detail: "Colour, typography and consistent visual systems" },
  { name: "Mascot illustration", detail: "Expressive characters and vector artwork" },
  { name: "Graphic design", detail: "Print, packaging and digital brand applications" },
  { name: "UI/UX design", detail: "Clear, considered interfaces for web and mobile" },
  { name: "Front-end development", detail: "Responsive websites brought to life in code" },
];

const tools = [
  "Illustrator", "Photoshop", "InDesign", "Affinity", "Figma", 
  "VS Code", "GitHub", "After Effects", "Canva", "Pen tool", 
  "React", "CSS", "TypeScript", "Tailwind CSS", "Framer"
];

const serviceFaqs = [
  {
    q: "How long does a project take?",
    a: "There's no fixed timeline — it depends on the scope of work and what we agree together. Once we've discussed your project, I'll give you an honest estimate and we'll set milestones that work for both of us.",
  },
  {
    q: "How much does a project cost?",
    a: "Every project is scoped and quoted individually — no fixed price lists. We discuss your goals, scope and budget, and I put together a quote that fits what your brand actually needs. You approve everything before we start.",
  },
  {
    q: "How many revisions are included?",
    a: "Every package includes 2 rounds of revisions. If we need more, we agree on it together upfront — so scope creep never sneaks up on you.",
  },
  {
    q: "Do you offer rush delivery?",
    a: "Yes, when my schedule allows. Let me know your deadline and I'll confirm exactly what's possible before you commit to anything.",
  },
  {
    q: "What if I don't like any of the concepts?",
    a: "I present concepts with full rationale and we refine from there. If after the first round we're genuinely not aligned, you can walk away owing only the discovery deposit — no lock-in.",
  },
  {
    q: "What file formats do I receive?",
    a: "Vector source (AI, EPS, SVG), web-ready (PNG, SVG), and a PDF guide where applicable. Everything you need to hand off to a printer, developer or in-house team.",
  },
  {
    q: "Do you work with clients anywhere?",
    a: "Yes — I work remotely worldwide. Calls happen over WhatsApp or Zoom in your timezone, and async updates keep everything moving regardless of distance.",
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
      <div className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tighter text-accent-ink tabular-nums">
        <span>{display}{suffix}</span>
      </div>
      <p className="font-mono text-xs uppercase tracking-wider mt-4 text-ink/70 leading-relaxed max-w-[26ch]">{label}</p>
    </div>
  );
}

function ProfileImageCarousel({ base }: { base: string }) {
  const profileImages = [
    `${base}images/johnobiko_profilepic.webp`,
    `${base}images/profileimage_2.webp`,
    `${base}images/profileimage_3.webp`,
    `${base}images/profileimage_4.webp`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profileImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [profileImages.length]);

  return (
    <div className="relative aspect-[4/5] bg-neutral-900 border border-ink/10 overflow-hidden group rounded-xl">
      {profileImages.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`John Obiko — brand designer and front-end developer photo ${idx + 1}`}
          width={1200}
          height={1500}
          loading={idx === 0 ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 ring-1 ring-inset ring-neon/20 pointer-events-none z-20" />

      {/* Slide indicators */}
      <div className="absolute top-4 right-4 z-30 flex gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/10">
        {profileImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to photo ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              idx === currentIndex ? "w-5 bg-neon" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/90">
          John Obiko · Nairobi, Kenya · Working worldwide
        </p>
      </div>
    </div>
  );
}

export function AboutPage({ base, onNavigate }: AboutPageProps) {
  return (
    <div className="w-full flex flex-col">
      <PageHero 
        index="02" 
        eyebrow="The designer & services" 
        title="Designer" 
        outline="Developer" 
      />

      {/* Quick Jump Subnav */}
      <div className="px-5 md:px-8 -mt-4 mb-12">
        <div className="max-w-[1400px] mx-auto flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.2em]">
          <a href="#about-section" className="text-accent-ink hover:underline">
            ↓ About Me
          </a>
          <span className="text-ink/30">•</span>
          <a href="#services-section" className="text-ink/60 hover:text-accent-ink transition-colors">
            ↓ Services & Packages
          </a>
          <span className="text-ink/30">•</span>
          <a href="#faq-section" className="text-ink/60 hover:text-accent-ink transition-colors">
            ↓ Project FAQ
          </a>
        </div>
      </div>

      {/* 1 — Opening Hook: Philosophy */}
      <section id="about-section" className="px-5 md:px-8 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-ink mb-8">⟶ The philosophy</p>
          <h2 className="font-display font-extrabold text-[8vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight max-w-[16ch]">
            Every logo I draw starts with a <span className="text-accent-ink">pencil</span>, not a font.
          </h2>
          <p className="mt-10 max-w-[54ch] text-lg sm:text-xl text-ink/75 leading-relaxed font-light">
            For over ten years I've built brand identities and websites for clients around the world — combining
            hand-drawn craftsmanship with the technical precision of a front-end developer. No templates, no
            generators, no shortcuts. Just marks made deliberately, built to last.
          </p>
        </div>
      </section>

      {/* 2 — Who I am, with Photo Carousel */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5">
            <ProfileImageCarousel base={base} />
          </div>
          <div className="md:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-ink mb-6">⟶ Who I am</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug">
              I'm <span className="text-accent-ink font-semibold">John Obiko</span> — a graphic and web designer based in Nairobi, Kenya, working with
              clients worldwide. I specialise in flat vector logo design, mascot illustration and full brand identity
              systems — and I <span className="text-accent-ink font-display font-bold">design and build</span> the websites
              that bring them to life.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-neon text-black font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-transform font-bold cursor-pointer"
              >
                Start a project ⟶
              </button>
              <button
                onClick={() => onNavigate('consultation')}
                className="border border-ink/30 text-ink font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:border-neon hover:text-accent-ink transition-colors cursor-pointer"
              >
                Free 1-hr call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Craft Pillars */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-ink mb-10">⟶ What makes it different</p>
          <div className="grid md:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {pillars.map((p) => (
              <div
                key={p.n}
                className="group bg-surface p-8 md:p-10 min-h-[280px] flex flex-col transition-colors duration-500 hover:bg-neon hover:text-black"
              >
                <span className="font-display text-5xl text-accent-ink group-hover:text-black transition-colors mb-6 font-bold">
                  {p.n}
                </span>
                <h3 className="font-display font-bold text-xl mb-4 leading-tight">{p.title}</h3>
                <p className="text-sm text-ink/60 group-hover:text-black/80 leading-relaxed transition-colors">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Track Record & Stats */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-ink mb-10">⟶ Track record</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 border-y border-ink/15 py-12">
            {markers.map((stat) => <AnimatedStat key={stat.label} {...stat} />)}
          </div>
        </div>
      </section>

      {/* 5 — SERVICES SECTION (THE 7 CORE PACKAGES) */}
      <section id="services-section" className="px-5 md:px-8 pt-8 pb-24 md:pb-32 border-t border-ink/15">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-ink mb-4">⟶ What I craft</p>
            <h2 className="font-display uppercase tracking-tighter text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[0.9]">
              Services & <span className="text-stroke">Packages</span>
            </h2>
            <p className="mt-6 font-display text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight text-ink/80 max-w-3xl">
              Custom brand identities and logo systems for founders who want something <span className="text-accent-ink">built to last, not templated.</span> Hand-drawn, concept-driven, no AI shortcuts — and the same hands that design it build it.
            </p>
          </div>

          {/* 7 Core Packages */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {packages.map((p) => (
              <div
                key={p.t}
                className="group bg-surface p-6 sm:p-8 flex flex-col transition-colors duration-500 hover:bg-neon hover:text-black sm:min-h-[460px]"
              >
                <div className="flex justify-between items-start font-mono text-xs">
                  <span className="text-accent-ink group-hover:text-black font-bold">{p.n}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 group-hover:text-black/60">Scoped per project</span>
                </div>

                <h3 className="mt-6 font-display uppercase tracking-tighter text-3xl sm:text-4xl leading-[0.9] font-bold transition-transform duration-500 group-hover:-translate-y-1">
                  {p.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60 group-hover:text-black/70">{p.blurb}</p>

                <ul className="mt-5 flex flex-col gap-2">
                  {p.includes.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm text-ink/70 group-hover:text-black/80">
                      <span className="text-accent-ink group-hover:text-black mt-1 shrink-0">→</span>
                      {x}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 border-t border-ink/10 group-hover:border-black/15">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-ink group-hover:text-black font-semibold">
                    {p.ideal}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — What's Included / Reassurance Band */}
      <section className="px-5 md:px-8 py-20 md:py-28 border-y border-ink/10 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-ink mb-4">No surprises</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] font-extrabold">
              What you<br /><span className="text-stroke">always get</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {[
              { k: "Concepts with rationale", v: "Every direction is presented with the thinking behind it — never guesswork." },
              { k: "Clear, agreed scope", v: "You approve the scope and quote before we start. No open-ended hourly billing." },
              { k: "Agreed revision rounds", v: "Revisions are set together in your quote, so expectations are clear on both sides." },
              { k: "All source files", v: "AI, EPS, SVG, PNG and a PDF guide. Yours to keep and hand off freely." },
              { k: "Honest updates", v: "Regular check-ins by email, and video calls on WhatsApp whenever it's easier to talk." },
              { k: "Support after launch", v: "You leave with a brand or site you can actually use, and a partner on call." },
            ].map((x) => (
              <div key={x.k}>
                <h4 className="font-display text-lg uppercase tracking-tight text-accent-ink font-bold">{x.k}</h4>
                <p className="mt-2 text-sm text-ink/65 leading-relaxed">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Add-ons */}
      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-ink mb-3">Optional extras</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] font-extrabold">Add-ons</h2>
            </div>
            <p className="text-ink/50 max-w-sm text-sm leading-relaxed">
              Stack any of these onto a package — quoted together with your project so everything fits your budget.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {addons.map((a) => (
              <div key={a} className="bg-surface p-5 flex items-center justify-between group hover:bg-ink/[0.06] transition-colors duration-300">
                <span className="font-display text-lg sm:text-xl uppercase tracking-tight font-semibold">{a}</span>
                <span className="font-mono text-accent-ink text-xl leading-none transition-transform duration-300 group-hover:rotate-45">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Note on Investment */}
      <section className="px-5 md:px-8 py-20 md:py-28 border-t border-ink/10 bg-neon text-black">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-black/60 mb-4 font-bold">No price lists</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] font-extrabold">
              A note on<br />investment
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-display text-2xl sm:text-3xl leading-tight tracking-tight max-w-2xl font-bold">
              Every project is scoped individually, because no two brands need the same thing.
            </p>
            <p className="text-black/75 leading-relaxed max-w-2xl">
              Rather than fixed pricing or fixed timelines, I quote after understanding your goals and the scope of work involved — and we shape it around a budget that works for you. That way you're only ever paying for what your brand actually needs, and you approve the full quote before anything begins.
            </p>
            <button
              onClick={() => onNavigate('consultation')}
              className="inline-flex items-center gap-3 self-start bg-black text-neon font-mono text-xs uppercase tracking-[0.2em] px-8 py-5 hover:bg-neutral-900 transition-colors duration-300 font-bold cursor-pointer rounded-full"
            >
              Start with a free 1-hr consult ↗
            </button>
          </div>
        </div>
      </section>

      {/* 9 — Skills & Tools */}
      <section className="px-5 md:px-8 py-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-8">⟶ Skills & expertise</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mb-20">
            {skills.map((skill) => (
              <div key={skill.name} className="border-t border-ink/20 pt-6">
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-3">{skill.name}</h3>
                <p className="text-base text-ink/70 leading-relaxed">{skill.detail}</p>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70 mb-8">⟶ Tools of the trade</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {tools.map((t) => (
              <span
                key={t}
                className="font-display font-semibold text-lg sm:text-xl border border-ink/20 p-4 text-ink hover:border-neon hover:text-accent-ink transition-colors text-center"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — FAQ block */}
      <section id="faq-section" className="px-5 md:px-8 py-20 md:py-28 border-t border-ink/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-ink mb-4">Before you ask</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.85] font-extrabold">
              Service<br /><span className="text-stroke">Questions</span>
            </h2>
            <p className="mt-6 text-ink/50 max-w-sm leading-relaxed">
              The exact questions that otherwise stall a quote request for days — answered up front.
            </p>
          </div>
          <div>
            {serviceFaqs.map((f) => (
              <details key={f.q} className="group border-b border-ink/15 py-5">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-display text-lg sm:text-xl uppercase tracking-tight hover:text-accent-ink transition-colors duration-300">
                  {f.q}
                  <span className="font-mono text-accent-ink text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-ink/65 leading-relaxed max-w-2xl text-sm sm:text-base">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Closing CTA */}
      <section className="px-5 md:px-8 pb-28 md:pb-36">
        <div className="max-w-[1400px] mx-auto border-t border-ink/15 pt-16 text-center">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight">
            Have a project<br />
            in <span className="text-accent-ink">mind?</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 bg-neon text-black font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:scale-105 transition-all font-bold cursor-pointer"
            >
              Let's talk ⟶
            </button>
            <button
              onClick={() => onNavigate('consultation')}
              className="inline-flex items-center gap-2 border border-ink/25 text-ink font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:border-neon hover:text-accent-ink transition-all cursor-pointer"
            >
              Book a Free Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
