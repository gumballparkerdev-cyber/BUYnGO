"use client";

import { Suspense } from "react";
import ProductsContent from "./ProductsContent"; // move your logic into a child component

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
