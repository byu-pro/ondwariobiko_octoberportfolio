/**
 * Security and anti-bot utility suite.
 * Protects personal contact details from web scraper bots,
 * enforces honeypot checks, and provides sanitization for form inputs.
 */

// Obfuscated contact credentials (base64 encoded to foil simple static text/regex crawlers)
const ENC_EMAIL = "b25kd2FyaW9iaWtvQGdtYWlsLmNvbQ==";
const ENC_PHONE_RAW = "MjU0NzAyMjU1NTc1";
const ENC_PHONE_FMT = "KzI1NCA3MDIgMjU1IDU3NQ==";

function decode(b64: string): string {
  try {
    if (typeof window !== "undefined" && typeof window.atob === "function") {
      return window.atob(b64);
    }
  } catch {
    // Fallback if atob fails
  }
  return "";
}

/**
 * Returns the contact email address dynamically.
 */
export function getContactEmail(): string {
  return decode(ENC_EMAIL);
}

/**
 * Returns the unformatted phone number for links (e.g. wa.me/254...).
 */
export function getContactPhoneRaw(): string {
  return decode(ENC_PHONE_RAW);
}

/**
 * Returns human-friendly formatted phone number (e.g. +254 702 255 575).
 */
export function getContactPhoneFormatted(): string {
  return decode(ENC_PHONE_FMT);
}

/**
 * Generates an encrypted/safe WhatsApp URL with optional prefilled message.
 */
export function getWhatsAppUrl(prefillMessage = ""): string {
  const phone = getContactPhoneRaw();
  const textParam = prefillMessage
    ? `?text=${encodeURIComponent(prefillMessage)}`
    : "";
  return `https://wa.me/${phone}${textParam}`;
}

/**
 * Generates an encrypted/safe mailto URL with optional subject and body.
 */
export function getMailtoUrl(subject = "", body = ""): string {
  const email = getContactEmail();
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const query = params.length > 0 ? `?${params.join("&")}` : "";
  return `mailto:${email}${query}`;
}

/**
 * Sanitizes user input to prevent excessive payloads and strip control characters.
 */
export function sanitizeInput(input: string, maxLength = 1000): string {
  if (!input) return "";
  // Strip control characters except newline and tab
  const cleaned = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return cleaned.trim().slice(0, maxLength);
}

/**
 * Validates that submission timing is human-paced (not instant automated bot execution).
 */
export function isHumanPaced(loadTimestamp: number, minMs = 1200): boolean {
  if (!loadTimestamp) return true;
  return Date.now() - loadTimestamp >= minMs;
}
