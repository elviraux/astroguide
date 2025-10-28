import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../constants/colors';
import { PLACEHOLDER_ASTRO_DATA } from '../../constants/astroData';
import ParallaxBackground from '../../components/ParallaxBackground';
import AstrologyCard from '../../components/AstrologyCard';
import NumerologyCard from '../../components/NumerologyCard';
import PlanetaryCard from '../../components/PlanetaryCard';

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <ParallaxBackground scrollY={scrollY}>
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>
              Hello, {PLACEHOLDER_ASTRO_DATA.user.name} ✨
            </Text>
            <Text style={styles.subtitle}>Your cosmic blueprint awaits</Text>
          </View>

          {/* Astrology Card */}
          <AstrologyCard bigThree={PLACEHOLDER_ASTRO_DATA.bigThree} />

          {/* Numerology Card */}
          <NumerologyCard
            lifePath={PLACEHOLDER_ASTRO_DATA.numerology.lifePath}
            destiny={PLACEHOLDER_ASTRO_DATA.numerology.destiny}
          />

          {/* Planetary Positions Card */}
          <PlanetaryCard positions={PLACEHOLDER_ASTRO_DATA.planetaryPositions} />

          {/* Bottom spacing */}
          <View style={styles.bottomSpacer} />
        </Animated.ScrollView>
      </ParallaxBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cosmicMidnightBlue,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 80,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.lunarWhite,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.starlightGold,
    opacity: 0.9,
    fontWeight: '300',
  },
  bottomSpacer: {
    height: 40,
  },
});
