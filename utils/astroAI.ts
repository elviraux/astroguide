import { UserData, AstroProfile } from './storage';

const NEWELL_API_URL = process.env.EXPO_PUBLIC_NEWELL_API_URL || 'https://newell.staging.fastshot.ai';
const PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID || '45895021-642c-41e2-b281-f526e3585804';

const ZODIAC_SIGNS = ['Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏', 'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'];

const PLANETARY_ICONS: Record<string, string> = {
  Mercury: '☿',
  Venus: '♀',
  Mars: '♂',
  Jupiter: '♃',
  Saturn: '♄',
  Uranus: '♅',
  Neptune: '♆',
  Pluto: '♇',
};

export const generateAstroProfile = async (userData: UserData): Promise<AstroProfile> => {
  try {
    // Create a comprehensive prompt for AI generation
    const prompt = `You are an expert astrologer. Based on the following birth information, generate a complete astrological and numerological profile.

Birth Information:
- Full Name: ${userData.fullName}
- Date of Birth: ${userData.dateOfBirth.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
- Time of Birth: ${userData.timeOfBirth.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
- Location of Birth: ${userData.locationOfBirth}

Please provide the following in a structured format:

1. SUN SIGN: [Choose one: ${ZODIAC_SIGNS.join(', ')}]
Description: [2-3 sentences about their core identity and ego, personalizing it to their name]

2. MOON SIGN: [Choose one: ${ZODIAC_SIGNS.join(', ')}]
Description: [2-3 sentences about their emotional nature and inner self]

3. RISING SIGN (Ascendant): [Choose one: ${ZODIAC_SIGNS.join(', ')}]
Description: [2-3 sentences about how others perceive them and their outward approach to life]

4. LIFE PATH NUMBER: [Choose a number from 1-9]
Description: [2 sentences about their life purpose and spiritual path]

5. DESTINY NUMBER: [Choose a number from 1-9]
Description: [2 sentences about their life's mission and what they're meant to accomplish]

6. KEY PLANETARY POSITIONS: [Choose 2-3 significant planetary positions]
For each, provide: Planet in Sign (e.g., "Venus in Libra") with a brief 1-sentence insight

Format your response EXACTLY like this example:
---
SUN SIGN: Leo ♌
DESCRIPTION: Your Sun sign represents your core identity and ego. As a Leo, ${userData.fullName}, you are naturally confident, creative, and charismatic. You shine brightest when expressing yourself authentically and leading with warmth.

MOON SIGN: Pisces ♓
DESCRIPTION: Your Moon sign reveals your emotional nature and inner self. With the Moon in Pisces, you are deeply intuitive, empathetic, and sensitive. You feel emotions intensely and have a rich inner world.

RISING SIGN: Sagittarius ♐
DESCRIPTION: Your Rising sign is your mask to the world and how others perceive you. As a Sagittarius rising, you appear optimistic, adventurous, and philosophical. You approach life with enthusiasm and a thirst for knowledge.

LIFE PATH NUMBER: 7
DESCRIPTION: The seeker and the truth-finder. You are analytical, introspective, and driven by a quest for deeper understanding. Your path involves spiritual growth and inner wisdom.

DESTINY NUMBER: 3
DESCRIPTION: The creative communicator. You are meant to express yourself through art, words, or performance. Your destiny involves inspiring and uplifting others through your unique vision.

PLANETARY POSITIONS:
- Mercury in Virgo: Your communication style is precise, analytical, and detail-oriented.
- Venus in Cancer: You love deeply and value emotional security in relationships.
---

Be authentic, insightful, and personalized. Use their name naturally in the descriptions.`;

    // Call Newell AI
    const response = await fetch(`${NEWELL_API_URL}/v1/generate/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project_id: PROJECT_ID,
        prompt: prompt,
        max_tokens: 1500,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Project validation failed');
      }
      throw new Error(`API error: ${response.status}`);
    }

    const aiResponse = await response.text();

    // Parse the AI response
    const profile = parseAIResponse(aiResponse, userData.fullName);

    return profile;
  } catch (error) {
    console.error('Error generating astro profile:', error);
    throw error;
  }
};

const parseAIResponse = (aiResponse: string, userName: string): AstroProfile => {
  // Parse the AI response and extract structured data
  const lines = aiResponse.split('\n').filter(line => line.trim());

  let sunSign = '';
  let sunDescription = '';
  let moonSign = '';
  let moonDescription = '';
  let risingSign = '';
  let risingDescription = '';
  let lifePathNumber = 0;
  let lifePathDescription = '';
  let destinyNumber = 0;
  let destinyDescription = '';
  const planetaryPositions: Array<{ planet: string; sign: string; insight: string }> = [];

  let currentSection = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('SUN SIGN:')) {
      sunSign = line.replace('SUN SIGN:', '').trim();
      currentSection = 'sun';
    } else if (line.startsWith('MOON SIGN:')) {
      moonSign = line.replace('MOON SIGN:', '').trim();
      currentSection = 'moon';
    } else if (line.startsWith('RISING SIGN:')) {
      risingSign = line.replace('RISING SIGN:', '').trim();
      currentSection = 'rising';
    } else if (line.startsWith('LIFE PATH NUMBER:')) {
      const match = line.match(/(\d+)/);
      if (match) {
        lifePathNumber = parseInt(match[1], 10);
      }
      currentSection = 'lifepath';
    } else if (line.startsWith('DESTINY NUMBER:')) {
      const match = line.match(/(\d+)/);
      if (match) {
        destinyNumber = parseInt(match[1], 10);
      }
      currentSection = 'destiny';
    } else if (line.startsWith('PLANETARY POSITIONS:')) {
      currentSection = 'planetary';
    } else if (line.startsWith('DESCRIPTION:')) {
      const description = line.replace('DESCRIPTION:', '').trim();
      if (currentSection === 'sun') sunDescription = description;
      else if (currentSection === 'moon') moonDescription = description;
      else if (currentSection === 'rising') risingDescription = description;
      else if (currentSection === 'lifepath') lifePathDescription = description;
      else if (currentSection === 'destiny') destinyDescription = description;
    } else if (currentSection === 'planetary' && line.startsWith('-')) {
      // Parse planetary position: "- Mercury in Virgo: Description"
      const planetMatch = line.match(/-\s*(\w+)\s+in\s+([\w\s♈-♓]+):\s*(.+)/);
      if (planetMatch) {
        planetaryPositions.push({
          planet: planetMatch[1].trim(),
          sign: planetMatch[2].trim(),
          insight: planetMatch[3].trim(),
        });
      }
    } else if (currentSection && line.length > 0 && !line.startsWith('---')) {
      // Continue building descriptions
      if (currentSection === 'sun' && sunDescription) sunDescription += ' ' + line;
      else if (currentSection === 'moon' && moonDescription) moonDescription += ' ' + line;
      else if (currentSection === 'rising' && risingDescription) risingDescription += ' ' + line;
      else if (currentSection === 'lifepath' && lifePathDescription) lifePathDescription += ' ' + line;
      else if (currentSection === 'destiny' && destinyDescription) destinyDescription += ' ' + line;
    }
  }

  // Build the final profile
  const profile: AstroProfile = {
    user: {
      name: userName,
    },
    bigThree: {
      sun: {
        name: 'Sun Sign',
        sign: sunSign || 'Leo ♌',
        description: sunDescription || 'Your core identity shines brightly.',
      },
      moon: {
        name: 'Moon Sign',
        sign: moonSign || 'Pisces ♓',
        description: moonDescription || 'Your emotional nature is deeply intuitive.',
      },
      rising: {
        name: 'Rising Sign',
        sign: risingSign || 'Sagittarius ♐',
        description: risingDescription || 'Your outward persona is adventurous.',
      },
    },
    numerology: {
      lifePath: {
        name: 'Life Path Number',
        value: lifePathNumber || 7,
        description: lifePathDescription || 'Your path involves seeking truth and wisdom.',
      },
      destiny: {
        name: 'Destiny Number',
        value: destinyNumber || 3,
        description: destinyDescription || 'Your destiny is to create and inspire.',
      },
    },
    planetaryPositions: planetaryPositions.map(pp => ({
      planet: pp.planet,
      sign: pp.sign,
      icon: PLANETARY_ICONS[pp.planet] || '✦',
    })),
    generatedAt: new Date(),
  };

  return profile;
};
