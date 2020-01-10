import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Menu from './MenuComponent';
class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            
        }
    }
    

    render() {
        return(
            <View>
                <Menu />
            </View>
        );
    }
}

export default Main;