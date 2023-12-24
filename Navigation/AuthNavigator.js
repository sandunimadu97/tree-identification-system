import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../src/Views/Home';
import RegisterScreen from '../src/Views/Register';
import LoginScreen from '../src/Views/Login';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="register" component={RegisterScreen} options={{headerShown: false}}/>
            <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default AuthNavigator;
