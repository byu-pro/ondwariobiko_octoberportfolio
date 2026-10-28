import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { BudgetField } from '../components/BudgetField';

const perks = [
  ["60 min", "Dedicated, one-to-one video or WhatsApp call"],
  ["$0", "Completely free — no obligation, no hard sell"],
  ["Clear plan", "Honest advice, scope, timeline & rough budget"],
  ["Good fit?", "We both find out if working together makes sense"],
];

const types = ["Logo", "Brand Identity", "UI/UX", "Website", "Other — custom", "Not sure yet"];

export function ConsultationPage() {
  const [type, setType] = useState<string>(types[0]!);
  const [budget, setBudget] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const submitWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = 
      `Hi John! I'd like to book a free 1-hour consultation.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Project: ${type}\n` +
      `Budget: ${budget || "To be discussed"}\n` +
      `Preferred time: ${time || "Flexible"}\n\n` +
      (message ? `Notes: ${message}` : "");
    window.open(`https://wa.me/254702255575?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const submitEmail = () => {
    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email address first.");
      return;
    }
    const msg = 
      `Hi John! I'd like to book a free 1-hour consultation.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Project: ${type}\n` +
      `Budget: ${budget || "To be discussed"}\n` +
      `Preferred time: ${time || "Flexible"}\n\n` +
      (message ? `Notes: ${message}` : "");
    const mailtoUrl = `mailto:ondwariobiko@gmail.com?subject=${encodeURIComponent(`Consultation Booking: ${name} (${type})`)}&body=${encodeURIComponent(msg)}`;
    window.location.href = mailtoUrl;
  };

  const field = "w-full bg-transparent border-b border-ink/20 py-4 text-lg md:text-xl outline-none focus:border-neon transition-colors placeholder:text-ink/30";

  return (
    <div className="w-full flex flex-col">
      <PageHero 
        index="04" 
        eyebrow="Free 1-hour consultation" 
        title="Let's" 
        outline="Talk" 
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
                What do you need?
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
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Preferred day & time (your timezone)" 
              className={field} 
            />

            <textarea 
              rows={4} 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me a little about your project…" 
              className={`${field} resize-none`} 
            />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button 
                type="submit" 
                className="group inline-flex items-center justify-between gap-6 rounded-full bg-neon text-black pl-8 pr-2 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-transform hover:scale-[1.02] cursor-pointer font-bold"
              >
                <span>Request via WhatsApp</span>
                <span className="size-12 rounded-full bg-black text-accent-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45">↗</span>
              </button>

              <button 
                type="button" 
                onClick={submitEmail}
                className="inline-flex items-center justify-center border border-ink/25 text-ink font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:border-neon hover:text-accent-ink transition-colors cursor-pointer"
              >
                Book via Email
              </button>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
              Opens WhatsApp with your details · Or email ondwariobiko@gmail.com
            </p>
          </form>

        </div>
      </section>
    </div>
  );
}
