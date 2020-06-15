import React from 'react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import { StyleSheet, Button, YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './components/MenuComponent';
import CategorySelected from './components/CategorySelectedComponent';
import ProductDetails from './components/ProductDetails';
import ContactComponent from './components/ContactComponent';

enableScreens();

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeScreen({ route, navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Menu}
        initialParams={{ navigation }}
        options={{
          title: 'Categorias',
          headerStyle: {
            backgroundColor: '#3663e1',
          },
          headerTintColor: '#fff',
          headerLeftContainerStyle: {
            marginLeft: 10
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Button
              onPress={() => navigation.toggleDrawer()}
              title="Menu"
            />
          ),
        }}
      />
      <Stack.Screen
        name="CategorySelected"
        component={CategorySelected}
        initialParams={{ route, navigation }}
        options={{
          title: 'Categorias',
          headerStyle: {
            backgroundColor: '#3663e1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ProductSelected"
        component={ProductDetails}
        initialParams={{ route, navigation }}
        options={{
          title: 'Detalhes do Produto',
          headerStyle: {
            backgroundColor: '#3663e1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function ContactScreen({ route, navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contact"
        component={ContactComponent}
        initialParams={{ route, navigation }}
        options={{
          title: 'Contato',
          headerStyle: {
            backgroundColor: '#3663e1'
          },
          headerTintColor: '#fff',
          headerLeftContainerStyle: {
            marginLeft: 10
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: (props) => (
            <Button
            {...props}
              onPress={() => navigation.toggleDrawer()}
              title="Menu"
              style={{
                marginLeft: 10
              }}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>

      <Drawer.Navigator initialRouteName="Home" 
        drawerContentOptions={{
          activeTintColor: '#fff',
          activeBackgroundColor: '#3663E1',
          itemStyle: { marginVertical: 5 },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Contato" component={ContactScreen} />
      </Drawer.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
