import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getUserData, clearAllData } from '../utils/storage';
import { Colors } from '../constants/colors';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const userData = await getUserData();
        await clearAllData();

        // Add a small delay for smooth transition
        setTimeout(() => {
          if (userData) {
            // User has completed onboarding, go to home tabs
            router.replace('/(tabs)/home');
          } else {
            // User hasn't completed onboarding, show welcome
            router.replace('/onboarding/welcome');
          }
        }, 500);
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        // On error, default to onboarding
        router.replace('/onboarding/welcome');
      }
    };

    checkOnboardingStatus();
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.starlightGold} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.cosmicMidnightBlue,
  },
});
