"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/authStore";
import ProductList from "@/components/ProductsList";


import {
  fetchProducts,
  fetchCategoryThunk,
  searchProductsThunk,
  fetchSortedProducts,
} from "@/hooks/productsThunk";
import type { RootState } from "@/store/authStore";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");

  const dispatch = useAppDispatch();
  const { items, loading, error, page, limit, total } = useSelector(
    (state: RootState) => state.products
  );

const sortByParam = sortBy ?? undefined;
const orderParam = order ?? undefined;


  // 🔹 Fetch logic based on query params
useEffect(() => {
  const skip = (page - 1) * limit;

  if (search) {
    dispatch(searchProductsThunk(search));
  } else if (category) {
    dispatch(fetchCategoryThunk({ category, limit, skip, sortBy: sortByParam, order: orderParam }));
  } else {
    dispatch(fetchProducts({ limit, skip, sortBy: sortByParam, order: orderParam }));
  }
}, [search, category, page]);


  // 🔹 Loading & error states
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products: {error}</p>;

  // 🔹 Render products
  return (
    <div>
      <ProductList />
  </div>
  );
}
