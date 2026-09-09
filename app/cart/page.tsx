"use client";

import { useAppDispatch, useAppSelector } from "@/store/authStore";
import CartItem from "@/components/CartItem";
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { placeOrder } from "@/hooks/orderSlice"
import { clearCart } from "@/hooks/cartSlice";
import { Order } from "@/types";
import toast from "react-hot-toast";




export default function CartPage() {
const router = useRouter()
const dispatch = useAppDispatch()
  // ✅ get cart from Redux
  const cart = useAppSelector((state) => state.cart);



  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // check if the user is logged in 
 const {
  isLoggedIn,
  authInitialized,
  user
} = useAuth()


  useEffect(() => {
    if (!authInitialized) return

    if (!isLoggedIn) {
      router.replace('/login')
      return
    }
  }, [
    authInitialized,
    isLoggedIn,
    router,
  ])

  if (!authInitialized) {
    return <div>Checking session...</div>
  }

  if (!isLoggedIn) {
    return <div>Redirecting...</div>
  }


const handleCheckout = () => {
  if (!user) return;

  const order: Order = {
    id: crypto.randomUUID(),
    userId: user.id,
    username: user.username,
    items: cart,
    total: cart.reduce((t, i) => t + i.price * i.quantity, 0),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  dispatch(placeOrder(order));

  // Persist orders in localStorage
  if (typeof window !== "undefined") {
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

    // Clear cart in Redux + localStorage
    dispatch(clearCart());
    localStorage.removeItem("cart");
  }

  toast.success("Order placed successfully!");
};




  return (
    <main className="p-6 min-h-screen">
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty 🛒</p>
      ) : (
        <>
        {cart.map((item, index) => (
              <CartItem key={`${item.id}-${index}`} item={item} />
            ))}


          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-bold">Checkout</h2>

            <div className="mt-4 space-y-2">
             {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex justify-between">
                  <p>{item.title} × {item.quantity}</p>
                  <p>${item.price * item.quantity}</p>
                </div>
              ))}

            </div>

            <div className="mt-4 flex justify-between border-t pt-4">
              <h3 className="text-xl font-bold">Total</h3>
              <p className="text-xl font-bold">${cartTotal}</p>
            </div>

            <button onClick={handleCheckout} className="mt-6 w-full rounded bg-black px-4 py-3 text-white hover:bg-gray-800 transition">
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}
