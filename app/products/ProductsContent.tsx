"use client";

import { useSearchParams } from "next/navigation";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // your products logic here
  return <div>Products for {category || "all"}</div>;
}
