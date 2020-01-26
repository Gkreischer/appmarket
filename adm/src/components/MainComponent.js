import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthRoute } from 'react-router-auth';
import Login from './LoginComponent';
import Home from './HomeComponent';
import Navbar from './NavbarComponent';
import Products from './ProductsComponent';
import Configurations from './ConfigurationsComponent';
class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Set true for developer purpose
            isLogged: true
        }
    }

    render() {
        if (this.state.isLogged) {
            return (
                <React.Fragment>
                    <Redirect to="/home" />
                    <Navbar />
                    <Switch>
                        <AuthRoute path="/home" component={Home} redirectTo="/login" authenticated={this.state.isLogged} />
                        <AuthRoute path="/products" component={Products} redirectTo="/login" authenticated={this.state.isLogged} />
                        <AuthRoute path="/configurations" component={Configurations} redirectTo="/login" authenticated={this.state.isLogged} />

                    </Switch>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Redirect to="/login" />
                    <Route path="/login" component={Login} />
                </React.Fragment>
            );
        }
    }
}

export default Main;