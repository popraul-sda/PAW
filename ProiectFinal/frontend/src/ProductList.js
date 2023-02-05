import React,{Component} from "react";
import Button from 'react-bootstrap/Button';

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {products: []};

    }

    componentDidMount() {
        fetch('/products')
            .then(response => response.json())
            .then(data => this.setState({products: data}));
    }


    async remove(id) {
        await fetch(`/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updateProducts = [...this.state.products].filter(i => i.id !== id);
            this.setState({products: updateProducts});
        });
    }

    render() {
        const {products, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }

        const productList = products.map(product => {
            return <div class="items" key={product.id}>
                <div className="name">
                    {product.name} </div>
                <div className="price">PRICE: {product.price}</div>
                <Button variant="primary" className="btn_bid ms-2 mb-2" href={`/products_page/${product.id}`}>Bid</Button>
                <Button variant="primary" className="btn_edit ms-2 mb-2" href={`/prodEdit/${product.id}`}>Edit</Button>
            </div>

        });
        return (
            <div>
                <div className="section2">
                    <div className="container">
                        {productList}
                    </div>
                </div>
            </div>

        );

    }

}

export default ProductList;