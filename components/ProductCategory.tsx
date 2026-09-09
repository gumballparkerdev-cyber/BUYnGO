"use client"
import { useRouter } from "next/navigation"
import { filters } from "@/types/index"

export default function ProductCategory() {
  const router = useRouter()

  const handleFilterClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`)
  }

  return (
    <section className="bg-slate-50 rounded-3xl shadow-lg p-8 mb-20">
      <div className="max-w-5xl mx-auto ">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[.24em] text-blue-600 font-semibold">
            Explore by tag
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            What are you looking for?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Pick a category and go straight to relevant products.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleFilterClick(filter.value)}
              className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-lg font-semibold text-slate-900">
                {filter.label}
              </div>
              <p className="mt-2 text-sm text-slate-600">{filter.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
