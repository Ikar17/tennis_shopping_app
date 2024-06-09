import axios from 'axios';
import { BACKEND_URL, OrderDetails } from '../constants/constants';
import { getToken } from '../utils/tokenUtils';

export async function createOrder(productsId: number[]){
    const token = getToken();

    return axios.post(`${ BACKEND_URL }/api/order`, {
        productsId: productsId
    },
    {
        headers:{
            "Authorization" : "Bearer " + token
        }
    })
    .then((response)=>{
        return response.data;
    })
    .catch((error)=>{
        return null;
    })
}

export async function getMyOrders(){
    const token = getToken();

    return axios.get(`${ BACKEND_URL }/api/order`,
    {
        headers:{
            "Authorization" : "Bearer " + token
        }
    })
    .then((response)=>{
        return response.data;
    })
    .catch((error)=>{
        return null;
    })
}

export async function getAllOrders(){
    const token = getToken();

    return axios.get(`${ BACKEND_URL }/api/order/all`,
    {
        headers:{
            "Authorization" : "Bearer " + token
        }
    })
    .then((response)=>{
        return response.data;
    })
    .catch((error)=>{
        return null;
    })
}

export async function updateOrder(order: OrderDetails){
    const token = getToken();

    return axios.patch(`${ BACKEND_URL }/api/order`, {
        id: order.id,
        orderStatus: order.orderStatus
    },
    {
        headers:{
            "Authorization" : "Bearer " + token
        }
    })
    .then((response)=>{
        return response.status;
    })
    .catch((error)=>{
        if(error.response == null) return 500; 
        return error.response.status;
    })
}