import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { baseUrl } from './shared/baseUrl';
import { ListItem } from 'react-native-elements';


class CategorySelected extends Component {
    constructor(props){
        super(props);

        this.state = {
            categoryReceived: '',
            productsOfCategory: [],
            error: null
        }

        this.loadProductsOfCategory = this.loadProductsOfCategory.bind(this);

    }

    static navigationOptions = {
        title: 'Categoria Selecionada'
    };

    componentDidMount(){
        this.loadProductsOfCategory();
    }

    


    loadProductsOfCategory(category){
        const categorySelected = this.props.navigation.getParam('category','');
        fetch(baseUrl + `products?filter[where][category]=${categorySelected}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Algo errado aconteceu...');
                }
            })
            .then((data) => {
                this.setState({ productsOfCategory: data });
            })
            .catch(errorReceived => this.setState({ error: errorReceived }))
    }

    render() {
        const renderMenuItem = ({item, index}) => {
            return (
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        leftAvatar={{ source: { uri: baseUrl + item.image }}}
                      />
            );
        };

        return(
            <View>
                <FlatList 
                    data={this.state.productsOfCategory}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
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