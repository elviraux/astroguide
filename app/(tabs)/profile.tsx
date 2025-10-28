import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import StarryBackground from '../../components/StarryBackground';
import { Colors } from '../../constants/colors';
import { getUserData, UserData } from '../../utils/storage';

interface ProfileItemProps {
  label: string;
  value: string;
  delay: number;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ label, value, delay }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, delay]);

  return (
    <Animated.View
      style={[
        styles.profileItem,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </Animated.View>
  );
};

export default function ProfileScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const titleFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadUserData();
    Animated.timing(titleFadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [titleFadeAnim]);

  const loadUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <StarryBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.header, { opacity: titleFadeAnim }]}>
          <Text style={styles.title}>Your Cosmic Profile</Text>
          <Text style={styles.subtitle}>Your journey begins here ✨</Text>
        </Animated.View>

        <View style={styles.profileCard}>
          {userData ? (
            <>
              <ProfileItem
                label="Full Name"
                value={userData.fullName}
                delay={200}
              />
              <ProfileItem
                label="Date of Birth"
                value={formatDate(userData.dateOfBirth)}
                delay={300}
              />
              <ProfileItem
                label="Time of Birth"
                value={formatTime(userData.timeOfBirth)}
                delay={400}
              />
              <ProfileItem
                label="Place of Birth"
                value={userData.locationOfBirth}
                delay={500}
              />
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No profile data found</Text>
              <Text style={styles.emptySubtext}>
                Complete onboarding to see your profile
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </StarryBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.lunarWhite,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.starlightGold,
    opacity: 0.9,
    fontWeight: '300',
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: `${Colors.mysticPurple}30`,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: `${Colors.starlightGold}30`,
  },
  profileItem: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.starlightGold,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.lunarWhite,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.lunarWhite,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: `${Colors.lunarWhite}80`,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 40,
  },
});
