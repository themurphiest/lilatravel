// ═══════════════════════════════════════════════════════════════════════════════
// APP — Router wrapper & site map
// ═══════════════════════════════════════════════════════════════════════════════
//
// SITE MAP:
//
//   /                              → Homepage
//   /plan                          → Trip Planner (full-screen onboarding flow)
//   /destinations                  → Destinations landing (grid of all destinations)
//   /destinations/zion-canyon      → Dedicated Zion guide (custom page)
//   /destinations/:slug            → Generic destination guide (auto-generated)
//   /approach                      → Our Approach (three braids + philosophy)
//   /approach/:slug                → Individual philosophy detail
//   /how-it-works                  → How It Works (ways to get started)
//   /trips/:slug                   → Individual Threshold Trip detail
//   /itineraries/utah              → Utah National Parks itinerary (PWA trip guide)
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
// ─── HOW TO ADD A NEW ITINERARY ──────────────────────────────────────────────
//
//   1. Create your itinerary in src/itineraries/<destination>/
//   2. Import the main component below
//   3. Add a <Route> under the Itineraries section
//
// ═══════════════════════════════════════════════════════════════════════════════

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { C } from '@data/brand';

// ─── Pages ──────────────────────────────────────────────────────────────────
import HomePage from '@pages/Home';
import DestinationsPage from '@pages/Destinations';
import DestinationGuide from '@pages/DestinationGuide';
import ApproachPage from '@pages/Approach';
import RitualDetail from '@pages/RitualDetail';  // TODO: rename file to ApproachDetail.jsx
import OfferingsPage from '@pages/Offerings';     // TODO: rename file to HowItWorks.jsx
import ContactPage from '@pages/Contact';
import PlanMyTrip from '@pages/PlanMyTrip';
import NotFound from '@pages/NotFound';
import TripPage from '@pages/trips/TripPage';
import ItineraryResults from './pages/ItineraryResults';

// ─── Dedicated Guides ───────────────────────────────────────────────────────
import ZionGuide from '@pages/guides/ZionGuide';
// import BigSurGuide from '@pages/guides/BigSurGuide';
// import JoshuaTreeGuide from '@pages/guides/JoshuaTreeGuide';

// ─── Itineraries ────────────────────────────────────────────────────────────
import UtahTripGuide from './itineraries/utah/UtahTripGuide';
// import BigSurItinerary from './itineraries/bigsur/BigSurItinerary';
// import ZionAutumnItinerary from './itineraries/zion-autumn/ZionAutumnItinerary';

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

          {/* Trip Planner — full-screen onboarding (no Nav/Footer) */}
          <Route path="/plan" element={<PlanMyTrip />} />
<Route path="/itinerary" element={<ItineraryResults />} />

          {/* Destinations */}
          <Route path="/destinations" element={<DestinationsPage />} />
          {/* ↓ Dedicated guides go HERE (above the generic :slug catch-all) */}
          <Route path="/destinations/zion-canyon" element={<ZionGuide />} />
          {/* <Route path="/destinations/big-sur" element={<BigSurGuide />} /> */}
          {/* ↓ Generic guide for destinations without a dedicated page */}
          <Route path="/destinations/:slug" element={<DestinationGuide />} />

          {/* Our Approach */}
          <Route path="/approach" element={<ApproachPage />} />
          <Route path="/approach/:slug" element={<RitualDetail />} />

          {/* Trips (Threshold Trip detail pages) */}
          <Route path="/trips/:slug" element={<TripPage />} />

          {/* Itineraries (self-contained trip guides) */}
          <Route path="/itineraries/utah" element={<UtahTripGuide />} />
          {/* <Route path="/itineraries/big-sur" element={<BigSurItinerary />} /> */}
          {/* <Route path="/itineraries/zion-autumn" element={<ZionAutumnItinerary />} /> */}

          {/* Other pages */}
          <Route path="/how-it-works" element={<OfferingsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
