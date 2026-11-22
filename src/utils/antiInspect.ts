/**
 * Anti-Inspection, Anti-Scraping, and Asset Theft Prevention.
 * Protects design assets, case study text, and code from casual copying,
 * right-click saving, image drag-and-drop, and browser source inspection.
 */

export function initAntiInspect(): () => void {
  if (typeof window === "undefined") return () => {};

  // 1. Block DevTools and View Source keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent) => {
    // F12
    if (e.key === "F12") {
      e.preventDefault();
      return false;
    }

    // Ctrl+U or Cmd+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U")) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I / J / C (DevTools) or Cmd+Option+I / J / C
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      ["I", "i", "J", "j", "C", "c"].includes(e.key)
    ) {
      e.preventDefault();
      return false;
    }

    // Ctrl+S or Cmd+S (Save webpage)
    if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
      e.preventDefault();
      return false;
    }
  };

  // 2. Block Context Menu (Right Click) across visual presentation and media
  const handleContextMenu = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    // Allow right click inside form inputs so clients can paste notes/emails
    if (
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable)
    ) {
      return;
    }
    e.preventDefault();
  };

  // 3. Block Drag-and-Drop of images and video assets
  const handleDragStart = (e: DragEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === "IMG" || target.tagName === "VIDEO")) {
      e.preventDefault();
      return false;
    }
  };

  // 4. Stylized deterrent warning in browser console
  const showConsoleWarning = () => {
    try {
      const banner =
        "color: #d9fd17; background: #000000; font-size: 20px; font-weight: 800; padding: 6px 12px; border: 1px solid #d9fd17; border-radius: 4px;";
      const body =
        "color: #ffffff; background: #0a0a0a; font-size: 12px; padding: 6px 12px; line-height: 1.5;";
      console.log("%c⚠️ PROTECTED INTELLECTUAL PROPERTY", banner);
      console.log(
        "%cAll code, branding systems, design rationales, and media on this portfolio are the exclusive property of Ondwari Obiko.\nUnauthorized scraping, copying, reverse-engineering, or asset extraction is monitored.",
        body
      );
    } catch {
      // Ignore
    }
  };

  window.addEventListener("keydown", handleKeyDown, { capture: true });
  window.addEventListener("contextmenu", handleContextMenu, { capture: true });
  window.addEventListener("dragstart", handleDragStart, { capture: true });
  showConsoleWarning();

  return () => {
    window.removeEventListener("keydown", handleKeyDown, { capture: true });
    window.removeEventListener("contextmenu", handleContextMenu, { capture: true });
    window.removeEventListener("dragstart", handleDragStart, { capture: true });
  };
}
