import axios from 'axios';
import { BACKEND_URL } from '../constants/constants';
import { getToken } from '../utils/tokenUtils';


interface Product {
    category: FormDataEntryValue | null,
    name: FormDataEntryValue | null,
    price: FormDataEntryValue | null,
    quantity: FormDataEntryValue | null,
    available:  FormDataEntryValue | null,
    image?: string | ArrayBuffer | null;
}

export async function addNewProduct(data: FormData){
    const token = getToken();

    const product: Product = {
        category: data.get("category"),
        name: data.get("name"),
        price: data.get("price"),
        available: data.get("available"),
        quantity: data.get("quantity")
    }

    if(data.get("image") != null){
        const imageBase64 = await convertToBase64(data.get("image") as File);
        product.image = imageBase64;
    }

    return axios.post(
        `${ BACKEND_URL }/api/product/add`, product, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json' 
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

export async function editProduct(id: number, data: FormData){
    const token = getToken();

    const product: Product = {
        category: data.get("category"),
        name: data.get("name"),
        price: data.get("price"),
        available: data.get("available"),
        quantity: data.get("quantity")
    }

    const file:File = data.get("image") as File;

    if(file != null && file.name !== ""){
        const imageBase64 = await convertToBase64(file);
        product.image = imageBase64;
    }else{
        product.image = null;
    }

    return axios.patch(
        `${ BACKEND_URL }/api/product`, product, {
            params: { id: id },
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json' 
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

const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };