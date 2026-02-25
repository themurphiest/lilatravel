// ═══════════════════════════════════════════════════════════════════════════════
// JOURNEY / OFFERINGS DATA
// ═══════════════════════════════════════════════════════════════════════════════

import { C } from './brand';

export const journey = [
  {
    step: "01", label: "Discover", color: C.skyBlue,
    title: "Find the place calling you",
    desc: "Browse destinations chosen for their capacity to dissolve the ordinary — each timed to its most luminous window.",
  },
  {
    step: "02", label: "Explore Free", color: C.seaGlass,
    title: "The vibe, the itinerary, the timing",
    desc: "Every destination comes with a free guide: curated atmosphere, sample itinerary, and Threshold timing. Enough to know this is your trip.",
  },
  {
    step: "03", label: "Unlock", color: C.goldenAmber,
    title: "Activate the full guide",
    desc: "One unlock. Vetted hotels, curated experiences, booking links, wellness sessions, offline access. The research is done. The friction is gone.",
  },
  {
    step: "04", label: "Go Your Way", color: C.sunSalmon,
    title: "Solo, custom, or group",
    desc: "Book yourself from inside the guide, request a custom human-built itinerary, or join a scheduled Threshold trip with a curated group.",
  },
  {
    step: "05", label: "Live It", color: C.oceanTeal,
    title: "The guide in your pocket",
    desc: "Offline, seamless, never in the way. When the trip ends, share it, gift it, or start planning the next one.",
  },
];

export const magicMoments = [
  { text: "Staring up at the universe and ten-thousand stars.", color: C.skyBlue, center: 0.0 },          // Night
  { text: "Cool waves crashing during fiery vinyasa flows.", color: C.sunSalmon, center: 0.25 },          // Sunrise
  { text: "Riding into the last light as the canyon catches fire.", color: C.goldenAmber, center: 0.75 },  // Sunset
  { text: "Misty mountain trails below ancient spruce giants.", color: C.seaGlass, center: 0.5 }, // Midday
];

export const heroCallouts = [
  { line1: "Plan Less.", line2: "Experience More.", center: 0.0 },
  { line1: "Sacred Terrain.", line2: "Perfect Timing.", center: 0.25 },
  { line1: "The World is", line2: "Waiting for You.", center: 0.5 },
  { line1: "Come Dance with", line2: "the Mystery.", center: 0.75 },
];
