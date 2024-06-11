import axios from 'axios';
import { BACKEND_URL } from '../constants/constants';

export async function getProductsByCategory(category: string, numberPage: number){
    return axios.get(`${ BACKEND_URL }/api/product/all`, {
            params: {
                category: category,
                page: numberPage,
                size: 8
            }
    })
    .then((response)=>{
        return response.data;
    })
    .catch((error)=>{
        return null;
    })
}

export async function getProductsByName(name: string, numberPage:number){
    return axios.get(`${ BACKEND_URL }/api/product/search`, {
        params: {
            name: name,
            page: numberPage,
            size: 8
        }
    })
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