import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") ?? "20";
  const skip = searchParams.get("skip") ?? "0";

  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const data = await res.json();

  return NextResponse.json(data);
}
