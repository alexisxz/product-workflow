export enum Switcher {
    DVD = "DVD",
    Book = "Book",
    Furniture = "Furniture",
}

export type Measure = {
    size: number,
} | {
    weight: number,
} | {
    dimesions: { height: number, width: number, length: number }
}

export interface IProduct {
    sku: string,
    name: string,
    price: number,
    productType: Switcher,
    measure: Measure,
}