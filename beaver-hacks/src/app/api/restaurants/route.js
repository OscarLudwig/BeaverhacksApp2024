import { NextResponse } from "next/server";
import { getAllResturants } from "../mongoAPI/resturantsAPI";

export async function GET(req) {
  return NextResponse.json({ message: await getAllResturants() }, { status: 200 });
}
