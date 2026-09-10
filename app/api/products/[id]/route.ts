import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { id } = context.params;
  console.log("🧩 Product ID received:", id); // ✅ check what’s coming in

  if (!id) {
    return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
  }

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();

  return NextResponse.json(data);
}
