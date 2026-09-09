import { configureStore } from "@reduxjs/toolkit";
import  authReducer from "@/hooks/authSlice";
import  productReducer from "@/hooks/productsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import cartReducer from '@/hooks/cartSlice'
import ordersReducer from "@/hooks/orderSlice";

export const store  = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
         cart: cartReducer,
         orders: ordersReducer,
        
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector