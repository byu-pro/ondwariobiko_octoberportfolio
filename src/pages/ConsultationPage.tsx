import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { BudgetField } from '../components/BudgetField';
import { 
  getContactEmail, 
  getWhatsAppUrl, 
  getMailtoUrl, 
  sanitizeInput, 
  isHumanPaced 
} from '../utils/security';

const perks = [
  ["60 min", "Dedicated, 1-on-1 video or WhatsApp call"],
  ["$0", "Completely free — zero pressure, zero hard sell"],
  ["Clear plan", "Honest advice, scope, timeline & rough budget"],
  ["Solo partner", "Direct collaboration with me — no agency middlemen"],
];

const types = ["Logo", "Brand Identity", "UI/UX", "Website", "Other — custom", "Not sure yet"];

export function ConsultationPage() {
  const [type, setType] = useState<string>(types[0]!);
  const [budget, setBudget] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");
  const [mountedAt] = useState(() => Date.now());
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (honeypot.trim()) return false;
    if (!isHumanPaced(mountedAt)) {
      setError("Please wait a moment before submitting.");
      return false;
    }
    if (!name.trim() || !email.trim() || !type.trim() || !time.trim() || !message.trim()) {
      setError("Please complete all required fields (only budget is optional).");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please check your email address format.");
      return false;
    }
    setError("");
    return true;
  };

  const buildMessage = () => {
    const cleanName = sanitizeInput(name, 100);
    const cleanEmail = sanitizeInput(email, 120);
    const cleanTime = sanitizeInput(time, 100);
    const cleanMessage = sanitizeInput(message, 1500);

    return (
      `Hi! I'd like to book a free 1-hour consultation.\n\n` +
      `Name: ${cleanName}\n` +
      `Email: ${cleanEmail}\n` +
      `Project: ${type}\n` +
      `Budget: ${budget || "To be discussed"}\n` +
      `Preferred time: ${cleanTime}\n\n` +
      `Notes: ${cleanMessage}`
    );
  };

  const submitWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;
    setIsSubmitting(true);

    window.open(getWhatsAppUrl(buildMessage()), "_blank", "noopener,noreferrer");
    setTimeout(() => setIsSubmitting(false), 3000);
  };

  const submitEmail = () => {
    if (isSubmitting) return;
    if (!validate()) return;
    setIsSubmitting(true);

    const cleanName = sanitizeInput(name, 100);
    window.location.href = getMailtoUrl(`Consultation Booking: ${cleanName} (${type})`, buildMessage());
    setTimeout(() => setIsSubmitting(false), 3000);
  };

  const field = "w-full bg-transparent border-b border-ink/20 py-4 text-lg md:text-xl outline-none focus:border-neon transition-colors placeholder:text-ink/30";

  return (
    <div className="w-full flex flex-col overflow-x-clip">
      <PageHero 
        index="04" 
        eyebrow="Free 1-hour consultation" 
        title="Let's" 
        outline="Talk" 
        marqueeTop={["Free 1-Hour Call", "Zero Obligation", "Honest Creative Advice", "Live Scope & Clarity"]}
        marqueeBottom={["Zoom Or WhatsApp", "Any Time Zone", "Strategy First", "Actionable Next Steps"]}
      />

      <section className="px-5 md:px-8 pb-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Perks */}
          <div className="lg:col-span-5">
            <p className="text-xl md:text-3xl font-light leading-tight">
              An honest <span className="text-accent-ink font-semibold">60-minute conversation</span> about your project, goals, and budget — on me.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-px bg-ink/15 border border-ink/15">
              {perks.map(([k, v]) => (
                <div key={k} className="bg-surface p-5">
              <div className="font-display font-extrabold text-2xl md:text-3xl text-accent-ink">{k}</div>
                  <div className="mt-2 text-xs sm:text-sm text-ink/60">{v}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 border border-ink/15 rounded-xl bg-surface/50 font-mono text-xs text-ink/70 leading-relaxed">
              <span className="text-accent-ink font-bold">What we cover:</span>
              <ul className="mt-2.5 space-y-1.5">
                <li>• Your brand vision and business objectives</li>
                <li>• Recommended deliverables & technical scope</li>
                <li>• Actionable creative advice you can use immediately</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <form onSubmit={submitWhatsApp} className="lg:col-span-7 space-y-8">
            {/* Anti-spam Bot Trap / Honeypot */}
            <div className="opacity-0 absolute -left-[9999px] -top-[9999px] h-0 w-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
              <label htmlFor="consult_website_hp">Please leave this field blank</label>
              <input
                id="consult_website_hp"
                name="website_url_hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <input 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name *" 
                className={field} 
              />
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email *" 
                className={field} 
              />
            </div>

            {/* Chips */}
            <fieldset>
              <legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50 mb-4">
                What do you need? *
              </legend>
              <div className="flex flex-wrap gap-2">
                {types.map((o) => (
                  <button 
                    type="button" 
                    key={o} 
                    onClick={() => setType(o)} 
                    className={`rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer ${
                      type === o 
                        ? "bg-neon text-black border-neon font-bold" 
                        : "border-ink/20 hover:border-neon hover:text-accent-ink text-ink/80"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>

            <BudgetField value={budget} onChange={setBudget} />

            <input 
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Preferred day & time (your timezone) *" 
              className={field} 
            />

            <textarea 
              required
              rows={4} 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me a little about your project… *" 
              className={`${field} resize-none`} 
            />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`group inline-flex items-center justify-between gap-6 rounded-full bg-neon text-black pl-8 pr-2 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-transform hover:scale-[1.02] cursor-pointer font-bold ${
                  isSubmitting ? 'opacity-60 pointer-events-none' : ''
                }`}
              >
                <span>{isSubmitting ? 'Opening WhatsApp…' : 'Request via WhatsApp'}</span>
                <span className="size-12 rounded-full bg-black text-accent-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45">↗</span>
              </button>

              <button 
                type="button" 
                onClick={submitEmail}
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center border border-ink/25 text-ink font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:border-neon hover:text-accent-ink transition-colors cursor-pointer ${
                  isSubmitting ? 'opacity-60 pointer-events-none' : ''
                }`}
              >
                {isSubmitting ? 'Opening Email…' : 'Book via Email'}
              </button>
            </div>

            {error && (
              <p className="font-mono text-xs text-accent-ink">{error}</p>
            )}

            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
              Opens WhatsApp with your details · Or email directly: {getContactEmail()}
            </p>
          </form>

        </div>
      </section>
    </div>
  );
}
