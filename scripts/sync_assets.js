import fs from 'fs';
import path from 'path';

function syncFolder(folderName) {
  const srcDir = path.join(process.cwd(), 'assets', folderName);
  const publicDir = path.join(process.cwd(), 'public', 'assets', folderName);

  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    if (file.includes('-1.')) {
      const cleanName = file.replace('-1.', '.');
      const oldPath = path.join(srcDir, file);
      const newPath = path.join(srcDir, cleanName);
      console.log(`[sync] Renaming ${file} -> ${cleanName}`);
      fs.copyFileSync(oldPath, newPath);
      fs.unlinkSync(oldPath);
    }
  }

  // Copy all to public
  const updatedFiles = fs.readdirSync(srcDir);
  for (const file of updatedFiles) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(publicDir, file);
    fs.copyFileSync(srcPath, destPath);
  }
}

syncFolder('images');
syncFolder('icons');
console.log('[sync] Synchronized assets/images and assets/icons to public/');
