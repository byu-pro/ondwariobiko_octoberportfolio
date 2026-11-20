export function responsiveImageSrcSet(src: string): string | undefined {
  if (!src.toLowerCase().endsWith('.webp')) return undefined;
  const mobileSrc = src.replace(/\.webp$/i, '-960.webp');
  return `${mobileSrc} 960w, ${src} 1920w`;
}
