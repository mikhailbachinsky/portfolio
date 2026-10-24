import { startCoverFramesBackgroundLoad } from './coverFramesPreloader';

export const TOTAL_FRAMES = 40;

// Global shared array so Preloader and Hero share the exact same loaded HTMLImageElement instances
const globalImages: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);

export function getGlobalImage(index: number): HTMLImageElement | null {
  return globalImages[index] || null;
}

export function getGlobalImagesArray(): (HTMLImageElement | null)[] {
  return globalImages;
}

export function loadSingleFrame(index: number, onDone?: () => void): HTMLImageElement {
  if (index < 0 || index >= TOTAL_FRAMES) {
    index = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
  }

  if (globalImages[index]) {
    if (globalImages[index]!.complete) {
      if (onDone) setTimeout(onDone, 0);
    } else if (onDone) {
      const img = globalImages[index]!;
      img.addEventListener('load', () => onDone(), { once: true });
      img.addEventListener('error', () => onDone(), { once: true });
    }
    return globalImages[index]!;
  }

  const img = new Image();
  const fileNum = Math.round((index / (TOTAL_FRAMES - 1)) * 119) + 1;
  const num = String(fileNum).padStart(3, '0');
  img.src = `/book-frames/frame_${num}.webp`;

  if (onDone) {
    img.onload = () => onDone();
    img.onerror = () => onDone();
  }

  globalImages[index] = img;
  return img;
}

export function getBestAvailableFrame(index: number): HTMLImageElement | null {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
  if (globalImages[clamped] && globalImages[clamped]!.complete && globalImages[clamped]!.naturalWidth > 0) {
    return globalImages[clamped];
  }
  for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
    const prev = clamped - offset;
    if (prev >= 0 && globalImages[prev] && globalImages[prev]!.complete && globalImages[prev]!.naturalWidth > 0) {
      return globalImages[prev];
    }
    const next = clamped + offset;
    if (next < TOTAL_FRAMES && globalImages[next] && globalImages[next]!.complete && globalImages[next]!.naturalWidth > 0) {
      return globalImages[next];
    }
  }
  return null;
}

// Preload 100% of frames in parallel so scrolling is 100% local RAM lookup
export function preloadCriticalFrames(onProgress: (percent: number) => void, onComplete: () => void) {
  // Also start cover frames background load immediately
  startCoverFramesBackgroundLoad();

  const total = TOTAL_FRAMES;
  let loadedCount = 0;
  let finished = false;

  const onFrameDone = () => {
    if (finished) return;
    loadedCount++;
    const percent = Math.min(Math.round((loadedCount / total) * 100), 100);
    onProgress(percent);

    if (loadedCount >= total) {
      finished = true;
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      onComplete();
    }
  };

  const fallbackTimeout = setTimeout(() => {
    if (!finished) {
      finished = true;
      onProgress(100);
      onComplete();
    }
  }, 4000);

  // Load all 40 frames in parallel
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    loadSingleFrame(i, onFrameDone);
  }
}

// Background loader for remaining unsampled frames after preloader hides
export function startRemainingFramesBackgroundLoad() {
  let idx = 0;
  const BATCH_SIZE = 12;

  function step() {
    let count = 0;
    while (idx < TOTAL_FRAMES && count < BATCH_SIZE) {
      if (!globalImages[idx]) {
        loadSingleFrame(idx);
        count++;
      }
      idx++;
    }

    if (idx < TOTAL_FRAMES) {
      setTimeout(step, 20);
    }
  }

  setTimeout(step, 30);
}

// Precomputed horizontal center fraction (cx / frameWidth) for all 120 frames (decimated from 240)
export const BOOK_FRAME_CX: number[] = [
  0.6980, 0.6980, 0.6980, 0.6980, 0.6980, 0.6980, 0.6973, 0.6973, 0.6961, 0.6953,
  0.6945, 0.6934, 0.6914, 0.6902, 0.6883, 0.6867, 0.6848, 0.6730, 0.6480, 0.6230,
  0.6004, 0.5797, 0.5621, 0.5473, 0.5355, 0.5273, 0.5223, 0.5203, 0.5195, 0.5215,
  0.5184, 0.5137, 0.5098, 0.5062, 0.5035, 0.5023, 0.5016, 0.5008, 0.5004, 0.4996,
  0.4961, 0.4977, 0.4984, 0.4977, 0.4980, 0.4977, 0.4980, 0.4977, 0.4980, 0.4984,
  0.5000, 0.4992, 0.5008, 0.5020, 0.5043, 0.5043, 0.5035, 0.5043, 0.5035, 0.5035,
];
