'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import type { AppDispatch  } from '@/store/authStore'
import { useAppSelector } from "@/store/authStore";
import { cancelOrder } from "@/hooks/orderSlice"


function Page() {
  const {
    isLoggedIn,
    isUser,
    authInitialized,
    user,
  } = useAuth()

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
    
  // get the orders
   const orders = useAppSelector((state) => state.orders);
   // show only users order 
    const userOrders = orders.filter((o) => o.userId === user?.id);

  useEffect(() => {
    if (!authInitialized) return

    if (!isLoggedIn) {
      router.replace('/login')
      return
    }

    if (!isUser) {
      router.replace('/admin-dashboard')
    }
  }, [
    authInitialized,
    isLoggedIn,
    isUser,
    router,
  ])

  if (!authInitialized) {
    return <div>Checking session...</div>
  }

  if (!isLoggedIn || !isUser) {
    return <div>Redirecting...</div>
  }





const handleCancel = (orderId: string) => {
  dispatch(cancelOrder(orderId));

  // Update localStorage safely
  if (typeof window !== "undefined") {
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = existingOrders.filter((o: any) => o.id !== orderId);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  }

  toast.success("Order canceled!");
};


  return (
    <main className="p-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {userOrders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet 🛍️</p>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md p-4 border"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Order #{order.id.slice(0, 8)}</h2>
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="mt-3 space-y-1">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-700"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-between border-t pt-2 font-semibold">
                <span>Total:</span>
                <span>${order.total}</span>
              </div>

                    <div className="mt-3 flex justify-between border-t pt-2 font-semibold">
          <button
              onClick={() => handleCancel(order.id)}
              className="mt-3 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">
                  Cancel Order
          </button>
              </div>
            </div>
            
          ))}
        </div>
      )}


    </main>
  )
}

export default Page