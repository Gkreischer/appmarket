import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            rememberMe: false
        }
    }

    static navigationOptions = {
        title: 'Orçamento',
    };

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
                    onPress={() => console.log(JSON.stringify(this.state))}
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