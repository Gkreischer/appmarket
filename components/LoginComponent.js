import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { baseUrl } from './shared/baseUrl';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            errorStatus: false,
            errorMsg: 'Desculpe, algo errado aconteceu...'
        }

        this.login = this.login.bind(this);
    }

    static navigationOptions = {
        title: 'Orçamento',
    };
    
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    login() {
        fetch(`${baseUrl}Users/login`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.setState({ errorStatus: true });
                }
            })
            .then((data) => {
                if(this._isMounted){
                    console.log('Logged');
                    this.props.setStatusLogin(true);
                } else {
                    console.log('Could not log in')
                }
            })
            .catch((error) => console.error(error));
    }


    render() {
        if (!this.state.errorStatus) {
            return (
                <View>
                    <Input
                        inputStyle={styles.formRow}
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        onChangeText={(email) => this.setState({ email: email })}
                    />
                    <Input
                        inputStyle={styles.formRow}
                        placeholder='Senha'
                        leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
                        onChangeText={(password) => this.setState({ password: password })}

                    />
                    <Button
                        title="Login"
                        onPress={() => this.login()}
                    />
                </View>
            );
        } else {
            if (this.state.errorStatus) {
                <View>
                    <Input
                        inputStyle={styles.formRow}
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        onChangeText={(email) => this.setState({ email: email })}
                    />
                    <Input
                        inputStyle={styles.formRow}
                        placeholder='Senha'
                        leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
                        onChangeText={(password) => this.setState({ password: password })}

                    />
                    <Button
                        title="Login"
                        onPress={() => this.login()}
                    />
                    <View>
                        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>Desculpe, algo errado aconteceu...</Text>
                    </View>
                </View>
            }
        }
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