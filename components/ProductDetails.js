import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from './shared/baseUrl';
import Spinner from './SpinnerComponent';

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
        // console.log(this.props.route.params.productId);
        this.loadProductInfo(this.props.route.params.productId);        
    }

    loadProductInfo(idReceived) {
        fetch(baseUrl + `products/${idReceived}`)
        .then((response) =>{
            if(response.ok){
                return response.json();
            } else {
                throw new Error('Algo errado aconteceu...')
            }})
        .then((data) => {
            this.setState({productLoaded: data})
        })
        .catch((error) => this.setState({error: error}));
    }

    render() {
        return(
            <ScrollView>
                <Card
                    containerStyle={{marginBottom: 15}}
                    image={{uri: this.state.productLoaded.image}}
                    imageStyle={{
                        height: 400
                    }}
                    imageProps={{
                        PlaceholderContent: <Spinner />
                    }}
                > 
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 52, marginBottom: 20}}>
                        <Text style={{fontWeight: 'bold'}}>Nome: {this.state.productLoaded.name}</Text>
                        <Text style={{fontWeight: 'bold', color: 'red'}}>R$ {this.state.productLoaded.price}</Text>
                    </View>
                    <Text style={{marginBottom: 15, textAlign: "center"}}>
                        Descrição: {this.state.productLoaded.description}
                    </Text>
                    <Text style={{marginBottom: 15, textAlign: 'center', fontWeight: 'bold'}}>
                        {/* Marked for future optimization */}
                        Data de cadastro: {`${new Date(this.state.productLoaded.updatedAt).getDate()}/${new Date(this.state.productLoaded.updatedAt).getMonth() + 1}/${new Date(this.state.productLoaded.updatedAt).getFullYear()}`}
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