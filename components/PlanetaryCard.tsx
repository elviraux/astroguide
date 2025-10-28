import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { PlanetaryPosition } from '../constants/astroData';

interface PlanetaryCardProps {
  positions: PlanetaryPosition[];
}

const PlanetItem: React.FC<{ position: PlanetaryPosition }> = ({ position }) => {
  return (
    <View style={styles.planetItem}>
      <View style={styles.planetIconContainer}>
        <Text style={styles.planetIcon}>{position.icon}</Text>
      </View>
      <View style={styles.planetInfo}>
        <Text style={styles.planetName}>{position.planet}</Text>
        <Text style={styles.planetSign}>{position.sign}</Text>
      </View>
    </View>
  );
};

const PlanetaryCard: React.FC<PlanetaryCardProps> = ({ positions }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Planetary Positions</Text>
      <Text style={styles.cardSubtitle}>At the time of your birth</Text>
      <View style={styles.planetsGrid}>
        {positions.map((position, index) => (
          <PlanetItem key={index} position={position} />
        ))}
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
  planetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  planetItem: {
    width: '47%',
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
