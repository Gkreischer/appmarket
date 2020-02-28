import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './LoginComponent';
import { AsyncStorage } from 'react-native';

class Budget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogged: false
        }
    }

    setStateLoginFromChild = (status) => {
        this.setState({ isLogged: status });
    }

    componentDidUpdate() {
        
        try {
            AsyncStorage.setItem('isLogged', 'true');
        } catch {
            console.log('Deu ruim');
        }
    }

    componentDidMount() {
        try {
            AsyncStorage.getItem('isLogged').then((res) => {
                this.setState({ isLogged: res})
            });
        } catch {
            console.log('Pegadinha do malandro');
        }
    }

    getStateFromStore = () => {
        if (this.state.isLogged) {
            console.log('pica');
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
                    <Text style={{textAlign: 'center', marginTop: 10}}>Faça seu orçamento</Text>
                </View>
            );
        } else {
            return (
                <View style={{ marginTop: 10 }}>
                    <Text style={{ textAlign: 'center' }}>Você precisa logar primeiro</Text>
                    <Login setStatusLogin={this.setStateLoginFromChild} />
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
