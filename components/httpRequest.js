
import { connect } from "react-redux";
import React, { Component } from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap'
import styles from './sign.module.css'

import { Form, Col,  Button,   } from 'reactstrap';

class HTTPREQUEST extends Component {

    state = {
        file: [],
       
    }


    componentDidMount() {

        axios.get(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/logs`)
        .then(response => {
            this.setState({ file: response.data.lines })
        })
       

    }


    

   

    render() {
        return (
            <div> <br></br>
            <ReactBootStrap.Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>HTTP REQUESTS</th>
                
                      </tr>
            </thead>
            <tbody>
              {this.state.file ? this.state.file.map((http, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{http}</td>
                   
                    
                    
  
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



export default HTTPREQUEST;
