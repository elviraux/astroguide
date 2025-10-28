import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { NumerologyNumber } from '../constants/astroData';

interface NumerologyCardProps {
  lifePath: NumerologyNumber;
  destiny: NumerologyNumber;
}

const NumberDisplay: React.FC<{ number: NumerologyNumber }> = ({ number }) => {
  return (
    <View style={styles.numberItem}>
      <View style={styles.numberCircle}>
        <Text style={styles.numberValue}>{number.value}</Text>
      </View>
      <View style={styles.numberInfo}>
        <Text style={styles.numberLabel}>{number.name}</Text>
        <Text style={styles.numberDescription}>{number.description}</Text>
      </View>
    </View>
  );
};

const NumerologyCard: React.FC<NumerologyCardProps> = ({ lifePath, destiny }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Your Numerology Profile</Text>
      <Text style={styles.cardSubtitle}>Key Life Numbers</Text>
      <View style={styles.numbersContainer}>
        <NumberDisplay number={lifePath} />
        <NumberDisplay number={destiny} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: `${Colors.mysticPurple}40`,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}30`,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.lunarWhite,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.starlightGold,
    marginBottom: 20,
    fontWeight: '500',
  },
  numbersContainer: {
    gap: 16,
  },
  numberItem: {
    flexDirection: 'row',
    backgroundColor: `${Colors.cosmicMidnightBlue}60`,
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}20`,
    alignItems: 'flex-start',
  },
  numberCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.starlightGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  numberValue: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.cosmicMidnightBlue,
  },
  numberInfo: {
    flex: 1,
  },
  numberLabel: {
    fontSize: 16,
    color: Colors.starlightGold,
    marginBottom: 8,
    fontWeight: '600',
  },
  numberDescription: {
    fontSize: 13,
    color: Colors.lunarWhite,
    lineHeight: 18,
    opacity: 0.9,
  },
});

export default NumerologyCard;
