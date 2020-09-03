import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Form, Input, Col, FormGroup, Button, La, Inputbel } from 'reactstrap';
import axios from 'axios'

import PropTypes from "prop-types";
import { addProductAsync } from "../store/action/productAction";
import { Alert } from 'reactstrap'
import { clearError } from '../store/action/errorAction'
import styles from './sign.module.css'
import firebase from './imageFirebase';


class AddProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: null,
      dowloadURL: ''

    };

  }

  imageHandler = (file) => {
    this.setState({
      files: file
    })
  }
  uploadImages = () => {
    let bucketname = 'images'
    let file = this.state.files[0]
    let storageref = firebase.storage().ref(`${bucketname}/${file}`)
    let uploadimage = storageref.put(file)
    uploadimage.on(firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        this.setState({
          dowloadURL: uploadimage.snapshot.dowloadURL
        })
      }
    )
  }

  showImage=()=>{
    let storageref = firebase.storage.ref()
    let spaceref = storageref.child('images/'+this.state.files[0].name)
    storageref.child('images'+this.state.files[0].name.getdowloadURL()
    .then((url)=>{
      console.log(url,'uuuuuuuuuuu')
      document.getElementById('image').src=url
    })
    )
  }
  render() {

    return (
      <div> <br></br>
        <div className={styles.Post}>

          {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
          <section>
            <Input type="file" onChange={(e) => this.imageHandler(e.target.files)} />
            <Button onClick={this.uploadImages} > Upload Image/s</Button>
            <image id="image" />
            <Button onClick={this.showImage} > Show Image/s</Button>
          </section>

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
