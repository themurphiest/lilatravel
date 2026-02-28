import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { C as BrandC } from '@data/brand';

const C = {
  ...BrandC,
  cream: BrandC.cream,
  slate: BrandC.darkInk,
  sage: '#6B8078',
  white: '#FFFFFF',
};

// ═══════════════════════════════════════════════════════════════════════════════
// LOGISTICS PLACEHOLDER CARDS
// These are the fillable sections the traveler can complete later
// ═══════════════════════════════════════════════════════════════════════════════

function LogisticsCard({ title, icon, fields, color = C.sage }) {
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState({});

  return (
    <div style={{
      background: C.white,
      border: `1.5px dashed ${color}40`,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 16,
      transition: 'all 0.3s',
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'none', border: 'none', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
          <div>
            <div style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 13, fontWeight: 600, color: C.slate,
            }}>{title}</div>
            <div style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 11, color: `${C.sage}80`,
            }}>
              {expanded ? 'Tap to collapse' : 'Tap to add details'}
            </div>
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          stroke={C.sage} strokeWidth="1.5" strokeLinecap="round"
          style={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
          }}>
          <polyline points="4,6 8,10 12,6" />
        </svg>
      </button>

      {expanded && (
        <div style={{ padding: '0 20px 20px' }}>
          {fields.map(field => (
            <div key={field.key} style={{ marginBottom: 12 }}>
              <label style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: `${C.sage}80`,
                display: 'block', marginBottom: 6,
              }}>{field.label}</label>
              <input
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={values[field.key] || ''}
                onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                style={{
                  width: '100%',
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: 14, color: C.slate,
                  padding: '12px 14px',
                  border: `1px solid ${C.sage}25`,
                  borderRadius: 10,
                  background: `${C.cream}50`,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// ITINERARY CONTENT RENDERER
// Renders the markdown-style itinerary from Claude into styled sections
// ═══════════════════════════════════════════════════════════════════════════════

function ItineraryContent({ markdown }) {
  // Simple markdown-to-JSX renderer
  // Handles: # headings, ## subheadings, ### sub-sub, **bold**, *italic*,
  //          - bullets, --- dividers, and paragraphs
  const lines = markdown.split('\n');
  const elements = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Horizontal rule
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(
        <hr key={key++} style={{
          border: 'none',
          borderTop: `1px solid ${C.sage}20`,
          margin: '32px 0',
        }} />
      );
      continue;
    }

    // H1
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      elements.push(
        <h1 key={key++} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(28px, 7vw, 36px)', fontWeight: 300,
          color: C.slate, lineHeight: 1.2,
          margin: '32px 0 12px',
        }}>{processInline(line.slice(2))}</h1>
      );
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(22px, 5.5vw, 28px)', fontWeight: 400,
          color: C.slate, lineHeight: 1.25,
          margin: '28px 0 10px',
          paddingTop: 20,
          borderTop: `1px solid ${C.sage}15`,
        }}>{processInline(line.slice(3))}</h2>
      );
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 700,
          letterSpacing: '0.06em',
          color: C.sage, lineHeight: 1.3,
          margin: '20px 0 8px',
        }}>{processInline(line.slice(4))}</h3>
      );
      continue;
    }

    // Bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      elements.push(
        <div key={key++} style={{
          display: 'flex', gap: 10,
          padding: '4px 0', margin: '2px 0',
        }}>
          <span style={{ color: C.sage, flexShrink: 0, marginTop: 2 }}>•</span>
          <span style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 'clamp(13px, 3.4vw, 14px)', color: C.slate,
            lineHeight: 1.65,
          }}>{processInline(line.trim().slice(2))}</span>
        </div>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={key++} style={{ height: 8 }} />);
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} style={{
        fontFamily: "'Quicksand', sans-serif",
        fontSize: 'clamp(13px, 3.4vw, 14px)', color: C.slate,
        lineHeight: 1.75, margin: '6px 0',
      }}>{processInline(line)}</p>
    );
  }

  return <>{elements}</>;
}

// Process inline markdown: **bold** and *italic*
function processInline(text) {
  // Handle **bold**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    // Handle *italic*
    const italicParts = part.split(/(\*[^*]+\*)/g);
    return italicParts.map((ip, j) => {
      if (ip.startsWith('*') && ip.endsWith('*')) {
        return <em key={`${i}-${j}`} style={{ fontStyle: 'italic' }}>{ip.slice(1, -1)}</em>;
      }
      return ip;
    });
  });
}


// ═══════════════════════════════════════════════════════════════════════════════
// ITINERARY RESULTS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function ItineraryResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const { itinerary, metadata, formData } = location.state || {};

  useEffect(() => {
    if (!itinerary) {
      navigate('/plan');
      return;
    }
    setTimeout(() => setVisible(true), 100);
  }, [itinerary, navigate]);

  if (!itinerary) return null;

  const destName = formData?.destination
    ? formData.destination.charAt(0).toUpperCase() + formData.destination.slice(1)
    : 'your destination';

  const monthName = formData?.month
    ? formData.month.charAt(0).toUpperCase() + formData.month.slice(1)
    : '';

  return (
    <div style={{
      fontFamily: "'Quicksand', sans-serif",
      background: `linear-gradient(180deg, ${C.cream} 0%, ${C.white} 40%, ${C.cream} 100%)`,
      minHeight: '100vh',
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px',
        background: `${C.cream}ee`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
        <Link to="/" style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 'clamp(18px, 4.5vw, 22px)', fontWeight: 500,
          letterSpacing: '0.08em', color: C.slate, textDecoration: 'none',
        }}>Lila Trips</Link>
        <button onClick={() => navigate('/plan')} style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 12, fontWeight: 500, color: C.sage,
          background: 'none', border: `1px solid ${C.sage}30`,
          borderRadius: 20, padding: '8px 16px', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}>New Trip</button>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: 640, margin: '0 auto', padding: '24px 24px 80px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>

        {/* Travel Day — Logistics Scaffold */}
        <div style={{
          background: `${C.sage}08`,
          borderRadius: 20,
          padding: '28px 20px',
          marginBottom: 32,
        }}>
          <div style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 10, fontWeight: 700, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: C.sage,
            marginBottom: 16,
          }}>Your Trip Logistics</div>

          <LogisticsCard
            title="Flight Details"
            icon="✈️"
            color={BrandC.skyBlue}
            fields={[
              { key: 'airline', label: 'Airline', placeholder: 'e.g., Delta' },
              { key: 'confirmation', label: 'Confirmation #', placeholder: 'e.g., ABC123' },
              { key: 'departure', label: 'Departure', placeholder: 'e.g., SEA → LAS, 8:00am' },
              { key: 'return', label: 'Return Flight', placeholder: 'e.g., LAS → SEA, 6:00pm' },
            ]}
          />

          <LogisticsCard
            title="Rental Car"
            icon="🚗"
            color={BrandC.seaGlass}
            fields={[
              { key: 'company', label: 'Rental Company', placeholder: 'e.g., Enterprise' },
              { key: 'confirmation', label: 'Confirmation #', placeholder: 'e.g., J12345' },
              { key: 'pickup', label: 'Pickup Location', placeholder: 'e.g., LAS Airport' },
            ]}
          />

          <LogisticsCard
            title="Accommodation"
            icon="🏨"
            color={BrandC.goldenAmber}
            fields={[
              { key: 'hotel', label: 'Hotel / Lodge', placeholder: 'e.g., Cable Mountain Lodge' },
              { key: 'confirmation', label: 'Confirmation #', placeholder: '' },
              { key: 'checkin', label: 'Check-in Date & Time', placeholder: 'e.g., Oct 17, 3:00 PM' },
              { key: 'checkout', label: 'Check-out Date', placeholder: 'e.g., Oct 20' },
            ]}
          />

          <LogisticsCard
            title="Emergency & Essentials"
            icon="📋"
            color={BrandC.sunSalmon}
            fields={[
              { key: 'emergency', label: 'Emergency Contact', placeholder: 'Name & phone' },
              { key: 'insurance', label: 'Travel Insurance', placeholder: 'Policy #' },
              { key: 'notes', label: 'Notes', placeholder: 'Anything else to remember' },
            ]}
          />
        </div>

        {/* AI-Generated Itinerary */}
        <ItineraryContent markdown={itinerary} />

        {/* Footer */}
        <div style={{
          textAlign: 'center', marginTop: 48, paddingTop: 32,
          borderTop: `1px solid ${C.sage}15`,
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(18px, 4.5vw, 22px)', fontWeight: 300,
            color: C.slate, marginBottom: 8,
          }}>Ready to make it real?</div>
          <p style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 13, color: `${C.slate}70`, lineHeight: 1.6,
            maxWidth: 380, margin: '0 auto 24px',
          }}>
            Fill in your logistics above, and your complete trip document is ready to go.
          </p>
          <button onClick={() => navigate('/plan')} style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 13, fontWeight: 600,
            color: C.sage, background: 'none',
            border: `1.5px solid ${C.sage}40`,
            borderRadius: 30, padding: '14px 32px', cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}>Plan Another Trip</button>
        </div>
      </div>
    </div>
  );
}
