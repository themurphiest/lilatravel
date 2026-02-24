// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: 404
// ═══════════════════════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { Nav, Footer } from '@components';
import { C } from '@data/brand';

export default function NotFound() {
  return (
    <>
      <Nav />
      <section style={{
        minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: C.cream, paddingTop: 80,
      }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 80, fontWeight: 300, color: C.stone, display: "block", marginBottom: 16,
          }}>404</span>
          <h2 style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 24, fontWeight: 300, color: C.darkInk, marginBottom: 16,
          }}>Trail Not Found</h2>
          <p style={{
            fontFamily: "'Quicksand'", fontSize: 14, color: "#7a90a0",
            lineHeight: 1.8, marginBottom: 32,
          }}>Looks like this path hasn't been blazed yet. Let's get you back on track.</p>
          <Link to="/" className="underline-link">Back to Home</Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
