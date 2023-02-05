
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import {Component} from "react";
import Home from './Home'
import ProductList from "./ProductList";
import ProductEdit from "./ProductEdit";
import Productpage from "./productpage";
import Login from "./Login";
import Register from "./Register";
import LoggedHome from "./LoggedHome";
import SocketMessage from "./SocketMessage";
import App_Stomp from "./App_Stomp";
import ProductAdd from "./ProductAdd";


class App extends Component {
    state = {
        products: []
    };

    async componentDidMount() {
        const response = await fetch('/products');
        const body = await response.json();
        this.setState({products: body});
        const response2=await fetch('/users');
        const body2=await response.json();
        this.setState({users:body});
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true}><Home/></Route>
                    <Route path='/products' exact={true}><ProductList/></Route>
                    <Route path='/products_page/:id'><Productpage/></Route>
                    <Route path='/products/:id'><ProductAdd/></Route>
                    <Route path='/login'><Login/></Route>
                    <Route path = '/register'><Register/></Route>
                    <Route path ='/prodEdit/:id'><ProductEdit/></Route>
                    <Route path='/logged-home'><LoggedHome/></Route>
                    <Route path='/app'><App_Stomp/></Route>
                    <Route path='/message'><SocketMessage/></Route>


                </Switch>
            </Router>
        )
    }
}

export default App;