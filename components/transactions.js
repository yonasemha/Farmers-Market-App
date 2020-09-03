
import { connect } from "react-redux";
import React, { Component } from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap'

import { Form, Input, Col, FormGroup, Button, La, Inputbel } from 'reactstrap';

class Transactions extends Component {

    state = {
        transactions: null,
        
    }

    componentDidMount() {
        axios.get(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/orders`)
                .then(response => {
                    this.setState(prevState=>({...prevState, transactions:response.data}))
                })

    }

    
    render() {
        return (
            <div>
                <ReactBootStrap.Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>customer Email</th>
                            <th>Farmer Email</th>
                            <th>Items</th>
                            <th>Amount of Transaction </th>
                            <th>Status </th>
                            <th>Creation Date </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions ? this.state.transactions.map((order, index) => {
                            return (
                                <tr key={order._id}>
                                    <td>{index + 1}</td>
                                    <td>{order.customeremail}</td>
                                    <td>{order.farmeremail}</td>
                                   
                                    <td>
                                    <ReactBootStrap.Table striped bordered hover size="sm">
                                    <thead>
                                      <tr>
                                        <th>S.No.</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {order.items.map((item, index) => {
                                        return (
                                          <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
              
                                          </tr>
                                        )
                                      })
                                      }
                                    </tbody>
                                  </ReactBootStrap.Table>
                                    </td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.status}</td>
                                    <td>{order.createdAt}</td>
                                </tr>
                            )
                        }) : null
                        }
                    </tbody>
                </ReactBootStrap.Table>

            </div>
        );

    }
}



export default Transactions;
