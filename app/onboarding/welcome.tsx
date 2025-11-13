import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import StarryBackground from '../../components/StarryBackground';
import CosmicButton from '../../components/CosmicButton';
import { Colors } from '../../constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <StarryBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../../assets/images/onboarding/onboarding-banner.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <Text style={styles.appName}>Astrofly</Text>
          <Text style={styles.tagline}>Discover your cosmic blueprint.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CosmicButton
            title="Get Started"
            onPress={() => router.push('/onboarding/name')}
          />
        </View>
      </View>
    </StarryBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 60,
  },
  content: {
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 240,
    marginBottom: 40,
    shadowColor: Colors.mysticPurple,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 15,
  },
  appName: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.lunarWhite,
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  tagline: {
    fontSize: 18,
    color: Colors.lunarWhite,
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: '300',
    letterSpacing: 1,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});
