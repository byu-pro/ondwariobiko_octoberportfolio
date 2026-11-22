import fs from 'node:fs';
import { execSync } from 'node:child_process';
import './prepare-images.mjs';

// 1. Ensure index.html has the dev entry for Vite build
fs.copyFileSync('index.dev.html', 'index.html');

// 2. Run vite build
execSync('npx vite build', { stdio: 'inherit' });

// 3. Sync dist outputs to root and docs for GitHub Pages
if (fs.existsSync('assets')) {
  fs.rmSync('assets', { recursive: true, force: true });
}
fs.cpSync('dist/assets', 'assets', { recursive: true });
try {
  if (fs.existsSync('dist/images')) {
    fs.cpSync('dist/images', 'images', { recursive: true, force: true });
  }
} catch {
  // Ignore mapped/locked files in source images directory
}
fs.cpSync('dist/.nojekyll', '.nojekyll');
if (fs.existsSync('dist/robots.txt')) {
  fs.copyFileSync('dist/robots.txt', 'robots.txt');
}
if (fs.existsSync('dist/sitemap.xml')) {
  fs.copyFileSync('dist/sitemap.xml', 'sitemap.xml');
}
if (fs.existsSync('dist/.well-known')) {
  fs.cpSync('dist/.well-known', '.well-known', { recursive: true });
}
if (fs.existsSync('docs')) {
  fs.rmSync('docs', { recursive: true, force: true });
}
fs.cpSync('dist', 'docs', { recursive: true });
fs.copyFileSync('dist/index.html', 'index.html');

console.log('✅ Successfully built and synced production files to root, assets, images, and docs!');
