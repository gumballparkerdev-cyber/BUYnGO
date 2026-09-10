import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { category } = await context.params;
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "20";
  const skip = searchParams.get("skip") ?? "0";
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");

  let url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
  if (sortBy && order) url += `&sortBy=${sortBy}&order=${order}`;

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}
