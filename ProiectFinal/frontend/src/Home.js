import './App.css'
import "./ProductAdd";
import ProductList from "./ProductList";

import AppNavbar from "./AppNavbar";


function Home() {
    return(
        <body>
        <AppNavbar/>
        <section>
            <div className="section">
                <div className="section2">
                    <div className="container"  >
                        <ProductList/>
                    </div>

                </div>
            </div>

        </section>

        </body>
    );
}

export default Home;
