import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/colors';
import { getTodayInsight, saveTodayInsight } from '../utils/storage';

const NEWELL_API_URL = process.env.EXPO_PUBLIC_NEWELL_API_URL || 'https://newell.staging.fastshot.ai';
const PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID || '45895021-642c-41e2-b281-f526e3585804';

interface TodayInsightCardProps {
  sunSign?: string;
}

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
      <Animated.View style={[styles.shimmerLine, { opacity, width: '90%' }]} />
    </View>
  );
};

const TodayInsightCard: React.FC<TodayInsightCardProps> = ({ sunSign = 'Aries' }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadOrGenerateInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (insight) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [insight, fadeAnim]);

  const loadOrGenerateInsight = async () => {
    try {
      // Try to load cached insight
      const cached = await getTodayInsight();
      if (cached) {
        setInsight(cached);
        setLoading(false);
        return;
      }

      // Generate new insight
      await generateInsight();
    } catch (error) {
      console.error('Error loading insight:', error);
      setInsight('Trust your intuition today and embrace new opportunities.');
      setLoading(false);
    }
  };

  const generateInsight = async () => {
    try {
      const prompt = `Generate a single, powerful, inspiring cosmic insight for someone with their Sun in ${sunSign}.
Keep it to ONE impactful sentence only. Make it warm, encouraging, and actionable.
Do not use phrases like "As a ${sunSign}" or mention the sign name. Make it personal and direct.`;

      const response = await fetch(`${NEWELL_API_URL}/v1/generate/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: PROJECT_ID,
          prompt,
          max_tokens: 80,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const generatedInsight = await response.text();
      await saveTodayInsight(generatedInsight);
      setInsight(generatedInsight);
    } catch (error) {
      console.error('Error generating insight:', error);
      setInsight('Trust your intuition today and embrace new opportunities.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Text style={styles.cardTitle}>Today&apos;s Cosmic Insight</Text>
      {loading ? (
        <ShimmerPlaceholder />
      ) : (
        <Text style={styles.insightText}>{insight}</Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: `${Colors.mysticPurple}35`,
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
    fontSize: 20,
    fontWeight: '700',
    color: Colors.starlightGold,
    marginBottom: 12,
  },
  insightText: {
    fontSize: 15,
    color: Colors.lunarWhite,
    lineHeight: 22,
    opacity: 0.95,
  },
  shimmerContainer: {
    gap: 8,
  },
  shimmerLine: {
    height: 16,
    backgroundColor: `${Colors.lunarWhite}30`,
    borderRadius: 4,
  },
});

export default TodayInsightCard;
