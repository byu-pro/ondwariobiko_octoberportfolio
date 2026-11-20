import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

execSync('python scripts/convert_images.py', { stdio: 'inherit' });

if (fs.existsSync('images')) {
  fs.cpSync('images', 'public/images', { recursive: true });
}

function removeOriginalRasters(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      removeOriginalRasters(entryPath);
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      const webpPath = entryPath.replace(/\.(png|jpe?g)$/i, '.webp');
      if (fs.existsSync(webpPath)) fs.rmSync(entryPath);
    }
  }
}

if (fs.existsSync('public/images')) removeOriginalRasters('public/images');
