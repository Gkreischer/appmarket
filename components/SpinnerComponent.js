import React, { Component } from 'react';
import { View, Image } from 'react-native';


class Spinner extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <View>
                <Image source={require('./shared/images/loading.gif')} />
            </View>
        );
    }
}

export default Spinner;