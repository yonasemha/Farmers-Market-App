
import * as actionTypes from '../action/actionTypes'


const initialState = {
    posts: [],
    orders:[],
    newProduct:null
}

const reducer = (state = initialState, action) => {

        //reducer function for product
    if (action.type === actionTypes.GET_PRODUCT) {
        return {
            ...state,
            posts: action.payload,
        }
    }

  
    if (action.type === actionTypes.ADD_PRODUCT) {

        return {
            ...state,
            newProduct:action.payload,
            posts: [action.payload, ...state.posts]
        }
    }

    if (action.type === actionTypes.DELET_PRODUCT) {


        return {
            ...state,
            posts: state.posts.filter(item=>item._id!==action.payload)

        }
    }

    if (action.type === actionTypes.EDIT_PRODUCT) {


        return {
            ...state,
            posts: state.posts.map(post => post._id === action.payload.id ?
                { ...post, name: action.payload.name, price:action.payload.price, quantity:action.payload.quantity}
                 : post
            ) 
        };
    }

    //order reducer function
    if (action.type === actionTypes.GET_ORDER) {
        return {
            ...state,
            orders: action.payload,
        }
    }

   

    
    return state;
}

export default reducer;




