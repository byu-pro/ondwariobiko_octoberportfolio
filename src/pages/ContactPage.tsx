import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { BudgetField } from '../components/BudgetField';
import { CopyButton } from '../components/CopyButton';
import { Mail, Phone } from 'lucide-react';

const projectTypes = [
  "Logo Design",
  "Brand Identity System",
  "Mascot Design",
  "Website Design & Development",
  "Brand + Website (combined)",
  "Custom Design Work",
  "Not sure yet",
];

const startOptions = [
  "As soon as possible",
  "In the coming weeks",
  "In the next few months",
  "Flexible — let's discuss",
];

const sources = ["Behance", "LinkedIn", "Referral", "Google", "Other"];

const contactFaqs = [
  {
    q: "What should I prepare before getting in touch?",
    a: "Just a brief description of what you need and any references you like. No formal design brief is required — we'll shape the scope and milestones together.",
  },
  {
    q: "What if I'm not sure exactly what I need yet?",
    a: "That's completely fine — select 'Not sure yet' in the project type field and describe your business. We'll figure out the best approach together.",
  },
  {
    q: "How does payment work?",
    a: "Projects begin with a 50% deposit after you approve the scope and proposal. The remaining 50% is due upon final approval before source files and live code are handed over.",
  },
];

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [start, setStart] = useState("");
  const [details, setDetails] = useState("");
  const [source, setSource] = useState("");
  const [error, setError] = useState("");

  const buildMessage = () => {
    return (
      `Hi John! I'd like to start a project.\n\n` +
      `• Name: ${name.trim()}\n` +
      `• Email: ${email.trim()}\n` +
      (company.trim() ? `• Company / Brand: ${company.trim()}\n` : "") +
      `• Project type: ${type || "Not sure yet"}\n` +
      `• Budget: ${budget || "To be discussed"}\n` +
      `• When to start: ${start || "Flexible"}\n` +
      (source ? `• Found via: ${source}\n` : "") +
      `\nProject Details:\n${details.trim()}`
    );
  };

  const validate = () => {
    if (!name.trim() || !email.trim() || !details.trim()) {
      setError("Please add your name, email, and a few lines about your project.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please check your email address format.");
      return false;
    }
    setError("");
    return true;
  };

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const msg = buildMessage();
    window.open(`https://wa.me/254702255575?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const sendEmail = () => {
    if (!validate()) return;
    const msg = buildMessage();
    const mailtoUrl = `mailto:ondwariobiko@gmail.com?subject=${encodeURIComponent(`Project Inquiry: ${name} (${type || "Design"})`)}&body=${encodeURIComponent(msg)}`;
    window.location.href = mailtoUrl;
  };

  const fieldClass =
    "w-full bg-transparent border-b border-ink/20 py-3 text-lg text-ink outline-none focus:border-neon transition-colors placeholder:text-ink/30";
  const labelClass =
    "font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50";

  return (
    <div className="w-full flex flex-col">
      <PageHero 
        index="03" 
        eyebrow="Start a project" 
        title="Say" 
        outline="Jambo" 
      />

      {/* Opening Intro */}
      <section className="px-5 md:px-8 pb-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-display uppercase tracking-tighter leading-[0.95] text-[clamp(1.75rem,5vw,3rem)] max-w-4xl">
            Let's build something together.{" "}
            <span className="text-stroke">Tell me about your project</span> —
            I'll reply within 24–48 hours.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
            Remote worldwide · working across time zones, from first concept to final delivery
          </p>
        </div>
      </section>

      {/* Form + Sidebar Grid */}
      <div className="px-5 md:px-8 pb-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Inquiry Form */}
          <form onSubmit={sendWhatsApp} className="lg:col-span-7 space-y-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink">
              Project inquiry form
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <label className="block">
                <span className={labelClass}>Name *</span>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Email *</span>
                <input
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@brand.com"
                  className={fieldClass}
                />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <label className="block">
                <span className={labelClass}>Company / Brand (optional)</span>
                <input
                  type="text"
                  maxLength={100}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Brand name"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Project type</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={`${fieldClass} appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-neutral-950 text-white">Select…</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-neutral-950 text-white">{t}</option>
                  ))}
                </select>
              </label>
            </div>

            <BudgetField value={budget} onChange={setBudget} />

            <div className="grid sm:grid-cols-2 gap-8">
              <label className="block">
                <span className={labelClass}>When would you like to start?</span>
                <select
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className={`${fieldClass} appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-neutral-950 text-white">Select…</option>
                  {startOptions.map((s) => (
                    <option key={s} value={s} className="bg-neutral-950 text-white">{s}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={labelClass}>How did you find me? (optional)</span>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className={`${fieldClass} appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-neutral-950 text-white">Select…</option>
                  {sources.map((s) => (
                    <option key={s} value={s} className="bg-neutral-950 text-white">{s}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className={labelClass}>Tell me about your project *</span>
              <textarea
                required
                maxLength={1000}
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="What are you building, and what problem should this design solve?"
                className="w-full bg-transparent border-b border-ink/20 py-3 text-lg text-ink outline-none focus:border-neon transition-colors placeholder:text-ink/30 resize-none"
              />
            </label>

            {error && (
              <p className="font-mono text-xs text-accent-ink">{error}</p>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="submit"
                className="group inline-flex items-center justify-between gap-6 rounded-full bg-neon text-black pl-8 pr-2 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-transform hover:scale-[1.02] cursor-pointer font-bold"
              >
                <span>Continue in WhatsApp</span>
                <span className="size-12 rounded-full bg-black text-accent-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45">↗</span>
              </button>

              <button
                type="button"
                onClick={sendEmail}
                className="inline-flex items-center justify-center border border-ink/25 text-ink font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:border-neon hover:text-accent-ink transition-colors cursor-pointer"
              >
                Send via Email
              </button>
            </div>
            
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
              Opens WhatsApp or your email client with your details pre-typed.
            </p>
          </form>

          {/* Sidebar / Direct Contact */}
          <aside className="lg:col-span-5 space-y-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50 mb-4">
                Prefer to reach out directly?
              </p>
              <div className="border-t border-ink/15">
                
                {/* Email row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 border-b border-ink/15 pb-2 sm:pb-0">
                  <a 
                    href="mailto:ondwariobiko@gmail.com" 
                    className="group relative overflow-hidden flex flex-1 min-w-0 flex-col gap-1 py-5 select-text"
                  >
                    <span className="absolute inset-0 bg-neon translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                    <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50 group-hover:text-black px-2 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      Email — best way to reach me
                    </span>
                    <span className="relative break-all font-display uppercase tracking-tighter text-xl sm:text-2xl group-hover:text-black px-2 transition-transform duration-500 group-hover:-translate-x-2 font-bold">
                      ondwariobiko@gmail.com ↗
                    </span>
                  </a>
                  <CopyButton value="ondwariobiko@gmail.com" label="email address" />
                </div>

                {/* WhatsApp row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 border-b border-ink/15 pb-2 sm:pb-0">
                  <a 
                    href="https://wa.me/254702255575" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative overflow-hidden flex flex-1 min-w-0 flex-col gap-1 py-5 select-text"
                  >
                    <span className="absolute inset-0 bg-neon translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                    <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50 group-hover:text-black px-2 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" />
                      WhatsApp — quickest for calls & chat
                    </span>
                    <span className="relative font-display uppercase tracking-tighter text-xl sm:text-2xl group-hover:text-black px-2 transition-transform duration-500 group-hover:-translate-x-2 font-bold">
                      +254 702 255 575 ↗
                    </span>
                  </a>
                  <CopyButton value="+254702255575" label="phone number" />
                </div>

                {/* Behance */}
                <a 
                  href="https://www.behance.net/johnobiko" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative overflow-hidden flex flex-col gap-1 py-5 border-b border-ink/15"
                >
                  <span className="absolute inset-0 bg-neon translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50 group-hover:text-black px-2">
                    Behance
                  </span>
                  <span className="relative font-display uppercase tracking-tighter text-xl sm:text-2xl group-hover:text-black px-2 transition-transform duration-500 group-hover:-translate-x-2 font-bold">
                    /johnobiko ↗
                  </span>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/ondwariobiko/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative overflow-hidden flex flex-col gap-1 py-5 border-b border-ink/15"
                >
                  <span className="absolute inset-0 bg-neon translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50 group-hover:text-black px-2">
                    LinkedIn
                  </span>
                  <span className="relative font-display uppercase tracking-tighter text-xl sm:text-2xl group-hover:text-black px-2 transition-transform duration-500 group-hover:-translate-x-2 font-bold">
                    /in/ondwariobiko ↗
                  </span>
                </a>

              </div>
            </div>

            {/* What happens next */}
            <div className="border border-ink/15 rounded-2xl p-6 md:p-8 bg-surface/50">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-4 font-bold">
                What happens next
              </p>
              <p className="text-ink/80 leading-relaxed text-sm">
                I'll review your project details and follow up within 24–48 hours — either with
                clarifying questions or a proposed next step, like a quick call or a custom quote.
              </p>
            </div>

            {/* Social proof */}
            <figure className="border-l-2 border-neon pl-6">
              <blockquote className="font-display uppercase tracking-tighter text-2xl sm:text-3xl leading-[0.95]">
                "Helped us launch a fintech brand now serving customers in 12 countries."
              </blockquote>
              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">
                — Founder, Aura Finance <span className="text-accent-ink">*</span>
              </figcaption>
            </figure>
          </aside>

        </div>
      </div>

      {/* Contact FAQ */}
      <section className="px-5 md:px-8 pb-24 border-t border-ink/10 pt-16">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10">
          <p className="lg:col-span-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">
            Before you reach out
          </p>
          <div className="lg:col-span-8 space-y-3">
            {contactFaqs.map((f) => (
              <details key={f.q} className="group border-b border-ink/15 py-6">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="font-display uppercase tracking-tighter text-xl sm:text-2xl leading-[0.95]">{f.q}</span>
                  <span className="font-mono text-accent-ink text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-[60ch] text-ink/70 leading-relaxed text-sm sm:text-base">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
