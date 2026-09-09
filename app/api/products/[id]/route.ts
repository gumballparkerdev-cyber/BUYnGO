import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  const data = await res.json();
  return NextResponse.json(data);
}
