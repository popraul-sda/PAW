import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AppNavbar from "./AppNavbar";


class ProductAdd extends Component {

    emptyItem = {
        name: '',
        price: '',
        final_date: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        console.log(this.props);
        if (this.props.match.params.id !== 'new') {
            const product = await (await fetch(`/products/${this.props.match.params.id}`)).json();
            this.setState({item: product});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/products' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/');
    }


    render() {
        const {item} = this.state;

        return (
            <>
                <AppNavbar/>
                <Form className="me-3" onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3 ms-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" name="name"
                                      value={item.name} onChange={this.handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3 ms-4">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Price" name="price"
                                      value={item.price} onChange={this.handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3 ms-4">
                        <Form.Label>Final Date</Form.Label>
                        <Form.Control type="date" placeholder="Final Date" name="final_date"
                                      value={item.final_date} onChange={this.handleChange} required/>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-4 ms-4">
                        Add Product
                    </Button>
                </Form>
            </>)
    }

}

export default withRouter(ProductAdd);