export interface AstrologicalSign {
  name: string;
  sign: string;
  description: string;
}

export interface NumerologyNumber {
  name: string;
  value: number;
  description: string;
}

export interface PlanetaryPosition {
  planet: string;
  sign: string;
  icon: string;
}

export const PLACEHOLDER_ASTRO_DATA = {
  user: {
    name: 'Alex',
  },
  bigThree: {
    sun: {
      name: 'Sun Sign',
      sign: 'Leo ♌',
      description:
        'Your Sun sign represents your core identity and ego. As a Leo, you are naturally confident, creative, and charismatic. You shine brightest when expressing yourself authentically and leading with warmth.',
    },
    moon: {
      name: 'Moon Sign',
      sign: 'Pisces ♓',
      description:
        'Your Moon sign reveals your emotional nature and inner self. With the Moon in Pisces, you are deeply intuitive, empathetic, and sensitive. You feel emotions intensely and have a rich inner world.',
    },
    rising: {
      name: 'Rising Sign',
      sign: 'Sagittarius ♐',
      description:
        'Your Rising sign is your mask to the world and how others perceive you. As a Sagittarius rising, you appear optimistic, adventurous, and philosophical. You approach life with enthusiasm and a thirst for knowledge.',
    },
  } as Record<'sun' | 'moon' | 'rising', AstrologicalSign>,
  numerology: {
    lifePath: {
      name: 'Life Path Number',
      value: 7,
      description:
        'The seeker and the truth-finder. You are analytical, introspective, and driven by a quest for deeper understanding. Your path involves spiritual growth and inner wisdom.',
    },
    destiny: {
      name: 'Destiny Number',
      value: 3,
      description:
        'The creative communicator. You are meant to express yourself through art, words, or performance. Your destiny involves inspiring and uplifting others through your unique vision.',
    },
  },
  planetaryPositions: [
    { planet: 'Mercury', sign: 'Virgo ♍', icon: '☿' },
    { planet: 'Venus', sign: 'Cancer ♋', icon: '♀' },
    { planet: 'Mars', sign: 'Aries ♈', icon: '♂' },
    { planet: 'Jupiter', sign: 'Taurus ♉', icon: '♃' },
    { planet: 'Saturn', sign: 'Capricorn ♑', icon: '♄' },
    { planet: 'Uranus', sign: 'Aquarius ♒', icon: '♅' },
    { planet: 'Neptune', sign: 'Pisces ♓', icon: '♆' },
    { planet: 'Pluto', sign: 'Scorpio ♏', icon: '♇' },
  ] as PlanetaryPosition[],
};
