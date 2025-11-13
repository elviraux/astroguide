import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Colors } from '../constants/colors';
import { PlanetaryPosition } from '../constants/astroData';
import DeepDiveModal from './DeepDiveModal';
import { normalizeKey } from '../utils/deepDiveGenerator';

interface PlanetaryCardProps {
  positions: PlanetaryPosition[];
}

const PlanetItem: React.FC<{ position: PlanetaryPosition; onPress: () => void }> = ({ position, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
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
      style={{ width: '47%' }}
    >
      <Animated.View style={[styles.planetItem, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.planetIconContainer}>
          <Text style={styles.planetIcon}>{position.icon}</Text>
        </View>
        <View style={styles.planetInfo}>
          <Text style={styles.planetName}>{position.planet}</Text>
          <Text style={styles.planetSign}>{position.sign}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const PlanetaryCard: React.FC<PlanetaryCardProps> = ({ positions }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetaryPosition | null>(null);

  const handlePlanetPress = (position: PlanetaryPosition) => {
    setSelectedPlanet(position);
    setModalVisible(true);
  };

  const getPromptForPlanet = (planet: string, sign: string): string => {
    return `Provide a deep, practical explanation of having ${planet} in ${sign}. Focus on how this placement influences the person's life, behavior, and experiences related to ${planet}'s domain. Include strengths, challenges, and actionable advice. Write 2-3 paragraphs with specific, empowering insights.`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Planetary Positions</Text>
      <Text style={styles.cardSubtitle}>At the time of your birth</Text>
      <View style={styles.planetsGrid}>
        {positions.map((position, index) => (
          <PlanetItem
            key={index}
            position={position}
            onPress={() => handlePlanetPress(position)}
          />
        ))}
      </View>

      {selectedPlanet && (
        <DeepDiveModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={`${selectedPlanet.planet} in ${selectedPlanet.sign}`}
          icon={selectedPlanet.icon}
          itemKey={`${normalizeKey(selectedPlanet.planet)}-${normalizeKey(selectedPlanet.sign)}`}
          generatePrompt={getPromptForPlanet(selectedPlanet.planet, selectedPlanet.sign)}
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
  planetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  planetItem: {
    backgroundColor: `${Colors.cosmicMidnightBlue}60`,
    borderRadius: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}20`,
    flexDirection: 'row',
    alignItems: 'center',
  },
  planetIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.starlightGold}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  planetIcon: {
    fontSize: 18,
    color: Colors.starlightGold,
  },
  planetInfo: {
    flex: 1,
  },
  planetName: {
    fontSize: 13,
    color: Colors.lunarWhite,
    fontWeight: '600',
    marginBottom: 2,
  },
  planetSign: {
    fontSize: 11,
    color: Colors.starlightGold,
    opacity: 0.8,
  },
});

export default PlanetaryCard;
