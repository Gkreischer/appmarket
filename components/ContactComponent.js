import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { baseUrl } from './shared/baseUrl';

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    static navigationOptions = {
        title: 'Informações de contato'
    };


    render() {

        return (
            <View style={styles.container}>
                <Card
                    title="Sigatec Informática"
                    image={require('./../components/shared/images/logo.png')}
                    imageProps={{ resizeMode: 'stretch' }}
                >
                    <Text style={{ fontWeight: 'bold' }}>Cidade:</Text>
                    <Text>Rio das Ostras</Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        Endereço:
                        </Text>
                    <Text>
                        Avenida Amazonas, 49 - Loja 12
                        </Text>
                    <Text style={{ fontWeight: 'bold' }}>Ponto de referência:</Text>
                    <Text>
                        em frente as lojas Americanas
                        </Text>
                    <Text style={{ fontWeight: 'bold' }}>Telefone:</Text>
                    <Text>
                        22 2764-3285
                        </Text>
                    <Text style={{ fontWeight: 'bold' }}>Horário de funcionamento:</Text>
                    <Text>
                        10:00 às 17 horas - Segunda a Sexta
                        </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        Email:
                        </Text>
                    <Text>sigatec@gmail.com</Text>
                </Card>

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