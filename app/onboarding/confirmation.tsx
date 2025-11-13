import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import StarryBackground from '../../components/StarryBackground';
import CosmicButton from '../../components/CosmicButton';
import CosmicLoadingScreen from '../../components/CosmicLoadingScreen';
import { Colors } from '../../constants/colors';
import { saveUserData, saveAstroProfile } from '../../utils/storage';
import { generateAstroProfile } from '../../utils/astroAI';
import { generateAllDeepDives } from '../../utils/deepDiveGenerator';

export default function ConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);

      // Save user data first
      const userData = {
        fullName: params.name as string,
        dateOfBirth: new Date(params.birthDate as string),
        timeOfBirth: new Date(params.birthTime as string),
        locationOfBirth: params.birthLocation as string,
      };
      await saveUserData(userData);

      // Show generating screen
      setLoading(false);
      setGenerating(true);

      // Generate astro profile using AI
      const astroProfile = await generateAstroProfile(userData);

      // Save the generated profile
      await saveAstroProfile(astroProfile);

      // Generate all deep dive content in batch (runs in parallel)
      await generateAllDeepDives(astroProfile);

      // Navigate to home tabs after successful generation
      setGenerating(false);
      router.replace('/(tabs)/home');
    } catch (err) {
      setLoading(false);
      setGenerating(false);
      console.error('Error generating profile:', err);
      Alert.alert(
        'Error',
        'Failed to generate your cosmic profile. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleEdit = () => {
    router.back();
  };

  return (
    <>
      <StarryBackground>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Confirm Your Details</Text>
              <Text style={styles.subtitle}>Make sure everything looks right</Text>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Name</Text>
                <Text style={styles.infoValue}>{params.name}</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Date of Birth</Text>
                <Text style={styles.infoValue}>{formatDate(params.birthDate as string)}</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Time of Birth</Text>
                <Text style={styles.infoValue}>{formatTime(params.birthTime as string)}</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Location of Birth</Text>
                <Text style={styles.infoValue}>{params.birthLocation}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit Information</Text>
            </TouchableOpacity>
            <CosmicButton
              title="Confirm"
              onPress={handleConfirm}
              loading={loading}
            />
          </View>
        </ScrollView>
      </StarryBackground>

      <Modal visible={generating} animationType="fade" statusBarTranslucent>
        <CosmicLoadingScreen />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: 40,
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
  infoContainer: {
    gap: 16,
  },
  infoCard: {
    backgroundColor: `${Colors.mysticPurple}40`,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}30`,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.starlightGold,
    marginBottom: 8,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 18,
    color: Colors.lunarWhite,
    fontWeight: '400',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 16,
  },
  editButton: {
    paddingVertical: 12,
  },
  editButtonText: {
    color: Colors.starlightGold,
    fontSize: 16,
    fontWeight: '500',
  },
});
