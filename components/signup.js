import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Col, Button } from 'reactstrap';

import PropTypes from "prop-types";
import { signupUserAsync } from "../store/action/userAction";
import { Alert } from 'reactstrap'
import { clearError } from '../store/action/errorAction'
import styles from './sign.module.css'
class Signup extends Component {
  state = {
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    role: "farmer",
   msg:"",
   status:'active'

  };


  signupHandler = (e) => {
    e.preventDefault();

    this.props.signupUserAsync(this.state);
    this.props.history.push('/')
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signupUserAsync: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "SIGNUP_FAIL") {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: error.msg.msg })
      }
    }

    if (isAuthenticated) {
      return <Alert>{"Registered sucessfully"}</Alert>
    }

  }

  render() {
    return (
      <div> <br></br>
        <div className={styles.Post}>

          {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}

          <Form className="container" onSubmit={this.signupHandler}>
            <Col sm={12}>
              <label>First Name</label>
              <br></br>
              <Input type="text" value={this.state.fname} onChange={(event) => this.setState({ fname: event.target.value })} />

              <label>Last Name</label>
              <br></br>
              <Input type="text" value={this.state.lname} onChange={(event) => this.setState({ lname: event.target.value })} />

              <label>Phone Number</label>
              <br></br>
              <Input type="text" value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} />


              <label>Email</label>
              <br></br>
              <Input type="text" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />


              <label>Password</label> <br></br>
              <Input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />

              <br></br>

             

              <Button type="submit" color="primary" size="lg" > Sign Up</Button>
            </Col>
          </Form><br />
          <p>If you already have account, please LogIn !!</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
  error: state.errorReducer
});
export default connect(mapStateToProps, { signupUserAsync, clearError })(Signup);
