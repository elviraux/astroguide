import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Colors } from '../constants/colors';
import { NumerologyNumber } from '../constants/astroData';
import DeepDiveModal from './DeepDiveModal';

interface NumerologyCardProps {
  lifePath: NumerologyNumber;
  destiny: NumerologyNumber;
}

interface NumberDisplayProps {
  number: NumerologyNumber;
  type: 'lifePath' | 'destiny';
  onPress: () => void;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ number, type, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const imageSource = {
    lifePath: require('../assets/images/cosmic/lifepath-number.png'),
    destiny: require('../assets/images/cosmic/destiny-number.png'),
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.numberItem, { transform: [{ scale: scaleAnim }] }]}>
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
      </Animated.View>
    </TouchableOpacity>
  );
};

const NumerologyCard: React.FC<NumerologyCardProps> = ({ lifePath, destiny }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<{
    number: NumerologyNumber;
    type: 'lifePath' | 'destiny';
  } | null>(null);

  const handleNumberPress = (number: NumerologyNumber, type: 'lifePath' | 'destiny') => {
    setSelectedNumber({ number, type });
    setModalVisible(true);
  };

  const getIconForType = (type: 'lifePath' | 'destiny'): string => {
    return type === 'lifePath' ? '🛤️' : '✨';
  };

  const getPromptForNumber = (type: 'lifePath' | 'destiny', value: number): string => {
    const prompts = {
      lifePath: `Provide a deep, practical explanation of Life Path Number ${value} in numerology. Focus on life purpose, natural talents, career paths, relationships, and personal growth areas. Write 2-3 paragraphs with actionable insights. Make it personal and empowering.`,
      destiny: `Provide a deep, practical explanation of Destiny Number ${value} in numerology. Focus on life mission, soul purpose, natural abilities, potential achievements, and how to fulfill their destiny. Write 2-3 paragraphs with actionable insights. Make it personal and empowering.`,
    };
    return prompts[type];
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Your Numerology Profile</Text>
      <Text style={styles.cardSubtitle}>Key Life Numbers</Text>
      <View style={styles.numbersContainer}>
        <NumberDisplay
          number={lifePath}
          type="lifePath"
          onPress={() => handleNumberPress(lifePath, 'lifePath')}
        />
        <NumberDisplay
          number={destiny}
          type="destiny"
          onPress={() => handleNumberPress(destiny, 'destiny')}
        />
      </View>

      {selectedNumber && (
        <DeepDiveModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={selectedNumber.number.name}
          icon={getIconForType(selectedNumber.type)}
          itemKey={`${selectedNumber.type}-${selectedNumber.number.value}`}
          generatePrompt={getPromptForNumber(selectedNumber.type, selectedNumber.number.value)}
        />
      )}
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
    marginRight: 10,
  },
  imageContainer: {
    width: 11,
    height: 11,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${Colors.cosmicMidnightBlue}40`,
    borderRadius: 6,
    padding: 1,
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
    bottom: -1,
    right: -1,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.starlightGold,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cosmicMidnightBlue,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  numberValue: {
    fontSize: 7,
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
