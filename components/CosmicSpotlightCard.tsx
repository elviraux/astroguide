import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/colors';
import { getCosmicSpotlight, saveCosmicSpotlight, AstroProfile } from '../utils/storage';

const NEWELL_API_URL = process.env.EXPO_PUBLIC_NEWELL_API_URL || 'https://newell.staging.fastshot.ai';
const PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID || '45895021-642c-41e2-b281-f526e3585804';

interface CosmicSpotlightCardProps {
  astroProfile?: AstroProfile | null;
}

const SPOTLIGHT_TOPICS = [
  { key: 'moon', label: 'Moon Sign', getter: (profile: AstroProfile) => profile.bigThree.moon.sign },
  { key: 'rising', label: 'Rising Sign', getter: (profile: AstroProfile) => profile.bigThree.rising.sign },
  { key: 'destiny', label: 'Destiny Number', getter: (profile: AstroProfile) => profile.numerology.destiny.value.toString() },
  { key: 'lifepath', label: 'Life Path Number', getter: (profile: AstroProfile) => profile.numerology.lifePath.value.toString() },
];

const ShimmerPlaceholder: React.FC = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.shimmerContainer}>
      <Animated.View style={[styles.shimmerLine, { opacity, width: '100%' }]} />
      <Animated.View style={[styles.shimmerLine, { opacity, width: '95%' }]} />
      <Animated.View style={[styles.shimmerLine, { opacity, width: '90%' }]} />
      <Animated.View style={[styles.shimmerLine, { opacity, width: '85%' }]} />
    </View>
  );
};

const CosmicSpotlightCard: React.FC<CosmicSpotlightCardProps> = ({ astroProfile }) => {
  const [spotlight, setSpotlight] = useState<{ content: string; topic: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadOrGenerateSpotlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (spotlight) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [spotlight, fadeAnim]);

  const loadOrGenerateSpotlight = async () => {
    try {
      // Try to load cached spotlight
      const cached = await getCosmicSpotlight();
      if (cached) {
        setSpotlight(cached);
        setLoading(false);
        return;
      }

      // Generate new spotlight
      await generateSpotlight();
    } catch (error) {
      console.error('Error loading cosmic spotlight:', error);
      setSpotlight({
        topic: 'Your Cosmic Journey',
        content: 'Your chart reveals unique strengths and opportunities. Embrace your authentic path and trust the cosmic timing of your life.',
      });
      setLoading(false);
    }
  };

  const generateSpotlight = async () => {
    try {
      if (!astroProfile) {
        throw new Error('No astro profile available');
      }

      // Select a random topic for this week
      const weekSeed = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
      const topicIndex = weekSeed % SPOTLIGHT_TOPICS.length;
      const selectedTopic = SPOTLIGHT_TOPICS[topicIndex];
      const topicValue = selectedTopic.getter(astroProfile);

      const prompt = `Provide a deep, insightful explanation of having ${selectedTopic.label} in ${topicValue}.
Explain the significance and practical implications in 3-4 sentences.
Be direct and personal, using "you" and "your". Focus on real-world impact and growth opportunities.
Do not use introductory phrases. Start directly with the insight.`;

      const response = await fetch(`${NEWELL_API_URL}/v1/generate/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: PROJECT_ID,
          prompt,
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const generatedContent = await response.text();
      const spotlightData = {
        content: generatedContent,
        topic: `${selectedTopic.label}: ${topicValue}`,
      };

      await saveCosmicSpotlight(spotlightData.content, spotlightData.topic);
      setSpotlight(spotlightData);
    } catch (error) {
      console.error('Error generating cosmic spotlight:', error);
      setSpotlight({
        topic: 'Your Cosmic Blueprint',
        content: 'Your unique chart configuration reveals powerful insights about your life path. Each planetary placement offers guidance for personal growth and self-discovery.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Text style={styles.cardTitle}>Cosmic Spotlight</Text>
      {loading ? (
        <ShimmerPlaceholder />
      ) : (
        <>
          {spotlight && (
            <>
              <Text style={styles.topicText}>{spotlight.topic}</Text>
              <Text style={styles.contentText}>{spotlight.content}</Text>
            </>
          )}
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: `${Colors.mysticPurple}35`,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}30`,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
    minHeight: 160,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.starlightGold,
    marginBottom: 16,
  },
  topicText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.starlightGold,
    marginBottom: 12,
    opacity: 0.9,
  },
  contentText: {
    fontSize: 15,
    color: Colors.lunarWhite,
    lineHeight: 23,
    opacity: 0.95,
  },
  shimmerContainer: {
    gap: 10,
  },
  shimmerLine: {
    height: 16,
    backgroundColor: `${Colors.lunarWhite}30`,
    borderRadius: 4,
  },
});

export default CosmicSpotlightCard;
