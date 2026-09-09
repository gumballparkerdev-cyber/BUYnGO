import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  const res = await fetch(`https://dummyjson.com/products/search?q=${q}`);
  const data = await res.json();
  return NextResponse.json(data);
}
