import { configureStore } from "@reduxjs/toolkit";

// reducers
import productReducer from '../features/productSlice'

export const store = configureStore({
    reducer: {
        products: productReducer
    },
})

export default store;
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch