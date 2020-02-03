import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './LoginComponent';

class Budget extends Component {
    constructor(props){
        super(props);

        this.state = { 
            isLogged: false
        }
    }

    render() {
        if(this.state.isLogged){
            return(
                <View>
                    <Text>Budget Component</Text>
                    <Text>
                        {JSON.stringify(this.state)}
                    </Text>
                </View>
            );
        } else {
            return(
                <View style={{marginTop: 10}}>
                    <Text style={{textAlign: 'center'}}>Você precisa logar primeiro</Text>
                    <Login />
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
