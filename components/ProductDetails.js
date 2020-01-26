import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { baseUrl } from './shared/baseUrl';

class ProductDetails extends Component { 
    constructor(props){
        super(props);

        this.state = {
            productIdReceived: null,
            productLoaded: {},
            error: null,

        }
        
        this.loadProductInfo = this.loadProductInfo.bind(this);
    }

    static navigationOptions = {
        title: 'Produto Selecionado'
    }; 

    componentDidMount(){
        const productId = this.props.navigation.getParam('productId','');
        this.loadProductInfo(productId);        
    }

    loadProductInfo(idReceived) {
        console.log('Id recebido para carregameto: ', idReceived)
        fetch(baseUrl + `products/${idReceived}`)
        .then((response) =>{
            if(response.ok){
                return response.json();
            } else {
                throw new Error('Algo errado aconteceu...')
            }})
        .then((data) => {
            this.setState({productLoaded: data})
            console.log(JSON.stringify(this.state.productLoaded));

        })
        .catch((error) => this.setState({error: error}))
    }

    render() {
        
        return(
            <ScrollView>
                <Card
                    image={{uri: this.state.productLoaded.image}}
                    imageProps={{
                        containerStyle: {height: 400, marginTop: 15}
                    }}
                >   
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 52, marginBottom: 20}}>
                        <Text style={{fontWeight: 'bold'}}>Nome: {this.state.productLoaded.name}</Text>
                        <Text style={{fontWeight: 'bold'}}>Preço: R$ {this.state.productLoaded.price}</Text>
                    </View>
                    <Text style={{marginBottom: 15, textAlign: "center"}}>
                        Descrição: {this.state.productLoaded.description}
                    </Text>
                    <Text style={{marginBottom: 15, textAlign: 'center'}}>
                        Data de cadastro: {new Date(this.state.productLoaded.updatedAt).toLocaleDateString('pt-BR')}
                    </Text>
                    
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    changeFontBolder: {
        fontWeight: 'bold'
    }
});

export default ProductDetails;