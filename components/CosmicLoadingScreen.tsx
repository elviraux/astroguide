import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import StarryBackground from './StarryBackground';
import { Colors } from '../constants/colors';

const { width } = Dimensions.get('window');
const CHART_SIZE = width * 0.6;

const CosmicLoadingScreen: React.FC = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Rotate star chart continuously
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [rotateAnim, pulseAnim, fadeAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <StarryBackground>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.chartContainer,
            {
              transform: [{ rotate }, { scale: pulseAnim }],
            },
          ]}
        >
          {/* Zodiac wheel representation */}
          <View style={styles.outerCircle}>
            <View style={styles.middleCircle}>
              <View style={styles.innerCircle}>
                <Text style={styles.centerSymbol}>✦</Text>
              </View>
            </View>
          </View>

          {/* Zodiac symbols around the circle */}
          {renderZodiacSymbols()}
        </Animated.View>

        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Generating Your</Text>
          <Text style={styles.subtitle}>Cosmic Blueprint...</Text>
          <View style={styles.dotsContainer}>
            <AnimatedDot delay={0} />
            <AnimatedDot delay={200} />
            <AnimatedDot delay={400} />
          </View>
        </Animated.View>
      </View>
    </StarryBackground>
  );
};

const AnimatedDot: React.FC<{ delay: number }> = ({ delay }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity, delay]);

  return <Animated.Text style={[styles.dot, { opacity }]}>✦</Animated.Text>;
};

const renderZodiacSymbols = () => {
  const symbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  const radius = CHART_SIZE / 2 - 20;

  return symbols.map((symbol, index) => {
    const angle = (index * 30 * Math.PI) / 180;
    const x = radius * Math.cos(angle - Math.PI / 2);
    const y = radius * Math.sin(angle - Math.PI / 2);

    return (
      <Text
        key={index}
        style={[
          styles.zodiacSymbol,
          {
            left: CHART_SIZE / 2 + x - 12,
            top: CHART_SIZE / 2 + y - 12,
          },
        ]}
      >
        {symbol}
      </Text>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  chartContainer: {
    width: CHART_SIZE,
    height: CHART_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  outerCircle: {
    width: CHART_SIZE,
    height: CHART_SIZE,
    borderRadius: CHART_SIZE / 2,
    borderWidth: 2,
    borderColor: Colors.starlightGold,
    opacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircle: {
    width: CHART_SIZE * 0.7,
    height: CHART_SIZE * 0.7,
    borderRadius: (CHART_SIZE * 0.7) / 2,
    borderWidth: 2,
    borderColor: Colors.starlightGold,
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: CHART_SIZE * 0.4,
    height: CHART_SIZE * 0.4,
    borderRadius: (CHART_SIZE * 0.4) / 2,
    borderWidth: 2,
    borderColor: Colors.starlightGold,
    backgroundColor: `${Colors.mysticPurple}40`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerSymbol: {
    fontSize: 48,
    color: Colors.starlightGold,
  },
  zodiacSymbol: {
    position: 'absolute',
    fontSize: 24,
    color: Colors.lunarWhite,
    opacity: 0.8,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.lunarWhite,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '300',
    color: Colors.starlightGold,
    textAlign: 'center',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    fontSize: 20,
    color: Colors.starlightGold,
  },
});

export default CosmicLoadingScreen;
