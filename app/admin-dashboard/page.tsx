'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from "@/store/authStore";
import { updateOrderStatus, cancelOrder } from "@/hooks/orderSlice";
import toast from "react-hot-toast";


function Page() {
const {
  isLoggedIn,
  isAdmin,
  authInitialized,
} = useAuth()

  const router = useRouter()
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.orders);
 



  useEffect(() => {
    if (!authInitialized) return

    if (!isLoggedIn) {
      router.replace('/login')
      return
    }

    if (!isAdmin) {
      router.replace('/user-dashboard')
    }
  }, [
    authInitialized,
    isLoggedIn,
    isAdmin,
    router,
  ])

  if (!authInitialized) {
    return <div>Checking session...</div>
  }

  if (!isLoggedIn || !isAdmin) {
    return <div>Redirecting...</div>
  }


  // manage orders
 const handleStatusUpdate = (orderId: string, status: "pending" | "received") => {
  dispatch(updateOrderStatus({ id: orderId, status }));

  if (typeof window !== "undefined") {
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = existingOrders.map((o: any) =>
      o.id === orderId ? { ...o, status } : o
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  }

  toast.success(`Order marked as ${status}`);
};

// cancel orders
const handleCancel = (orderId: string) => {
  dispatch(cancelOrder(orderId));

  if (typeof window !== "undefined") {
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = existingOrders.filter((o: any) => o.id !== orderId);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  }

  toast.success("Order canceled!");
};
  return (
    <>
   <main className="p-6 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet 🛒</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
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
                      : order.status === "received"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm">
                User: {order.username} — Placed on{" "}
                {new Date(order.createdAt).toLocaleString()}
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

              {/* Action buttons */}
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleStatusUpdate(order.id, "received")}
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Mark as Received
                </button>
                <button
                  onClick={() => handleCancel(order.id)}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>

  
    </>
  )
}

export default Page