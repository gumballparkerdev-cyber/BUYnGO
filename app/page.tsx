'use client'
import Link from "next/link"
import { useAuth } from '@/hooks/useAuth'
import ProductCategory from '@/components/ProductCategory'

export default function Home() {
  const { isLoggedIn, isAdmin, user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-amber-50 to-pink-100">
      {!isLoggedIn && (
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to BUYnGO</h1>
          <p className="text-lg text-gray-700 mb-8">Your one-stop shop for all your needs!</p>
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
        </div>
      )}

      {isLoggedIn && (
        <div className="pt-16 px-20">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Hello {user?.username} 
          </h1>
          {isAdmin ? (
            <p className="text-lg text-gray-700 mb-8">Manage your admin platform effectively!</p>
          ) : (
            <p className="text-lg text-gray-700 mb-8">Manage your user platform effectively!</p>
          )}
        </div>
      )}


      <div className="mt-12 px-20">
        <ProductCategory />
      </div>
    </div>
  )
}
