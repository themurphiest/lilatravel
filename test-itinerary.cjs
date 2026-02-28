const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

async function test() {
  const guide = fs.readFileSync(path.join(__dirname, 'src/data/destinations/zion.md'), 'utf-8');
  const systemPrompt = fs.readFileSync(path.join(__dirname, 'prompts/system-prompt.md'), 'utf-8');

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  console.log('Generating test itinerary for Zion...\n');

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{
      role: 'user',
      content: `
## Destination Guide (ONLY recommend from this content)

${guide}

## Traveler Profile
- **Name**: Sarah
- **Month**: October
- **Wellness interests**: yoga, breathwork, hiking
- **Energy level**: moderate
- **Stay style**: rooted
- **Budget**: balanced
- **Group**: solo
- **Intention**: I need to disconnect from work and find stillness

## Matching Instructions
MONTH: October. Consult the Monthly Guide for October. Only recommend trails and activities available in October.
PRIORITIZE: Sacred Terrain, Living Practice sections.
ENERGY: moderate. No more than one strenuous activity per day.
ACCOMMODATION: rooted tier only.
BUDGET: balanced level.
GROUP: solo. Solo-friendly, contemplative, self-paced.

Please create a personalized 4-day itinerary.
      `.trim()
    }]
  });

  console.log(response.content[0].text);
}

test().catch(console.error);
