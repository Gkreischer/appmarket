import React from 'react';
import { View, Image } from 'react-native';


const Spinner = () => {
    return(
        <View>
            <Image source={require('./shared/images/loading.gif')} />
        </View>
    );
}

export default Spinner;