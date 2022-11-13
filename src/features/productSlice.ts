import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { IProduct, Switcher, Measure } from "../types/Product";

type State = IProduct[]

const initialState: State = [
    { sku: v4(), name: 'Don L', price: 25.50, productType: Switcher.DVD, measure: { size: 10 } },
]

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<{ newProduct: IProduct }>) => {
            const newState = [...state, action.payload.newProduct]
            return newState
        },

        deleteProduct: (state, action: PayloadAction<{ productSku: string }>) => {
            const newState = state.filter(product => product.sku !== action.payload.productSku)
            return newState
        },

        massDeleteProduct: () => {
            const newState: State = [];
            return newState
        },
    }
})

export default productSlice.reducer
export const { addProduct, deleteProduct, massDeleteProduct } = productSlice.actions