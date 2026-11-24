export function responsiveImageSrcSet(src: string): string | undefined {
  if (!src.toLowerCase().endsWith('.webp')) return undefined;
  const mobileSrc = src.replace(/\.webp$/i, '-960.webp');
  const isHighRes = /sketch|blackandwhite|whiteandblack/i.test(src);
  if (isHighRes) {
    return `${mobileSrc} 1440w, ${src} 2560w`;
  }
  return `${mobileSrc} 960w, ${src} 1920w`;
}
