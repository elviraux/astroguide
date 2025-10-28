import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import StarryBackground from '../../components/StarryBackground';
import CosmicButton from '../../components/CosmicButton';
import CosmicInput from '../../components/CosmicInput';
import { Colors } from '../../constants/colors';

export default function NameScreen() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleNext = () => {
    if (name.trim()) {
      router.push({
        pathname: '/onboarding/birth-date',
        params: { name: name.trim() },
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
            <Text style={styles.title}>What&apos;s your name?</Text>
            <Text style={styles.subtitle}>Let the stars know who you are</Text>
          </View>

          <View style={styles.inputContainer}>
            <CosmicInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              label="Full Name"
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CosmicButton
            title="Continue"
            onPress={handleNext}
            disabled={!name.trim()}
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
