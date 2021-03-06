import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';
import { Tile, Icon } from 'react-native-elements';
import { baseUrl } from './shared/baseUrl';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Spinner from './SpinnerComponent';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            error: '',
            isLoading: false
        }

        this._isMounted = false;

        this.loadCategorys = this.loadCategorys.bind(this);
        this.removeDuplicates = this.removeDuplicates.bind(this);

    }

    static navigationOptions = {
        title: 'Menu'
    };

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.loadCategorys();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    removeDuplicates(array, key) {
        let newArray = new Set();

        return array.filter(obj => !newArray.has(obj[key]) && newArray.add(obj[key]));

    }

    async loadCategorys() {
        this.setState({ isLoading: true })
        await fetch(baseUrl + 'products')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Algo errado aconteceu...');
                }
            })
            .then((data) => {
                // Remove duplicates of receveid array
                let arrayWithDuplicateRemoved = this.removeDuplicates(data, 'category');
                this._isMounted && this.setState({ products: arrayWithDuplicateRemoved, isLoading: false });
            })
            .catch(error => this.setState({ error: error }))
    }

    render() {
        if (this.state.products.length === 0) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            );
        } else {
            const { navigate } = this.props.navigation;

            const renderMenuItem = ({ item, index }) => {
                return (
                    <Tile
                        key={index}
                        // title={item.category.charAt(0).toUpperCase() + item.category.substr(1, item.category.length)}
                        // titleStyle={{ color: '#FFDB45' }}
                        // caption={item.description}
                        // captionStyle={{ paddingTop: 200, fontSize: 20 }}
                        contentContainerStyle={{ height: 140 }}
                        imageSrc={{ uri: item.image }}
                        imageProps={{
                            PlaceholderContent: <Spinner />
                        }}
                        containerStyle={{ height: 500 }}
                        onPress={() => navigate('CategorySelected', { category: item.category })}
                    >
                        <View
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                        >
                            <Text style={{ fontSize: 24, color: '#ffffff' }}>{item.category.charAt(0).toUpperCase() + item.category.substr(1, item.category.length)}</Text>
                            <Text style={{ paddingTop: 9 }}>
                                <FontAwesomeIcon size={24} icon={faArrowRight} />
                            </Text>
                        </View>
                    </Tile>
                );
            };

            return (
                <View style={{ backgroundColor: '#fecd21' }}>
                    <FlatList
                        data={this.state.products}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            );

        }
    }
}

const styles = StyleSheet.create(
    {
        marginTopSpace: {
            marginTop: "20px"
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
);
export default Menu;