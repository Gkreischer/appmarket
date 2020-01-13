import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

class ProductDetails extends Component { 
    constructor(props){
        super(props);

        this.state = {
            productId: null
        }
    }

    render() {
        const productId = this.props.navigation.getParam('productId','');
        return(
            <View>
                <Text>Product Details, id received: {productId}</Text>
            </View>
        );
    }
}

export default ProductDetails;