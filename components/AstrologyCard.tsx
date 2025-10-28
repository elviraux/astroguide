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
    sun: require('../assets/images/sun-icon.png'),
    moon: require('../assets/images/moon-icon.png'),
    rising: require('../assets/images/rising-icon.png'),
  };

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      style={styles.signItem}
      onPress={toggleExpanded}
      activeOpacity={0.7}
    >
      <View style={styles.signHeader}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Image source={iconSource[type]} style={styles.icon} />
        </Animated.View>
        <View style={styles.signInfo}>
          <Text style={styles.signLabel}>{sign.name}</Text>
          <Text style={styles.signValue}>{sign.sign}</Text>
        </View>
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
    gap: 12,
  },
  signItem: {
    backgroundColor: `${Colors.cosmicMidnightBlue}60`,
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}20`,
  },
  signHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  signInfo: {
    flex: 1,
  },
  signLabel: {
    fontSize: 12,
    color: Colors.starlightGold,
    marginBottom: 4,
    fontWeight: '500',
  },
  signValue: {
    fontSize: 18,
    color: Colors.lunarWhite,
    fontWeight: '600',
  },
  expandIcon: {
    fontSize: 24,
    color: Colors.starlightGold,
    fontWeight: '300',
    width: 24,
    textAlign: 'center',
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
