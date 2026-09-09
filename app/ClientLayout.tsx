'use client'

import { Provider, useDispatch } from 'react-redux'
import { store, type AppDispatch } from '@/store/authStore'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { setToken, setAuthInitialized } from '@/hooks/authSlice'
import { checkAuth } from '@/hooks/authThunk'
import { loadCart } from '@/hooks/cartSlice'
import { useAppDispatch, useAppSelector } from '@/store/authStore'
import { loadOrders } from '@/hooks/orderSlice'


// check if the auth actually has a token 
function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>()

 useEffect(() => {
   if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

  if (token) {
    dispatch(setToken(token));

    dispatch(checkAuth(token))
      .finally(() => {
        dispatch(setAuthInitialized());
      });
  } else {
    // No token → just mark initialized
    dispatch(setAuthInitialized());
  }
}
}, [dispatch]);

  return null
}

// check if cart is actually empty or no 

function CartInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (typeof window === "undefined") return

   if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");

    if (savedCart && savedCart !== "[]") {
      try {
        const cart = JSON.parse(savedCart)
        dispatch(loadCart(cart))
      } catch (err) {
        console.error("Failed to parse cart:", err)
      }
    }
  }
  }, [dispatch])

  return null
}

function OrdersInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window === "undefined") return;

     if (typeof window !== "undefined") {
    const savedOrders = localStorage.getItem("orders");

    if (savedOrders && savedOrders !== "[]") {
      try {
        const orders = JSON.parse(savedOrders);
        dispatch(loadOrders(orders)); // 👈 new action in orderSlice
      } catch (err) {
        console.error("Failed to parse orders:", err);
      }
    }
  }
  }, [dispatch]);

  return null;
}



function CartSaver() {
  const cart = useAppSelector((state) => state.cart)

  useEffect(() => {
     if (typeof window !== "undefined") {
    localStorage.setItem("cart" , JSON.stringify(cart));
     }
  }, [cart])

  return null
}




export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <CartInitializer />
      <OrdersInitializer />
      <CartSaver />

      {children}

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </Provider>
  )
}