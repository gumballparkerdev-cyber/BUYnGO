"use client";

import { useEffect } from "react";
import { clearFilters } from "@/hooks/productsSlice";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/authStore";
import {
  fetchProducts,
  fetchCategoryThunk,
} from "@/hooks/productsThunk";
import ProductCard from "./ProductCard";
import SortProducts from "./SortProducts";
import Pagination from "./Pagination";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const { items = [], loading, error, page, limit, total, sortBy, order } =
    useAppSelector((s) => s.products);

  // 🔹 Fetch products whenever params change
 useEffect(() => {
  const skip = (page - 1) * limit;

  if (category) {
    dispatch(
      fetchCategoryThunk({
        category,
        limit,
        skip,
        sortBy: sortBy ?? undefined,
        order: order ?? undefined,
      })
    );
  } else {
    dispatch(
      fetchProducts({
        limit,
        skip,
        sortBy: sortBy ?? undefined,
        order: order ?? undefined,
      })
    );
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [category, page]); // ✅ only re-run when these change

  // 🔹 Clear filters manually
  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(fetchProducts({ limit, skip: 0 }));
  };

  // 🔹 UI states
  if (loading) return <p className="text-center text-gray-500">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!items || items.length === 0) return <p className="text-center text-gray-400">No products found</p>;

  return (
    <>
      <div className="flex justify-between items-center m-4">
        <SortProducts />
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-4 mt-10">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={(newPage) => dispatch({ type: "products/setPage", payload: newPage })}
      />
    </>
  );
}
