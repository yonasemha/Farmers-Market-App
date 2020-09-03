import axios from 'axios'
import * as actionType from './actionTypes'
import { returnError } from "./errorAction";


export const getProducts = (posts) => {
    return { type: actionType.GET_PRODUCT, payload: posts }
}
export const getProductAsync = (email) => {
    return dispatch => {
        axios.get(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/products/${email}`)
            .then(response => {
                dispatch(getProducts(response.data))
            })
            .catch(err=>{
                dispatch(returnError(err.response.data, err.response.status));
                   dispatch({ type: actionType.GET_PRODUCT_FAIL})
               })
    }
}




export const addProduct = (posts) => {
    return { type: actionType.ADD_PRODUCT, payload: posts }
}

export const addProductAsync =  (product) => {

    return dispatch => {
        axios.post('http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/products', product)
            .then(response => {
                dispatch(addProduct(response.data))
            })
             .catch(err=>{
                dispatch(returnError(err.response.data, err.response.status));
                setTimeout(function(){
                    dispatch({ type: actionType.CLEAR_ERROR})
                },1000)
                   dispatch({ type: actionType.ADD_PRODUCT_FAIL})
               })
    }
}

export const deleteProduct = (id) => {
    return { type: actionType.DELET_PRODUCT, payload: id }
}

export const deleteProductAsync = (id) => {
    return dispatch => {
        axios.delete(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/products/${id}`)
            .then(response => {
                dispatch(deleteProduct(id))
            })
    }
}


export const editProduct = (post) => {
    return { type: actionType.EDIT_PRODUCT, payload: post }
}

export const editProductAsync = (post) => {
    return dispatch => {
        axios.patch(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/products`, post)
            .then(response => {
                dispatch(editProduct(post))
            })
    }
}


export const getOrders = (orderData) => {
    return { type: actionType.GET_ORDER, payload: orderData }
}

export const getOrderAsync = (email) => {
    return dispatch => {
        axios.get(`http://msdproject-env.eba-mbpxp92m.us-east-1.elasticbeanstalk.com/orders/farmer/${email}`)
            .then(response => {
                console.log(response.data,'oorrrder')
                dispatch(getOrders(response.data))
            })
    }
}

