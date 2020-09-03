import React, { Component, PureComponent } from 'react';
import { Card, Button } from 'react-bootstrap';
import { getProductAsync, deleteProductAsync, editProductAsync } from "../store/action/productAction";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import './listProduct.css';


class ListProduct extends PureComponent {

    state = {
        posts: [],
        email: ""
    }


    componentDidMount() {
        const email = this.props.email

        if (email) {
            this.props.getProductAsync(email)
            this.setState({ email: email })
        }
    }




    deleteProduct = (id) => {
        this.props.deleteProductAsync(id);
    }

    editProduct = (id) => {
        const currentIndex = this.props.posts.findIndex(product => product._id === id)
        const product = this.props.posts[currentIndex]
        this.props.history.push("/editProduct", { product: product, currentIndex: currentIndex })
    }

    render() {
        

        return (

            <div className="App">
                {this.props.posts ? this.props.posts.map(product => {
                    return (
                        <Card className="card" style={{ width: '18rem' }}>
                        <Card.Title key={product._id}>Name:{product.name}</Card.Title>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>Price: ${product.price}</Card.Title>
                                <Card.Title>Quantity: {product.quantity}</Card.Title>
                               
                                <button   class="btn btn-danger" type="submit" onClick={() => { this.deleteProduct(product._id) }} >Delete </button>
                                <button   class="btn btn-warning" type="submit" onClick={() => { this.editProduct(product._id) }} >Edit </button>


                                   
                               
                            </Card.Body>
                        </Card>
                    )
                }) : null

                }

            </div>

        );
    }
}


const mapStateToProps = (state) => ({
    email: state.userReducer.email,
    name: state.userReducer.fname,
    posts: state.productReducer.posts
});
export default connect(mapStateToProps, { getProductAsync, deleteProductAsync, editProductAsync })(ListProduct);
