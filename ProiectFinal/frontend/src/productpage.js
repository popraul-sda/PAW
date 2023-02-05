

import {Component} from "react";
import {withRouter} from 'react-router-dom';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import "./App.css";
import AppNavbar from "./AppNavbar";
import "./product_page.css";
import {Client} from "@stomp/stompjs";

const SOCKET_URL = 'ws://localhost:8080/ws-message';

class Productpage extends Component{
    emptyItem = {
        bid:'',
    };

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            products: [],
            messages: '',
            item: this.emptyItem
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`/products_page/${id}`)
            .then(response => response.json())
            .then(data => this.setState({product:data}));

        let currentComponent = this;

        let onConnected = () => {
            console.log("Connected!!")
            client.subscribe('/topic/message', function (msg) {
                if (msg.body) {
                    let jsonBody = JSON.parse(msg.body);
                    if (jsonBody.message) {
                        currentComponent.setState({ messages: jsonBody.message })
                    }
                }
            });
        }

        let onDisconnected = () => {
            console.log("Disconnected!!")
        }

        const client = new Client({
            brokerURL: SOCKET_URL,
            reconnectDelay: 1000,
            heartbeatIncoming: 1000,
            heartbeatOutgoing: 1000,
            onConnect: onConnected,
            onDisconnect: onDisconnected
        });

        client.activate();
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
        const { product } = this.state;
        const { id } = this.props.match.params;

        if(parseInt(item.bid)<parseInt(product.price)){
            alert("Bid a higher price!");
        }else{
            await fetch(`/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({price: item.bid})
            });
        }

        console.log("Update!");

        fetch(`/products_page/${id}`)
            .then(response => response.json())
            .then(data => this.setState({product:data}));
        console.log("offer: "+item.bid);
        console.log("Initial price: "+product.price);
        if(parseInt(item.bid)>parseInt(product.price)){
            fetch('http://localhost:8080/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({price:item.bid}),
            }).then((response)=>response.text());
        }

        console.log(this.state.messages);
    }


    render() {
        const {product} = this.state;
        const {item} = this.state;
        if (this.state.messages) {
            return (
                <html>
                <head>
                    <meta charSet="utf-8"/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                    <title>Product Card/Page</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
                          integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
                          crossOrigin="anonymous"/>
                </head>
                <body>

                <AppNavbar/>
                <div className="card-wrapper">
                    <div className="card">

                        <div className="product-content">
                            <h2 className="product-title">{product.name}</h2>

                            <div className="product-date">
                                <h2>Date final </h2>
                                <p>{product.final_date}</p>
                            </div>

                            <div className="product-price">
                                <p className="new-price">Price: <span>{this.state.messages}</span></p>
                            </div>

                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>

                                    <Input type="text" name="bid" id="bid" value={item.bid}
                                           onChange={this.handleChange} autoComplete="price"/>
                                </FormGroup>
                                <FormGroup>
                                    <Button className="button-offer" type="submit">Add the offer</Button>

                                </FormGroup>
                            </Form>


                        </div>
                    </div>
                </div>

                </body>
                </html>

            )
        }
        else {
            return(
                <html>
                <head>
                    <meta charSet="utf-8"/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                    <title>Product Card/Page</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
                          integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
                          crossOrigin="anonymous"/>
                </head>
                <body>

                <AppNavbar/>
                <div className="card-wrapper">
                    <div className="card">

                        <div className="product-content">
                            <h2 className="product-title">{product.name}</h2>

                            <div className="product-date">
                                <h2>Date final </h2>
                                <p>{product.final_date}</p>
                            </div>

                            <div className="product-price">
                                <p className="new-price">Price: <span>{product.price}</span></p>
                            </div>

                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>

                                    <Input type="text"
                                           name="bid"
                                           id="bid"
                                           value={item.bid}
                                           onChange={this.handleChange}
                                           autoComplete="price"/>
                                </FormGroup>
                                <FormGroup className="formButton">
                                    <Button className="button-offer" type="submit">Add the offer</Button>

                                </FormGroup>
                            </Form>

                        </div>
                    </div>
                </div>

                </body>
                </html>

            )}
    }

}
export default withRouter(Productpage);

