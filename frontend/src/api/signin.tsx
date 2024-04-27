import axios from 'axios';
import { BACKEND_URL } from '../constants/constants';
import { setToken } from '../utils/tokenUtils';

export default async function signin(data: FormData){
    return axios.post(`${ BACKEND_URL }/auth/signin`, {
        email: data.get("email"),
        password: data.get("password")
    })
    .then((response)=>{
        const token = response.data;
        setToken(token);
        return response.status;
    })
    .catch((error)=>{
        return error.response.status
    })
}