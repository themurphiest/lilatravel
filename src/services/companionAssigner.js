/**
 * companionAssigner.js — Bridges practicesService → Day Cards
 * ════════════════════════════════════════════════════════════
 * 
 * Takes the output of getPracticesForItinerary(formData) and the
 * itinerary days array, and assigns one teaching + one practice
 * to each day based on the day's character and position in the trip.
 * 
 * USAGE:
 *   import { assignCompanions } from './companionAssigner';
 *   import { getPracticesForItinerary, TRADITIONS } from './practicesService';
 * 
 *   const practiceResults = getPracticesForItinerary(formData);
 *   const daysWithCompanions = assignCompanions(itinerary.days, practiceResults);
 *   // Each day now has a `companion` field with teaching + practice
 */

import { TRADITIONS } from './practicesService';

/**
 * Day archetypes based on position in the trip.
 * These help match practices to the natural rhythm of a journey.
 */
const DAY_ARCHETYPES = {
  arrival:   { keywords: ['arrival', 'arrive', 'check in', 'settle', 'orient', 'grounding'], principles: ['presence', 'reverence'], energy: 'gentle' },
  summit:    { keywords: ['landing', 'summit', 'climb', 'strenuous', 'challenging', 'dawn', 'edge'], principles: ['presence', 'flow'], energy: 'adventurous' },
  explore:   { keywords: ['explore', 'discover', 'wander', 'narrows', 'river', 'canyon'], principles: ['flow', 'oneness'], energy: 'moderate' },
  rest:      { keywords: ['rest', 'recovery', 'gentle', 'slow', 'spa', 'soak'], principles: ['flow', 'reverence'], energy: 'gentle' },
  departure: { keywords: ['departure', 'depart', 'farewell', 'final', 'last', 'closing', 'home'], principles: ['reverence', 'oneness'], energy: 'gentle' },
};

/**
 * Detect the archetype of a day based on its content and position.
 */
function detectDayArchetype(day, dayIndex, totalDays) {
  const text = `${day.title} ${day.intro || ''} ${day.snapshot || ''}`.toLowerCase();

  // First day is almost always arrival
  if (dayIndex === 0) return 'arrival';

  // Last day is almost always departure
  if (dayIndex === totalDays - 1) return 'departure';

  // Check keywords for middle days
  for (const [archetype, config] of Object.entries(DAY_ARCHETYPES)) {
    if (archetype === 'arrival' || archetype === 'departure') continue;
    for (const kw of config.keywords) {
      if (text.includes(kw)) return archetype;
    }
  }

  // Default middle days to explore
  return 'explore';
}

/**
 * Score how well a practice/teaching fits a specific day archetype.
 */
function scoreFit(entry, archetype) {
  const config = DAY_ARCHETYPES[archetype];
  if (!config) return 0;

  let score = 0;

  // Principle alignment
  for (const p of entry.principles || []) {
    if (config.principles.includes(p)) score += 3;
  }

  // Trip context keyword matching
  const context = (entry.tripContext || '').toLowerCase();
  if (archetype === 'arrival' && (context.includes('first') || context.includes('arrival') || context.includes('settle'))) score += 4;
  if (archetype === 'summit' && (context.includes('summit') || context.includes('before') || context.includes('intensity'))) score += 4;
  if (archetype === 'departure' && (context.includes('last') || context.includes('final') || context.includes('closing'))) score += 4;
  if (archetype === 'rest' && (context.includes('recovery') || context.includes('rest') || context.includes('afternoon'))) score += 4;

  // Time-of-day alignment
  if (archetype === 'summit' && (entry.timeOfDay === 'dawn' || entry.timeOfDay === 'morning')) score += 2;
  if (archetype === 'arrival' && entry.timeOfDay !== 'dawn') score += 1; // arrival days don't have early starts
  if (archetype === 'departure' && entry.timeOfDay === 'morning') score += 2;

  // Practice level — gentler practices for arrival/departure
  if ((archetype === 'arrival' || archetype === 'departure') && entry.practiceLevel === 0) score += 2;

  return score;
}

/**
 * Format a practicesService entry into the companion card data structure.
 */
function formatForCompanion(entry, type) {
  if (!entry) return null;

  const tradition = TRADITIONS[entry.tradition];

  if (type === 'teaching') {
    return {
      title: entry.name,
      essence: entry.summary,
      tradition: tradition?.shortName || '',
      slug: entry.id,
      // Available for the detail view
      deeper: entry.deeper || null,
      quote: entry.quote || null,
      sources: entry.sources || [],
      tripContext: entry.tripContext || null,
      principles: entry.principles || [],
    };
  }

  if (type === 'practice') {
    return {
      title: entry.name,
      description: entry.summary,
      tradition: tradition?.shortName || '',
      duration: entry.duration || null,
      when: entry.tripContext || null,
      howTo: entry.howTo || null,
      slug: entry.id,
      // Available for the detail view
      deeper: entry.deeper || null,
      quote: entry.quote || null,
      sources: entry.sources || [],
      setting: entry.setting || null,
      principles: entry.principles || [],
    };
  }

  return null;
}

/**
 * Main assignment function.
 * 
 * @param {Array} days — itinerary days array from the AI-generated itinerary
 * @param {Object} practiceResults — output of getPracticesForItinerary(formData)
 * @returns {Array} days with `companion` field added to each
 */
export function assignCompanions(days, practiceResults) {
  if (!days || !practiceResults) return days;

  const { dailyTeaching = [], allRelevant = [], morningPractice, eveningPractice } = practiceResults;
  const totalDays = days.length;

  // Get all available teachings and practices from the ranked results
  const availableTeachings = allRelevant.filter(e => e.type === 'teaching');
  const availablePractices = allRelevant.filter(e => e.type === 'practice');

  // Track what's been used to avoid repeats
  const usedTeachingIds = new Set();
  const usedPracticeIds = new Set();

  return days.map((day, i) => {
    const archetype = detectDayArchetype(day, i, totalDays);

    // ── Assign teaching ──────────────────────────────
    // Score all unused teachings for this day's archetype
    const teachingCandidates = availableTeachings
      .filter(t => !usedTeachingIds.has(t.id))
      .map(t => ({ ...t, fitScore: scoreFit(t, archetype) + (t.score || 0) }))
      .sort((a, b) => b.fitScore - a.fitScore);

    const selectedTeaching = teachingCandidates[0] || null;
    if (selectedTeaching) usedTeachingIds.add(selectedTeaching.id);

    // ── Assign practice ──────────────────────────────
    // Score all unused practices for this day's archetype
    const practiceCandidates = availablePractices
      .filter(p => !usedPracticeIds.has(p.id))
      .map(p => ({ ...p, fitScore: scoreFit(p, archetype) + (p.score || 0) }))
      .sort((a, b) => b.fitScore - a.fitScore);

    const selectedPractice = practiceCandidates[0] || null;
    if (selectedPractice) usedPracticeIds.add(selectedPractice.id);

    // ── Build companion ──────────────────────────────
    const companion = {
      teaching: formatForCompanion(selectedTeaching, 'teaching'),
      practice: formatForCompanion(selectedPractice, 'practice'),
      archetype,
    };

    return {
      ...day,
      companion: (companion.teaching || companion.practice) ? companion : null,
    };
  });
}

/**
 * Convenience: get companion data without mutating the days array.
 * Returns a map of dayIndex → companion data.
 * 
 * @param {Array} days — itinerary days
 * @param {Object} formData — from the questionnaire
 * @param {Function} getPracticesForItinerary — from practicesService
 * @returns {Object} { [dayIndex]: companion }
 */
export function getCompanionsForTrip(days, formData, getPracticesForItinerary) {
  const practiceResults = getPracticesForItinerary(formData);
  const enrichedDays = assignCompanions(days, practiceResults);

  const companions = {};
  enrichedDays.forEach((day, i) => {
    if (day.companion) {
      companions[i] = day.companion;
    }
  });

  return {
    companions,
    meta: {
      principles: practiceResults.principles,
      practiceLevel: practiceResults.practiceLevel,
      totalAvailable: practiceResults.allRelevant?.length || 0,
    },
  };
}
