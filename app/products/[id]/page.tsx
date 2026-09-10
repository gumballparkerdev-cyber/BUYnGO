"use client";
import { use } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/authStore";
import { fetchProductById } from "@/hooks/productsThunk";
import ProductDetails from "@/components/ProductDetails";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const dispatch = useAppDispatch();
  const { selected, loading, error } = useAppSelector((state) => state.products);

useEffect(() => {
  if (id) dispatch(fetchProductById(id))
}, [dispatch, id])


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!selected) return <p>No product found</p>;

  return <ProductDetails product={selected} />;
}
