import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { baseUrl } from './shared/baseUrl';
import { AsyncStorage } from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            rememberMe: false
        }

        this.login = this.login.bind(this);
    }

    static navigationOptions = {
        title: 'Orçamento',
    };

    storeData = async () => {
        try {
            await AsyncStorage.setItem('isLogged', 'true');
        } catch (error) {
            console.error(error);
        }
    };

    login(){
        fetch(`${baseUrl}Users/login`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error('Nao foi possivel realizar o login');
            }
        })
        .then((data) => {
            this.storeData;
        })
        .catch((error) => console.error(error));
    }

    render() {
        return (
            <View>
                <Input
                    inputStyle={styles.formRow}
                    placeholder='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({ email: email})}
                />
                <Input
                    inputStyle={styles.formRow}
                    placeholder='Senha'
                    leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
                    onChangeText={(password) => this.setState({ password: password})}

                />
                <Button
                    title="Login"
                    onPress={() => this.login()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Login;