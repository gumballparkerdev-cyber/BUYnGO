import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { category: string } }) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") ?? "20";
  const skip = searchParams.get("skip") ?? "0";
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");

  let url = `https://dummyjson.com/products/category/${params.category}?limit=${limit}&skip=${skip}`;
  if (sortBy && order) url += `&sortBy=${sortBy}&order=${order}`;

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}
