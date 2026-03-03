# Lila Trips — Intention Options Update

## Summary

Update the "Set your intention" step in the trip planner questionnaire. Replace the current four intention options with new ones, and update all references throughout the codebase.

## Current State (to find & replace)

The intention step currently has these four options:

| Label | Sub-copy | Icon concept |
|-------|----------|-------------|
| Peace | Quiet the noise. Find center. | Circle/zen |
| Transformation | Burn through the old. Come back different. | Flame/diamond |
| Connection | Deepen bonds. Open up. | Linked circles |
| Reset | Step away from everything. Come back clear. | Candle/seedling |

## New Intention Options

| Label | Sub-copy | Philosophy mapping | Itinerary signal |
|-------|----------|--------------------|-----------------|
| **Reconnect** | Remember you're part of something bigger. | Oneness | Prioritize shared/communal experiences: group yoga, shared meals, partner hikes, community service, lodging that encourages togetherness. Less solitary, more face-to-face. |
| **Tune In** | Get quiet enough to hear yourself again. | Presence | Prioritize awareness-oriented, contemplative activities: guided meditation, journaling, mindful silent hikes, sound baths, stargazing. Built-in pauses and moments of observation. |
| **Slow Down** | Give yourself permission to stop rushing. | Flow | Prioritize spacious pacing: fewer activities per day, late mornings, long meals, spa/hot springs, gentle walks, open unscheduled blocks. Breathing room in the structure. |
| **Light Up** | Chase the moments that make you feel alive. | Reverence | Prioritize peak experiences and intensity: big hikes, sunrise breathwork, cold plunges, packed days with high-effort/high-reward moments. The "go for it" energy. |

## Files Likely Affected

Search the codebase for these patterns to find all files that need updating:

- `"Peace"`, `"Transformation"`, `"Connection"`, `"Reset"` as intention option labels
- `"Quiet the noise"`, `"Burn through the old"`, `"Deepen bonds"`, `"Step away from everything"` as sub-copy
- Any `intentions` or `INTENTIONS` array/object/constant that defines these options
- The questionnaire/onboarding component (likely a step component in the trip planner flow)
- The AI prompt / system prompt that generates itineraries — intention values are passed to Claude API to shape the itinerary output. Update the prompt to explain what each new intention signals.
- The results/itinerary page if it displays the user's selected intention back to them
- Any constants file or config that centralizes these values

## Icon Suggestions

Keep the same minimal line-icon style shown in the current design. Suggested icon concepts:

- **Reconnect** — Two overlapping circles or hands reaching toward each other
- **Tune In** — An ear, a tuning fork, or concentric ripples
- **Slow Down** — A crescent moon, a leaf floating, or gentle waves
- **Light Up** — A flame, a spark, a sunrise, or a starburst

## Design Notes

- Keep the existing 2x2 card grid layout
- Keep the same visual styling (light card backgrounds, centered icon + label + sub-copy)
- The "Choose all that resonate" multi-select behavior stays the same
- These are NOT mutually exclusive — users can select multiple (e.g., Reconnect + Slow Down = communal but unhurried)

## How Intentions Shape Itineraries

When these values are passed to the itinerary generation prompt, they should influence:

1. **Pacing** — Slow Down = fewer items per day, open blocks. Light Up = packed schedule.
2. **Activity type** — Tune In = contemplative (meditation, journaling, sound baths). Light Up = physical intensity (summit hikes, cold plunge). Reconnect = group/shared. Slow Down = restorative (spa, gentle walks).
3. **Schedule structure** — Slow Down = late starts, long meals. Light Up = early starts, sunset finishes.
4. **Experience selection** — Reconnect = communal dining, group yoga, service opportunities. Tune In = solo-friendly, silence-oriented.

Multiple selections combine: Tune In + Light Up = intense but contemplative (solo summit push → meditation at the top). Reconnect + Slow Down = unhurried togetherness.

## Part 3: Update Persona Matching Logic

The `PERSONAS` array and `getPersona()` function in `PlanMyTrip.jsx` assign a traveler archetype based on questionnaire inputs. The match functions currently reference the OLD intention IDs. These MUST be updated or the personas will break.

### Current Persona → Intention Mappings (BROKEN after Part 1)

| Persona | Current match logic | Old intention refs |
|---------|--------------------|--------------------|
| The Sādhaka (Practitioner) | High practice + peace/reset | `["peace","reset"]` |
| The Tāpasvin (One Who Burns) | High movement + transformation | `"transformation"` |
| The Līlā Player (One Who Dances) | Balanced pace + connection | `"connection"` |
| The Ṛṣi (Seer) | Slow pace + peace/reset | `["peace","reset"]` |
| The Explorer (Trailblazer) | Full pace + active + transformation | `"transformation"` |

### New Mappings (update match functions)

| Persona | Should now match on | New intention refs |
|---------|--------------------|--------------------|
| The Sādhaka (Practitioner) | High practice + tune_in/slow_down | `["tune_in","slow_down"]` |
| The Tāpasvin (One Who Burns) | High movement + light_up | `"light_up"` |
| The Līlā Player (One Who Dances) | Balanced pace + reconnect | `"reconnect"` |
| The Ṛṣi (Seer) | Slow pace + tune_in/slow_down | `["tune_in","slow_down"]` |
| The Explorer (Trailblazer) | Full pace + active + light_up | `"light_up"` |

### Also Update Profile Summary Scores

Around line 1334-1336, the profile card calculates trait scores using old IDs:

```js
// OLD — must update:
adventure: ... (data.intentions || []).includes("transformation") ...
stillness: ... (data.intentions || []).some(i => ["peace","reset"].includes(i)) ...
social: ... (data.intentions || []).includes("connection") ...
```

Replace with:

```js
// NEW:
adventure: ... (data.intentions || []).includes("light_up") ...
stillness: ... (data.intentions || []).some(i => ["tune_in","slow_down"].includes(i)) ...
social: ... (data.intentions || []).includes("reconnect") ...
```

### Persona Descriptions

Review each persona's `desc` text and make sure it still makes sense with the new intention language. The descriptions reference concepts like "transformation through intensity" and "silence that teaches" — these should still align but verify they don't use the old intention *labels* verbatim.

### New Intention IDs

For consistency, use these IDs in the INTENTIONS array and all matching logic:

| Label | ID |
|-------|----|
| Reconnect | `"reconnect"` |
| Tune In | `"tune_in"` |
| Slow Down | `"slow_down"` |
| Light Up | `"light_up"` |

---

---

## Part 4: Holistic Review of Trip Planner Pipeline

Beyond updating the intention options, do a full audit of the trip planner flow — from questionnaire inputs through to the generated itinerary output. The goal is to ensure every input the user provides is actually shaping the itinerary in a meaningful, observable way.

### Audit the Questionnaire → Prompt → Output Pipeline

**Step 1: Map all questionnaire inputs**

Trace every step of the onboarding questionnaire and document what data is collected at each step (destination, dates, group size/composition, intention, accommodation preference, activity preferences, wellness interests, budget, pace, etc.). Create a clear inventory of every user input.

**Step 2: Audit the AI prompt / system prompt**

Find the prompt(s) that get sent to the Claude API for itinerary generation. For each questionnaire input, verify:

- [ ] Is this input actually included in the prompt? (Some inputs might be collected in the UI but never passed through)
- [ ] Is the input clearly explained to the model with enough context to act on it?
- [ ] Does the prompt give the model clear instructions on HOW each input should shape the output?

Flag any inputs that are collected but not used, or used but poorly explained.

**Step 3: Test with contrasting profiles**

Generate itineraries for at least 3 meaningfully different user profiles and compare the outputs. For example:

**Profile A — "Slow Down + Tune In"**
- Solo traveler, 5 days, moderate budget
- Intentions: Slow Down, Tune In
- Wellness: meditation, yoga, journaling
- Pace: relaxed
- Accommodation: mid-range comfortable

**Profile B — "Light Up + Reconnect"**
- Couple, 4 days, higher budget
- Intentions: Light Up, Reconnect
- Wellness: cold plunge, breathwork, hiking
- Pace: active/packed
- Accommodation: premium

**Profile C — "Reconnect + Slow Down"**
- Group of 4 friends, 3 days, budget-friendly
- Intentions: Reconnect, Slow Down
- Wellness: yoga, communal meals
- Pace: relaxed
- Accommodation: glamping/elemental

Compare the three outputs and verify:
- [ ] Are the itineraries meaningfully different from each other?
- [ ] Does pacing actually change (fewer items for Slow Down, more for Light Up)?
- [ ] Do activity types shift based on intention and wellness preferences?
- [ ] Does accommodation recommendation align with stated preference?
- [ ] Does group composition affect suggestions (solo vs. couple vs. group)?
- [ ] Does budget actually constrain or shape recommendations?
- [ ] Are the wellness elements present when requested and absent when not?

**Step 4: Review the prompt structure**

Evaluate the overall quality of the system prompt / itinerary generation prompt:

- Is it well-organized or a wall of text?
- Does it give the model a clear output format (structured JSON)?
- Does it include enough destination-specific knowledge to generate accurate recommendations (real places, real trails, real restaurants)?
- Are there clear guardrails (e.g., don't schedule 6 activities in a "Slow Down" itinerary)?
- Does it handle edge cases (1-day trip vs. 7-day trip, solo vs. large group)?

**Step 5: Review the results page**

Check that the itinerary results page:
- [ ] Displays the user's selected preferences back to them (so they feel heard)
- [ ] Renders the itinerary content cleanly (no markdown artifacts, broken formatting)
- [ ] Handles all the sections the AI might generate (activities, meals, wellness, lodging, logistics)
- [ ] Works on mobile

### Deliverables

After the audit, provide:
1. A summary of what's working well
2. A list of inputs that aren't effectively shaping output (with recommendations)
3. An updated/improved prompt if needed
4. Confirmation that the 3 test profiles produce meaningfully different itineraries

---

## Testing Checklist

### Intention Update
- [ ] Intention step displays all 4 new options with correct labels and sub-copy
- [ ] Multi-select still works (can select more than one)
- [ ] Selected intentions pass through to itinerary generation
- [ ] Itinerary results page displays correct intention labels if shown
- [ ] No leftover references to Peace, Transformation, Connection, or Reset as intention labels

### Persona Matching
- [ ] All 5 persona match functions reference new intention IDs (reconnect, tune_in, slow_down, light_up)
- [ ] No remaining references to peace, transformation, connection, or reset in match logic
- [ ] Profile summary scores (adventure, stillness, social) use new intention IDs
- [ ] Each of the 3 test profiles in Part 4 gets assigned a different, appropriate persona
- [ ] Persona descriptions still make sense with new intention framing

### Pipeline Integrity
- [ ] Every questionnaire input is passed to the generation prompt
- [ ] Each input has clear instructions in the prompt for how it shapes output
- [ ] Contrasting profiles produce observably different itineraries
- [ ] Results page renders all generated content cleanly
- [ ] Mobile experience works end-to-end
