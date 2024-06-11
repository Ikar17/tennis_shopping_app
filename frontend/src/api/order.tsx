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

export async function getMyOrders(page:number){
    const token = getToken();

    return axios.get(`${ BACKEND_URL }/api/order`,
    {
        params:{
            page: page,
            size: 4
        },
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

export async function getAllOrders(page: number){
    const token = getToken();

    return axios.get(`${ BACKEND_URL }/api/order/all`,
    {
        params:{
            page: page,
            size: 4
        },
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