export const BACKEND_URL = "http://localhost:8080";
export enum Role {
    USER,
    ADMIN,
    GUEST
}

export interface Product {
    name: string,
    price: number
}