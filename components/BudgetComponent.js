import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './LoginComponent';
import * as SecureStore from 'expo-secure-store';

class Budget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogged: false
        }
    }

    verifyStatusUserFromChild = (status) => {
        this.setState({ isLogged: status});
    }

    getDataFromSecureStore = async () => {
        const myStatus = await SecureStore.getItemAsync('isLogged');
        return myStatus;
    }

    storeStatusLogin = async () => {
        if(this.state.isLogged){
            await SecureStore.setItemAsync('isLogged', 'true');
        }
    }

    render() {
        if (this.state.isLogged) {
            return (
                <View>
                    <Text>Budget Component</Text>
                    <Text>
                        {JSON.stringify(this.state)}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={{ marginTop: 10 }}>
                    <Text style={{ textAlign: 'center' }}>Você precisa logar primeiro</Text>
                    <Login verifyStatus={this.verifyStatusUserFromChild}/>
                    <Text>{JSON.stringify(this.state.isLogged)}</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default Budget;
