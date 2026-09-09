"use client"

interface PaginationProps {
  page: number
  total: number
  limit: number
  onPageChange: (newPage: number) => void
}

export default function Pagination({ page, total, limit, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / limit)

  // Generate page numbers (simple version: show all)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center mt-8 gap-2">
      {/* Prev button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded border ${
            page === p
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
