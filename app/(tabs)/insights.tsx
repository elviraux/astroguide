import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/colors';
import { PLACEHOLDER_ASTRO_DATA } from '../../constants/astroData';
import ParallaxBackground from '../../components/ParallaxBackground';
import TodayInsightCard from '../../components/TodayInsightCard';
import DailyAffirmationCard from '../../components/DailyAffirmationCard';
import CosmicSpotlightCard from '../../components/CosmicSpotlightCard';
import { getAstroProfile, AstroProfile } from '../../utils/storage';

export default function InsightsScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [astroData, setAstroData] = useState<AstroProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAstroData();
  }, []);

  const loadAstroData = async () => {
    try {
      const profile = await getAstroProfile();
      if (profile) {
        setAstroData(profile);
      }
    } catch (error) {
      console.error('Error loading astro profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use generated data if available, otherwise fall back to placeholder
  const displayData = astroData || PLACEHOLDER_ASTRO_DATA;

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.starlightGold} />
      </View>
    );
  }

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
            <Text style={styles.title}>Daily Cosmic Feed</Text>
            <Text style={styles.subtitle}>Your personalized insights for today</Text>
          </View>

          {/* Today's Insight */}
          <TodayInsightCard sunSign={displayData.bigThree.sun.sign} />

          {/* Daily Affirmation */}
          <DailyAffirmationCard
            sunSign={displayData.bigThree.sun.sign}
            lifePath={displayData.numerology.lifePath.value}
          />

          {/* Cosmic Spotlight */}
          <CosmicSpotlightCard astroProfile={displayData} />

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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
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
