import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MainNavigator from "../Navigation/MainNavigator";
import ProfileScreen from "../src/Views/Profile";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'dashboard') {
                        iconName = 'home';
                    } else if (route.name === 'add') {
                        iconName = 'plus';
                    } else if (route.name === 'profile') {
                        iconName = 'person';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#57638C',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen name="dashboard" component={MainNavigator} options={{headerShown: false}}/>
            <Tab.Screen name="profile" component={ProfileScreen} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
};

export default AppNavigator;
