// ═══════════════════════════════════════════════════════════════════════════════
// APP — Router wrapper & site map
// ═══════════════════════════════════════════════════════════════════════════════
//
// SITE MAP:
//
//   /                              → Homepage
//   /destinations                  → Destinations landing (grid of all destinations)
//   /destinations/zion-canyon      → Dedicated Zion guide (custom page)
//   /destinations/:slug            → Generic destination guide (auto-generated)
//   /rituals                       → Rituals landing (all four pillars)
//   /rituals/:slug                 → Individual ritual detail
//   /offerings                     → Offerings / how it works
//   /contact                       → Contact page
//   *                              → 404
//
// ─── HOW TO ADD A NEW PAGE ───────────────────────────────────────────────────
//
//   1. Create your page component in src/pages/  (e.g. About.jsx)
//   2. Import it below
//   3. Add a <Route> with the path pattern
//   4. (Optional) Add a nav link in src/components/Nav.jsx
//   5. (Optional) Add a footer link in src/components/Footer.jsx
//
// ─── HOW TO ADD A NEW DEDICATED GUIDE ────────────────────────────────────────
//
//   1. Create your guide in src/pages/guides/  (e.g. BigSurGuide.jsx)
//   2. Import it below
//   3. Add a specific <Route> ABOVE the generic :slug route
//      (React Router matches top-to-bottom, first match wins)
//
// ═══════════════════════════════════════════════════════════════════════════════

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { C } from '@data/brand';

// ─── Pages ──────────────────────────────────────────────────────────────────
import HomePage from '@pages/Home';
import DestinationsPage from '@pages/Destinations';
import DestinationGuide from '@pages/DestinationGuide';
import RitualsPage from '@pages/Rituals';
import RitualDetail from '@pages/RitualDetail';
import OfferingsPage from '@pages/Offerings';
import ContactPage from '@pages/Contact';
import NotFound from '@pages/NotFound';

// ─── Dedicated Guides ───────────────────────────────────────────────────────
import ZionGuide from '@pages/guides/ZionGuide';
// import BigSurGuide from '@pages/guides/BigSurGuide';
// import JoshuaTreeGuide from '@pages/guides/JoshuaTreeGuide';

// ─── Scroll to top on route change ──────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{
      fontFamily: "'Quicksand', sans-serif",
      background: C.cream,
      color: C.darkInk,
      overflowX: "hidden",
    }}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Destinations */}
          <Route path="/destinations" element={<DestinationsPage />} />
          {/* ↓ Dedicated guides go HERE (above the generic :slug catch-all) */}
          <Route path="/destinations/zion-canyon" element={<ZionGuide />} />
          {/* <Route path="/destinations/big-sur" element={<BigSurGuide />} /> */}
          {/* ↓ Generic guide for destinations without a dedicated page */}
          <Route path="/destinations/:slug" element={<DestinationGuide />} />

          {/* Rituals */}
          <Route path="/rituals" element={<RitualsPage />} />
          <Route path="/rituals/:slug" element={<RitualDetail />} />

          {/* Other pages */}
          <Route path="/offerings" element={<OfferingsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
