import React,{Component} from "react";
import {withRouter} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Register extends Component{

    emptyItem = {
        name:'',
        username:'',
        email:'',
        password:''
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

        const product = await (await fetch(`/products/${this.props.match.params.id}`)).json();
        this.setState({item: product});
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

        await fetch('/users' , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((response)=>response.text()).then((result)=>{
            if(result==="User created"){
                alert("Account created");
            }else{
                alert("Something went wrong!");
            }
        });
        window.location.href = "/";
    }



    render() {
        const {item} = this.state;
        return (
            <Form className="me-3" onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3 ms-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name"  name="name"
                                  value={item.name} onChange={this.handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3 ms-4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter your username"  name="username"
                                  value={item.username} onChange={this.handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3 ms-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter your email" name="email"
                                  value={item.email} onChange={this.handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3 ms-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"
                                  value={item.password} onChange={this.handleChange} required/>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4 ms-4">
                    Register
                </Button>
            </Form>
        );
    }
}

export default withRouter(Register) ;