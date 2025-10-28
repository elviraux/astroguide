import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  layer: number; // For parallax effect: 1, 2, or 3
}

interface ParallaxBackgroundProps {
  scrollY: Animated.Value;
  children: React.ReactNode;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ scrollY, children }) => {
  const stars = useRef<Star[]>(
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height * 2, // Taller for scrolling
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3000 + 2000,
      layer: Math.floor(Math.random() * 3) + 1, // 1, 2, or 3
    }))
  ).current;

  // Group stars by layer
  const starsByLayer = {
    1: stars.filter(s => s.layer === 1),
    2: stars.filter(s => s.layer === 2),
    3: stars.filter(s => s.layer === 3),
  };

  return (
    <View style={styles.container}>
      {/* Background layer - slowest parallax */}
      <Animated.View
        style={[
          styles.starLayer,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 1000],
                  outputRange: [0, -100],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        {starsByLayer[1].map((star) => (
          <AnimatedStar key={star.id} star={star} />
        ))}
      </Animated.View>

      {/* Middle layer - medium parallax */}
      <Animated.View
        style={[
          styles.starLayer,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 1000],
                  outputRange: [0, -200],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        {starsByLayer[2].map((star) => (
          <AnimatedStar key={star.id} star={star} />
        ))}
      </Animated.View>

      {/* Front layer - fastest parallax */}
      <Animated.View
        style={[
          styles.starLayer,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 1000],
                  outputRange: [0, -300],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        {starsByLayer[3].map((star) => (
          <AnimatedStar key={star.id} star={star} />
        ))}
      </Animated.View>

      {/* Content */}
      {children}
    </View>
  );
};

const AnimatedStar: React.FC<{ star: Star }> = ({ star }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: star.duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: star.duration,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, [opacity, star.duration]);

  return (
    <Animated.View
      style={[
        styles.star,
        {
          left: star.x,
          top: star.y,
          width: star.size,
          height: star.size,
          opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cosmicMidnightBlue,
  },
  starLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
    backgroundColor: Colors.lunarWhite,
    borderRadius: 1,
  },
});

export default ParallaxBackground;
