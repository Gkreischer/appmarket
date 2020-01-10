import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Tile } from 'react-native-elements';
import { baseUrl } from './shared/baseUrl';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            error: null
        }

        this.loadCategorys = this.loadCategorys.bind(this);
    }

    componentDidMount() {
        this.loadCategorys();
    }

    loadCategorys() {
        fetch(baseUrl + 'products')
            .then(response => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error('Algo errado aconteceu...');
                }
            })
            .then(data => this.setState({products: data}))
            .catch(errorReceived => this.setState({error: errorReceived}))
    }

    render() {
        const renderMenuItem = ({ item, index }) => {

            return (
                <Tile
                    key={index}
                    title={item.category}
                    caption={item.description}
                    captionStyle={{fontSize: 19,color: '#000000'}}
                    featured
                    imageSrc={{ uri: baseUrl + item.image }}
                />
            );
        };

        return (
            <View style={{ marginTop: 24 }}>
                <FlatList
                    data={this.state.products}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
                
            </View>
        );
    }
}

const style = StyleSheet.create(
    {
        marginTopSpace: {
            marginTop: "20px"
        }
    }
);
export default Menu;