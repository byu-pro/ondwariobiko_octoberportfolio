import React, { useState } from 'react';

interface BudgetFieldProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  dark?: boolean;
}

export function BudgetField({
  label = "Your budget",
  value,
  onChange,
  dark = true,
}: BudgetFieldProps) {
  const [currency, setCurrency] = useState<"USD" | "KSh">("USD");
  const [amount, setAmount] = useState("");

  const emit = (cur: string, amt: string) => {
    onChange(amt.trim() ? `${cur} ${amt.trim()}` : "");
  };

  return (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50 mb-4">
        {label}
      </legend>
      <div className="flex flex-wrap items-center gap-3">
        {(["USD", "KSh"] as const).map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => {
              setCurrency(c);
              emit(c, amount);
            }}
            className={`rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer ${
              currency === c
                ? "bg-neon text-black border-neon font-bold"
                : "border-ink/20 hover:border-neon hover:text-accent-ink text-ink/80"
            }`}
          >
            {c}
          </button>
        ))}
        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={(e) => {
            const v = e.target.value.replace(/[^\d,.\s]/g, "").slice(0, 20);
            setAmount(v);
            emit(currency, v);
          }}
          placeholder={currency === "USD" ? "e.g. 1,500" : "e.g. 80,000"}
          className={`flex-1 min-w-[140px] bg-transparent border-b border-ink/20 py-2 text-lg outline-none focus:border-neon transition-colors placeholder:text-ink/30 ${
            dark ? "text-ink" : ""
          }`}
        />
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink/40">
        A rough range is fine — I scope to fit, and I'll be honest if a brief isn't a match
      </p>
    </fieldset>
  );
}
