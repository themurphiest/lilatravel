# Lila Trips

Wellness travel for adventure seekers. Plan Less. Experience More.

---

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build & Deploy

```bash
npm run build     # outputs to dist/
npm run preview   # preview the build locally
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

---

## Project Structure

```
src/
  App.jsx                   ← Router wrapper (THE SITE MAP — start here)
  main.jsx                  ← Entry point

  components/               ← Shared across all pages
    Nav.jsx                 ← Navigation bar (wordmark + links)
    Footer.jsx              ← Site footer
    FadeIn.jsx              ← Scroll-triggered animation
    PageHero.jsx            ← Reusable hero banner for subpages
    Breadcrumb.jsx          ← Navigation breadcrumb trail
    index.js                ← Barrel export (import { Nav, Footer } from '@components')

  pages/                    ← One file per page/route
    Home.jsx                ← Homepage (/ route)
    Destinations.jsx        ← Destinations landing (/destinations)
    DestinationGuide.jsx    ← Generic guide for any destination (/destinations/:slug)
    Rituals.jsx             ← Rituals landing (/rituals)
    RitualDetail.jsx        ← Individual ritual (/rituals/:slug)
    Offerings.jsx           ← How it works (/offerings)
    Contact.jsx             ← Contact page (/contact)
    NotFound.jsx            ← 404 page

    guides/                 ← Dedicated guide pages (override the generic)
      ZionGuide.jsx         ← Zion Canyon guide (/destinations/zion-canyon)

  data/                     ← Content & brand constants
    brand.js                ← Colors, fonts (THE source of truth)
    photos.js               ← Image URLs (swap placeholders for real photos)
    destinations.js         ← Destination data array
    rituals.js              ← Rituals pillars data
    journey.js              ← Offerings steps + hero callouts

  utils/
    hooks.js                ← Shared React hooks (useInView, useDayCycle, etc.)

  styles/
    global.css              ← Global styles + responsive breakpoints
```

---

## Site Map

| Path | Page | File |
|------|------|------|
| `/` | Homepage | `pages/Home.jsx` |
| `/destinations` | Destinations landing | `pages/Destinations.jsx` |
| `/destinations/zion-canyon` | Zion guide (dedicated) | `pages/guides/ZionGuide.jsx` |
| `/destinations/:slug` | Generic destination guide | `pages/DestinationGuide.jsx` |
| `/rituals` | Rituals landing | `pages/Rituals.jsx` |
| `/rituals/:slug` | Individual ritual | `pages/RitualDetail.jsx` |
| `/offerings` | Offerings / how it works | `pages/Offerings.jsx` |
| `/contact` | Contact | `pages/Contact.jsx` |
| `*` | 404 | `pages/NotFound.jsx` |

---

## Workflow: Editing Pages in Claude

The whole point of this structure is that you can work on individual pages
without uploading the entire project. Here's the workflow:

### To iterate on a specific page (e.g. ZionGuide):

1. **Upload to Claude:**
   - `src/pages/guides/ZionGuide.jsx` (the page you're editing)
   - `src/data/brand.js` (colors)
   - `src/data/photos.js` (image refs, if needed)

2. **Tell Claude what you want to change**

3. **Download the updated file** and drop it back into your project

4. **Run `npm run dev`** to see the changes

### To add a brand new page:

1. Create a new file in `src/pages/` (e.g. `About.jsx`)
2. Open `src/App.jsx` and add:
   ```jsx
   import AboutPage from '@pages/About';
   // ...
   <Route path="/about" element={<AboutPage />} />
   ```
3. (Optional) Add a nav link in `src/components/Nav.jsx`

### To add a new dedicated guide:

1. Create a new file in `src/pages/guides/` (e.g. `BigSurGuide.jsx`)
2. Open `src/App.jsx` and add the route **ABOVE** the generic `:slug` route:
   ```jsx
   import BigSurGuide from '@pages/guides/BigSurGuide';
   // ...
   <Route path="/destinations/big-sur" element={<BigSurGuide />} />
   ```

### To add a new destination:

1. Open `src/data/destinations.js`
2. Add an entry to the array
3. It automatically shows up on the homepage carousel and destinations landing
4. Set `guideAvailable: true` when you have a full guide ready

---

## Import Aliases

The project uses Vite aliases for clean imports:

| Alias | Path |
|-------|------|
| `@` | `src/` |
| `@components` | `src/components/` |
| `@pages` | `src/pages/` |
| `@data` | `src/data/` |
| `@utils` | `src/utils/` |

Example:
```jsx
import { Nav, Footer, FadeIn } from '@components';
import { C } from '@data/brand';
```

---

## Brand Constants

All colors and fonts are defined in `src/data/brand.js`:

```js
import { C } from '@data/brand';

C.cream       // #f5f1ea
C.warmWhite   // #faf8f4
C.stone       // #e8e2d9
C.slate       // #3D5A6B
C.skyBlue     // #7BB8D4
C.oceanTeal   // #4A9B9F
C.sunSalmon   // #E8A090
C.goldenAmber // #D4A853
C.seaGlass    // #7BB8A0
C.darkInk     // #1a2530
```

---

## Template: New Page

```jsx
import { Nav, Footer, FadeIn, PageHero } from '@components';
import { C } from '@data/brand';

export default function MyNewPage() {
  return (
    <>
      <Nav />
      <PageHero
        eyebrow="Section"
        title="Page Title"
        subtitle="A lovely subtitle."
        gradient={`linear-gradient(165deg, ${C.slate}, ${C.darkInk})`}
        accentColor={C.skyBlue}
      />

      <section className="page-content" style={{ padding: "80px 52px", background: C.cream }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <p>Your content here.</p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
```
