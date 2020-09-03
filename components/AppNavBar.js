import React, { useState, Fragment } from "react";
import { Route, Link, Router, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import homePage from './homePage'
import Signup from './signup';
import Signin from './signin';
import AddProduct from './addProduct'
import EditProduct from './editProduct'
import Logout from "./logout";
// import Order from "./order";
import UploadFile from "./uploadImage";
import Users from "./users";
// import Transactions from "./transactions";
import PendingReadyComplete from "./pendingReadyComplete";

import asynComponent from '../components/hoc/asyncComponent'
// import ListProduct from './listProduct'
import PasswordReset from './passwordReset'
import ActivateDeActivate from './activateDeActivate'
import HTTEPREQUEST from './httpRequest'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Alert,

} from "reactstrap";
import axios from "axios";


//lazy loading for list of products
const ListProductAyncFun = asynComponent(() => {
  return import("./listProduct")

})

//lazy lading for order list
const OrderAyncFun = asynComponent(() => {
  return import("./order")

})

//lazy lading for transactions
const TransactionsAyncFun = asynComponent(() => {
  return import("./transactions")

})


const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, role, token } = props.userReducer;
  if (props.userReducer.msg === 'Account is Deactivated') {
    Alert(alert('Account is Deactivated'))
  }

  //setting up http request interceptor
  axios.interceptors.request.use(
    config => {
      config.headers.authorization = `Bearer ${token}`;
      return config
    },
    error => {
      return Promise.reject(error)
    })
    

  const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar className="bg-info clearfix" light expand="md">

        <NavbarBrand style={{ color: "white", size: "20px" }} href="/">
          Mekeret Food sales
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {(isAuthenticated && role === "superuser") ? (
              <NavItem>
                <NavLink>
                  <Link style={{ color: "white" }} to="/users">
                    Users
            </Link>
                </NavLink>
              </NavItem>

            ) : null}



            {(isAuthenticated && role === "superuser") ? (
              <NavItem>
                <NavLink>
                  <Link style={{ color: "white" }} to="/transactions">
                    Transactions
        </Link>
                </NavLink>
              </NavItem>

            ) : null}

            {(isAuthenticated && role === "superuser") ? (
              <NavItem>
                <NavLink>
                  <Link style={{ color: "white" }} to="/http">
                    HTTP requests
      </Link>
                </NavLink>
              </NavItem>

            ) : null}

            {(isAuthenticated && role === "farmer") ? (
              <NavItem>
                <NavLink>
                  <Link style={{ color: "white" }} to="/addProduct">
                    Add Product
          </Link>
                </NavLink>
              </NavItem>

            ) : null}

            {(isAuthenticated && role === "farmer") ? (
              <NavItem>
                <NavLink>
                  <Link style={{ color: "white" }} to="/listProduct">
                    List Product
            </Link>
                </NavLink>
              </NavItem>
            ) : null}
          </Nav>

          {(isAuthenticated && role === "farmer") ? (
            <NavItem>
              <NavLink>
                <Link style={{ color: "white" }} to="/order">
                  Order
          </Link>
              </NavLink>
            </NavItem>

          ) : null}

          {(!isAuthenticated) ? (
            <NavItem>
              <NavLink>
                <Link style={{ color: "white" }} to="/signin">
                  Sign in
        </Link>
              </NavLink>
            </NavItem>

          ) : null}

          {!isAuthenticated ? (
            <NavItem>
              <NavLink>
                <Link style={{ color: "white" }} to="/signup">
                  signup
      </Link>
              </NavLink>
            </NavItem>

          ) : null}

          {(isAuthenticated) ? (
            <NavItem>
              <NavLink>
                <Link style={{ color: "white" }} to="/logout">
                  Log out
    </Link>
              </NavLink>
            </NavItem>

          ) : null}


        </Collapse>
      </Navbar>

      <Route path="/" exact component={homePage}></Route>
      <Route path="/signup" exact component={Signup}></Route>
      <Route path="/signin" exact component={Signin}></Route>
      <Route path="/addProduct" exact component={AddProduct}></Route>
      <Route path="/listProduct" exact component={ListProductAyncFun}></Route>
      <Route path="/editProduct" exact component={EditProduct}></Route>
      <Route path="/logout" exact component={Logout}></Route>
      <Route path="/order" exact component={OrderAyncFun}></Route>
      <Route path="/upload" exact component={UploadFile}></Route>
      <Route path="/users" exact component={Users}></Route>
      <Route path="/transactions" exact component={TransactionsAyncFun}></Route>
      <Route path="/password" exact component={PasswordReset}></Route>
      <Route path="/status" exact component={ActivateDeActivate}></Route>
      <Route path="/http" exact component={HTTEPREQUEST}></Route>
      <Route path="/orderstatus" exact component={PendingReadyComplete}></Route>




    </div>
  );
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer
});
export default connect(mapStateToProps, null)(AppNavbar);