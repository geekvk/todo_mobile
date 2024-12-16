import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabs } from './BottomTabs';
import TodayScreen from '../../screens/TodayScreen/TodayScreen';
import UpcomingScreen from '../../screens/UpcomingScreen/UpcomingScreen';

import BrowseScreen from '../../screens/BrowseScreen/BrowseScreen';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BLUE, GREEN, RED } from '../../utils/Colors';

const Tabs = createBottomTabNavigator<BottomTabs>();

const BottomNavigation = () => {
  return (
    <Tabs.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
            // Define the allowed icon names as a union type
            let iconName: 'calendar-o' | 'calendar-plus-o' | 'globe' | 'circle';
  
            switch (route.name) {
              case 'Today':
                iconName = 'calendar-o';
                break;
              case 'Upcoming':
                iconName = 'calendar-plus-o';
                break;
              case 'Profile':
                iconName = 'globe';
                break;
              default:
                iconName = 'circle';
            }
  
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        tabBarActiveTintColor: RED,
        tabBarInactiveTintColor: 'gray',
        headerShown : false,
        animationEnabled: false
      })}
    >
        <Tabs.Screen name="Today" component={TodayScreen} />
        <Tabs.Screen name="Upcoming" component={UpcomingScreen} />
        <Tabs.Screen name="Profile" component={BrowseScreen} />
    </Tabs.Navigator>
  )
}

export default BottomNavigation