import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Form, Input, Col, FormGroup, Button, La, Inputbel } from 'reactstrap';



import PropTypes from "prop-types";

import { Alert } from 'reactstrap'
import { clearError } from '../store/action/errorAction'
import styles from './sign.module.css'
import axios from "axios";
//source code for uploading image: https://www.npmjs.com/package/react-images-upload.
class UploadFile extends Component {

  state = {
    image: null
  }


  imageHandler = event => {
    const file = event.target.files[0];
    let fd = new FormData()
    fd.append('name', file.name)
    fd.append('file', file)
    console.log('fd')

    axios.post('http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/images/upload', fd)
      .then(response => {
        this.setState({ image: response.data.originalname })
      })

  };


  addImageHandler = (e) => {
    const image =this.state.image
    e.preventDefault();
    axios.post('http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/images/send', this.state)
      .then(response => {
        console.log(response)
      })


  };







  render() {

    return (
      <div> <br></br>
        <div className={styles.Post}>



          <Form className="container" onSubmit={this.addImageHandler}>
            <Col sm={12}>

              <br></br>
              <Input type="file" onChange={this.imageHandler} />


              <br></br>
              <Button color="primary" size="lg" >Send Image </Button>
            </Col>
          </Form><br />

        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   newProduct: state.productReducer.newProduct,
// });
// export default connect(mapStateToProps, { clearError })(UploadFile);
export default UploadFile;
