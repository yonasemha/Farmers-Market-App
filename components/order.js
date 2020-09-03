
import { connect } from "react-redux";
import React, { Component } from "react";
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap'

import './order.css'

import { getOrderAsync } from '../store/action/productAction'
class Order extends Component {

  state = {
    status: '',
       orders:[],
      farmeremail:'',
       
  }


  componentDidMount() {
    const email = this.props.email

    if (email) {
      this.props.getOrderAsync(email)
    }
    this.addOrders()
  }

  


addOrders() {
    this.setState(prevState => ({ ...prevState, farmeremail:this.props.email, orders: this.props.orders }))

}

 

  updateStatus = (id, email, status) => {
    this.props.history.push('/orderstatus', { id: id,farmeremail:this.state.farmeremail, customeremail:email, status:status})   
  }

  


  filterUsers = (event) => {
    const status = event.target.value
     if(status){
    axios.get(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/orders/${status}`)
        .then(response => {
        this.setState(prevState => ({ ...prevState, orders: response.data}))
       
    })
  }
   

};





  render() {
    let style = {
      color: 'blue',
      fontSize: 20
    };
    
    return (
      <div>

      <br></br> <br></br>
               
                <select style={style} name="action" id="action" onChange={this.filterUsers}>
                    <option>Filter orders by status</option>
                    <option value="pending">Pending</option>
                      <option value="ready">Ready</option>
                      <option value="complete">Complete</option>

                </select><br></br>

                <br></br> <br></br>


        <ReactBootStrap.Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Customer Email</th>
              <th>Ordered Items</th>
              <th>Address </th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Status</th>
              <th>Update Status</th>
              
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders ? this.state.orders.map((order, index) => {
              return (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.customeremail}</td>
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
                  <td>{order.address}</td>
                  <td>{order.city}</td>
                  <td>{order.state}</td>
                  <td>{order.zipcode}</td>
                  <td>{order.status}</td>
                  <td>

                  <br></br>
                   
                    <button  class="btn btn-primary" type="submit" onClick={() => { this.updateStatus(order._id,order.customeremail, order.status) }} >Update Status </button>

                  </td>
                  

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


const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  orders: state.productReducer.orders

});
export default connect(mapStateToProps, { getOrderAsync })(Order);
