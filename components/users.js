
import { connect } from "react-redux";
import React, { Component } from "react";
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap'

import { Form, Input, Col, FormGroup, Button, La, Inputbel } from 'reactstrap';
import './order.css'

import { getUsersAsync } from '../store/action/userAction'
class Users extends Component {

    state = {
        data: [],


    }
    



    filterUsers = (event) => {
        const user = event.target.value
        console.log(user)
      if(user){
        axios.get(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/users/${user}`)
        .then(response => {
            this.setState(prevState => ({ ...prevState, data: response.data.data}))
           
        })
      }
       

    };


    componentDidMount() {
        this.props.getUsersAsync()
        this.addUsers()

    }

    addUsers() {
        this.setState(prevState => ({ ...prevState, data: this.props.users }))

    }

    

    changeStatus = (id) => {

        this.props.history.push('/status', { id: id})

    }

    resetPassword = (id) => {
        this.props.history.push('/password', { id: id})
       
    }









    render() {
        let style = {
            color: 'blue',
            fontSize: 20
          };
        return (
            <div >
                <br></br> <br></br>
               
                <select style={style} name="action" id="action" onChange={this.filterUsers}>
                    <option>Filter users by role (customers or farmers)</option>
                    <option value='customer'>customer</option>
                    <option  value='farmer'>farmer</option>

                </select><br></br>

                <br></br> <br></br>






                <ReactBootStrap.Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email </th>
                            <th>Role </th>
                            <th>Status </th>
                            <th>Activate/DeActivate </th>
                            <th>Reset Password</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>


                        {this.state.data ? this.state.data.map((user, index) => {

                            return (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.fname}</td>
                                    <td>{user.lname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.status}</td>

                                    <td>
                                        
                                        <button class="btn btn-primary" onClick={()=>{this.changeStatus(user._id)}}>
                                           Change Status
                                        </button>
                                    </td>
                                    <td>

                                        <button class="btn btn-primary" onClick={() => { this.resetPassword(user._id) }} >
                                        Reset Password </button>

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
    users: state.userReducer.users

});
export default connect(mapStateToProps, { getUsersAsync })(Users);
