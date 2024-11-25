import { NextResponse } from "next/server";
import { createFoodPost, getAllFoodPosts } from "../mongoAPI/foodPostsAPI";
import { verify } from "jsonwebtoken";

export async function GET(request) {
    try {
        const allFoodPosts = await getAllFoodPosts();
        return NextResponse.json({ message: allFoodPosts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching food posts:", error);
        return NextResponse.json({ error: "Failed to fetch food posts." }, { status: 500 });
    }
}

export async function POST(request) {
    let User;
    try {
        const token = request.cookies.get('auth_token');
        User = JSON.parse(atob(token.value.split('.')[1])).username;
        verify(token.value, process.env.JWT_SECRET);
    } catch (error) {
        return NextResponse.json({ message: "Invalid credentials." }, {status: 401});
    }

    try {
        const body = await request.json(); // Parse the request body

        // Validate input
        const { Restaurant, Title, TimeStamp, Rating, Description } = body;

        if (!User || !Restaurant || !Title || !Rating || !TimeStamp) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!(parseInt(Rating) <= 5 && parseInt(Rating) > 0)) {
            return NextResponse.json({ error: "Invalid Rating" }, { status: 402 });
        }

        // Call the createFoodPost function
        const result = await createFoodPost(
            User,
            Restaurant,
            Title,
            new Date(TimeStamp), // Ensure TimeStamp is a valid date
            Rating,
            Description
        );

        return NextResponse.json({ message: "Food post created successfully", result }, { status: 201 });
    } catch (error) {
        console.error("Error creating food post:", error);
        return NextResponse.json({ error: "Failed to create food post." }, { status: 500 });
    }
}
