import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from "../src/Views/Dashboard";
import CameraScreen from "../src/Views/Camera";
import ResultScreen from "../src/Views/Result";
import SearchScreen from "../src/Views/Search";
import PlantDetailsPage from "../src/Views/Info";

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="dashboard_inner" component={Dashboard} options={{headerShown: false}}/>
            <Stack.Screen name="camera" component={CameraScreen} options={{headerShown: false}}/>
            <Stack.Screen name="result" component={ResultScreen} options={{headerShown: false}}/>
            <Stack.Screen name="search" component={SearchScreen} options={{headerShown: false}}/>
            <Stack.Screen name="info" component={PlantDetailsPage} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default MainNavigator;
