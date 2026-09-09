"use client";

import type { Product } from "@/types";
import { useAppDispatch } from "@/store/authStore";
import { addItem } from "@/hooks/cartSlice";
import { useRouter } from "next/navigation"; 
import { useAuth } from '@/hooks/useAuth'
import { store } from "@/store/authStore"




type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoggedIn } = useAuth()

  const handleClick = () => {
    router.push(`/products/${product.id}`); 
  };

const handleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation()

  if (isLoggedIn) {
    dispatch(addItem(product))

  } else {
    router.push("/login")
  }
}



  return (
 <div
  onClick={handleClick}
  className="border rounded-xl p-3 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1 bg-white"
>
  <img
    src={product.images[0]}
    alt={product.title}
    className="w-full h-64 object-cover rounded-md"
  />

  <div className="mt-4">
    <h2 className="text-lg font-semibold text-gray-800 truncate">
      {product.title}
    </h2>

    <p className="text-base text-gray-600 mt-1">${product.price}</p>

    <button
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg mt-4 hover:from-blue-700 hover:to-indigo-700 transition"
      onClick={handleCart}
    >
      Add to Cart
    </button>
  </div>
</div>

  );
}
