import axios from 'axios';
import { BACKEND_URL } from '../constants/constants';

export async function getProductsByCategory(category: string){
    return axios.get(`${ BACKEND_URL }/api/product/all?category=${category}`)
    .then((response)=>{
        return response.data;
    })
    .catch((error)=>{
        return null;
    })
}

export async function getProductsByName(name: string){
    return axios.get(`${ BACKEND_URL }/api/product/search?name=${name}`)
    .then((response)=>{
        return response.data;
    })
    .catch((error)=>{
        return null;
    })
}

export async function getLastAddedProducts(limit: number){
    return axios.get(`${ BACKEND_URL }/api/product/last/${limit}`)
    .then((response)=>{
        return response.data;
    })
    .catch((error)=>{
        return null;
    })
}