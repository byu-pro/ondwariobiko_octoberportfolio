import fs from 'node:fs';
import { execSync } from 'node:child_process';

// 1. Ensure index.html has the dev entry for Vite build
fs.copyFileSync('index.dev.html', 'index.html');

// 2. Run vite build
execSync('npx vite build', { stdio: 'inherit' });

// 3. Sync dist outputs to root and docs for GitHub Pages
fs.cpSync('dist/assets', 'assets', { recursive: true });
fs.cpSync('dist/images', 'images', { recursive: true });
fs.cpSync('dist/.nojekyll', '.nojekyll');
if (fs.existsSync('docs')) {
  fs.rmSync('docs', { recursive: true, force: true });
}
fs.cpSync('dist', 'docs', { recursive: true });
fs.copyFileSync('dist/index.html', 'index.html');

console.log('✅ Successfully built and synced production files to root, assets, images, and docs!');
