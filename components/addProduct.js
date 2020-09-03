import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Form, Input, Col, FormGroup, Button, La, Inputbel } from 'reactstrap';
import axios from "axios";



import PropTypes from "prop-types";
import { addProductAsync } from "../store/action/productAction";
import { Alert } from 'reactstrap'
import { clearError } from '../store/action/errorAction'
import styles from './sign.module.css'
//source code for uploading image: https://www.npmjs.com/package/react-images-upload.
class AddProduct extends Component {


  state = {
    name: "",
    price: "",
    quantity: "",
    farmeremail: "",
    msg: '',
    image: ''

  }

  imageHandler = event => {
    const file = event.target.files[0];
    let fd = new FormData()
    fd.append('name', file.name)
    fd.append('file', file)
   

    axios.post('http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/images/upload', fd)
      .then(response => {
        this.setState({ image: response.data.originalname })
      })

  };


  addImageHandler = (e) => {
    const image = {
      image:this.state.image
    }
    e.preventDefault();
    axios.post('http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/images/send', image)
      .then(response => {
        this.setState({ image: response.data })
      })


  };


  inputHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };


  addProductHandler = (e) => {

    e.preventDefault();
    const product = {
      name: this.state.name,
      price: this.state.price,
      quantity: this.state.quantity,
      farmeremail: this.props.email,
      image: this.state.image
    }
    this.props.addProductAsync(product);
    // this.props.history.push('/listProduct')

  };



  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    addProductAsync: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired
  };


  componentDidUpdate(prevProps) {

    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "ADD_PRODUCT_FAIL") {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: error.msg.msg })
      }
    }

  }


  render() {

    return (
      <div> <br></br>

        <div className={styles.Post}>



          <Form className="container" onSubmit={this.addImageHandler}>
            <Col sm={12}>

              <br></br>
              <Input type="file" onChange={this.imageHandler} />


              <br></br>
              <Button color="primary" size="lg" >upload Image </Button>
            </Col>
          </Form><br />
        </div>
        <div className={styles.Post}>

          {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}

          <Form className="container" onSubmit={this.addProductHandler}>
            <Col sm={12}>

              <br></br>
              <Input name="name" placeholder="Enter product name" value={this.state.name} onChange={this.inputHandler} />

              <br></br>
              <br></br>
              <Input name="price" placeholder="Enter price" value={this.state.price} onChange={this.inputHandler} />


              <br></br>
              <br></br>
              <Input name="quantity" placeholder="Enter quantity" value={this.state.quantity} onChange={this.inputHandler} />

              <br></br>
              <Button color="primary" size="lg" > Add Product</Button>
            </Col>
          </Form><br />

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  error: state.errorReducer
});
export default connect(mapStateToProps, { addProductAsync, clearError })(AddProduct);
