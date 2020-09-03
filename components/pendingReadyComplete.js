
import React, { Component } from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './sign.module.css'

import { Form, Col, Button, Input } from 'reactstrap';

class ChangeStatus extends Component {

    state = {
        status: null,
        id: '',
        pickUpTime:'',
        farmeremail:'',
        customeremail:''
    }


    componentDidMount() {

        if (this.props.location && this.props.location.state && this.props.location.state.id) {
            this.setState({ id: this.props.location.state.id, 
                customeremail:this.props.location.state.customeremail, 
                farmeremail:this.props.location.state.farmeremail, status:this.props.location.state.status })
 
        }


    }


    inputHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };


    changeOrderStatus = () => {

        if (this.state.id) {
            const post = {
                id: this.state.id,
                status: this.state.status,
                pickUpTime:this.state.pickUpTime

            }


            axios.patch(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/orders`, post)
                .then(response => {
                    console.log(response)
                })
        }

        //notify to custmer order is ready
        if (this.state.status === 'ready') {
            let post = {
              farmeremail: this.state.farmeremail,
              customeremail: this.state.customeremail,
              pickUpTime:this.state.pickUpTime
            }
      
            axios.post(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/emails/farmer`, post)
              .then(response => {
                      console.log(response)
              })
          }

        this.props.history.push('/order')


    }






    render() {
        return (
            <div> <br></br>
                <div className={styles.Post}>



                    <Form className="container" onSubmit={this.changeOrderStatus}>
                        <Col sm={12}>


                            <br></br>
                            <br></br>
                            <label for="action">Choose Status</label>
                            <select name="status" id="action" onChange={this.inputHandler}>
                                <option>choose...</option>
                                <option value="pending">Pending</option>
                                <option value="ready">Ready</option>
                                <option value="complete">Complete</option>
                            </select><br></br>


                            <Input name="pickUpTime" placeholder="Enter pick up time"  
                            value={this.state.pickUpTime} onChange={this.inputHandler} />
                            <br></br>
                          
                            <Button color="primary" size="lg" > Update Order Status </Button>
                        </Col>
                    </Form><br />

                </div>
            </div>
        );

    }
}



export default ChangeStatus;
