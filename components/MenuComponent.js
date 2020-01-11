import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Tile } from 'react-native-elements';
import { baseUrl } from './shared/baseUrl';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            error: null
        }

        this.loadCategorys = this.loadCategorys.bind(this);
        this.removeDuplicates = this.removeDuplicates.bind(this);
    }

    componentDidMount() {
        this.loadCategorys();
    }

    removeDuplicates(array, key) {
        let newArray = new Set();

        return array.filter(obj => !newArray.has(obj[key]) && newArray.add(obj[key]));

    }

    loadCategorys() {
        fetch(baseUrl + 'products')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Algo errado aconteceu...');
                }
            })
            .then((data) => {
                console.log(data);
                let arrayWithDuplicateRemoved = this.removeDuplicates(data, 'category');
                this.setState({ products: arrayWithDuplicateRemoved });
            })
            .catch(errorReceived => this.setState({ error: errorReceived }))
    }

    render() {
        const renderMenuItem = ({ item, index }) => {

            return (
                <Tile
                    key={index}
                    // title={item.category.charAt(0).toUpperCase() + item.category.substr(1, item.category.length)}
                    // titleStyle={{ color: '#FFDB45' }}
                    // caption={item.description}
                    // captionStyle={{ paddingTop: 200, fontSize: 20 }}
                    contentContainerStyle={{ height: 140}}
                    imageSrc={{ uri: baseUrl + item.image }}
                    containerStyle={{height: 500}}
                >
                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                        <Text style={{fontSize: 24, color: '#FFDB45'}}>{item.category.charAt(0).toUpperCase() + item.category.substr(1, item.category.length)}</Text>
                        <Text style={{ paddingTop: 9}}>
                            <FontAwesomeIcon size={ 24} icon={ faArrowRight } />
                        </Text>
                    </View>
                </Tile>
            );
        };

        return (
            <View style={{ marginTop: 50, marginBottom: 140 }}>
                <Text style={{ textAlign: 'center', fontSize: 24, color: '#FAFAFA', marginBottom: 40 }}>Selecione uma categoria</Text>
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