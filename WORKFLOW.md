# Lila Trips — Developer Workflow Cheatsheet

Keep this file in your `lila-trips/` project folder for easy reference.

---

## 1. Starting the Local Dev Server

Open Terminal, navigate to the project, and start:

```bash
cd /Users/charliekoch/Downloads/lila-trips   # or wherever your project lives
npm run dev
```

Opens at **http://localhost:5173** with hot reload — edits show up instantly.

To stop the server: **Ctrl + C** in Terminal.

---

## 2. Editing a Page with Claude

### What to upload

Only upload the files relevant to what you're working on:

| Working on... | Upload these files |
|---|---|
| A guide page (e.g. Zion) | `src/pages/guides/ZionGuide.jsx` + `src/data/brand.js` |
| The homepage | `src/pages/Home.jsx` + `src/data/brand.js` |
| Destinations landing | `src/pages/Destinations.jsx` + `src/data/destinations.js` |
| Rituals page | `src/pages/Rituals.jsx` + `src/data/rituals.js` |
| Adding a new destination | `src/data/destinations.js` |
| Changing brand colors/fonts | `src/data/brand.js` |
| Changing the nav or footer | `src/components/Nav.jsx` or `src/components/Footer.jsx` |

### After Claude gives you the updated file

1. **Download** the file from Claude
2. **Replace** the old file in your project (same filename, same folder)
3. If the dev server is running, changes show up automatically
4. If not, run `npm run dev` to see them

---

## 3. Adding a New Page

1. Create a new file in `src/pages/` (e.g. `About.jsx`)
2. Open `src/App.jsx` and add two lines:
   ```jsx
   import AboutPage from '@pages/About';       // at the top with other imports
   <Route path="/about" element={<AboutPage />} />  // inside <Routes>
   ```
3. Optionally add a link in `src/components/Nav.jsx` and/or `Footer.jsx`

---

## 4. Adding a New Dedicated Guide

1. Create a new file in `src/pages/guides/` (e.g. `BigSurGuide.jsx`)
2. Open `src/App.jsx` and add:
   ```jsx
   import BigSurGuide from '@pages/guides/BigSurGuide';
   <Route path="/destinations/big-sur" element={<BigSurGuide />} />
   ```
   **Important:** Put this route ABOVE the generic `/:slug` line

---

## 5. Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with the final optimized files.

Preview it locally before deploying:

```bash
npm run preview
```

---

## 6. Deploying

### Vercel (recommended)

```bash
npx vercel          # first time — follow the prompts
npx vercel --prod   # deploy to production
```

### Netlify

```bash
npx netlify deploy              # preview deploy
npx netlify deploy --prod       # production deploy
```

### Manual deploy

Upload the contents of the `dist/` folder to any static hosting provider.

**Important for React Router:** Your host needs to redirect all routes to `index.html`. Both Vercel and Netlify handle this automatically. If using another host, you may need to add a redirect/rewrite rule.

---

## Quick Reference

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server (hot reload) |
| `npm run build` | Build for production → `dist/` folder |
| `npm run preview` | Preview the production build locally |
| `npm install` | Install/update dependencies (run once, or after adding packages) |
| `Ctrl + C` | Stop the dev server |

---

## Project File Map

```
src/
  App.jsx                ← THE SITE MAP (routes live here)
  components/            ← Shared: Nav, Footer, FadeIn, PageHero, Breadcrumb
  pages/                 ← One file per page
    guides/              ← Dedicated destination guides
  data/                  ← Content: brand.js, destinations.js, rituals.js, etc.
  utils/                 ← Shared hooks
  styles/                ← Global CSS
```
