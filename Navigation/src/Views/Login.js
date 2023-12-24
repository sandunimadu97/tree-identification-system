import react, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {db} from "../../config";
import {AuthContext} from "../../Context/AuthContext";

const LoginScreen = ({navigation}) => {

    const { user, setUser } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            console.log('Login button pressed');
            console.log('Email:', email);
            console.log('Password:', password);

            const usersRef = db.collection('users');
            const querySnapshot = await usersRef
                .where('email', '==', email)
                .where('password', '==', password)
                .get();

            if (querySnapshot.empty) {
                console.log('Invalid credentials');
                return;
            }

            console.log('User logged in successfully!');
            setUser(querySnapshot.docs[0].data());
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },title:{
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 50,
        backgroundColor: 'white',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'black',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;