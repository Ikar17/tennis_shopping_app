import axios from 'axios';
import { BACKEND_URL } from '../constants/constants';

export default async function signup(data: FormData){
    return axios.post(`${ BACKEND_URL }/auth/signup`, {
        firstName: data.get("firstname"),
        lastName: data.get("lastname"),
        email: data.get("email"),
        password: data.get("password")
    })
    .then((response)=>{
        return response.status;
    })
    .catch((error)=>{
        if(error.response == null) return 500;
        return error.response.status
    })
}