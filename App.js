import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';

import AuthNavigator from "./Navigation/AuthNavigator";
import AppNavigator from "./Navigation/AppNavigator";
import {AuthProvider, AuthContext} from "./Context/AuthContext";


function App() {
    const { user, setUser } = useContext(AuthContext);

    return (
            <NavigationContainer>
                {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
    );
}

export default () => {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
