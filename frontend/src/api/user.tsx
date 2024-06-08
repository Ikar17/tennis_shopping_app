import axios from 'axios';
import { BACKEND_URL } from '../constants/constants';
import { getToken } from '../utils/tokenUtils';

export function getAllUsers(){
    const token = getToken();

    return axios.get(
        `${ BACKEND_URL }/api/user/all`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
    .then((response)=>{
        return response.data;
    })
    .catch((error)=>{
        return null;
    })
}

export function promoteToAdmin(email:string){
    const token = getToken();

    return axios.patch(
        `${ BACKEND_URL }/api/user/promote`, {
            email: email
        },
        {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
    .then((response)=>{
        return response.status;
    })
    .catch((error)=>{
        if(error.response == null) return 500;
        return error.response.status
    })
}