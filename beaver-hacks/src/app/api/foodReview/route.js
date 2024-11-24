import { NextResponse } from "next/server";
import { getAllFoodPosts } from "./../mongoAPI/foodPostsAPI";

export async function GET(request) {
  return NextResponse.json({ message: await getAllFoodPosts() }, { status: 200 });
}