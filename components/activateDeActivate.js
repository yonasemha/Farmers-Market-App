
import React, { Component } from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './sign.module.css'

import { Form, Col, Button, } from 'reactstrap';

class ChangeStatus extends Component {

    state = {
        status: null,
        id: ''
    }


    componentDidMount() {

        if (this.props.location && this.props.location.state && this.props.location.state.id) {
            this.setState({ id: this.props.location.state.id })
        }


    }


    inputHandler = event => {
        const value = event.target.value;
        this.setState({ status: value });
    };

    changeStatus = () => {

        if (this.state.id) {
            const post = {
                id: this.state.id,
                status: this.state.status,
                role: 'superuser'
            }

            axios.post(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/users/status`, post)
                .then(response => {
                    console.log(response)
                })
        }

        this.props.history.push('/users')


    }






    render() {
        return (
            <div> <br></br>
                <div className={styles.Post}>



                    <Form className="container" onSubmit={this.changeStatus}>
                        <Col sm={12}>


                            <br></br>
                            <br></br>
                            <label for="action">Choose Status</label>
                            <select name="action" id="action" onChange={this.inputHandler}>
                                <option>choose...</option>
                                <option value='active'>active</option>
                                <option value='inactive'>inactive</option>

                            </select><br></br>


                            <Button color="primary" size="lg" > Change Status </Button>
                        </Col>
                    </Form><br />

                </div>
            </div>
        );

    }
}



export default ChangeStatus;
