import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class Login extends Component{


    emptyItem = {
        username: '',
        password: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(item);
        fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((response)=>response.text()).then((result)=>{
            if(result!=="this user doesnt exist" ){

                localStorage.setItem('jwt', result);
                window.location.href="/logged-home";
            }else{
                alert("Wrong data! Check again")
            }
        });
    }

    render() {

        const {item} = this.state;
        return (
            <Form className="me-3" onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3 ms-4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text" placeholder="Username" name="username" id="username"
                        value={item.username} onChange={this.handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3 ms-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password" placeholder="Password" minLength="6" value={item.password} name="password"
                        onChange={this.handleChange} required />
                </Form.Group>
                <Button variant="primary" className="btn_sign ms-4 mb-3" type="submit">Sign In</Button>
                <br/>
                <Button variant="primary" className="btn_register ms-4 mb-3" href="/register">Register</Button>
            </Form>
        );
    }
}

export default Login;