import * as actionTypes from "../action/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  users:[]
  
};

const reducer = (state = initialState, action) => {

  if (
    action.type === actionTypes.SIGNUP_SUCCESS ||
    action.type === actionTypes.SIGNIN_SUCCESS
  ) {
    localStorage.setItem("token", action.payload.token);

    return {
      ...state,
      ...action.payload,
      isAuthenticated: true
      
    };
  }

  if (
    action.type === actionTypes.SIGNUP_FAIL ||
    action.type === actionTypes.SIGNIN_FAIL ||
    action.type === actionTypes.LOGOUT_SUCCESS
  ) {
    localStorage.removeItem("token");
    
    return {
      ...state,
      users: null,
      isAuthenticated: false,
      token: null,
      role:null
    };
  }

  if (action.type === actionTypes.GET_FARMERS) {
    return {
        ...state,
        users: action.payload,
    }
}

  return state;
};

export default reducer;
