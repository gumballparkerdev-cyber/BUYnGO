import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log("🧩 Product ID received:", id);

  if (!id) {
    return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
  }

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();

  return NextResponse.json(data);
}
