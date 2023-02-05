import {Component} from "react";
import './App.css'
import "./ProductAdd";
import ProductList from "./ProductList";
import AppNavbar from "./AppNavbar";


class LoggedHome extends Component {


    render() {
        return (<body>

            <AppNavbar/>

            <section>
                <div className="section">
                    <div className="section2">

                        <div className="container">
                            <ProductList/>
                        </div>

                    </div>
                </div>

            </section>

            </body>
        );
    }
}
    export default LoggedHome;