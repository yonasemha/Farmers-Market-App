import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Form, Input, Col, FormGroup, Button, La, Inputbel } from 'reactstrap';

import PropTypes from "prop-types";
import { editProductAsync } from "../store/action/productAction";
import { Alert } from 'reactstrap'
import { clearError } from '../store/action/errorAction'
import styles from './sign.module.css'
class EditProduct extends Component {
    state = {
        currentIndex:null,
        id: "",
        name: "",
        price: "",
        quantity: "",
        farmeremail: "",



    };

    inputHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };


    editProductHandler = (e) => {
        e.preventDefault();
        this.props.editProductAsync(this.state);
        this.props.history.push('/listProduct')
    };




    componentDidMount() {
        const product = this.props.location.state.product
        const currentIndex = this.props.location.state.currentIndex;
        if (product) {
            this.setState(prevState => ({
                ...prevState,
                currentIndex:currentIndex,
                id: product._id, name: product.name,
                price: product.price, quantity: product.quantity,
                farmeremail: product.farmeremail
            }))

        }
    }


    render() {
        return (
            <div> <br></br>
                <div className={styles.Post}>


                    <Form className="container" onSubmit={this.editProductHandler}>
                        <Col sm={12}>

                            <br></br>
                            <Input name="name" placeholder="Enter Product Name" value={this.state.name} onChange={this.inputHandler} />

                            <br></br>
                            <br></br>
                            <Input name="price" placeholder="Enter Product Price" value={this.state.price} onChange={this.inputHandler} />

                            <br></br>
                            <br></br>
                            <Input name="quantity" placeholder="Enter Product Quantity" value={this.state.quantity} onChange={this.inputHandler} />



                            <br></br>

                            <Button color="primary" size="lg" > Update Product</Button>
                        </Col>
                    </Form><br />

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.errorReducer

});
export default connect(mapStateToProps, { editProductAsync, clearError })(EditProduct);
