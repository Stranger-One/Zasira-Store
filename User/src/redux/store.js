import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"
import addressSlice from "./addressSlice"
import orderSlice from "./orderSlice"


const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        cart: cartSlice,
        order: orderSlice,
        address: addressSlice
    }
})

export default store