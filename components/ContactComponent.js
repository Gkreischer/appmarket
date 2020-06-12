import React, { Component } from 'react';
import { View, StyleSheet, Text, Linking, ScrollView } from 'react-native';
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
        this._isMounted = false;
        this.loadMarketInfo = this.loadMarketInfo.bind(this);
    }

    static navigationOptions = {
        title: 'Informações de contato'
    };

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.loadMarketInfo();
    }

    async loadMarketInfo() {
        this.setState({ isLoading: true })
        await fetch(baseUrl + 'marketInfos')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Algo errado aconteceu...');
                }
            })
            .then((data) => {
                this._isMounted && this.setState({ marketInfo: data[0], isLoading: false });
                console.log(JSON.stringify(this.state.marketInfo));
            })
            .catch(error => this.setState({ error: error }))
    }


    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.container}>
                    <Spinner />
                </View>
            );
        } else {
            return(
                <ScrollView>
                    <Card
                        containerStyle={{marginBottom: 15}}
                        image={{uri: this.state.marketInfo.logoImg}}
                        imageStyle={{
                            height: 400
                        }}
                    >
                        <View>
                            <Text>Nome da empresa: {this.state.marketInfo.name}</Text>
                            <Text>Telefone: {this.state.marketInfo.tel}</Text>
                            <Text>Email: {this.state.marketInfo.email}</Text>
                            <Text>Endereço: {this.state.marketInfo.address}</Text>
                            <Text>Bairro: {this.state.marketInfo.district}</Text>
                            <Text>Cidade: {this.state.marketInfo.city}</Text>
                            <Text>País: {this.state.marketInfo.country}</Text>
                        </View>

                    </Card>
            </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centralize: {
        textAlign: 'center',
        margin: 10
    }
});

export default Contact;