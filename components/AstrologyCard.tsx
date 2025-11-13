import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import { AstrologicalSign } from '../constants/astroData';

interface AstrologyCardProps {
  bigThree: Record<'sun' | 'moon' | 'rising', AstrologicalSign>;
}

const SignItem: React.FC<{
  type: 'sun' | 'moon' | 'rising';
  sign: AstrologicalSign;
  title: string;
}> = ({ type, sign, title }) => {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    glow.start();
    return () => glow.stop();
  }, [glowAnim]);

  const iconSource = {
    sun: require('../assets/images/cosmic/sun-sign.png'),
    moon: require('../assets/images/cosmic/moon-sign.png'),
    rising: require('../assets/images/cosmic/rising-sign.png'),
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  return (
    <View style={styles.signItem}>
      <Animated.View style={[styles.iconContainer, { shadowOpacity: glowOpacity }]}>
        <Image source={iconSource[type]} style={styles.icon} />
      </Animated.View>
      <Text style={styles.signTitle}>{title}</Text>
      <Text style={styles.signValue}>{sign.sign}</Text>
    </View>
  );
};

const AstrologyCard: React.FC<AstrologyCardProps> = ({ bigThree }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Your Astrological Profile</Text>
      <Text style={styles.cardSubtitle}>The Big Three</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <SignItem type="sun" sign={bigThree.sun} title="Sun" />
        <SignItem type="moon" sign={bigThree.moon} title="Moon" />
        <SignItem type="rising" sign={bigThree.rising} title="Rising" />
      </ScrollView>
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
  scrollView: {
    marginTop: 4,
  },
  scrollContent: {
    paddingRight: 20,
    gap: 16,
  },
  signItem: {
    width: 140,
    backgroundColor: `${Colors.cosmicMidnightBlue}80`,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}30`,
    alignItems: 'center',
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${Colors.cosmicMidnightBlue}40`,
    borderRadius: 40,
    padding: 12,
    marginBottom: 12,
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  signTitle: {
    fontSize: 12,
    color: Colors.starlightGold,
    marginBottom: 4,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  signValue: {
    fontSize: 16,
    color: Colors.lunarWhite,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default AstrologyCard;
