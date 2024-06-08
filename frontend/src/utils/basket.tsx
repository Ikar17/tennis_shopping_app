import { Product } from "../constants/constants";

export function addProductToBasket(product: Product): void {
    const productsJSON = localStorage.getItem('products');
    let products: Product[] = productsJSON ? JSON.parse(productsJSON) : [];

    products.push(product);

    localStorage.setItem('products', JSON.stringify(products));
}

export function removeProductFromBasket(productId: number): void {
    const productsJSON = localStorage.getItem('products');
    let products: Product[] = productsJSON ? JSON.parse(productsJSON) : [];

    const index = products.findIndex((obj) => obj.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
    }

    localStorage.setItem('products', JSON.stringify(products));
}

export function getAllProducts(): Product[]{
    const productsJSON = localStorage.getItem('products');
    let products: Product[] = productsJSON ? JSON.parse(productsJSON) : [];
    return products;
}