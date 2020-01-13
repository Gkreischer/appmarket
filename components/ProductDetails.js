import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { baseUrl } from './shared/baseUrl';

class ProductDetails extends Component { 
    constructor(props){
        super(props);

        this.state = {
            productIdReceived: null,
            productLoaded: {},
            error: null
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
            <View>
                <Card
                    image={{uri: baseUrl + this.state.productLoaded.image}}
                    imageProps={{
                        containerStyle: {height: 400}
                    }}
                >   
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 40}}>
                        <Text style={{fontWeight: 'bold'}}>{this.state.productLoaded.name}</Text>
                        <Text>Preço: R$ {this.state.productLoaded.price}</Text>
                    </View>
                    <Text style={{marginBottom: 10, textAlign: "center"}}>
                        {this.state.productLoaded.description}
                    </Text>
                    
                </Card>
            </View>
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