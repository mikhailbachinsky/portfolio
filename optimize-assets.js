import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        try {
          const stats = fs.statSync(fullPath);
          const isDictionary = fullPath.includes('dictionary-pages');
          const maxWidth = isDictionary ? 400 : 700;
          const quality = isDictionary ? 45 : 60;

          const image = sharp(fullPath);
          const metadata = await image.metadata();
          
          let pipeline = image;
          if (metadata.width && metadata.width > maxWidth) {
            pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
          }

          let buffer;
          if (ext === '.png') {
            buffer = await pipeline.png({ quality: quality, compressionLevel: 9 }).toBuffer();
          } else if (ext === '.webp') {
            buffer = await pipeline.webp({ quality: quality }).toBuffer();
          } else {
            buffer = await pipeline.jpeg({ quality: quality }).toBuffer();
          }

          if (buffer.length < stats.size) {
            fs.writeFileSync(fullPath, buffer);
            console.log(`Optimized ${fullPath}: ${(stats.size / 1024).toFixed(1)}KB -> ${(buffer.length / 1024).toFixed(1)}KB`);
          }
        } catch (err) {
          console.error(`Error processing ${fullPath}:`, err.message);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting aggressive asset optimization...');
  await processDir('public');
  console.log('Aggressive optimization completed.');
}

run();
