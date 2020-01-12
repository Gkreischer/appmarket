import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import Menu from './MenuComponent';
import { createStackNavigator } from 'react-navigation';
import CategorySelected from './CategorySelectedComponent';

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    CategorySelected: { screen: CategorySelected}
},
{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            // backgroundColor: "#ffc425"
            backgroundColor: "#39639e",
            height: 70
        },
        headerTintColor: '#FFDB45',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
}
);

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            
        }
    }
    

    render() {
        return(
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MenuNavigator />
        </View>
        );
    }
}

export default Main;