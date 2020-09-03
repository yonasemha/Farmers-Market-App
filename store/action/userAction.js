import * as actionTypes from "../action/actionTypes";
import { returnError } from "./errorAction";
import axios from "axios";


//signup a user

export const signupUser = (userData) => {
  return { type: actionTypes.SIGNUP_SUCCESS, payload: userData }
}
export const signupUserAsync = (newUser) => {
  return dispatch => {
    axios.post('http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/users/signup', newUser)
      .then(response => {
        dispatch(signupUser(response.data));
      })
      .catch(err => {
        dispatch(returnError(err.response.data, err.response.status, 'SIGNUP_FAIL'));
        dispatch({ type: actionTypes.SIGNUP_FAIL })
      })
  }
}

// login user

export const signinUser = (userData) => {
  return { type: actionTypes.SIGNIN_SUCCESS, payload: userData }
}

export const signinUserAsync = (user) => {

  return dispatch => {
    axios.post('http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/users/signin', user)
      .then(response => {
        dispatch(signinUser(response.data));
      })

      .catch(err => {
        dispatch(returnError(err.response.data, err.response.status, 'SIGNIN_FAIL'));
        dispatch({ type: actionTypes.SIGNIN_FAIL })
      })
  }
}


export const logout = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  }
}


// get farmers

export const getUsers = (userData) => {
  return { type: actionTypes.GET_FARMERS, payload: userData }
}

export const getUsersAsync = () => {

  return dispatch => {
    axios.get('http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/users')
      .then(response => {
        console.log(response.data)
        dispatch(getUsers(response.data.data));
      })

      .catch(err => {
        console.log(err.msg)
      })
  }
}