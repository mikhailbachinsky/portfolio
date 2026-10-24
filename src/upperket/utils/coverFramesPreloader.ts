export const TOTAL_COVER_FRAMES = 24;

const globalCoverImages: (HTMLImageElement | null)[] = new Array(TOTAL_COVER_FRAMES).fill(null);

export function getCoverImage(index: number): HTMLImageElement | null {
  return globalCoverImages[index] || null;
}

export function getBestAvailableCoverImage(index: number): HTMLImageElement | null {
  const clamped = Math.max(0, Math.min(TOTAL_COVER_FRAMES - 1, Math.round(index)));
  if (globalCoverImages[clamped] && globalCoverImages[clamped]!.complete && globalCoverImages[clamped]!.naturalWidth > 0) {
    return globalCoverImages[clamped];
  }
  // Find closest loaded frame
  for (let offset = 1; offset < TOTAL_COVER_FRAMES; offset++) {
    const prev = clamped - offset;
    if (prev >= 0 && globalCoverImages[prev] && globalCoverImages[prev]!.complete && globalCoverImages[prev]!.naturalWidth > 0) {
      return globalCoverImages[prev];
    }
    const next = clamped + offset;
    if (next < TOTAL_COVER_FRAMES && globalCoverImages[next] && globalCoverImages[next]!.complete && globalCoverImages[next]!.naturalWidth > 0) {
      return globalCoverImages[next];
    }
  }
  return null;
}

export function getGlobalCoverImagesArray(): (HTMLImageElement | null)[] {
  return globalCoverImages;
}

export function loadSingleCoverFrame(index: number, onDone?: () => void): HTMLImageElement {
  if (index < 0 || index >= TOTAL_COVER_FRAMES) {
    index = Math.max(0, Math.min(TOTAL_COVER_FRAMES - 1, index));
  }

  if (globalCoverImages[index]) {
    if (globalCoverImages[index]!.complete) {
      if (onDone) setTimeout(onDone, 0);
    } else if (onDone) {
      const img = globalCoverImages[index]!;
      img.addEventListener('load', () => onDone(), { once: true });
      img.addEventListener('error', () => onDone(), { once: true });
    }
    return globalCoverImages[index]!;
  }

  const img = new Image();
  const fileNum = Math.round((index / (TOTAL_COVER_FRAMES - 1)) * 47) + 1;
  const num = String(fileNum).padStart(3, '0');
  img.src = `/cover-frames/frame_${num}.webp`;

  if (onDone) {
    img.onload = () => onDone();
    img.onerror = () => onDone();
  }

  globalCoverImages[index] = img;
  return img;
}

// Progressive background loader: loads all 48 cover frames in parallel
export function startCoverFramesBackgroundLoad() {
  for (let i = 0; i < TOTAL_COVER_FRAMES; i++) {
    loadSingleCoverFrame(i);
  }
}

export function preloadPriorityCoverFrames(centerIndex: number, windowSize = 12) {
  for (let off = -windowSize; off <= windowSize; off++) {
    const idx = centerIndex + off;
    if (idx >= 0 && idx < TOTAL_COVER_FRAMES) {
      loadSingleCoverFrame(idx);
    }
  }
}
