import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ -1) >>> 0;
}

function makePng(width, height, getRgba) {
  const rowBytes = 1 + width * 4;
  const raw = Buffer.alloc(rowBytes * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    raw[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getRgba(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      raw[pxOffset] = r;
      raw[pxOffset + 1] = g;
      raw[pxOffset + 2] = b;
      raw[pxOffset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(raw);

  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bit
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(4 + 4 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4);
    data.copy(buf, 8);
    const crcBuf = Buffer.concat([Buffer.from(type), data]);
    buf.writeUInt32BE(crc32(crcBuf), 8 + len);
    return buf;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Ensure target dirs exist
const publicImagesDir = path.resolve('public/assets/images');
const assetsImagesDir = path.resolve('assets/images');
const publicIconsDir = path.resolve('public/assets/icons');
const assetsIconsDir = path.resolve('assets/icons');

fs.mkdirSync(publicImagesDir, { recursive: true });
fs.mkdirSync(assetsImagesDir, { recursive: true });
fs.mkdirSync(publicIconsDir, { recursive: true });
fs.mkdirSync(assetsIconsDir, { recursive: true });

function saveBoth(filename, buffer) {
  fs.writeFileSync(path.join(publicImagesDir, filename), buffer);
  fs.writeFileSync(path.join(assetsImagesDir, filename), buffer);
  console.log('Saved:', filename);
}

// 1. Software Icons (64x64)
// Figma
saveBoth('software-figma.png', makePng(64, 64, (x, y) => {
  // rounded badge with Figma colors
  const cx = 32, cy = 32;
  const inBorder = (x < 2 || x >= 62 || y < 2 || y >= 62);
  if (inBorder) return [209, 209, 214, 255];
  // Figma dots
  if (x >= 18 && x <= 32 && y >= 14 && y <= 26) return [242, 78, 30, 255]; // Red
  if (x >= 32 && x <= 46 && y >= 14 && y <= 26) return [255, 114, 98, 255]; // Coral
  if (x >= 18 && x <= 32 && y >= 26 && y <= 38) return [162, 89, 255, 255]; // Purple
  if (x >= 32 && x <= 46 && y >= 26 && y <= 38) return [26, 188, 254, 255]; // Blue
  if (x >= 18 && x <= 32 && y >= 38 && y <= 50) return [10, 207, 131, 255]; // Green
  return [255, 255, 255, 255];
}));

// Tilda (Black badge with white T)
saveBoth('software-tilda.png', makePng(64, 64, (x, y) => {
  if (x < 4 || x >= 60 || y < 4 || y >= 60) return [209, 209, 214, 255];
  if (y >= 18 && y <= 26 && x >= 18 && x <= 46) return [26, 26, 26, 255]; // Top bar
  if (y >= 26 && y <= 48 && x >= 28 && x <= 36) return [26, 26, 26, 255]; // Stem
  return [245, 245, 247, 255];
}));

// Adobe Illustrator (Dark badge with orange 'Ai')
saveBoth('software-ai.png', makePng(64, 64, (x, y) => {
  if (x < 2 || x >= 62 || y < 2 || y >= 62) return [51, 17, 0, 255];
  const isLetter = (x >= 18 && x <= 34 && y >= 20 && y <= 48 && (x === 18 || x === 34 || y === 20 || y === 34)) ||
                   (x >= 40 && x <= 46 && y >= 26 && y <= 48) ||
                   (x >= 40 && x <= 46 && y >= 18 && y <= 22);
  if (isLetter) return [255, 154, 0, 255];
  return [51, 17, 0, 255];
}));

// Adobe Photoshop (Dark badge with cyan 'Ps')
saveBoth('software-ps.png', makePng(64, 64, (x, y) => {
  if (x < 2 || x >= 62 || y < 2 || y >= 62) return [0, 29, 56, 255];
  const isP = (x >= 18 && x <= 32 && y >= 20 && y <= 48 && (x <= 24 || (y <= 34 && (y <= 24 || y >= 30 || x >= 28))));
  const isS = (x >= 36 && x <= 48 && y >= 24 && y <= 48 && (y <= 28 || y >= 44 || (y >= 34 && y <= 38) || (y < 34 && x <= 40) || (y > 38 && x >= 44)));
  if (isP || isS) return [49, 168, 255, 255];
  return [0, 29, 56, 255];
}));

// Adobe After Effects (Dark badge with purple 'Ae')
saveBoth('software-ae.png', makePng(64, 64, (x, y) => {
  if (x < 2 || x >= 62 || y < 2 || y >= 62) return [30, 0, 48, 255];
  const isLetter = (x >= 18 && x <= 32 && y >= 20 && y <= 48 && (x === 18 || x === 32 || y === 20 || y === 34)) ||
                   (x >= 38 && x <= 48 && y >= 26 && y <= 48 && (y === 26 || y === 36 || y === 48 || x === 38));
  if (isLetter) return [216, 134, 255, 255];
  return [30, 0, 48, 255];
}));

// CapCut
saveBoth('software-capcut.png', makePng(64, 64, (x, y) => {
  const isBlack = (y >= 16 && y <= 24 && x >= 16 && x <= 48) ||
                  (y >= 40 && y <= 48 && x >= 16 && x <= 48) ||
                  (x >= 28 && x <= 36 && y >= 24 && y <= 40);
  if (isBlack) return [26, 26, 26, 255];
  return [255, 255, 255, 255];
}));

// Google Workspace
saveBoth('software-workspace.png', makePng(64, 64, (x, y) => {
  if (x >= 16 && x <= 30 && y >= 16 && y <= 30) return [66, 133, 244, 255]; // Blue
  if (x >= 34 && x <= 48 && y >= 16 && y <= 30) return [234, 67, 53, 255]; // Red
  if (x >= 16 && x <= 30 && y >= 34 && y <= 48) return [251, 188, 4, 255]; // Yellow
  if (x >= 34 && x <= 48 && y >= 34 && y <= 48) return [52, 168, 83, 255]; // Green
  return [255, 255, 255, 255];
}));

// Vibecoding
saveBoth('software-vibecoding.png', makePng(64, 64, (x, y) => {
  const dist = Math.hypot(x - 32, y - 32);
  if (dist < 18) {
    const isStar = (Math.abs(x - 32) < 4 || Math.abs(y - 32) < 4);
    if (isStar) return [115, 111, 141, 255];
  }
  return [240, 242, 245, 255];
}));

// 2. Hero photo (915x507 transparent PNG with portrait silhouette)
saveBoth('hero-photo.png', makePng(915, 507, (x, y, w, h) => {
  // A clean silhouette of a designer with subtle shading in portfolio colors
  const cx = 500;
  const cy = 340;
  const dx = (x - cx) / 220;
  const dy = (y - cy) / 260;
  const inBody = (dx * dx + dy * dy < 1.0) && y > 180;
  const headDist = Math.hypot(x - 520, y - 160);
  const inHead = headDist < 90;

  if (inHead || inBody) {
    // Elegant duotone gradient matching site palette
    const mix = (x / w) * 0.5 + (y / h) * 0.5;
    const r = Math.round(99 + mix * 40);
    const g = Math.round(95 + mix * 40);
    const b = Math.round(125 + mix * 30);
    return [r, g, b, 240];
  }
  return [0, 0, 0, 0];
}));

// 3. About Cards (272 x 301)
// Copywriting
saveBoth('about-copywriting.jpg', makePng(272, 301, (x, y) => {
  const grid = (x % 32 === 0 || y % 32 === 0) ? 20 : 0;
  return [220 - grid, 222 - grid, 226 - grid, 255];
}));

// Design
saveBoth('about-design.jpg', makePng(272, 301, (x, y) => {
  const diag = (x + y) % 40 < 4 ? 25 : 0;
  return [210 - diag, 212 - diag, 218 - diag, 255];
}));

// Photo
saveBoth('about-photo.jpg', makePng(272, 301, (x, y) => {
  const circle = Math.hypot(x - 136, y - 150) < 60 ? 30 : 0;
  return [195 + circle, 198 + circle, 206 + circle, 255];
}));

// 4. Project Elements
// Tutor Puzzle
saveBoth('tutor-puzzle.png', makePng(412, 200, (x, y) => {
  if (x > 20 && y > 20 && x < 390 && y < 180 && ((x + y) % 60 < 6)) {
    return [115, 111, 141, 180];
  }
  return [0, 0, 0, 0];
}));

// Tutor Mascot
saveBoth('tutor-mascot.png', makePng(240, 300, (x, y) => {
  const dist = Math.hypot(x - 120, y - 160);
  if (dist < 90) return [115, 111, 141, 230];
  return [0, 0, 0, 0];
}));

// Iniciativa Stickers
saveBoth('iniciativa-stickers.png', makePng(94, 94, (x, y) => {
  const inSticker = (x > 10 && x < 84 && y > 10 && y < 84);
  if (inSticker) return [255, 88, 76, 255];
  return [0, 0, 0, 0];
}));

// Iniciativa Dogs
saveBoth('iniciativa-dogs.png', makePng(260, 280, (x, y) => {
  const inDog = Math.hypot(x - 130, y - 160) < 95;
  if (inDog) return [65, 217, 191, 240];
  return [0, 0, 0, 0];
}));

// Law Com Girl
saveBoth('law-com-girl.png', makePng(250, 340, (x, y) => {
  const inFigure = Math.hypot(x - 125, y - 180) < 100;
  if (inFigure) return [137, 107, 255, 230];
  return [0, 0, 0, 0];
}));

// Law Day Balloon
saveBoth('law-day-balloon.png', makePng(240, 310, (x, y) => {
  const inBalloon = Math.hypot(x - 120, y - 150) < 90;
  if (inBalloon) return [115, 111, 141, 240];
  return [0, 0, 0, 0];
}));

// Law Day Gift
saveBoth('law-day-gift.png', makePng(130, 130, (x, y) => {
  if (x > 15 && x < 115 && y > 25 && y < 115) {
    if (x >= 60 && x <= 70) return [255, 88, 76, 255];
    return [233, 232, 240, 255];
  }
  return [0, 0, 0, 0];
}));

// Law Day BG
saveBoth('law-day-bg.jpg', makePng(568, 421, (x, y) => {
  return [241, 241, 243, 255];
}));

// Also create a dummy resume.pdf so clicking doesn't 404
const resumeContent = Buffer.from('%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000052 00000 n\n0000000102 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n178\n%%EOF');
fs.writeFileSync(path.resolve('public/assets/resume.pdf'), resumeContent);
fs.writeFileSync(path.resolve('assets/resume.pdf'), resumeContent);
console.log('Saved resume.pdf');
