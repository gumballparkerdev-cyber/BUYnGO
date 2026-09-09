"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/authStore"
import { fetchSortedProducts, fetchProducts } from "@/hooks/productsThunk"

export default function SortProducts() {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const router = useRouter()
  const category = searchParams.get("category") ?? undefined

  // 🔹 Initialize sortValue from URL params
  const sortByParam = searchParams.get("sortBy")
  const orderParam = searchParams.get("order")
  const initialSort = sortByParam && orderParam ? `${sortByParam}:${orderParam}` : ""
  const [sortValue, setSortValue] = useState(initialSort)

  // 🔹 Keep local state in sync if URL changes externally
  useEffect(() => {
    const sortByParam = searchParams.get("sortBy")
    const orderParam = searchParams.get("order")
    const newSort = sortByParam && orderParam ? `${sortByParam}:${orderParam}` : ""
    setSortValue(newSort)
  }, [searchParams])

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSortValue(value)

    if (value) {
      const [sortBy, order] = value.split(":")
      dispatch(fetchSortedProducts({ sortBy, order, category }))

      // 🔹 Update URL
      const params = new URLSearchParams(searchParams)
      params.set("sortBy", sortBy)
      params.set("order", order)
      router.push(`?${params.toString()}`)
    } else {
      // 🔹 Clear sort
      dispatch(fetchProducts({ limit: 20, skip: 0 })) // ✅ correct
      const params = new URLSearchParams(searchParams)
      params.delete("sortBy")
      params.delete("order")
      router.push(`?${params.toString()}`)
    }
  }

  return (
    <select
      value={sortValue}
      onChange={handleSortChange}
      className="border rounded-lg px-3 py-2"
    >
      <option value="">Clear Sort</option>
      <option value="price:asc">Price: Low to High</option>
      <option value="price:desc">Price: High to Low</option>
      <option value="title:asc">Alphabetical A → Z</option>
      <option value="title:desc">Alphabetical Z → A</option>
      <option value="rating:desc">Best Rated</option>
    </select>
  )
}
