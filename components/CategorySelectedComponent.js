import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { baseUrl } from './shared/baseUrl';

class CategorySelected extends Component {
    constructor(props){
        super(props);

        this.state = {
            categoryReceived: '',
            productsOfCategory: [],
            error: null
        }

        this.loadProductsOfCategory = this.loadProductsOfCategory.bind(this);
        this.loadProductsOfCategory(this.props.navigation.getParam('CategorySelected', ''));

    }

    static navigationOptions = {
        title: 'Categoria Selecionada'
    };

    componentDidMount(){
        this.loadProductsOfCategory();
    }

    loadProductsOfCategory(category){
        fetch(baseUrl + category)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Algo errado aconteceu...');
                }
            })
            .then((data) => {
                console.log(data);
                this.setState({ productsOfCategory: data });
            })
            .catch(errorReceived => this.setState({ error: errorReceived }))
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>{JSON.stringify(this.state.productsOfCategory)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    marginTop: {
        marginTop: 15
    }
});

export default CategorySelected;