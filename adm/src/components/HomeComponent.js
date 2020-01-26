import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './../App.scss';

class Home extends Component { 
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <React.Fragment>
                <Container className="mt-1 mt-md-3">
                    <Row>
                        <Col xs="12" md="12">
                            <h1>Home</h1>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
    

}

export default Home;