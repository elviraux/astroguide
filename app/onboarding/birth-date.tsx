import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import StarryBackground from '../../components/StarryBackground';
import CosmicButton from '../../components/CosmicButton';
import { Colors } from '../../constants/colors';

export default function BirthDateScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleNext = () => {
    router.push({
      pathname: '/onboarding/birth-time',
      params: {
        name: params.name,
        birthDate: date.toISOString(),
      },
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <StarryBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>When were you born?</Text>
            <Text style={styles.subtitle}>Your birth date reveals your cosmic path</Text>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </TouchableOpacity>

            {(showPicker || Platform.OS === 'ios') && (
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onDateChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
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
  dateContainer: {
    width: '100%',
  },
  label: {
    color: Colors.lunarWhite,
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  dateButton: {
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
  dateText: {
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
