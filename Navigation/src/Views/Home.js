import React from 'react';
import {View, ImageBackground, StyleSheet, TouchableOpacity, Text} from 'react-native';

const image = require('../../assets/bg.png');


const HomeScreen = ({navigation}) => {

    const register = () => {
        navigation.navigate('register')
    }
    const login = () => {
        navigation.navigate('login')
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={image}
                style={styles.backgroundImage}
            >
                <Text style={styles.title}>Tree Leaf Identification System</Text>
                <View style={styles.contentContainer}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "transparent"}]} onPress={login}>
                            <Text style={[styles.buttonText, {color: 'black'}]}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "black"}]} onPress={register}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // flexDirection: 'row',
    }, title: {
        fontSize: 50,
        fontWeight: 'bold',
        position: 'absolute',
        top: 250,
        textAlign: 'center',
        width: '100%',
        color: 'white',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(255,255,255)',
        height: 100,
        paddingVertical: 20,
        paddingHorizontal: 5,
    },
    button: {
        flex: 1,
        height: 50,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
