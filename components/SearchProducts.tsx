"use client"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/authStore"
import { searchProductsThunk } from "@/hooks/productsThunk"


export default function ProductSearch() {
  const [query, setQuery] = useState("")
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector((state) => state.products)

const handleSearch = () => {
  if (query.trim()) {
    dispatch(searchProductsThunk(query))
    setQuery("") // ✅ clears the input after search
  }
}

  return (
    <div className="items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="border p-2 rounded"
      />
      <button onClick={handleSearch} className="bg-black text-white px-4 py-2 rounded">
        Search
      </button>

      {loading && <p>Loading...</p>}
    </div>
  )
}
