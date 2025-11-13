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
          <View style={styles.logoPlaceholder}>
            <Image
              source={require('../../assets/images/onboarding/astrologer-welcome.png')}
              style={styles.logoImage}
            />
          </View>
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
    paddingTop: 120,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  content: {
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: `${Colors.mysticPurple}60`,
    borderWidth: 2,
    borderColor: Colors.starlightGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  appName: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.lunarWhite,
    marginBottom: 16,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: Colors.lunarWhite,
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: '300',
    letterSpacing: 1,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
