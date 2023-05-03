import { ProductAttribute } from "./product-attribute";

export interface Product {
    pkey: string,
    name: string,
    type: string,
    subtype?: string,
    price: number,
    image?: string,
    sale?: number,
    ratingCount?: number,
    ratingSum?: number,
    attributes?: ProductAttribute[]
}
