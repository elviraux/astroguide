import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/colors';
import { AstrologicalSign } from '../constants/astroData';
import DeepDiveModal from './DeepDiveModal';

interface AstrologyCardProps {
  bigThree: Record<'sun' | 'moon' | 'rising', AstrologicalSign>;
}

const SignItem: React.FC<{
  type: 'sun' | 'moon' | 'rising';
  sign: AstrologicalSign;
  title: string;
  onPress: () => void;
}> = ({ type, sign, title, onPress }) => {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.signItem, { transform: [{ scale: scaleAnim }] }]}>
        <Animated.View style={[styles.iconContainer, { shadowOpacity: glowOpacity }]}>
          <Image source={iconSource[type]} style={styles.icon} />
        </Animated.View>
        <Text style={styles.signTitle}>{title}</Text>
        <Text style={styles.signValue}>{sign.sign}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const AstrologyCard: React.FC<AstrologyCardProps> = ({ bigThree }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSign, setSelectedSign] = useState<{
    type: 'sun' | 'moon' | 'rising';
    sign: AstrologicalSign;
    title: string;
  } | null>(null);

  const handleSignPress = (type: 'sun' | 'moon' | 'rising', sign: AstrologicalSign, title: string) => {
    setSelectedSign({ type, sign, title });
    setModalVisible(true);
  };

  const getIconForType = (type: 'sun' | 'moon' | 'rising'): string => {
    const icons = {
      sun: '☉',
      moon: '☽',
      rising: '↗',
    };
    return icons[type];
  };

  const getPromptForSign = (type: 'sun' | 'moon' | 'rising', sign: string): string => {
    const prompts = {
      sun: `Provide a deep, practical explanation of having Sun in ${sign}. Focus on core personality, self-expression, life purpose, strengths, and challenges. Write 2-3 paragraphs with actionable insights. Make it personal and empowering.`,
      moon: `Provide a deep, practical explanation of having Moon in ${sign}. Focus on emotional nature, inner needs, instincts, comfort zones, and how they process feelings. Write 2-3 paragraphs with actionable insights. Make it personal and empowering.`,
      rising: `Provide a deep, practical explanation of having ${sign} Rising (Ascendant). Focus on outward personality, first impressions, approach to life, physical presence, and life path. Write 2-3 paragraphs with actionable insights. Make it personal and empowering.`,
    };
    return prompts[type];
  };

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
        <SignItem
          type="sun"
          sign={bigThree.sun}
          title="Sun"
          onPress={() => handleSignPress('sun', bigThree.sun, 'Sun Sign')}
        />
        <SignItem
          type="moon"
          sign={bigThree.moon}
          title="Moon"
          onPress={() => handleSignPress('moon', bigThree.moon, 'Moon Sign')}
        />
        <SignItem
          type="rising"
          sign={bigThree.rising}
          title="Rising"
          onPress={() => handleSignPress('rising', bigThree.rising, 'Rising Sign')}
        />
      </ScrollView>

      {selectedSign && (
        <DeepDiveModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={`${selectedSign.title}: ${selectedSign.sign.sign}`}
          icon={getIconForType(selectedSign.type)}
          itemKey={`${selectedSign.type}-${selectedSign.sign.sign.toLowerCase()}`}
          generatePrompt={getPromptForSign(selectedSign.type, selectedSign.sign.sign)}
        />
      )}
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
