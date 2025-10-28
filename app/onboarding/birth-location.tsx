import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import StarryBackground from '../../components/StarryBackground';
import CosmicButton from '../../components/CosmicButton';
import CosmicInput from '../../components/CosmicInput';
import { Colors } from '../../constants/colors';

export default function BirthLocationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [location, setLocation] = useState('');

  const handleNext = () => {
    if (location.trim()) {
      router.push({
        pathname: '/onboarding/confirmation',
        params: {
          name: params.name,
          birthDate: params.birthDate,
          birthTime: params.birthTime,
          birthLocation: location.trim(),
        },
      });
    }
  };

  return (
    <StarryBackground>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Where were you born?</Text>
            <Text style={styles.subtitle}>The place where your stars aligned</Text>
          </View>

          <View style={styles.inputContainer}>
            <CosmicInput
              value={location}
              onChangeText={setLocation}
              placeholder="City, State, Country"
              label="Location of Birth"
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CosmicButton
            title="Continue"
            onPress={handleNext}
            disabled={!location.trim()}
          />
        </View>
      </KeyboardAvoidingView>
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
    flex: 1,
  },
  header: {
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.lunarWhite,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lunarWhite,
    opacity: 0.8,
    fontWeight: '300',
  },
  inputContainer: {
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
