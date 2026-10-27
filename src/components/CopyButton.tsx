import React, { useState } from 'react';

interface CopyButtonProps {
  value: string;
  label: string;
}

export function CopyButton({ value, label }: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    let copied = false;
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
    } catch {
      const field = document.createElement("textarea");
      const previousFocus = document.activeElement as HTMLElement | null;
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      } finally {
        field.remove();
        previousFocus?.focus({ preventScroll: true });
      }
    }
    setStatus(copied ? "copied" : "failed");
    if (copied) {
      setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <div className="shrink-0 flex flex-col items-end">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="min-h-11 min-w-20 px-3 font-mono text-[10px] uppercase tracking-widest text-ink/70 hover:text-accent-ink transition-colors cursor-pointer"
      >
        {status === "copied" ? "✓ Copied" : "Copy"}
      </button>
      <span className="sr-only" role="status">
        {status === "copied"
          ? `${label} copied to clipboard.`
          : status === "failed"
            ? "Could not copy. Please select and copy manually."
            : ""}
      </span>
    </div>
  );
}
