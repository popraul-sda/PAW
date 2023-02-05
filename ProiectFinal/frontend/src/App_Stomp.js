import React from 'react';
import { Client } from '@stomp/stompjs';
import {Button, Form} from "reactstrap";
import {withRouter} from "react-router-dom";

const SOCKET_URL = 'ws://localhost:8080/ws-message';

class App_Stomp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: 'Your server message here.',
            product: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        let currentComponent = this;

        let onConnected = () => {
            console.log("Connected!!")
            client.subscribe('/topic/message', function (msg) {
                if (msg.body) {
                    var jsonBody = JSON.parse(msg.body);
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
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: onConnected,
            onDisconnect: onDisconnected
        });

        client.activate();
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(`/products_page/${5}`)
            .then(response => response.json())
            .then(data =>{
                this.setState({ product: data })
                //console.log("data: "+data.price);
            });

        fetch('http://localhost:8080/send', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({price:this.state.product.price}),
        }).then((response)=>response.text()).then((result)=>{
            console.log(result);
        });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <div>{this.state.messages}</div>
                    <input type="text" ></input>
                    <Button type="submit">Refresh message</Button>
                </Form>
            </div>
        );
    }

}

export default withRouter(App_Stomp);