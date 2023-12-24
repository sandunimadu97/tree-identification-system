import {View , Text} from 'react-native';
import React from 'react';

const Header = (props) => {
    return(
        <View style={{MarginLeft:15}}> 
            <Text style={{fontWeight:'Bold', fontsize:28}}>
                {props.name}
            </Text>
        </View>
    )
}

export default Header;