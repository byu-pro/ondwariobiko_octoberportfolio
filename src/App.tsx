import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Eye, 
  X, 
  Mail, 
  MapPin, 
  Github, 
  Send,
  CheckCircle2,
  Clock,
  Layers,
  Palette,
  Code2,
  Maximize2
} from 'lucide-react';

interface ProjectTile {
  id: string;
  number: string;
  title: string;
  client: string;
  category: 'Brand Identity' | 'UI/UX Design' | 'Frontend Dev';
  year: string;
  role: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  image: string;
  tags: string[];
}

const portfolioProjects: ProjectTile[] = [
  {
    id: 'ikon-trailers',
    number: '01',
    title: 'IKON Trailers',
    client: 'Ikon Trailer Group',
    category: 'Brand Identity',
    year: '2025',
    role: 'Lead Brand Architect',
    summary: 'Heavy-duty commercial trailer dealership & manufacturing visual system, vehicle livery, and brand guidelines.',
    challenge: 'The dealership required a modern, authoritative identity capable of standing out on interstate highways and conveying industrial resilience.',
    solution: 'Designed a high-contrast geometric monogram, custom industrial typography, and standardized livery systems for heavy haulage fleets.',
    deliverables: ['Primary & Secondary Marks', 'Livery Graphics', 'Brand Standards Manual', 'Digital Marketing Assets'],
    image: './images/ikontrailers_thumbnail.png',
    tags: ['Brand Identity', 'Logo System', 'Vehicle Livery']
  },
  {
    id: 'aquapet',
    number: '02',
    title: 'AquaPet Veterinary',
    client: 'AquaPet Health & Nutrition',
    category: 'Brand Identity',
    year: '2025',
    role: 'Brand & Packaging Designer',
    summary: 'Comprehensive veterinary care identity, premium aquatic medication packaging, and retail shelf presence.',
    challenge: 'Balancing clinical credibility for aquatic veterinarians with approachable consumer retail packaging for aquarium enthusiasts.',
    solution: 'Engineered a clean chromatic color hierarchy, fluid wave iconography, and tamper-evident packaging architectures.',
    deliverables: ['Identity System', 'Product Packaging Suite', 'Retail POS Displays', 'Iconography System'],
    image: './images/aquapet_thumbnail.png',
    tags: ['Packaging Design', 'Identity System', 'Art Direction']
  },
  {
    id: 'oceanline',
    number: '03',
    title: 'Ocean-Line Cargo',
    client: 'Ocean-Line Freight Forwarders',
    category: 'Frontend Dev',
    year: '2024',
    role: 'Frontend Engineer & Designer',
    summary: 'Global maritime freight enterprise brand system, tracking dashboard, and responsive client portal.',
    challenge: 'Converting complex real-time container logistics telemetry into a rapid, legible client interface for global shipping manifests.',
    solution: 'Built a high-performance React client portal with instant rate calculators, vessel tracking visualizations, and responsive styling.',
    deliverables: ['Brand Refresh', 'Client Portal UI', 'React/Tailwind Frontend', 'Rate Calculator Engine'],
    image: './images/oceanline_thumbnail.png',
    tags: ['Web Platform', 'Brand Identity', 'Frontend Dev']
  },
  {
    id: 'fastkat',
    number: '04',
    title: 'FastKat Logistics',
    client: 'FastKat Courier Tech',
    category: 'UI/UX Design',
    year: '2025',
    role: 'Lead UI/UX Designer',
    summary: 'Next-generation on-demand urban courier dispatch platform, mobile driver application, and dispatcher system.',
    challenge: 'Minimizing driver friction while on transit while maintaining split-second dispatch synchronization for central urban hubs.',
    solution: 'Crafted a high-contrast dark mode mobile application with large target areas, haptic visual cues, and live telemetry tracking.',
    deliverables: ['Mobile App UI (iOS & Android)', 'Dispatcher Dashboard', 'Comprehensive Design System', 'Prototyping'],
    image: './images/fastkat_thumbnail.png',
    tags: ['Mobile UI/UX', 'Product Strategy', 'Design System']
  },
  {
    id: 'iron-acre',
    number: '05',
    title: 'Iron Acre Land Co',
    client: 'Iron Acre Realty Group',
    category: 'Brand Identity',
    year: '2024',
    role: 'Brand & Print Designer',
    summary: 'Premium rural land brokerage brand architecture, bespoke typography, and high-net-worth investor prospectuses.',
    challenge: 'Establishing a sense of generational permanence and prestige for large-tract land acquisitions across East Africa.',
    solution: 'Developed an earth-toned architectural heraldry mark, bespoke foil-stamped documentation, and property signage.',
    deliverables: ['Architectural Mark', 'Investor Books', 'Estate Signage', 'Marketing Guidelines'],
    image: './images/project-thumb-1.png',
    tags: ['Brand Identity', 'Editorial Print', 'Typography']
  },
  {
    id: 'green-essentials',
    number: '06',
    title: 'Green Essentials',
    client: 'Green Essentials Eco Care',
    category: 'Brand Identity',
    year: '2024',
    role: 'Identity & Web Designer',
    summary: 'Sustainable lawn care & eco-conscious commercial grounds maintenance visual system and booking website.',
    challenge: 'Differentiating an eco-first grounds maintenance business from conventional chemically-heavy lawn services.',
    solution: 'Combined crisp botanical geometry with modern minimalist typography to articulate clean, carbon-neutral landscaping.',
    deliverables: ['Logo Family', 'Digital Booking Experience', 'Fleet Vehicle Wraps', 'Uniform Guidelines'],
    image: './images/project-thumb-2.png',
    tags: ['Eco Branding', 'Logo System', 'Web Design']
  },
  {
    id: 'pelican-social',
    number: '07',
    title: 'Pelican Social',
    client: 'Pelican Bar & Grill',
    category: 'UI/UX Design',
    year: '2023',
    role: 'Creative Director',
    summary: 'High-end coastal hospitality brand identity, architectural neon signage, and digital menu ordering experience.',
    challenge: 'Translating daytime seaside casual relaxation into vibrant, upscale night-time culinary nightlife.',
    solution: 'Devised a dynamic color-shifting typography palette, custom illustrated coastal marks, and waterproof tactile menu systems.',
    deliverables: ['Hospitality Brand System', 'Spatial Signage', 'Editorial Menus', 'Interactive Cocktail App'],
    image: './images/project-thumb-3.png',
    tags: ['Hospitality Branding', 'Spatial Signage', 'Menu Design']
  },
  {
    id: 'aerauliqa',
    number: '08',
    title: 'Aerauliqa Systems',
    client: 'Aerauliqa Engineering',
    category: 'Frontend Dev',
    year: '2024',
    role: 'UI/UX & Frontend Developer',
    summary: 'Clean-air HVAC airflow configuration portal, product engineering interface, and interactive telemetry dashboard.',
    challenge: 'Empowering mechanical engineers to simulate cubic-feet-per-minute airflow and pressure drops within seconds.',
    solution: 'Engineered an interactive calculation dashboard with SVG flow schematics, responsive spec sheets, and component libraries.',
    deliverables: ['Configurator Application', 'React Component Library', 'Telemetry Graphs', 'Design Tokens'],
    image: './images/project-thumb-4.png',
    tags: ['Enterprise UI/UX', 'React Application', 'Design System']
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectTile | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const updateNairobiTime = () => {
      const now = new Date();
      const nairobi = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Nairobi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setCurrentTime(nairobi);
    };

    updateNairobiTime();
    const interval = setInterval(updateNairobiTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black">
      
      {/* Top Ticker Bar */}
      <div className="border-b border-neutral-900 bg-black/90 backdrop-blur-md px-6 py-2.5 text-xs text-neutral-400 flex flex-wrap items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
          <span className="text-[#ccff00] font-semibold tracking-wider uppercase">AVAILABLE FOR Q4 / 2027 WORK</span>
          <span className="hidden sm:inline text-neutral-700">•</span>
          <span className="hidden sm:inline text-neutral-400">10 YEARS EXPERIENCE</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>NAIROBI, KE: <strong className="text-white">{currentTime || '12:00:00'}</strong> EAT</span>
          </div>
          <a 
            href="#contact" 
            className="text-[#ccff00] hover:underline underline-offset-4 font-bold flex items-center gap-1"
          >
            LET'S TALK <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Brand & Work Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#ccff00] text-black font-extrabold flex items-center justify-center text-xl font-syne rounded-lg shadow-[0_0_20px_rgba(204,255,0,0.3)]">
              O
            </div>
            <div>
              <a href="#" className="font-extrabold text-lg tracking-tighter text-white hover:text-[#ccff00] transition-colors block leading-tight font-syne">
                ONDWARI OBIKO
              </a>
              <span className="text-[11px] font-mono text-neutral-400 tracking-widest block uppercase">
                BRAND ARCHITECT • UI/UX • FRONTEND
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            <a href="#work" className="text-[#ccff00] font-bold border-b border-[#ccff00] pb-1">
              // 01 WORK
            </a>
            <a href="#about" className="text-neutral-400 hover:text-white transition-colors pb-1">
              // 02 ABOUT
            </a>
            <a href="#contact" className="text-neutral-400 hover:text-white transition-colors pb-1">
              // 03 CONTACT
            </a>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2"
            >
              Start Project
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </header>

      {/* WORK HERO: Straight to Work */}
      <main id="work" className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-12 pb-24">
        
        {/* Editorial Work Header */}
        <div className="border-b border-neutral-900 pb-10 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ccff00] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
                SELECTED ARCHIVE // 2016 — 2026
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-syne leading-[0.95]">
                PRECISION <span className="text-[#ccff00]">WORK</span>.
              </h1>

              <p className="text-neutral-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Strategic brand identity, packaging design, and production frontend systems engineered for bold founders and enterprise platforms globally.
              </p>
            </div>

            {/* Category Filter Chips & Counter */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider flex items-center justify-between">
                <span>FILTER DISCIPLINE</span>
                <span className="text-[#ccff00]">[{filteredProjects.length.toString().padStart(2, '0')} TILES]</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'All', count: '08' },
                  { name: 'Brand Identity', count: '04' },
                  { name: 'UI/UX Design', count: '02' },
                  { name: 'Frontend Dev', count: '02' }
                ].map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                      activeCategory === cat.name
                        ? 'bg-[#ccff00] text-black font-bold shadow-[0_0_20px_rgba(204,255,0,0.3)]'
                        : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 2-COLUMN TILES GRID (8 TILES TOTAL) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((tile) => (
            <article 
              key={tile.id}
              onClick={() => setSelectedProject(tile)}
              className="group cursor-pointer rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-[#ccff00] transition-all duration-500 overflow-hidden flex flex-col lime-border-glow"
            >
              {/* Tile Top Metadata Bar */}
              <div className="px-6 py-4 border-b border-neutral-900 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-[#ccff00] font-bold text-sm tracking-widest">{tile.number} //</span>
                  <span className="text-neutral-400 uppercase tracking-wider">{tile.category}</span>
                </div>
                <div className="text-neutral-500 flex items-center gap-2">
                  <span>{tile.year}</span>
                  <span className="text-neutral-700">•</span>
                  <span className="text-[#ccff00] group-hover:underline flex items-center gap-1 font-semibold">
                    VIEW DETAILS
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>

              {/* Tile Cinematic Image Container */}
              <div className="aspect-[16/10] bg-neutral-900 relative overflow-hidden">
                <img 
                  src={tile.image} 
                  alt={tile.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105 group-hover:brightness-100"
                  loading="lazy"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Floating Quick Action Badge */}
                <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="px-4 py-2 rounded-full bg-black/90 backdrop-blur-md border border-[#ccff00] text-[#ccff00] text-xs font-mono font-bold tracking-wider flex items-center gap-2 shadow-2xl">
                    <Maximize2 className="w-3.5 h-3.5" />
                    EXPLORE CASE STUDY
                  </span>
                </div>
              </div>

              {/* Tile Content Footer */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#ccff00] transition-colors tracking-tight font-syne uppercase">
                      {tile.title}
                    </h2>
                    <span className="text-xs font-mono text-neutral-500 whitespace-nowrap">
                      {tile.role}
                    </span>
                  </div>

                  <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                    {tile.summary}
                  </p>
                </div>

                {/* Deliverables / Tags */}
                <div className="pt-4 border-t border-neutral-900 flex flex-wrap gap-2">
                  {tile.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-[11px] font-mono px-3 py-1 rounded-md bg-black border border-neutral-800 text-neutral-300 group-hover:border-neutral-700 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

      </main>

      {/* CASE STUDY MODAL OVERLAY */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-neutral-950 border border-[#ccff00]/40 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_60px_rgba(204,255,0,0.15)] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-md px-6 py-5 border-b border-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#ccff00]">CASE STUDY // {selectedProject.number}</span>
                <span className="text-xs font-mono text-neutral-500">•</span>
                <span className="text-xs font-mono text-white uppercase">{selectedProject.category}</span>
              </div>
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 hover:border-[#ccff00] text-neutral-400 hover:text-[#ccff00] flex items-center justify-center transition-colors"
                aria-label="Close case study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10 space-y-8">
              
              {/* Header Title */}
              <div>
                <h2 className="text-3xl sm:text-5xl font-black text-white font-syne uppercase tracking-tight">
                  {selectedProject.title}
                </h2>
                <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono text-neutral-400">
                  <span>CLIENT: <strong className="text-white">{selectedProject.client}</strong></span>
                  <span>•</span>
                  <span>YEAR: <strong className="text-white">{selectedProject.year}</strong></span>
                  <span>•</span>
                  <span>ROLE: <strong className="text-[#ccff00]">{selectedProject.role}</strong></span>
                </div>
              </div>

              {/* Full Image */}
              <div className="rounded-2xl overflow-hidden border border-neutral-900 bg-black aspect-[16/9]">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="p-6 rounded-2xl bg-black border border-neutral-900 space-y-3">
                  <div className="text-xs font-mono text-[#ccff00] uppercase tracking-wider font-bold">
                    // 01 THE CHALLENGE
                  </div>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {selectedProject.challenge}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-black border border-neutral-900 space-y-3">
                  <div className="text-xs font-mono text-[#ccff00] uppercase tracking-wider font-bold">
                    // 02 THE STRATEGIC SOLUTION
                  </div>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Deliverables List */}
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <div className="text-xs font-mono text-white uppercase tracking-wider font-bold">
                  KEY DELIVERABLES & ARTIFACTS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-neutral-300 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Bottom CTA */}
              <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-neutral-400">
                  Ready to craft a distinctive identity or web platform like this?
                </span>
                <a 
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2"
                >
                  Inquire For Your Project
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ABOUT & ETHOS SECTION */}
      <section id="about" className="border-t border-neutral-900 bg-neutral-950 py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Bio Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ccff00] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
                // 02 ABOUT ONDWARI OBIKO
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-syne uppercase leading-tight">
                GRAPHIC DESIGNER, BRAND ENGINEER & FRONTEND ARCHITECT.
              </h2>

              <div className="space-y-4 text-neutral-400 text-base leading-relaxed">
                <p>
                  I am a designer and frontend developer based in Nairobi, Kenya, with over <strong className="text-white">10 years of commercial experience</strong>. I specialize in logo systems, brand identities, high-impact UI/UX design, and clean frontend engineering.
                </p>
                <p>
                  My work is driven by brutal clarity, bold contrast, and uncompromising typographic discipline. I don't design for decoration — I build visual identities and digital tools that grant companies undeniable authority in their markets.
                </p>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-900 font-mono">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#ccff00]">10+</div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 mt-1">Years Active</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#ccff00]">120+</div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 mt-1">Identities Delivered</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#ccff00]">100%</div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 mt-1">Custom Built</div>
                </div>
              </div>

              {/* Toolkit Chips */}
              <div className="pt-4 space-y-2">
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">CORE TOOLKIT</div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {['Figma', 'Adobe Illustrator', 'Photoshop', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite', 'Next.js'].map(tool => (
                    <span key={tool} className="px-3 py-1.5 rounded-md bg-black border border-neutral-800 text-neutral-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Portrait & Manifesto */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl bg-black border border-neutral-900 p-4 lime-border-glow">
                <div className="rounded-xl overflow-hidden aspect-[4/5] bg-neutral-900 relative">
                  <img 
                    src="./images/portrait-bw.png" 
                    alt="Ondwari Obiko" 
                    className="w-full h-full object-cover object-center grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/90 border border-neutral-800 backdrop-blur-md">
                    <div className="text-[#ccff00] font-mono text-xs font-bold uppercase tracking-wider">
                      CREATIVE PHILOSOPHY
                    </div>
                    <p className="text-xs text-neutral-300 mt-1 italic">
                      "Make it bold, make it functional, and strip everything that doesn't serve the vision."
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="border-t border-neutral-900 bg-black py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-8 sm:p-14 lg:p-16 relative overflow-hidden">
            {/* Ambient Lime Glow in Background */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Direct Inquiries */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ccff00] uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
                  // 03 INITIALIZE COMMISSION
                </div>

                <h2 className="text-4xl sm:text-5xl font-extrabold text-white font-syne uppercase tracking-tight">
                  LET'S BUILD SOMETHING <span className="text-[#ccff00]">ICONIC</span>.
                </h2>

                <p className="text-neutral-400 text-sm leading-relaxed">
                  Accepting select brand identity, redesign, and web engineering commissions for businesses ready to command attention.
                </p>

                <div className="space-y-4 pt-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-black border border-neutral-900 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#ccff00]/10 text-[#ccff00] flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-neutral-500">DIRECT EMAIL</div>
                      <a href="mailto:obi22004@byui.edu" className="text-white font-bold hover:text-[#ccff00] transition-colors text-sm">
                        obi22004@byui.edu
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-neutral-900 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#ccff00]/10 text-[#ccff00] flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-neutral-500">LOCATION & TIMEZONE</div>
                      <div className="text-white font-bold text-sm">
                        Nairobi, Kenya (UTC +3 / EAT)
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-neutral-900 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#ccff00]/10 text-[#ccff00] flex items-center justify-center">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-neutral-500">GITHUB REPOSITORY</div>
                      <a 
                        href="https://github.com/byu-pro/ondwariobiko_octoberportfolio" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white font-bold hover:text-[#ccff00] transition-colors text-sm flex items-center gap-1"
                      >
                        byu-pro/ondwariobiko_octoberportfolio
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleContactSubmit} className="space-y-4 font-mono text-xs">
                  {contactSubmitted && (
                    <div className="p-4 rounded-xl bg-[#ccff00]/10 border border-[#ccff00] text-[#ccff00] text-xs flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4" />
                      INQUIRY TRANSMITTED. I will review and reply within 24 hours.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-400 mb-2 uppercase">NAME / COMPANY</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Marcus Vance"
                        className="w-full px-4 py-3.5 rounded-xl bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-2 uppercase">WORK EMAIL</label>
                      <input 
                        type="email" 
                        required
                        placeholder="marcus@domain.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-2 uppercase">DISCIPLINE REQUIRED</label>
                    <select 
                      className="w-full px-4 py-3.5 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-[#ccff00] transition-colors"
                    >
                      <option>Complete Brand Identity & Logo System</option>
                      <option>Product UI/UX & Design System</option>
                      <option>Frontend Engineering (React / Tailwind)</option>
                      <option>Full-Stack Brand + Digital Package</option>
                      <option>Design Advisory / Creative Direction</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-2 uppercase">PROJECT SCOPE & OBJECTIVES</label>
                    <textarea 
                      rows={4} 
                      required
                      placeholder="Briefly outline your timelines, current stage, and goals..."
                      className="w-full px-4 py-3.5 rounded-xl bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#ccff00] text-black font-extrabold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    SEND INQUIRY
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-neutral-900 bg-black py-8 text-neutral-600 text-xs font-mono">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} ONDWARI OBIKO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <a href="#work" className="hover:text-[#ccff00] transition-colors">// WORK</a>
            <a href="#about" className="hover:text-[#ccff00] transition-colors">// ABOUT</a>
            <a href="#contact" className="hover:text-[#ccff00] transition-colors">// CONTACT</a>
            <a href="#" className="hover:text-[#ccff00] transition-colors">TOP ↑</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
