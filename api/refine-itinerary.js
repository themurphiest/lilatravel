/**
 * Lila Trips — Itinerary Refinement API Route
 *
 * Vercel serverless function.
 * File location: /api/refine-itinerary.js
 *
 * POST /api/refine-itinerary
 * Body: { itinerary, dayFeedback, pulse, overallNote, formData }
 *
 * Accepts the current itinerary + user feedback and returns
 * a revised itinerary via the Claude API.
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const systemPrompt = fs.readFileSync(
  path.join(process.cwd(), 'prompts', 'system-prompt.md'),
  'utf-8'
);

/**
 * Build the per-day feedback summary for the refinement prompt.
 * Only includes days that have feedback — approved or adjust.
 */
function buildFeedbackSummary(dayFeedback, days) {
  if (!dayFeedback || Object.keys(dayFeedback).length === 0) return '';

  const lines = Object.entries(dayFeedback).map(([index, fb]) => {
    const i = Number(index);
    const dayLabel = days?.[i]?.label || `Day ${i + 1}`;
    const dayTitle = days?.[i]?.title || '';

    if (fb.status === 'approved') {
      return `- **${dayLabel}** ("${dayTitle}"): APPROVED — traveler is happy, preserve this day as-is.`;
    }
    if (fb.status === 'adjust') {
      return `- **${dayLabel}** ("${dayTitle}"): ADJUST — traveler note: "${fb.note}"`;
    }
    return null;
  }).filter(Boolean);

  return lines.join('\n');
}

/**
 * Build the per-activity feedback summary for the refinement prompt.
 * Keys look like day_0_timeline_2 or day_1_pick_0.
 */
function buildActivityFeedbackSummary(activityFeedback, days) {
  if (!activityFeedback || Object.keys(activityFeedback).length === 0) return '';

  const lines = Object.entries(activityFeedback).map(([key, value]) => {
    const match = key.match(/^day_(\d+)_(timeline|pick)_(\d+)$/);
    if (!match) return null;
    const [, dayIdx, type, itemIdx] = match;
    const day = days?.[Number(dayIdx)];
    const dayLabel = day?.label || `Day ${Number(dayIdx) + 1}`;

    let itemName = '';
    if (type === 'timeline') {
      itemName = day?.timeline?.[Number(itemIdx)]?.title || `activity ${Number(itemIdx) + 1}`;
    } else {
      const pick = day?.picks?.[Number(itemIdx)];
      itemName = pick?.pick?.name || `${pick?.category || 'pick'} ${Number(itemIdx) + 1}`;
    }

    const reaction = typeof value === 'string' ? value : value?.reaction;
    const note = typeof value === 'object' ? value?.note : '';
    const labels = { fire: 'MUST DO', up: 'LOVE IT', down: 'NOT FOR ME' };
    const label = labels[reaction] || reaction;

    let line = `- **${dayLabel}**, ${itemName}: ${label}`;
    if (note) line += ` — "${note}"`;
    return line;
  }).filter(Boolean);

  return lines.join('\n');
}

/**
 * Build the overall pulse section for the refinement prompt.
 */
function buildPulseSummary(pulse, overallNote) {
  if (!pulse) return '';

  const labels = {
    love: 'The traveler loves this itinerary overall.',
    close: 'The traveler says it\'s almost there but needs a few tweaks.',
    rethink: 'The traveler wants to rethink the trip — a different direction.',
  };

  let summary = labels[pulse] || '';
  if (overallNote) {
    summary += `\nTheir overall note: "${overallNote}"`;
  }
  return summary;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { itinerary, activityFeedback, dayFeedback, pulse, overallNote, formData } = req.body;

    if (!itinerary) {
      return res.status(400).json({ error: 'Missing required field: itinerary' });
    }

    // Parse the current itinerary so we can reference day labels/titles
    let parsedItinerary = null;
    try {
      let cleaned = itinerary;
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleaned = cleaned.slice(firstBrace, lastBrace + 1);
      }
      parsedItinerary = JSON.parse(cleaned);
    } catch {
      // If we can't parse, we still send the raw string to Claude
    }

    const feedbackSummary = buildFeedbackSummary(dayFeedback, parsedItinerary?.days);
    const activitySummary = buildActivityFeedbackSummary(activityFeedback, parsedItinerary?.days);
    const pulseSummary = buildPulseSummary(pulse, overallNote);

    const hasDayFeedback = feedbackSummary.length > 0;
    const hasActivityFeedback = activitySummary.length > 0;
    const hasPulse = pulseSummary.length > 0;

    if (!hasDayFeedback && !hasActivityFeedback && !hasPulse) {
      return res.status(400).json({ error: 'No feedback provided to refine against' });
    }

    // Build the refinement prompt
    const userMessage = `
## Current Itinerary

Below is the traveler's current itinerary as JSON. This is what they are reviewing:

${itinerary}

---

## Traveler Feedback

${hasActivityFeedback ? `### Per-Activity Signals\n\nThe traveler reacted to individual activities and picks:\n\n${activitySummary}` : ''}

${hasDayFeedback ? `### Per-Day Notes\n\n${feedbackSummary}` : ''}

${hasPulse ? `### Overall Trip Feeling\n\n${pulseSummary}` : ''}

---

## Refinement Instructions

You are revising this itinerary based on the traveler's feedback. Follow these rules:

1. **Honor per-activity signals.** Activities marked MUST DO or LOVE IT must be preserved exactly. Activities marked NOT FOR ME should be replaced with alternatives from the destination guide — respect any note the traveler attached. Activities without signals can be adjusted if needed.

2. **Preserve days whose activities are all loved.** If every signaled activity on a day is MUST DO or LOVE IT with no negative signals, keep that day locked.

3. **Respect per-day notes.** If the traveler left a note on a day, follow their direction. If they say "less hiking, more town time" — replace strenuous trail activities with town-based or gentle alternatives from the destination guide.

4. **Days without feedback** can be lightly revised if the overall pulse suggests changes, but keep them mostly stable. The traveler didn't flag them — don't surprise them with big changes.

5. **Honor the overall pulse:**
   - "Almost there" (close) → make targeted tweaks only, preserve the overall structure
   - "Rethink it" (rethink) → feel free to make larger structural changes (reorder days, swap major activities), but still preserve any activities individually marked MUST DO or LOVE IT

6. **Maintain the same JSON structure** as the original. Same fields, same format. The frontend depends on this structure.

7. **All recommendations must still come from the destination guide** in your system prompt context. Do not invent new places.

8. **Keep the same number of days** unless the overall note explicitly asks to add or remove days.

${formData ? `
---

## Original Traveler Profile (for reference)

- **Destination**: ${formData.destination || 'Not specified'}
- **Energy**: ${formData.energy || 'Not specified'}
- **Budget**: ${formData.budget || 'Not specified'}
- **Interests**: ${formData.interests?.join(', ') || 'Not specified'}
- **Intention**: ${formData.intention || 'Not specified'}
` : ''}

Please return the revised itinerary as a complete JSON object. Follow the same output format rules from your system prompt — respond with ONLY the JSON, no markdown fences, no preamble.
`.trim();

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 12000,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userMessage },
      ],
    });

    const revisedItinerary = response.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    return res.status(200).json({
      success: true,
      itinerary: revisedItinerary,
    });

  } catch (error) {
    console.error('Itinerary refinement failed:', error);

    return res.status(500).json({
      error: 'Something went wrong refining your itinerary. Please try again.',
    });
  }
}
