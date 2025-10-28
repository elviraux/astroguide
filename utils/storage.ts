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
