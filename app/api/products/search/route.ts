import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const limit = searchParams.get("limit") ?? "20";
  const skip = searchParams.get("skip") ?? "0";
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");

  if (!q) {
    return NextResponse.json({ message: "Missing search query" }, { status: 400 });
  }

  let url = `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;
  if (sortBy && order) url += `&sortBy=${sortBy}&order=${order}`;

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}
