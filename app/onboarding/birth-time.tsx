import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import StarryBackground from '../../components/StarryBackground';
import CosmicButton from '../../components/CosmicButton';
import { Colors } from '../../constants/colors';

export default function BirthTimeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleNext = () => {
    router.push({
      pathname: '/onboarding/birth-location',
      params: {
        name: params.name,
        birthDate: params.birthDate,
        birthTime: time.toISOString(),
      },
    });
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <StarryBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>What time were you born?</Text>
            <Text style={styles.subtitle}>The exact moment your journey began</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.label}>Time of Birth</Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.timeText}>{formatTime(time)}</Text>
            </TouchableOpacity>

            {(showPicker || Platform.OS === 'ios') && (
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  value={time}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onTimeChange}
                  textColor={Colors.lunarWhite}
                  themeVariant="dark"
                />
              </View>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CosmicButton title="Continue" onPress={handleNext} />
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
  timeContainer: {
    width: '100%',
  },
  label: {
    color: Colors.lunarWhite,
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  timeButton: {
    backgroundColor: `${Colors.mysticPurple}40`,
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}30`,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeText: {
    fontSize: 16,
    color: Colors.lunarWhite,
  },
  pickerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
