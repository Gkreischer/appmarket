import React, { Component } from 'react';
import { View, Platform, StyleSheet, ScrollView, Image, Text } from 'react-native';
import Menu from './MenuComponent';
import Budget from './BudgetComponent';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';


const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                color='black'
                onPress={() => navigation.toggleDrawer()} />
        })
    }
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

const BudgetNavigator = createStackNavigator({
     Budget: {
        screen: Budget,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                color='black'
                onPress={() => navigation.toggleDrawer()} />
        })
    }
},
    {
        initialRouteName: 'Budget',
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

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./shared/images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Sigatec Informática</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home:
    {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={20}
                    color={tintColor}
                />
            ),
        }
    },
    Budget:
      { screen: BudgetNavigator,
        navigationOptions: {
          title: 'Orçamento',
          drawerLabel: 'Orçamento',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='shopping-basket'
              type='font-awesome'            
              size={20}
              iconStyle={{ color: tintColor }}
            />
          ),
        }
      }
}, {
    drawerBackgroundColor: '#fff',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent
});


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#39639e',
        height: 120,
        marginTop: -25,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default Main;