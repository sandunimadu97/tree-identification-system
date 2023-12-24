import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {AuthContext} from "../../Context/AuthContext";

const ProfileScreen = ({ navigation }) => {

    const {user, setUser } = useContext(AuthContext);
    console.log('User:', user)

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{user?.firstName + " " + user?.lastName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user?.email}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 50,
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingHorizontal   : 20,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 18,
    },
    value: {
        flex: 1,
        fontSize: 18,
    },
    button: {
        backgroundColor: 'black',
        height: 50,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 8,
        marginTop: 100,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
