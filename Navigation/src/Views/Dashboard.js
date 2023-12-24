import react from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";


const Dashboard = ({navigation}) => {
    const handleTakePicture = () => {
        navigation.navigate('camera')
    };

    const handleSearch = () => {
        navigation.navigate('search')
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Tree Leaf Identification System</Text>
            <Image
                source={require('../../assets/img1.png')}
                style={styles.image}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleTakePicture}
            >
                <Image
                    source={require('../../assets/img2.png')}
                    style={{height: 40, width: 40}}
                />
                <Text style={styles.buttonText}>Take a Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSearch}
            >
                <Image
                    source={require('../../assets/img3.png')}
                    style={{height: 40, width: 40}}
                />
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: '#57638C',
        padding: 20,
        color: 'white',
        borderRadius: 8,

    },
    image: {
        marginBottom: 50,
        marginTop: 100,
    },
    button: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: 'black',
    },
    buttonText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
});
export default Dashboard;