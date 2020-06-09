import React, { Component } from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { baseUrl } from './shared/baseUrl';
import Spinner from './SpinnerComponent';
class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            marketInfo: [],
            isLoading: false
        }

        this.loadMarketInfo = this.loadMarketInfo.bind(this);
    }

    static navigationOptions = {
        title: 'Informações de contato'
    };

    componentDidMount() {
        this.loadMarketInfo();
    }

    loadMarketInfo() {
        this.setState({ isLoading: true })
        fetch(baseUrl + 'marketInfos')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Algo errado aconteceu...');
                }
            })
            .then((data) => {
                this.setState({ marketInfo: data, isLoading: false });
                console.log(JSON.stringify(this.state.marketInfo));
            })
            .catch(error => this.setState({ error: error }))
    }


    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.state.marketInfo)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centralize: {
        textAlign: 'center',
        margin: 10
    }
});

export default Contact;