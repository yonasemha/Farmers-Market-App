import React, { Component, PureComponent } from 'react';

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
        const styleObj = {
            fontSize: 14,
            textAlign: "center",
            
        }

        return (

            
            <div >
                <div className='cardContainer'>

                    {

                        this.props.posts ? this.props.posts.map(product => {
                            return (
                               
                                    <div className="Post" key={product._id} >
                                    <div class='row'>
                                   <div class='col'>
                                   
                                   
                                        <h3>Name: {product.name}</h3>
                                        <img width={200} height={200} mode='fit' src={product.image} alt="" />
                                        <p>Price: ${product.price}</p>
                                       
                                       
                                        
                                        <div class="inner">
                                        <button  className="Delete" class="btn btn-danger" type="submit" onClick={() => { this.deleteProduct(product._id) }} >Delete </button>
                                        </div>
                                        <div class="inner">
                                        <button style={styleObj}  class="btn btn-warning" type="submit" onClick={() => { this.editProduct(product._id) }} >Edit </button>
                                       
                                      </div>
                                      </div>
                                      </div>
                                    </div>

                                          
                            )
                        }) : null

                    }
                </div>
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
