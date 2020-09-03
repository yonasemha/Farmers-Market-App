import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert, Form, FormGroup, Input, Col, Button } from 'reactstrap'
import { clearError } from '../store/action/errorAction'
import { withRouter } from 'react-router-dom'
import styles from './sign.module.css'


import { signinUserAsync } from '../store/action/userAction'

//sign in component
class Signin extends Component {

    //initial state
    state = {
        email: '',
        password: "",
        msg: null,
        

    }


    inputHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };


    //function that handle user sign in
    signinHandler = (e) => {

        //prevents the default behavior from happening
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        //function that handle fetching user from database
        this.props.signinUserAsync(user)

        //withRouter is higher order component is that helps to access history, match and location 
        this.props.history.push('/')



    }

    //specifying properties of a component
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        signinUserAsync: PropTypes.func.isRequired,
        clearError: PropTypes.func.isRequired
    };

    //hook that runs whenever there is an change in the parameteres
    //  The connect()  function below is higher order that connects a React component to a Redux store.
    //any time the store is updated, mapStateToProps will be called.
    //second parameters are dispatchProps functions

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === "SIGNIN_FAIL") {
                this.setState({ msg: error.msg })
            } else {
                this.setState({ msg: null })
            }
        }

    }


    render() {

        return (
            <div> <br></br>
                <div className={styles.Post}>

                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}

                    <Form className="container" onSubmit={this.signinHandler}>
                        <Col sm={12}>

                            <br></br>
                            <Input name="email" placeholder="Enter your email" value={this.state.email} onChange={this.inputHandler} />

                            <br></br>
                            <br></br>
                            <Input name="password" type="password" placeholder="Enter your password" value={this.state.password} onChange={this.inputHandler} />


                            <br></br>

                            <Button color="primary" size="lg" > Sign In</Button>
                        </Col>
                    </Form><br />

                </div>
            </div>
        );
    }

}


const MapStateToProps = state => ({
    error: state.errorReducer,
    name:state.userReducer.fname
});

export default connect(MapStateToProps, { signinUserAsync, clearError })(withRouter(Signin));

