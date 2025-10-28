import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/colors';

const TypingIndicator: React.FC = () => {
  const star1 = useRef(new Animated.Value(0.3)).current;
  const star2 = useRef(new Animated.Value(0.3)).current;
  const star3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateStar = (animValue: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0.3,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateStar(star1, 0);
    animateStar(star2, 200);
    animateStar(star3, 400);
  }, [star1, star2, star3]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.star, { opacity: star1 }]}>✨</Animated.Text>
      <Animated.Text style={[styles.star, { opacity: star2 }]}>✨</Animated.Text>
      <Animated.Text style={[styles.star, { opacity: star3 }]}>✨</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: `${Colors.mysticPurple}40`,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}30`,
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  star: {
    fontSize: 18,
    marginHorizontal: 2,
  },
});

export default TypingIndicator;
