'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/authStore'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/hooks/authSlice'
import SearchProducts from '@/components/SearchProducts'

export default function Navbar() {
  const { isLoggedIn, isAdmin } = useAuth()
  const router = useRouter()
  const dispatch = useAppDispatch()

  // ✅ get cart from Redux
  const cart = useAppSelector((state) => state.cart)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleLogout = () => {
    
    if (typeof window !== "undefined") {
    localStorage.removeItem('token')
    }
    dispatch(logout())
    router.replace('/')
  }

  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-8 py-4">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800">
        BUYnGO
      </Link>


      {/* Links */}
      <div className="flex space-x-8 items-center">
        <Link className="text-gray-700 hover:text-indigo-600 transition-colors" href="/">
          Home
        </Link>
        <Link className="text-gray-700 hover:text-indigo-600 transition-colors" href="/products">
          Products
        </Link>

        {isLoggedIn && !isAdmin && (
          <Link
            className="text-gray-700 hover:text-indigo-600 transition-colors"
            href="/user-dashboard"
          >
            My Orders
          </Link>
        )}

        {isLoggedIn && isAdmin && (
          <Link
            className="text-gray-700 hover:text-indigo-600 transition-colors"
            href="/admin-dashboard"
          >
            Admin Dashboard
          </Link>
        )}

            
         {/*  search  */}
               <SearchProducts />
       {isLoggedIn && (
       
          <div className="flex items-center space-x-6 relative">
              <Link className="text-gray-700 hover:text-indigo-600 transition-colors" href="/profile">
                  Profile
            </Link>
            {/* this is Cart */}
            <Link href="/cart" className="relative flex items-center text-gray-700 hover:text-indigo-600 transition-colors">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Logout
            </button>
          </div>
)}

        {/*   show login btn  */}
        {!isLoggedIn && (
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Login
          </Link>
        )}

      
      </div>
    </nav>
  )
}
