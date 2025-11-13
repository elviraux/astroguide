import { AstroProfile } from './storage';
import { saveDeepDiveContent } from './storage';

const NEWELL_API_URL = process.env.EXPO_PUBLIC_NEWELL_API_URL || 'https://newell.staging.fastshot.ai';
const PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID || '45895021-642c-41e2-b281-f526e3585804';

interface DeepDiveItem {
  key: string;
  prompt: string;
}

/**
 * Normalizes a key by removing zodiac symbols and extra spaces
 */
export const normalizeKey = (key: string): string => {
  return key.toLowerCase().replace(/[♈♉♊♋♌♍♎♏♐♑♒♓☿♀♂♃♄♅♆♇☉☽↗✦]/g, '').trim().replace(/\s+/g, '-');
};

/**
 * Generates all deep dive content for an astro profile in a single batch.
 * This is called during onboarding to pre-generate all content.
 */
export const generateAllDeepDives = async (profile: AstroProfile): Promise<void> => {
  try {
    const items: DeepDiveItem[] = [];

    // Generate prompts for Sun, Moon, Rising
    items.push({
      key: `sun-${normalizeKey(profile.bigThree.sun.sign)}`,
      prompt: `Provide a deep, practical explanation of having Sun in ${profile.bigThree.sun.sign}. Focus on core personality, self-expression, life purpose, strengths, and challenges. Write 2-3 paragraphs with actionable insights. Make it personal and empowering.`,
    });

    items.push({
      key: `moon-${normalizeKey(profile.bigThree.moon.sign)}`,
      prompt: `Provide a deep, practical explanation of having Moon in ${profile.bigThree.moon.sign}. Focus on emotional nature, inner needs, instincts, comfort zones, and how they process feelings. Write 2-3 paragraphs with actionable insights. Make it personal and empowering.`,
    });

    items.push({
      key: `rising-${normalizeKey(profile.bigThree.rising.sign)}`,
      prompt: `Provide a deep, practical explanation of having ${profile.bigThree.rising.sign} Rising (Ascendant). Focus on outward personality, first impressions, approach to life, physical presence, and life path. Write 2-3 paragraphs with actionable insights. Make it personal and empowering.`,
    });

    // Generate prompts for Life Path and Destiny numbers
    items.push({
      key: `lifepath-${profile.numerology.lifePath.value}`,
      prompt: `Provide a deep, practical explanation of Life Path Number ${profile.numerology.lifePath.value} in numerology. Focus on life purpose, natural talents, career paths, relationships, and personal growth areas. Write 2-3 paragraphs with actionable insights. Make it personal and empowering.`,
    });

    items.push({
      key: `destiny-${profile.numerology.destiny.value}`,
      prompt: `Provide a deep, practical explanation of Destiny Number ${profile.numerology.destiny.value} in numerology. Focus on life mission, soul purpose, natural abilities, potential achievements, and how to fulfill their destiny. Write 2-3 paragraphs with actionable insights. Make it personal and empowering.`,
    });

    // Generate prompts for all planetary positions
    for (const position of profile.planetaryPositions) {
      items.push({
        key: `${normalizeKey(position.planet)}-${normalizeKey(position.sign)}`,
        prompt: `Provide a deep, practical explanation of having ${position.planet} in ${position.sign}. Focus on how this placement influences the person's life, behavior, and experiences related to ${position.planet}'s domain. Include strengths, challenges, and actionable advice. Write 2-3 paragraphs with specific, empowering insights.`,
      });
    }

    // Generate all content in parallel for speed
    const results = await Promise.all(
      items.map(async (item) => {
        try {
          const content = await generateDeepDiveContent(item.prompt);
          return { key: item.key, content };
        } catch (error) {
          console.error(`Error generating deep dive for ${item.key}:`, error);
          return {
            key: item.key,
            content: 'Deep dive content temporarily unavailable. Please check your connection.',
          };
        }
      })
    );

    // Save all generated content
    await Promise.all(
      results.map(async (result) => {
        await saveDeepDiveContent(result.key, result.content);
      })
    );

    console.log(`Successfully generated and saved ${results.length} deep dives`);
  } catch (error) {
    console.error('Error generating deep dives:', error);
    throw error;
  }
};

/**
 * Generates a single deep dive content using Newell AI
 */
const generateDeepDiveContent = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(`${NEWELL_API_URL}/v1/generate/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project_id: PROJECT_ID,
        prompt: prompt,
        max_tokens: 250,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    const content = await response.text();

    if (!content || !content.trim()) {
      throw new Error('No content in response');
    }

    return content;
  } catch (error) {
    console.error('Error calling Newell API:', error);
    throw error;
  }
};
