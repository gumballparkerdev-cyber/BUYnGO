import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { id } = context.params;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return NextResponse.json(data);
}
