import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { IProduct, Switcher, Measure } from "../types/Product";

type State = {
    products: IProduct[],
    selectedSkus: string[],
}

const initialState: State = {
    products: [
        { sku: 'FC123', name: 'Don L', price: 25.50, productType: Switcher.DVD, measure: 'Size: 700 MB' },
        { sku: 'FC234', name: 'Don L', price: 67, productType: Switcher.Book, measure: 'Weight: 2KG' },
        { sku: 'FC345', name: 'Don L', price: 24.04, productType: Switcher.Furniture, measure: 'Dimensions: 24x24x24' },
    ],
    selectedSkus: []
}


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            const newProductsState = [...state.products, action.payload]
            return { ...state, products: newProductsState }
        },

        selectProduct: (state, action: PayloadAction<string>) => {
            return { ...state, selectedSkus: [...state.selectedSkus, action.payload] }
        },

        unSelectProduct: (state, action: PayloadAction<string>) => {
            const newSkus = state.selectedSkus.filter(sku => sku !== action.payload)
            return { ...state, selectedSkus: newSkus }
        },

        massDeleteProduct: (state) => {
            const Skus = state.selectedSkus.map(sku => sku)
            const newProductsState = state.products.filter(product => product.sku !== Skus.find(sku => sku === product.sku))

            return { ...state, selectedSkus: [], products: newProductsState }
        },
    }
})

export default productSlice.reducer
export const { addProduct, massDeleteProduct, selectProduct, unSelectProduct } = productSlice.actions