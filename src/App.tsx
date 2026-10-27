import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Palette, 
  Code2, 
  CheckCircle2, 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Send,
  ChevronRight,
  ExternalLink,
  PhoneCall,
  Menu,
  X
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'Brand Identity' | 'UI/UX Design' | 'Frontend Dev';
  description: string;
  image: string;
  tags: string[];
  year: string;
}

const projects: Project[] = [
  {
    id: 'aquapet',
    title: 'Aquapet Veterinary & Care',
    category: 'Brand Identity',
    description: 'Comprehensive brand identity, premium packaging systems, and digital touchpoints for an aquatic veterinary enterprise.',
    image: './images/aquapet_thumbnail.png',
    tags: ['Brand Identity', 'Packaging', 'Typography'],
    year: '2025'
  },
  {
    id: 'fastkat',
    title: 'FastKat Logistics & Courier',
    category: 'UI/UX Design',
    description: 'Next-generation delivery platform identity and user experience interface engineered for speed, reliability, and real-time tracking.',
    image: './images/fastkat_thumbnail.png',
    tags: ['UI/UX Design', 'Design System', 'Mobile App'],
    year: '2025'
  },
  {
    id: 'ikontrailers',
    title: 'Ikon Heavy Trailers',
    category: 'Brand Identity',
    description: 'Industrial heavy-duty brand design, custom typography, vehicle fleet livery, and digital brochure suite.',
    image: './images/ikontrailers_thumbnail.png',
    tags: ['Industrial Brand', 'Livery Design', '3D Graphics'],
    year: '2024'
  },
  {
    id: 'oceanline',
    title: 'Oceanline Cargo Express',
    category: 'Frontend Dev',
    description: 'Maritime freight enterprise web platform featuring automated rate calculations, tracking dashboards, and responsive design.',
    image: './images/oceanline_thumbnail.png',
    tags: ['Frontend Dev', 'React', 'Tailwind CSS'],
    year: '2024'
  },
  {
    id: 'editorial-suite',
    title: 'Aerauliqa Environmental System',
    category: 'UI/UX Design',
    description: 'B2B clean-air airflow engineering interface, product configuration dashboard, and enterprise design system.',
    image: './images/project-thumb-1.png',
    tags: ['Enterprise UX', 'Design System', 'Figma'],
    year: '2024'
  },
  {
    id: 'brand-mark-exploration',
    title: 'Monogram & Symbol Archive',
    category: 'Brand Identity',
    description: 'Curated compilation of geometric marks, minimalist heraldry, and dynamic visual identities crafted across 10 years.',
    image: './images/logomark_thumbnail.png',
    tags: ['Iconography', 'Brand Mark', 'Geometry'],
    year: '2026'
  }
];

const services = [
  {
    icon: <Palette className="w-8 h-8 text-amber-400" />,
    title: 'Brand & Logo Identity',
    description: 'Crafting bespoke, unforgettable visual identities, logos, typography guidelines, and brand systems that scale with authority.'
  },
  {
    icon: <Layers className="w-8 h-8 text-amber-400" />,
    title: 'UI/UX & Product Design',
    description: 'Architecting high-converting user interfaces, wireframes, interactive prototypes, and design systems with obsessive detail.'
  },
  {
    icon: <Code2 className="w-8 h-8 text-amber-400" />,
    title: 'Frontend Engineering',
    description: 'Bringing designs to life with modern React, TypeScript, Tailwind CSS, and ultra-smooth animations built for performance.'
  },
  {
    icon: <Sparkles className="w-8 h-8 text-amber-400" />,
    title: 'Creative Direction',
    description: 'Holistic design strategy that bridges strategic business objectives with striking visual aesthetics and memorable storytelling.'
  }
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Brand Identity' | 'UI/UX Design' | 'Frontend Dev'>('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-400 selection:text-neutral-950">
      {/* Top Announcement / Availability Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border-b border-amber-500/20 py-2 px-4 text-center text-xs tracking-wider uppercase font-semibold text-amber-300 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Available for Select Q4 & 2027 Design & Engineering Commissions
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/80 border-b border-neutral-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              O
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block text-white group-hover:text-amber-400 transition-colors">
                Ondwari Obiko
              </span>
              <span className="text-[11px] text-neutral-400 uppercase tracking-widest font-medium block">
                Brand & Frontend Designer
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#work" className="hover:text-amber-400 transition-colors">Selected Work</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">Capabilities</a>
            <a href="#about" className="hover:text-amber-400 transition-colors">About & Ethos</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-amber-400 text-neutral-950 font-bold text-sm hover:bg-amber-300 transition-all transform hover:-translate-y-0.5 shadow-md shadow-amber-400/20 flex items-center gap-2"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-neutral-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-900 border-b border-neutral-800 px-6 py-6 space-y-4">
            <a 
              href="#work" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-neutral-200 hover:text-amber-400"
            >
              Selected Work
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-neutral-200 hover:text-amber-400"
            >
              Capabilities
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-neutral-200 hover:text-amber-400"
            >
              About & Ethos
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-neutral-200 hover:text-amber-400"
            >
              Contact
            </a>
            <div className="pt-2">
              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-amber-400 text-neutral-950 font-bold text-center block"
              >
                Start a Project
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-36 overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Based in Nairobi, Kenya • Global Reach
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
                Bold, unforgettable <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                  brand design
                </span> & precision <br />
                frontend engineering.
              </h1>

              <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed">
                I am <strong className="text-white">Ondwari (John) Obiko</strong> — a designer and creative technologist with over a decade of experience crafting distinctive visual identities, intuitive UI/UX systems, and high-impact digital experiences.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="#work"
                  className="px-8 py-4 rounded-full bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300 transition-all transform hover:-translate-y-0.5 shadow-xl shadow-amber-400/20 flex items-center gap-3 text-base"
                >
                  Explore Portfolio
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a 
                  href="#contact"
                  className="px-8 py-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold hover:border-neutral-700 hover:bg-neutral-800 transition-all flex items-center gap-3 text-base"
                >
                  Get in Touch
                </a>
              </div>

              {/* Key Credentials & Numbers */}
              <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">10+</div>
                  <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-medium">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">120+</div>
                  <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-medium">Brand & Web Projects</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">100%</div>
                  <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-medium">Bespoke Craft</div>
                </div>
              </div>
            </div>

            {/* Right Visual / Portrait Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Visual Frame Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-neutral-800/40 rounded-3xl transform rotate-2 scale-102 filter blur-sm"></div>
                
                <div className="relative bg-neutral-900 border border-neutral-800/90 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/5] overflow-hidden bg-neutral-950 relative group">
                    <img 
                      src="./images/portrait-bw.png" 
                      alt="Ondwari Obiko" 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
                    
                    {/* Floating badge inside card */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800/80">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Creative Technologist</div>
                          <div className="text-sm font-bold text-white mt-0.5">Brand Designer & Front-End Dev</div>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-amber-400">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Selected Work Portfolio Section */}
      <section id="work" className="py-24 bg-neutral-900/40 border-t border-b border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Portfolio
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Selected Works & Case Studies
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-neutral-900 border border-neutral-800 self-start md:self-auto">
              {(['All', 'Brand Identity', 'UI/UX Design', 'Frontend Dev'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeFilter === tab 
                      ? 'bg-amber-400 text-neutral-950 shadow-md' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="group rounded-3xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/50 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1.5 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10"
              >
                {/* Image Cover */}
                <div className="aspect-[16/10] bg-neutral-950 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-[11px] font-semibold tracking-wide uppercase text-amber-300 border border-neutral-800">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-[11px] font-medium text-neutral-400 border border-neutral-800">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                      {project.title}
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                    <p className="mt-3 text-sm text-neutral-400 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-800/80 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span 
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-neutral-800/80 text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Capabilities */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">
            Core Expertise
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Designed for Impact, Built for Scale
          </h2>
          <p className="mt-4 text-neutral-400 text-base">
            From zero-to-one brand foundations to production-ready frontend architectures, I deliver holistic creative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/40 transition-all group hover:-translate-y-1"
            >
              <div className="p-3 w-fit rounded-2xl bg-neutral-950 border border-neutral-800 group-hover:border-amber-400/30 transition-colors mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About & Creative Ethos */}
      <section id="about" className="py-24 bg-neutral-900/60 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold">
                About The Creator
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Crafting visual systems with heart, rigor, and technical precision.
              </h2>
              <div className="space-y-4 text-neutral-300 text-base leading-relaxed">
                <p>
                  I'm an experienced designer and front-end developer based in Nairobi, Kenya. Over the past 10 years, I've had the privilege of partnering with founders, industry leaders, and global agencies to articulate brand stories and build engaging digital experiences.
                </p>
                <p>
                  My core philosophy is that good design is never merely ornamental — it is strategic communication. Whether developing an identity system for a heavy logistics firm or refining the micro-interactions on a web application, I ensure every single detail serves a clear purpose.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="font-bold text-white text-lg">Design Tools</div>
                  <div className="text-xs text-neutral-400 mt-1">Figma, Adobe Illustrator, Photoshop, InDesign, After Effects</div>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="font-bold text-white text-lg">Tech Stack</div>
                  <div className="text-xs text-neutral-400 mt-1">React, TypeScript, Vite, Tailwind CSS, Next.js, HTML5/CSS3</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 p-3 max-w-md w-full">
                <img 
                  src="./images/portrait.png" 
                  alt="John Ondwari Obiko" 
                  className="rounded-2xl w-full h-[460px] object-cover object-top"
                />
                <div className="p-5 mt-2 bg-neutral-900 rounded-2xl border border-neutral-800/80">
                  <blockquote className="text-sm italic text-neutral-300">
                    "I believe in creative work that stands apart — distinct typography, bold contrast, and code as elegant as the visual aesthetic."
                  </blockquote>
                  <div className="mt-3 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    — Ondwari Obiko
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-8 sm:p-14 relative overflow-hidden">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Let's create something extraordinary together.
            </h2>
            <p className="mt-4 text-neutral-400 text-base">
              Have an upcoming project, brand identity revamp, or web development inquiry? Drop a message and let's explore how we can collaborate.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 font-medium">Direct Email</div>
                    <a href="mailto:obi22004@byui.edu" className="text-sm font-semibold text-white hover:text-amber-400 transition-colors">
                      obi22004@byui.edu
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 font-medium">Location</div>
                    <div className="text-sm font-semibold text-white">
                      Nairobi, Kenya (UTC +3)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 font-medium">GitHub</div>
                    <a href="https://github.com/ondwariobiko" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-amber-400 transition-colors">
                      github.com/ondwariobiko
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                {formSubmitted && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" />
                    Thank you! Your message has been received. I'll get back to you promptly.
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Your Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Project Type</label>
                  <select 
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
                  >
                    <option>Complete Brand Identity & Logo Design</option>
                    <option>UI/UX Design & Prototyping</option>
                    <option>Frontend Web Development</option>
                    <option>Full-Stack Digital Package</option>
                    <option>Other / Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Project Brief</label>
                  <textarea 
                    rows={4} 
                    required
                    placeholder="Tell me about your goals, timelines, and scope..."
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors text-sm resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-400/20"
                >
                  Send Inquiry
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-900 bg-neutral-950 text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">Ondwari Obiko</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#work" className="hover:text-amber-400 transition-colors">Work</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">Capabilities</a>
            <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
            <a href="https://github.com/ondwariobiko" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
