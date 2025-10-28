import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserData {
  fullName: string;
  dateOfBirth: Date;
  timeOfBirth: Date;
  locationOfBirth: string;
}

const STORAGE_KEY = '@astroguide_user_data';

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
