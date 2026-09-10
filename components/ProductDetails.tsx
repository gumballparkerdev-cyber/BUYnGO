import { Product } from '@/types'
import Image from 'next/image'
import { useAppDispatch } from "@/store/authStore";
import { addItem } from "@/hooks/cartSlice"; 
import { useRouter } from "next/navigation"; 
import { useAuth } from '@/hooks/useAuth'


function ProductDetails({ product }: { product: Product }) {
   const router = useRouter()
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAuth()
  


 const handleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
     if (isLoggedIn) {
    dispatch(addItem(product))
  } else {
    router.push("/login")
    return
  }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Thumbnail */}
        <div className="border-2 border-gray-300 rounded-lg p-4 w-60 h-80 flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
          <Image
            width={400}        // ✅ required
            height={400} 
            src={product.images[1]}
            alt={product.title}
            className="w-full h-full object-contain rounded-lg"
          />
          ) : (
             <p>No image available</p>
          )}
        </div>

        {/* Text section */}
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
          <p className="text-gray-600 text-base max-w-xl leading-7">{product.description}</p>

          <div className="mt-4">
            <h4 className="text-3xl font-extrabold text-green-600">${product.price}</h4>
            <span className="inline-block bg-yellow-400 text-black text-sm font-semibold px-2.5 py-1 rounded-full mt-2">
              ⭐ {product.rating}
            </span>
          </div>

          <div className="mt-4 text-gray-800">
            <h5 className="font-semibold">Category: {product.category}</h5>
            <h5 className="font-semibold">Brand: {product.brand}</h5>
          </div>
     <button
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg mt-4 hover:from-blue-700 hover:to-indigo-700 transition"
      onClick={handleCart}
    >
      Add to Cart
    </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
