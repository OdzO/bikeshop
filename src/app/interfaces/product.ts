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
    attributes?: {
        [key: string]: string | number
    }
}
