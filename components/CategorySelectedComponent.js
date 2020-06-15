import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList } from 'react-native';
import { baseUrl } from './shared/baseUrl';
import { ListItem, Icon } from 'react-native-elements';
import Spinner from './SpinnerComponent';


class CategorySelected extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryReceived: '',
            productsOfCategory: [],
            error: null,
            isLoading: false
        }
        
        this._isMounted = false;
        this.loadProductsOfCategory = this.loadProductsOfCategory.bind(this);

    }
    static navigationOptions = {
        title: 'Categoria Selecionada'
    };

    componentDidMount(){
        this._isMounted = true;
        this._isMounted && this.loadProductsOfCategory(this.props.route.params.category);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async loadProductsOfCategory(category){
        this.setState({ isLoading: true});
        if(category !== undefined){
            await fetch(baseUrl + `products?filter[where][category]=${category}&filter[where][isShow]=true`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Algo errado aconteceu...');
                }
            })
            .then((data) => 
            {
                this._isMounted && this.setState({ productsOfCategory: data, isLoading: false })
            }
            )   
            .catch(errorReceived => this.setState({ error: errorReceived }))
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        if(this.state.isLoading === false){
            const renderMenuItem = ({item, index}) => {
                return (
                        <ListItem
                            key={index}
                            title={item.name}
                            subtitle={item.description.replace(/(\r\n|\n|\r)/gm," ").substr(0, 40)}
                            hideChevron={true}
                            leftAvatar={{ source: { uri: item.image }, renderPlaceholderContent: <Spinner />}}
                            onPress={() => navigate('ProductSelected', { productId: item.id})}
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
        } else {
            if(this.state.isLoading === true){
                return(
                    <View style={styles.container}>
                        <Spinner />
                    </View>
                );
            }
        }
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