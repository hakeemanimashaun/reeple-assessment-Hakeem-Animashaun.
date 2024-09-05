import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Convert',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "arrow-redo" : 'arrow-redo-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Live Rates',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "analytics" : 'analytics-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
