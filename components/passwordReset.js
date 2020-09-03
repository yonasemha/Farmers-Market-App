
import { connect } from "react-redux";
import React, { Component } from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap'
import styles from './sign.module.css'

import { Form, Input, Col, FormGroup, Button, La, Inputbel } from 'reactstrap';

class PasswordReset extends Component {

    state = {
        newPassword: '',
        id: ''
    }


    componentDidMount() {

        if(this.props.location && this.props.location.state && this.props.location.state.id){
            this.setState({ id: this.props.location.state.id }) 
       }


    }


    inputHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };

    resetPassword = () => {
        
            const post = {
                id: this.state.id,
                newPassword: this.state.newPassword,
                role: 'superuser'
            }

            axios.post(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/users/password`, post)
                .then(response => {
                    console.log(response)
                })

                this.props.history.push('/users')

        
    }






    render() {
        return (
            <div> <br></br>
                <div className={styles.Post}>



                    <Form className="container" onSubmit={this.resetPassword}>
                        <Col sm={12}>


                            <br></br>
                            <br></br>
                            <Input name="newPassword" placeholder="Enter new password"
                                value={this.state.newPassword} onChange={this.inputHandler} />



                            <br></br>

                            <Button color="primary" size="lg" > Reset Password</Button>
                        </Col>
                    </Form><br />

                </div>
            </div>
        );

    }
}



export default PasswordReset;
