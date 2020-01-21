import React, { Component } from 'react';

class Products extends Component {
    constructor(props){
        super(props);

        this.state = {
            products: []
        }
    }

    render() {
        return(
            <div>
                <h1>Products</h1>
            </div>
        );
    }
}

export default Products;