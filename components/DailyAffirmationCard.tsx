import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/colors';
import { getDailyAffirmation, saveDailyAffirmation } from '../utils/storage';

const NEWELL_API_URL = process.env.EXPO_PUBLIC_NEWELL_API_URL || 'https://newell.staging.fastshot.ai';
const PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID || '45895021-642c-41e2-b281-f526e3585804';

interface DailyAffirmationCardProps {
  sunSign?: string;
  lifePath?: number;
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
      <Animated.View style={[styles.shimmerLine, { opacity, width: '70%' }]} />
    </View>
  );
};

const DailyAffirmationCard: React.FC<DailyAffirmationCardProps> = ({
  sunSign = 'Aries',
  lifePath = 1
}) => {
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadOrGenerateAffirmation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (affirmation) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [affirmation, fadeAnim]);

  const loadOrGenerateAffirmation = async () => {
    try {
      // Try to load cached affirmation
      const cached = await getDailyAffirmation();
      if (cached) {
        setAffirmation(cached);
        setLoading(false);
        return;
      }

      // Generate new affirmation
      await generateAffirmation();
    } catch (error) {
      console.error('Error loading affirmation:', error);
      setAffirmation('I radiate confidence and embrace my power.');
      setLoading(false);
    }
  };

  const generateAffirmation = async () => {
    try {
      const prompt = `Create a very short, powerful daily affirmation for someone with Sun in ${sunSign} and Life Path ${lifePath}.
Keep it to ONE short sentence or phrase (maximum 10 words). Make it empowering, personal, and present-tense.
Start with I or My. Do not mention the zodiac sign or life path number.`;

      const response = await fetch(`${NEWELL_API_URL}/v1/generate/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: PROJECT_ID,
          prompt,
          max_tokens: 50,
          temperature: 0.9,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const generatedAffirmation = await response.text();
      await saveDailyAffirmation(generatedAffirmation);
      setAffirmation(generatedAffirmation);
    } catch (error) {
      console.error('Error generating affirmation:', error);
      setAffirmation('I radiate confidence and embrace my power.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Text style={styles.cardTitle}>Your Daily Affirmation</Text>
      {loading ? (
        <ShimmerPlaceholder />
      ) : (
        <Text style={styles.affirmationText}>&ldquo;{affirmation}&rdquo;</Text>
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
  affirmationText: {
    fontSize: 16,
    color: Colors.lunarWhite,
    lineHeight: 24,
    fontStyle: 'italic',
    opacity: 0.95,
    textAlign: 'center',
  },
  shimmerContainer: {
    gap: 8,
    alignItems: 'center',
  },
  shimmerLine: {
    height: 16,
    backgroundColor: `${Colors.lunarWhite}30`,
    borderRadius: 4,
  },
});

export default DailyAffirmationCard;
