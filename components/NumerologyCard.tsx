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
    gap: 16,
  },
  numberItem: {
    flexDirection: 'row',
    backgroundColor: `${Colors.cosmicMidnightBlue}80`,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}40`,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
  },
  imageSection: {
    position: 'relative',
    marginRight: 12,
  },
  imageContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${Colors.cosmicMidnightBlue}40`,
    borderRadius: 16,
    padding: 2,
    shadowColor: Colors.mysticPurple,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  cosmicImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  numberBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.starlightGold,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.cosmicMidnightBlue,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  numberValue: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.cosmicMidnightBlue,
  },
  numberInfo: {
    flex: 1,
  },
  numberLabel: {
    fontSize: 14,
    color: Colors.starlightGold,
    marginBottom: 6,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  numberDescription: {
    fontSize: 13,
    color: Colors.lunarWhite,
    lineHeight: 18,
    opacity: 0.9,
  },
});

export default NumerologyCard;
