import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ unwrap the Promise

  if (!id) {
    return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
  }

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();

  return NextResponse.json(data);
}
