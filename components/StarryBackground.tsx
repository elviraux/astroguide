import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

const StarryBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stars = useRef<Star[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3000 + 2000,
    }))
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.gradient}>
        {stars.map((star) => (
          <AnimatedStar key={star.id} star={star} />
        ))}
        {children}
      </View>
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
  },
  gradient: {
    flex: 1,
    backgroundColor: Colors.cosmicMidnightBlue,
  },
  star: {
    position: 'absolute',
    backgroundColor: Colors.lunarWhite,
    borderRadius: 1,
  },
});

export default StarryBackground;
