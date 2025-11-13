import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserData {
  fullName: string;
  dateOfBirth: Date;
  timeOfBirth: Date;
  locationOfBirth: string;
}

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

export interface AstroProfile {
  user: {
    name: string;
  };
  bigThree: {
    sun: AstrologicalSign;
    moon: AstrologicalSign;
    rising: AstrologicalSign;
  };
  numerology: {
    lifePath: NumerologyNumber;
    destiny: NumerologyNumber;
  };
  planetaryPositions: PlanetaryPosition[];
  generatedAt: Date;
}

const STORAGE_KEY = '@astroguide_user_data';
const ASTRO_PROFILE_KEY = '@astroguide_astro_profile';

export const saveUserData = async (userData: UserData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify({
      ...userData,
      dateOfBirth: userData.dateOfBirth.toISOString(),
      timeOfBirth: userData.timeOfBirth.toISOString(),
    });
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue === null) {
      return null;
    }
    const data = JSON.parse(jsonValue);
    return {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth),
      timeOfBirth: new Date(data.timeOfBirth),
    };
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

export const clearUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing user data:', error);
    throw error;
  }
};

export const saveAstroProfile = async (profile: AstroProfile): Promise<void> => {
  try {
    const jsonValue = JSON.stringify({
      ...profile,
      generatedAt: profile.generatedAt.toISOString(),
    });
    await AsyncStorage.setItem(ASTRO_PROFILE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving astro profile:', error);
    throw error;
  }
};

export const getAstroProfile = async (): Promise<AstroProfile | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(ASTRO_PROFILE_KEY);
    if (jsonValue === null) {
      return null;
    }
    const data = JSON.parse(jsonValue);
    return {
      ...data,
      generatedAt: new Date(data.generatedAt),
    };
  } catch (error) {
    console.error('Error loading astro profile:', error);
    return null;
  }
};

export const clearAstroProfile = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ASTRO_PROFILE_KEY);
  } catch (error) {
    console.error('Error clearing astro profile:', error);
    throw error;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEY, ASTRO_PROFILE_KEY]);
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};

// Daily Content Storage
interface DailyContent {
  content: string;
  date: string; // ISO date string (YYYY-MM-DD)
}

interface WeeklyContent {
  content: string;
  topic: string;
  weekStart: string; // ISO date string of Monday
}

const TODAY_INSIGHT_KEY = '@astroguide_today_insight';
const DAILY_AFFIRMATION_KEY = '@astroguide_daily_affirmation';
const COSMIC_SPOTLIGHT_KEY = '@astroguide_cosmic_spotlight';

const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
};

const getWeekStart = (): string => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  const monday = new Date(today.setDate(diff));
  return monday.toISOString().split('T')[0];
};

export const getTodayInsight = async (): Promise<string | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TODAY_INSIGHT_KEY);
    if (!jsonValue) return null;
    const data: DailyContent = JSON.parse(jsonValue);
    if (data.date === getTodayDate()) {
      return data.content;
    }
    return null;
  } catch (error) {
    console.error('Error loading today insight:', error);
    return null;
  }
};

export const saveTodayInsight = async (content: string): Promise<void> => {
  try {
    const data: DailyContent = {
      content,
      date: getTodayDate(),
    };
    await AsyncStorage.setItem(TODAY_INSIGHT_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving today insight:', error);
    throw error;
  }
};

export const getDailyAffirmation = async (): Promise<string | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(DAILY_AFFIRMATION_KEY);
    if (!jsonValue) return null;
    const data: DailyContent = JSON.parse(jsonValue);
    if (data.date === getTodayDate()) {
      return data.content;
    }
    return null;
  } catch (error) {
    console.error('Error loading daily affirmation:', error);
    return null;
  }
};

export const saveDailyAffirmation = async (content: string): Promise<void> => {
  try {
    const data: DailyContent = {
      content,
      date: getTodayDate(),
    };
    await AsyncStorage.setItem(DAILY_AFFIRMATION_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving daily affirmation:', error);
    throw error;
  }
};

export const getCosmicSpotlight = async (): Promise<{ content: string; topic: string } | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(COSMIC_SPOTLIGHT_KEY);
    if (!jsonValue) return null;
    const data: WeeklyContent = JSON.parse(jsonValue);
    if (data.weekStart === getWeekStart()) {
      return { content: data.content, topic: data.topic };
    }
    return null;
  } catch (error) {
    console.error('Error loading cosmic spotlight:', error);
    return null;
  }
};

export const saveCosmicSpotlight = async (content: string, topic: string): Promise<void> => {
  try {
    const data: WeeklyContent = {
      content,
      topic,
      weekStart: getWeekStart(),
    };
    await AsyncStorage.setItem(COSMIC_SPOTLIGHT_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving cosmic spotlight:', error);
    throw error;
  }
};

// Deep Dive Content Storage
const DEEP_DIVE_KEY_PREFIX = '@astroguide_deep_dive_';

export const getDeepDiveContent = async (key: string): Promise<string | null> => {
  try {
    const storageKey = `${DEEP_DIVE_KEY_PREFIX}${key}`;
    const content = await AsyncStorage.getItem(storageKey);
    return content;
  } catch (error) {
    console.error('Error loading deep dive content:', error);
    return null;
  }
};

export const saveDeepDiveContent = async (key: string, content: string): Promise<void> => {
  try {
    const storageKey = `${DEEP_DIVE_KEY_PREFIX}${key}`;
    await AsyncStorage.setItem(storageKey, content);
  } catch (error) {
    console.error('Error saving deep dive content:', error);
    throw error;
  }
};
