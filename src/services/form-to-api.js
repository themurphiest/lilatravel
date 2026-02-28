// ═══════════════════════════════════════════════════════════════════════════════
// FORM → API TRANSLATION
//
// Converts PlanMyTrip form data into the shape that
// /api/generate-itinerary expects.
//
// File: src/services/form-to-api.js
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Translate the PlanMyTrip form state into the API request body.
 *
 * Form data shape (from PlanMyTrip.jsx):
 * {
 *   destination: 'zion',
 *   month: 'october',           // NEW — from month selector step
 *   intentions: ['peace'],
 *   movement: 50,               // slider 0-100
 *   pacing: 50,                 // slider 0-100
 *   range: 35,                  // slider 0-100
 *   duration: 4,
 *   budget: 'balanced',
 *   practiceLevel: 1,           // 0-3
 *   practices: ['yoga','breathwork'],
 * }
 *
 * API expects:
 * {
 *   destination: 'zion',
 *   preferences: {
 *     name, month, dates, groupType, groupSize,
 *     interests, energy, stayStyle, budget, intention
 *   }
 * }
 */

// Map destination IDs from the form to destination slugs the API understands
const DESTINATION_MAP = {
  zion: 'zion',
  bigSur: 'big-sur',
  joshuaTree: 'joshua-tree',
  olympic: 'olympic',
  kauai: 'kauai',
  vancouver: 'vancouver-island',
};

// Map movement slider (0-100) to energy level
function movementToEnergy(movement = 50) {
  if (movement < 30) return 'gentle';
  if (movement < 70) return 'moderate';
  return 'adventurous';
}

// Map range slider (0-100) to stay style
function rangeToStayStyle(range = 35) {
  // Lower range = rooted (one base), higher = more mobile
  // This is a rough heuristic — can refine
  if (range < 35) return 'rooted';
  if (range < 65) return 'rooted'; // even "flexible" travelers still need a base
  return 'rooted'; // for now, always rooted since we're building single-destination guides
}

// Map budget ID to API budget tier
function budgetToApi(budget) {
  const map = {
    mindful: 'mindful',
    balanced: 'balanced',
    premium: 'open',
    noLimits: 'open',
  };
  return map[budget] || 'balanced';
}

// Map practices array to interests array for the API
function practicesToInterests(practices = [], intentions = [], movement = 50) {
  const interests = [];

  // From practices selection
  const practiceMap = {
    yoga: 'yoga',
    breathwork: 'breathwork',
    coldPlunge: 'water',
    meditation: 'mindfulness',
    hiking: 'hiking',
    stargazing: 'stargazing',
    journaling: 'mindfulness',
    soundBath: 'spa',
    sauna: 'spa',
  };

  practices.forEach(p => {
    const mapped = practiceMap[p];
    if (mapped && !interests.includes(mapped)) {
      interests.push(mapped);
    }
  });

  // Always include hiking if movement is moderate or above
  if (movement >= 30 && !interests.includes('hiking')) {
    interests.push('hiking');
  }

  // Add dining by default — everyone needs to eat
  if (!interests.includes('dining')) {
    interests.push('dining');
  }

  return interests;
}

// Map intentions to a human-readable intention string
function intentionsToString(intentions = []) {
  const intentionMap = {
    peace: 'find stillness and quiet the noise',
    transformation: 'be challenged and come back different',
    connection: 'deepen bonds and open up to others',
    liberation: 'let go and feel completely free',
  };

  if (intentions.length === 0) return 'Experience something meaningful.';

  const phrases = intentions.map(id => intentionMap[id]).filter(Boolean);
  if (phrases.length === 1) return `I want to ${phrases[0]}.`;
  if (phrases.length === 2) return `I want to ${phrases[0]} and ${phrases[1]}.`;
  return `I want to ${phrases.slice(0, -1).join(', ')}, and ${phrases[phrases.length - 1]}.`;
}

/**
 * Main translation function.
 *
 * @param {Object} formData - The state from PlanMyTrip.jsx
 * @param {string} [userName] - Optional traveler name (for future use)
 * @returns {Object} - The request body for POST /api/generate-itinerary
 */
export function translateFormToApi(formData, userName = 'Traveler') {
  return {
    destination: DESTINATION_MAP[formData.destination] || formData.destination,
    preferences: {
      name: userName,
      month: formData.month || null,
      dates: {
        start: null, // Will be added when we have a date picker
        end: null,
        flexible: true,
      },
      groupType: 'solo', // Default for now — add group step later
      groupSize: 1,
      interests: practicesToInterests(
        formData.practices,
        formData.intentions,
        formData.movement
      ),
      energy: movementToEnergy(formData.movement),
      stayStyle: rangeToStayStyle(formData.range),
      budget: budgetToApi(formData.budget),
      intention: intentionsToString(formData.intentions),
      // Pass through raw form data for additional context
      duration: formData.duration || 4,
      practiceLevel: formData.practiceLevel ?? 1,
      pacing: formData.pacing ?? 50,
    },
  };
}
