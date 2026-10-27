# Ondwari Obiko — Portfolio Website

> Modern portfolio website for **Ondwari (John) Obiko** — Brand & Logo Designer, UI/UX Designer, and Frontend Developer based in Nairobi, Kenya.

---

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite 8](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** GitHub Pages via GitHub Actions CI/CD (`.github/workflows/deploy.yml`)

---

## 📁 Repository Structure

```text
ondwariobiko_octoberportfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Pages CI/CD workflow
├── public/
│   └── images/                  # High-res portraits, case study thumbnails & brand marks
├── src/
│   ├── App.tsx                  # Main portfolio application & sections
│   ├── index.css                # Tailwind CSS v4 theme and typography
│   └── main.tsx                 # React DOM entry point
├── .gitignore                   # Git ignore configuration
├── index.html                   # HTML entry point with metadata & web fonts
├── package.json                 # Project scripts and dependencies
├── tsconfig.json                # TypeScript compiler config
└── vite.config.ts               # Vite configuration
```

---

## 🛠️ Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Start the local development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Preview the production build
```bash
npm run preview
```

---

## 🌐 Linking & Pushing to GitHub

The repository is already initialized locally on branch `main` with the remote set to:
```text
https://github.com/ondwariobiko/ondwariobiko_octoberportfolio.git
```

### Next Steps to Push to GitHub:

1. **Create the repository on GitHub:**
   - Go to [https://github.com/new](https://github.com/new)
   - Repository name: `ondwariobiko_octoberportfolio`
   - Owner: `ondwariobiko`
   - Leave "Initialize this repository with a README" **unchecked**
   - Click **Create repository**

2. **Commit and Push:**
   ```bash
   git add .
   git commit -m "feat: initial commit for ondwariobiko_octoberportfolio"
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - On GitHub, go to your repository **Settings** → **Pages**
   - Under **Build and deployment** → **Source**, select **GitHub Actions**
   - The included workflow will automatically build and publish your portfolio!
