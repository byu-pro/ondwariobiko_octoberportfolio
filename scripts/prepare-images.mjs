import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

execSync('python scripts/convert_images.py', { stdio: 'inherit' });

const generatedPublicDirectory = path.join('.generated', 'public');
const generatedImagesDirectory = path.join(generatedPublicDirectory, 'images');

fs.rmSync(generatedPublicDirectory, { recursive: true, force: true });
fs.mkdirSync(generatedPublicDirectory, { recursive: true });
if (fs.existsSync('public')) {
  fs.cpSync('public', generatedPublicDirectory, { recursive: true });
}
fs.rmSync(generatedImagesDirectory, { recursive: true, force: true });
if (fs.existsSync('images')) {
  fs.cpSync('images', generatedImagesDirectory, { recursive: true });
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

if (fs.existsSync(generatedImagesDirectory)) removeOriginalRasters(generatedImagesDirectory);
