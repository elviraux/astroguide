import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Colors } from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.starlightGold,
        tabBarInactiveTintColor: `${Colors.lunarWhite}60`,
        tabBarStyle: {
          backgroundColor: Colors.cosmicMidnightBlue,
          borderTopColor: `${Colors.starlightGold}30`,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 115 : 110,
          paddingBottom: Platform.OS === 'ios' ? 36 : 24,
          paddingTop: 18,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
          marginTop: 7,
          marginBottom: 3,
        },
        tabBarIconStyle: {
          marginTop: 7,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
