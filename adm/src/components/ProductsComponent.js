import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Button, CardSubtitle, CardText, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { Switch, Link, Route, useRouteMatch, withRouter, Redirect } from 'react-router-dom';
import { baseUrl } from './../shared/baseUrl';
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';

const ActionMenu = (props) => {
    return (
        <Card>
            <CardBody>
                <CardTitle><h3>Ações</h3></CardTitle>
                <CardSubtitle>Selecione uma opção:</CardSubtitle>
            </CardBody>
            <CardBody>
                <Link to={`/products/addProduct`}>
                    <Button color="primary"><i className="fa fa-plus"></i></Button>
                </Link>
            </CardBody>
            <CardBody>
                <Link to={`/products/modifyProduct`}>
                    <Button color="warning"><i className="fa fa-pencil"></i></Button>
                </Link>
            </CardBody>
            <CardBody>
                <Link to={`/products/deleteProduct`}>
                    <Button color="danger"><i className="fa fa-trash"></i></Button>
                </Link>
            </CardBody>
        </Card>
    );
}

/**************************** ADD PRODUCT ****************************/

class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: '',
            price: 0,
            brand: '',
            description: '',
            image: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.onFileImageChange = this.onFileImageChange.bind(this);
    }

    onFileImageChange(event) {

        this.handleImageFile(event.target.files[0]);
    }

    handleImageFile = image => {
        const defaultUrlForUpload = `${baseUrl}containers/images/upload`;
        console.log(defaultUrlForUpload);
        const formData = new FormData();

        formData.append('image', image);
        console.log(image);
        console.log(formData);

        fetch(`${defaultUrlForUpload}`, {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                return response.json();
            })
            .then((imagePath) => {
                console.log(imagePath.result.files.image[0].name)
                this.setState({ image: `${baseUrl}containers/images/download/${imagePath.result.files.image[0].name}` })
            })
            .then(data => console.log(`Upload success`))
            .catch(error => console.error(error));
    }

    handleForm = event => {
        event.preventDefault();
        console.log(JSON.stringify(this.state))
        fetch(`${baseUrl}products`, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Sorry, something wrong did happen...')
                }
            })
            .then((data) => console.log('Cadastrado realizado com sucesso: ', JSON.stringify(data)))
            .catch(error => error);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle><h3>Adicionar Produto</h3></CardTitle>
                    <CardSubtitle>Preencha o menu abaixo:</CardSubtitle>
                </CardBody>
                <CardBody>
                    <Container>
                        <Row>
                            <Col md="6" xs="12" className="px-0">
                                <Form onSubmit={this.handleForm}>
                                    <FormGroup>
                                        <Label for="name">Nome</Label>
                                        <Input type="text" name="name" value={this.state.name} id="productName" onChange={this.handleInputChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="image">Imagem</Label>
                                        <Input type="file" name="image" id="productImage" onChange={this.onFileImageChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="category">Categoria</Label>
                                        <Input type="text" name="category" id="productCategory" value={this.state.category} onChange={this.handleInputChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="price">Preço</Label>
                                        <Input type="text" name="price" id="productPrice" value={this.state.price} onChange={this.handleInputChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="brand">Marca</Label>
                                        <Input type="text" name="brand" id="productBrand" value={this.state.brand} onChange={this.handleInputChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="description">Descrição</Label>
                                        <Input type="textarea" rows="3" name="description" id="productDescription" value={this.state.description} onChange={this.handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="mt-4">
                                        <Button type="submit" className="mt-2" color="primary">Adicionar</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        );
    }

}

/**************************** MODIFY PRODUCT ****************************/

class ModifyProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productsReceived: [],
            idSelected: '',
            productByIdReceived: [],
            name: '',
            category: '',
            price: 0,
            brand: '',
            description: '',
            image: ''
        }

        this.getAllProducts = this.getAllProducts.bind(this);
        this.modifyProductById = this.modifyProductById.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.getAllProducts();
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    abortController = new AbortController();

    getAllProducts() {
        fetch(`${baseUrl}products`, { method: 'GET', signal: this.abortController.signal })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then((data) => this.setState({ productsReceived: data }))
            .catch(error => console.error(error));
    }

    modifyProductById(id) {
        
        fetch(`${baseUrl}products/${id}`, {
            method: 'GET',
            signal: this.abortController.signal
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on Delete')
                }
            })
            .then((data) => {
                const productReceived = Promise.resolve(data);

                productReceived.then((product) => {
                    this.setState({
                        idSelected: id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        brand: product.brand,
                        description: product.description,
                        image: product.image
    
                    });
                });
            })
            .catch((error) => console.error(error));
    }

    handleForm = event => {
        event.preventDefault();
        fetch(`${baseUrl}products/${this.state.idSelected}`, {
            method: 'PATCH',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Sorry, something wrong did happen...')
                }
            })
            .then((data) => {
                console.log('%c Product updated with success!', 'color: green;');
            })
            .then(() => {
                this.props.history.push('/products');
            })
            .catch(error => error);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        if (this.state.idSelected.length !== 0) {
            return (
                <Card className="mt-3 mt-md-0">
                    <CardBody>
                        <Container>
                            <Row>
                                <Col md="6" xs="12" className="px-0">
                                    <Form onSubmit={this.handleForm}>
                                        <FormGroup>
                                            <Label for="name">Nome</Label>
                                            <Input type="text" name="name" value={this.state.name} id="productName" onChange={this.handleInputChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="image">Imagem</Label>
                                            <Input type="file" name="image" id="productImage" onChange={this.onFileImageChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="category">Categoria</Label>
                                            <Input type="text" name="category" id="productCategory" value={this.state.category} onChange={this.handleInputChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="price">Preço</Label>
                                            <Input type="text" name="price" id="productPrice" value={this.state.price} onChange={this.handleInputChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="brand">Marca</Label>
                                            <Input type="text" name="brand" id="productBrand" value={this.state.brand} onChange={this.handleInputChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description">Descrição</Label>
                                            <Input type="textarea" rows="3" name="description" id="productDescription" value={this.state.description} onChange={this.handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="mt-4">
                                            <Button type="submit" className="mt-2" color="primary">Modificar</Button>
                                        </FormGroup>
                                    </Form>
                                </Col>
                                <Col md="6" className="d-none d-sm-block text-center mt-md-3">
                                    <img src={this.state.image} className="img-fluid" alt="Imagem carregada pelo usuário para cadastrado ou modificacao do produto" />
                                    <p className="lead">Imagem atual do produto</p>
                                </Col>
                            </Row>
                        </Container>
                    </CardBody>
                </Card>
            );
        } else {
            return (
                <Card>
                    <CardBody>
                        <CardTitle><h3>Modificar um Produto</h3></CardTitle>
                        <CardSubtitle>Selecione um produto abaixo:</CardSubtitle>
                    </CardBody>
                    <CardBody>
                        <Container>
                            <Row>
                                <Col md="12" xs="12" className="px-0">
                                    <Table striped bordered hover size="sm" responsive>
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Categoria</th>
                                                <th>Marca</th>
                                                <th>Preço</th>
                                                <th>Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.productsReceived.map((product) => {
                                                return (
                                                    <tr key={product.id}>
                                                        <td>{product.name}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.brand}</td>
                                                        <td>{product.price}</td>
                                                        <td className="text-center">
                                                            <Button id={product.id} onClick={(event) => this.modifyProductById(event.target.id)} size="sm" color="warning">
                                                                Procurar
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}

                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </CardBody>
                </Card>
            );
        }
    }
}


/**************************** DELETE PRODUCT ****************************/

class DeleteProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productsReceived: []
        }

        this.getAllProducts = this.getAllProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.getAllProducts();
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    abortController = new AbortController();

    getAllProducts() {
        fetch(`${baseUrl}products`, { method: 'GET', signal: this.abortController.signal })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then((data) => this.setState({ productsReceived: data }))
            .then((data) => console.log(JSON.stringify(this.state.productsReceived)))
            .catch(error => console.error(error));
    }

    deleteProduct(id) {
        let opConfirm = window.confirm('Você realmente deseja deletar o produto selecionado');

        if (opConfirm) {
            fetch(`${baseUrl}products/${id}`, {
                method: 'DELETE',
                body: JSON.stringify(id),
                signal: this.abortController.signal
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong on Delete')
                    }
                })
                .then((data) => {
                    this.setState({ productsReceived: this.state.productsReceived.filter((product) => product.id !== id) })
                })
                .catch((error) => console.error(error));
        } else {
            return console.log('Delete operation canceled');
        }
    }

    render() {

        return (
            <Card>
                <CardBody>
                    <CardTitle><h3>Deletar Produto</h3></CardTitle>
                    <CardSubtitle>Clique no X para deletar o produto desejado</CardSubtitle>
                </CardBody>
                <CardBody>
                    <Container>
                        <Row>
                            <Col md="12" xs="12">
                                <Table striped bordered hover size="sm" responsive>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Categoria</th>
                                            <th>Marca</th>
                                            <th>Preço</th>
                                            <th>Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.productsReceived.map((product) => {
                                            return (
                                                <tr key={product.id}>
                                                    <td>{product.name}</td>
                                                    <td>{product.category}</td>
                                                    <td>{product.brand}</td>
                                                    <td>{product.price}</td>
                                                    <td className="text-center">
                                                        <Button id={product.id} onClick={(event) => this.deleteProduct(event.target.id)} size="sm" color="danger">
                                                            X
                                                            </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        );
    }
}


class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            clickedButton: ''
        }

        this.changeMenuSelected = this.changeMenuSelected.bind(this);
    }

    changeMenuSelected(button) {
        this.setState({ clickedButton: button });
    }

    render() {

        return (
            <Container className="mt-1 mt-md-4">
                <Row>
                    <Col xs="12" md="2">
                        <ActionMenu />
                    </Col>
                    <Col xs="12" md="10">
                        <Switch>
                            <Route path={`/products/addProduct`} component={AddProduct} />
                            <Route path={`/products/modifyProduct`} component={props => <ModifyProduct {...props} />} />
                            <Route path={`/products/deleteProduct`} component={DeleteProduct} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        );


    }
}

export default withRouter(Products);