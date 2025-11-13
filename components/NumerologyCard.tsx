import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../constants/colors';
import { NumerologyNumber } from '../constants/astroData';

interface NumerologyCardProps {
  lifePath: NumerologyNumber;
  destiny: NumerologyNumber;
}

interface NumberDisplayProps {
  number: NumerologyNumber;
  type: 'lifePath' | 'destiny';
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ number, type }) => {
  const imageSource = {
    lifePath: require('../assets/images/cosmic/lifepath-number.png'),
    destiny: require('../assets/images/cosmic/destiny-number.png'),
  };

  return (
    <View style={styles.numberItem}>
      <View style={styles.imageSection}>
        <View style={styles.imageContainer}>
          <Image source={imageSource[type]} style={styles.cosmicImage} />
        </View>
        <View style={styles.numberBadge}>
          <Text style={styles.numberValue}>{number.value}</Text>
        </View>
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
        <NumberDisplay number={lifePath} type="lifePath" />
        <NumberDisplay number={destiny} type="destiny" />
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
    gap: 24,
  },
  numberItem: {
    backgroundColor: `${Colors.cosmicMidnightBlue}80`,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}40`,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  imageContainer: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${Colors.cosmicMidnightBlue}40`,
    borderRadius: 90,
    padding: 20,
    shadowColor: Colors.mysticPurple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  cosmicImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  numberBadge: {
    position: 'absolute',
    bottom: -10,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.starlightGold,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.cosmicMidnightBlue,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  numberValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.cosmicMidnightBlue,
  },
  numberInfo: {
    alignItems: 'center',
  },
  numberLabel: {
    fontSize: 16,
    color: Colors.starlightGold,
    marginBottom: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  numberDescription: {
    fontSize: 14,
    color: Colors.lunarWhite,
    lineHeight: 20,
    opacity: 0.9,
    textAlign: 'center',
  },
});

export default NumerologyCard;
