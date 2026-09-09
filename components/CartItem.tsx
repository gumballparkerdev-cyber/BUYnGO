"use client";

import type { CartItem as CartItemType } from "@/hooks/cartSlice";
import { useAppDispatch } from "@/store/authStore";
import { removeItem, increaseQuantity, decreaseQuantity } from "@/hooks/cartSlice";
import Image from "next/image";


type CartItemProps = {
  item: CartItemType;
};




export default function CartItem({ item }: CartItemProps) {

    const dispatch = useAppDispatch()
    const subtotal = item.price * item.quantity

  return (
   <div className="flex items-center justify-between gap-4 border-b p-4">
  <div className="flex items-center gap-4">
    <Image
      height={400}
      width={400}
      src={item.images[0]}
      alt={item.title}
      className="h-20 w-20 rounded object-cover"
    />

    <div>
      <h2 className="font-semibold">{item.title}</h2>
      <p>${item.price}</p>
     
      <div className="flex">
         <h3 className="text-2xl font-bold">quantity:</h3>
         {/*  quantity decrease button   */}
            <button
              className="bg-slate-400 w-10 h-10 rounded-full mr-1 text-2xl hover:bg-slate-600 active:bg-slate-400"
              onClick={() => dispatch(decreaseQuantity(item))}
            >
              -
            </button>
      <p className="text-2xl p-1"> {item.quantity}</p>

       {/*  quantity increase button   */}
            <button
              className="bg-slate-400 w-10 h-10 rounded-full ml-1 text-2xl hover:bg-slate-600 active:bg-slate-400"
              onClick={() => dispatch(increaseQuantity(item))}
            >
              +
            </button>

      <h3 className="text-2xl font-bold ml-20">SUBTOTAL:</h3>
      <p className="text-2xl font-bold">${subtotal}</p>
      </div>



    </div>


  </div>

{/* remove item */}
  <div className="remove bg-red-500 text-white p-3 rounded-2xl hover:bg-red-700 active:bg-red-400">
           <button onClick={() => dispatch(removeItem(item))}>
          Remove Item
        </button>
  </div>
</div>

  );
}