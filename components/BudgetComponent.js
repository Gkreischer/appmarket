import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './LoginComponent';
import { AsyncStorage } from 'react-native';
import { baseUrl } from './shared/baseUrl';

class Budget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogged: false,
            initialDate: '',
            productsReceived: []
        }
    }

    setStateLoginFromChild = (status, initialDate) => {
        this.setState({ isLogged: status, initialDate: initialDate });
    }

    componentDidUpdate() {

        // If user log in, update state with User status and the date of Login
        try {
            AsyncStorage.setItem('isLogged', 'true');
            AsyncStorage.setItem('loginDate', `${this.state.initialDate}`);
        } catch {
            console.log('Not was possible to take any date from store');
        }
    }

    componentDidMount() {


        const finalDate = new Date();

        try {
            // Verify if user is already Logged
            AsyncStorage.getItem('isLogged').then((res) => {
                if (res === true) {
                    this.setState({ isLogged: res });

                } else {
                    this.setState({ isLogged: false });
                }
            });

            // Verify Login Date and update Login Status of User

            AsyncStorage.getItem('loginDate').then((initialDate) => {

                const diferenceTimeInSeconds = Math.abs(finalDate - initialDate) / 1000;

                if (diferenceTimeInSeconds > '1800') {
                    this.setState({ isLogged: false });
                } else {
                    this.setState({ isLogged: true });
                }
            });
        } catch {
            console.log('Does not possible to verify the login status of user');
        }
    }

    setStateToStore = async () => {
        if (this.state.isLogged) {
            try {
                await AsyncStorage.setItem('isLogged', 'true');
            } catch {
                console.log('Isnt possible to set Status on Storage');
            }
        }
    }

    render() {
        if (this.state.isLogged) {
            return (
                <View>
                    <Text style={{ textAlign: 'center', marginTop: 10 }}>Faça seu orçamento</Text>
                </View>
            );
        } else {
            return (
                <View style={{ marginTop: 10 }}>
                    <Text style={{ textAlign: 'center' }}>Você precisa logar primeiro</Text>
                    <Login setStatusLoginAndDate={this.setStateLoginFromChild} />
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
