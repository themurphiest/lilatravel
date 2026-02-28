import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { C as BrandC } from '@data/brand';

const C = {
  ...BrandC,
  cream:      BrandC.cream,
  creamMid:   '#EDE7DC',
  slate:      BrandC.darkInk,
  slateLight: '#2d3d4d',
  sage:       '#6B8078',
  sageDark:   '#4A5A54',
  sageLight:  '#8FA39A',
  skyBlue:    BrandC.skyBlue,
  oceanTeal:  BrandC.oceanTeal,
  sunSalmon:  BrandC.sunSalmon,
  goldenAmber: BrandC.goldenAmber,
  seaGlass:   BrandC.seaGlass,
  white:      '#FFFFFF',
};

const TIME_COLORS = {
  morning:   '#E8C07A',
  midday:    BrandC.skyBlue,
  afternoon: BrandC.sunSalmon,
  evening:   '#8B7EC8',
  night:     '#6B7B8D',
};

// ─── Micro icons ────────────────────────────────────────────────────────────

const ChevronDown = ({ open, color = C.sage }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke={color} strokeWidth="1.8" strokeLinecap="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)', flexShrink: 0 }}>
    <polyline points="4,6 8,10 12,6" />
  </svg>
);

const StarIcon = ({ size = 14, color = C.goldenAmber }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} stroke="none">
    <path d="M8 1l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.8 3.8 14l.8-4.7L1.2 6l4.7-.7z" />
  </svg>
);

// ─── Smooth collapsible ─────────────────────────────────────────────────────

function Collapsible({ open, children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => { if (ref.current) setHeight(ref.current.scrollHeight); }, [open, children]);

  return (
    <div style={{
      maxHeight: open ? height + 40 : 0, opacity: open ? 1 : 0, overflow: 'hidden',
      transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
    }}>
      <div ref={ref} style={{ paddingTop: 12 }}>{children}</div>
    </div>
  );
}

// ─── Logistics card ─────────────────────────────────────────────────────────

function LogisticsCard({ title, icon, fields, color = C.sage }) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});

  return (
    <div style={{ background: C.white, border: `1.5px dashed ${color}35`, borderRadius: 14, overflow: 'hidden', marginBottom: 10 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, fontWeight: 600, color: C.slate }}>{title}</span>
        </div>
        <ChevronDown open={open} color={`${C.sage}60`} />
      </button>
      <Collapsible open={open}>
        <div style={{ padding: '0 18px 16px' }}>
          {fields.map(f => (
            <div key={f.key} style={{ marginBottom: 10 }}>
              <label style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: `${C.sage}70`, display: 'block', marginBottom: 5 }}>{f.label}</label>
              <input type={f.type || 'text'} placeholder={f.placeholder} value={values[f.key] || ''}
                onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                style={{ width: '100%', fontFamily: "'Quicksand', sans-serif", fontSize: 13, color: C.slate, padding: '10px 12px', border: `1px solid ${C.sage}20`, borderRadius: 8, background: `${C.cream}40`, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          ))}
        </div>
      </Collapsible>
    </div>
  );
}

// ─── Timeline block ─────────────────────────────────────────────────────────

function TimelineBlock({ time, title, summary, details, timeOfDay = 'morning', isLast = false }) {
  const [open, setOpen] = useState(false);
  const dotColor = TIME_COLORS[timeOfDay] || TIME_COLORS.morning;

  return (
    <div style={{ display: 'flex', gap: 14, minHeight: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor, border: `2px solid ${C.white}`, boxShadow: `0 0 0 2px ${dotColor}30`, flexShrink: 0, marginTop: 4 }} />
        {!isLast && <div style={{ width: 1.5, flex: 1, minHeight: 24, background: `linear-gradient(180deg, ${dotColor}30 0%, ${C.sage}10 100%)` }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 16 }}>
        <button onClick={() => details && setOpen(!open)} style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          width: '100%', background: 'none', border: 'none', cursor: details ? 'pointer' : 'default',
          textAlign: 'left', padding: 0, gap: 8, WebkitTapHighlightColor: 'transparent',
        }}>
          <div>
            {time && <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: dotColor, marginBottom: 3 }}>{time}</div>}
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px, 4.2vw, 19px)', fontWeight: 500, color: C.slate, lineHeight: 1.3 }}>{title}</div>
            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(12px, 3.2vw, 13px)', color: `${C.slate}70`, lineHeight: 1.5, marginTop: 4 }}>{summary}</div>
          </div>
          {details && <ChevronDown open={open} color={`${C.sage}40`} />}
        </button>
        {details && (
          <Collapsible open={open}>
            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(12px, 3.2vw, 13px)', color: `${C.slate}90`, lineHeight: 1.7, padding: '8px 0' }}>
              {typeof details === 'string' ? details.split('\n').map((line, i) => <p key={i} style={{ margin: '6px 0' }}>{line}</p>) : details}
            </div>
          </Collapsible>
        )}
      </div>
    </div>
  );
}

// ─── Pick card ──────────────────────────────────────────────────────────────

function PickCard({ category, pick, alternatives = [] }) {
  const [showAlts, setShowAlts] = useState(false);
  const styles = {
    stay: { label: 'Where to Stay', color: C.goldenAmber, icon: '🏡' },
    eat: { label: 'Where to Eat', color: C.sunSalmon, icon: '🍽' },
    gear: { label: 'Gear Rental', color: C.oceanTeal, icon: '🎒' },
    wellness: { label: 'Wellness', color: C.seaGlass, icon: '🧘' },
  };
  const s = styles[category] || styles.stay;

  return (
    <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${s.color}20`, overflow: 'hidden', marginBottom: 14 }}>
      <div style={{ padding: '12px 18px 10px', background: `${s.color}06`, borderBottom: `1px solid ${s.color}12` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>{s.icon}</span>
          <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: s.color }}>{s.label}</span>
        </div>
      </div>
      <div style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <StarIcon size={12} color={s.color} />
          <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: `${C.sage}70` }}>Our Pick</span>
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(17px, 4.5vw, 20px)', fontWeight: 500, color: C.slate, marginBottom: 4 }}>{pick.name}</div>
        <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(12px, 3.2vw, 13px)', color: `${C.slate}70`, lineHeight: 1.6 }}>{pick.why}</div>
        {pick.detail && <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, color: `${C.sage}80`, marginTop: 8, lineHeight: 1.5 }}>{pick.detail}</div>}
      </div>
      {alternatives.length > 0 && (
        <>
          <button onClick={() => setShowAlts(!showAlts)} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '10px 18px', background: `${C.cream}60`, border: 'none',
            borderTop: `1px solid ${s.color}10`, cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
          }}>
            <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 600, color: `${C.sage}80` }}>
              {showAlts ? 'Hide' : `${alternatives.length} other option${alternatives.length > 1 ? 's' : ''}`}
            </span>
            <ChevronDown open={showAlts} color={`${C.sage}50`} />
          </button>
          <Collapsible open={showAlts}>
            <div style={{ padding: '4px 18px 14px' }}>
              {alternatives.map((alt, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: i < alternatives.length - 1 ? `1px solid ${C.sage}10` : 'none' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(15px, 3.8vw, 17px)', fontWeight: 500, color: C.slate, marginBottom: 2 }}>{alt.name}</div>
                  <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(11px, 3vw, 12px)', color: `${C.slate}70`, lineHeight: 1.5 }}>{alt.why}</div>
                </div>
              ))}
            </div>
          </Collapsible>
        </>
      )}
    </div>
  );
}

// ─── Day card ───────────────────────────────────────────────────────────────

function DayCard({ day, isFirst = false }) {
  const [open, setOpen] = useState(isFirst);

  return (
    <div style={{ marginBottom: 16, borderRadius: 20, background: C.white, border: `1px solid ${C.sage}10`, boxShadow: `0 2px 16px ${C.sage}06`, overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 22px', background: open ? `${C.cream}50` : 'transparent',
        border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.3s',
        WebkitTapHighlightColor: 'transparent',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.sage, marginBottom: 4 }}>{day.label}</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px, 5.5vw, 26px)', fontWeight: 400, color: C.slate, lineHeight: 1.2 }}>{day.title}</div>
          {!open && day.snapshot && (
            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(11px, 3vw, 12px)', color: `${C.slate}55`, marginTop: 8, lineHeight: 1.6 }}>{day.snapshot}</div>
          )}
        </div>
        <ChevronDown open={open} />
      </button>
      <Collapsible open={open}>
        <div style={{ padding: '4px 22px 24px' }}>
          {day.intro && (
            <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(13px, 3.4vw, 14px)', color: `${C.slate}85`, lineHeight: 1.75, margin: '0 0 20px', fontStyle: 'italic' }}>{day.intro}</p>
          )}
          {day.timeline && day.timeline.map((block, i) => (
            <TimelineBlock key={i} time={block.time} title={block.title} summary={block.summary}
              details={block.details} timeOfDay={block.timeOfDay} isLast={i === day.timeline.length - 1} />
          ))}
          {day.picks && day.picks.map((pick, i) => (
            <PickCard key={i} category={pick.category} pick={pick.pick} alternatives={pick.alternatives} />
          ))}
        </div>
      </Collapsible>
    </div>
  );
}

// ─── Markdown fallback ──────────────────────────────────────────────────────

function MarkdownContent({ content }) {
  const lines = content.split('\n');
  const elements = [];
  let key = 0;
  for (const line of lines) {
    if (line.trim() === '---') { elements.push(<hr key={key++} style={{ border: 'none', borderTop: `1px solid ${C.sage}15`, margin: '28px 0' }} />); }
    else if (line.startsWith('# ') && !line.startsWith('## ')) { elements.push(<h1 key={key++} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px, 7vw, 34px)', fontWeight: 300, color: C.slate, lineHeight: 1.2, margin: '28px 0 10px' }}>{line.slice(2)}</h1>); }
    else if (line.startsWith('## ')) { elements.push(<h2 key={key++} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px, 5.5vw, 26px)', fontWeight: 400, color: C.slate, margin: '24px 0 8px' }}>{line.slice(3)}</h2>); }
    else if (line.startsWith('### ')) { elements.push(<h3 key={key++} style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 14, fontWeight: 700, color: C.sage, margin: '18px 0 6px' }}>{line.slice(4)}</h3>); }
    else if (line.trim().startsWith('- ')) { elements.push(<div key={key++} style={{ display: 'flex', gap: 8, padding: '3px 0' }}><span style={{ color: C.sage, flexShrink: 0 }}>•</span><span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, color: C.slate, lineHeight: 1.65 }}>{line.trim().slice(2)}</span></div>); }
    else if (line.trim() === '') { elements.push(<div key={key++} style={{ height: 6 }} />); }
    else { elements.push(<p key={key++} style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, color: C.slate, lineHeight: 1.75, margin: '5px 0' }}>{line}</p>); }
  }
  return <>{elements}</>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function ItineraryResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const { itinerary: rawItinerary, metadata, formData } = location.state || {};

  useEffect(() => {
    if (!rawItinerary) { navigate('/plan'); return; }
    setTimeout(() => setVisible(true), 100);
  }, [rawItinerary, navigate]);

  if (!rawItinerary) return null;

  // Try structured JSON, fall back to markdown
  let itinerary;
  try {
    const cleaned = rawItinerary.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    itinerary = JSON.parse(cleaned);
  } catch (e) {
    itinerary = null;
  }

  const isStructured = itinerary && itinerary.days;

  return (
    <div style={{ fontFamily: "'Quicksand', sans-serif", background: C.cream, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 20px', background: `${C.cream}f0`,
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${C.sage}08`,
      }}>
        <Link to="/" style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 500, letterSpacing: '0.08em', color: C.slate, textDecoration: 'none' }}>Lila Trips</Link>
        <button onClick={() => navigate('/plan')} style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 600, color: C.sage, background: `${C.white}80`, border: `1px solid ${C.sage}20`, borderRadius: 20, padding: '7px 16px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>New Trip</button>
      </div>

      <div style={{
        maxWidth: 600, margin: '0 auto', padding: '20px 16px 80px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {/* Hero */}
        {isStructured && (
          <div style={{ textAlign: 'center', padding: '20px 10px 32px' }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px, 7vw, 36px)', fontWeight: 300, color: C.slate, lineHeight: 1.15, marginBottom: 8 }}>{itinerary.title}</h1>
            {itinerary.subtitle && <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(12px, 3.2vw, 14px)', color: `${C.slate}60`, fontStyle: 'italic' }}>{itinerary.subtitle}</p>}
            {itinerary.intro && <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(13px, 3.4vw, 14px)', color: `${C.slate}80`, lineHeight: 1.75, maxWidth: 480, margin: '16px auto 0' }}>{itinerary.intro}</p>}
          </div>
        )}

        {/* Logistics */}
        <div style={{ background: `${C.sage}05`, borderRadius: 18, padding: '20px 16px', marginBottom: 24 }}>
          <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: `${C.sage}70`, marginBottom: 12, paddingLeft: 2 }}>Trip Logistics</div>
          <LogisticsCard title="Flight Details" icon="✈️" color={C.skyBlue} fields={[{ key: 'airline', label: 'Airline', placeholder: 'e.g., Delta' }, { key: 'conf', label: 'Confirmation', placeholder: 'e.g., ABC123' }, { key: 'dep', label: 'Departure', placeholder: 'e.g., SEA → LAS, 8:00am' }, { key: 'ret', label: 'Return', placeholder: 'e.g., LAS → SEA, 6:00pm' }]} />
          <LogisticsCard title="Rental Car" icon="🚗" color={C.seaGlass} fields={[{ key: 'company', label: 'Company', placeholder: 'e.g., Enterprise' }, { key: 'conf', label: 'Confirmation', placeholder: '' }]} />
          <LogisticsCard title="Accommodation" icon="🏨" color={C.goldenAmber} fields={[{ key: 'hotel', label: 'Hotel', placeholder: 'e.g., Cable Mountain Lodge' }, { key: 'conf', label: 'Confirmation', placeholder: '' }, { key: 'checkin', label: 'Check-in', placeholder: 'e.g., Oct 17, 3pm' }]} />
        </div>

        {/* Content */}
        {isStructured ? (
          <>
            {itinerary.days.map((day, i) => <DayCard key={i} day={day} isFirst={i === 0} />)}
            {itinerary.beforeYouGo && (
              <div style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.sage}10`, padding: 22, marginTop: 8, boxShadow: `0 2px 16px ${C.sage}06` }}>
                <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.sage, marginBottom: 14 }}>Before You Go</div>
                {itinerary.beforeYouGo.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: i < itinerary.beforeYouGo.length - 1 ? `1px solid ${C.sage}08` : 'none' }}>
                    <span style={{ color: C.sage, flexShrink: 0, fontSize: 12 }}>•</span>
                    <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, color: C.slate, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {itinerary.closingNote && (
              <div style={{ textAlign: 'center', padding: '36px 20px 0' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 4.5vw, 22px)', fontWeight: 300, color: `${C.slate}80`, lineHeight: 1.5, fontStyle: 'italic' }}>{itinerary.closingNote}</p>
              </div>
            )}
          </>
        ) : (
          <div style={{ background: C.white, borderRadius: 20, padding: '24px 22px', border: `1px solid ${C.sage}10`, boxShadow: `0 2px 16px ${C.sage}06` }}>
            <MarkdownContent content={rawItinerary} />
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 48, paddingBottom: 20 }}>
          <button onClick={() => navigate('/plan')} style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 12, fontWeight: 600, color: C.sage, background: 'none', border: `1.5px solid ${C.sage}30`, borderRadius: 28, padding: '12px 28px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>Plan Another Trip</button>
        </div>
      </div>
    </div>
  );
}
