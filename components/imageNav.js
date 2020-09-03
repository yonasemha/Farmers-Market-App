import React, { useState, Fragment } from "react";
import { Route, Link, Router, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import homePage from './homePage'
import Signup from './signup';
import Signin from './signin';
import AddProduct from './addProduct'
import EditProduct from './editProduct'
import Logout from "./logout";

import asynComponent from '../components/hoc/asyncComponent'
import ListProduct from './listProduct'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";


<br></br>

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, role } = props.userReducer;
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
          {(isAuthenticated && role==="superuser")? (
              <NavItem>
                <NavLink>
                  <Link style={{ color: "white" }} to="/superuser">
                    Super User
            </Link>
                </NavLink>
              </NavItem>
           
          ):null}

          {(isAuthenticated) ? (
            <NavItem>
              <NavLink>
                <Link style={{ color: "white" }} to="/addProduct">
                  Add Product
          </Link>
              </NavLink>
            </NavItem>
         
        ):null}

          {isAuthenticated ? (
              <NavItem>
                <NavLink>
                  <Link style={{ color: "white" }} to="/listProduct">
                    List Product
            </Link>
                </NavLink>
              </NavItem>
          ):null}
          </Nav>

          {isAuthenticated ? (
            <NavLink>
              {" "}
              <Link style={{ color: "white" }} to="/logout">
                Log out
              </Link>
            </NavLink>
          ) : (
              <NavLink>
                {" "}
                <Link style={{ color: "white" }} to="/signin">
                  Sign in
              </Link>
              </NavLink>
            )}
          {isAuthenticated ? null : (
            <NavLink>
              {" "}
              <Link style={{ color: "white" }} to="/signup">
                Sign Up
              </Link>
            </NavLink>
          )}
        </Collapse>
      </Navbar>

      <Route path="/" exact component={homePage}></Route>
      <Route path="/signup" exact component={Signup}></Route>
      <Route path="/signin" exact component={Signin}></Route>
      <Route path="/addProduct" exact component={AddProduct}></Route>
      <Route path="/listProduct" exact component={ListProduct}></Route>
      <Route path="/editProduct" exact component={EditProduct}></Route>
      <Route path="/logout" exact component={Logout}></Route>




    </div>
  );
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer
});
export default connect(mapStateToProps, null)(AppNavbar);