import { NextResponse } from "next/server";
import { createFoodPost, getAllFoodPosts } from "../mongoAPI/foodPostsAPI";

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
    try { 
        const body = await request.json(); // Parse the request body

        // Validate input
        const { User, Restaurant, Title, TimeStamp, Rating, Description, Upvotes = 0, Downvotes = 0, Comments = [] } = body;

        if (!User || !Restaurant || !Title || !Rating || !TimeStamp) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Call the createFoodPost function
        const result = await createFoodPost(
            User,
            Restaurant,
            Title,
            new Date(TimeStamp), // Ensure TimeStamp is a valid date
            Rating,
            Description,
            Upvotes,
            Downvotes,
            Comments
        );

        return NextResponse.json({ message: "Food post created successfully", result }, { status: 201 });
    } catch (error) {
        console.error("Error creating food post:", error);
        return NextResponse.json({ error: "Failed to create food post." }, { status: 500 });
    }
}
