export const BACKEND_URL = "http://localhost:8080";
export enum Role {
    USER,
    ADMIN,
    GUEST
}

export interface Product {
    id: number,
    category: Category,
    name: string,
    price: number,
    quantity: number,
    available: boolean,
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Category {
    id: number;
    name: string;
}

export interface User {
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    address: string;
    number: string;
}

export const categories = ["rakiety", "buty", "ubrania", "inne"]