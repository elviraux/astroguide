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
          <Text style={styles.appName}>Astrofly</Text>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/onboarding/astro-wheel.png')}
              style={styles.iconImage}
            />
          </View>
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
    paddingHorizontal: 30,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: `${Colors.mysticPurple}60`,
    borderWidth: 3,
    borderColor: Colors.starlightGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    overflow: 'hidden',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  appName: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.lunarWhite,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    color: Colors.starlightGold,
    textAlign: 'center',
    opacity: 0.95,
    fontWeight: '400',
    letterSpacing: 1.5,
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
