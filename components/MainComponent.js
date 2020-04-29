import React, { Component } from 'react';
import { View, Platform, StyleSheet, ScrollView, Image, Text, YellowBox } from 'react-native';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import CategorySelected from './CategorySelectedComponent';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import ProductDetails from './ProductDetails';


const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                color='black'
                raised
                onPress={() => navigation.toggleDrawer()} />
        })
    },
    CategorySelected: {
        screen: CategorySelected,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon  name="arrow-left" type="font-awesome" size={24}
                color='black'
                raised
                onPress={() => navigation.goBack()} />
        })
    },
    ProductSelected: {
        screen: ProductDetails,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="arrow-left" size={24}
                type="font-awesome"
                color='black'
                raised
                onPress={() => navigation.goBack()} />
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

const ContactNavigator = createStackNavigator({
    Contact: {
        screen: Contact,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                color='black'
                raised
                onPress={() => navigation.toggleDrawer()} />
        })
    }
},
    {
        initialRouteName: 'Contact',
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
    Contact:
    {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contato',
            drawerLabel: 'Contato',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={20}
                    color={tintColor}
                />
            ),
        }
    }
}, {
    drawerBackgroundColor: '#fff',
    contentComponent: CustomDrawerContentComponent
});


class Main extends Component {
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings([
            'componentWillReceiveProps has been renamed',
            'Setting DrawerLayoutAndroid'
        ]);
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