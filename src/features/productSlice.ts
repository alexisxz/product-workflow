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

        massDeleteProduct: (state, action: PayloadAction<{ productsSku: string[] }>) => {
            const productsSku = action.payload.productsSku
            if (!productsSku) return;

            productsSku.map(sku => {
                const updatedState = state.filter(item => item.sku !== sku)
                return updatedState
            })
        },
    }
})

export default productSlice.reducer
export const { addProduct, massDeleteProduct } = productSlice.actions