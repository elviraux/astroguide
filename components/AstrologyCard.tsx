import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Colors } from '../constants/colors';
import { AstrologicalSign } from '../constants/astroData';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AstrologyCardProps {
  bigThree: Record<'sun' | 'moon' | 'rising', AstrologicalSign>;
}

const SignItem: React.FC<{
  type: 'sun' | 'moon' | 'rising';
  sign: AstrologicalSign;
}> = ({ type, sign }) => {
  const [expanded, setExpanded] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const iconSource = {
    sun: require('../assets/images/cosmic/sun-sign.png'),
    moon: require('../assets/images/cosmic/moon-sign.png'),
    rising: require('../assets/images/cosmic/rising-sign.png'),
  };

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      style={styles.signItem}
      onPress={toggleExpanded}
      activeOpacity={0.8}
    >
      <View style={styles.imageSection}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Image source={iconSource[type]} style={styles.icon} />
        </Animated.View>
      </View>
      <View style={styles.textSection}>
        <Text style={styles.signLabel}>{sign.name}</Text>
        <Text style={styles.signValue}>{sign.sign}</Text>
        <Text style={styles.expandIcon}>{expanded ? '−' : '+'}</Text>
      </View>
      {expanded && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{sign.description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const AstrologyCard: React.FC<AstrologyCardProps> = ({ bigThree }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Your Astrological Profile</Text>
      <Text style={styles.cardSubtitle}>The Big Three</Text>
      <View style={styles.signsContainer}>
        <SignItem type="sun" sign={bigThree.sun} />
        <SignItem type="moon" sign={bigThree.moon} />
        <SignItem type="rising" sign={bigThree.rising} />
      </View>
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
  signsContainer: {
    gap: 20,
  },
  signItem: {
    backgroundColor: `${Colors.cosmicMidnightBlue}80`,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}40`,
    overflow: 'hidden',
    shadowColor: Colors.starlightGold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${Colors.cosmicMidnightBlue}40`,
    borderRadius: 80,
    padding: 20,
    shadowColor: Colors.mysticPurple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textSection: {
    alignItems: 'center',
    position: 'relative',
  },
  signLabel: {
    fontSize: 14,
    color: Colors.starlightGold,
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  signValue: {
    fontSize: 26,
    color: Colors.lunarWhite,
    fontWeight: '700',
    marginBottom: 4,
  },
  expandIcon: {
    fontSize: 20,
    color: Colors.starlightGold,
    fontWeight: '300',
    marginTop: 8,
    opacity: 0.7,
  },
  descriptionContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: `${Colors.starlightGold}20`,
  },
  description: {
    fontSize: 14,
    color: Colors.lunarWhite,
    lineHeight: 20,
    opacity: 0.9,
  },
});

export default AstrologyCard;
