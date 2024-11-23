import { MongoClient } from "mongodb";
import { getResturant, updateRating } from "./resturantsAPI";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGODB_STRING;

if (!connectionString) {
    throw new Error("MONGODB_STRING is not defined in the environment variables.");
}

const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Title: String,
//     Rating: Number,
//     Description: String,
//     Upvotes: Number,
//     Downvotes: Number,
//     Comments: Array,

async function connectToDatabase() {
    try {
        // Connect if not already connected (no need for `isConnected` check)
        await client.connect();
        const db = client.db("FoodPosts");
        return db.collection("Post");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Failed to connect to the database");
    }
}

async function createFoodPost(Title, Rating, Description, Upvotes, Downvotes, Comments) {
    const foodPosts = await connectToDatabase();

    // Handle undefined values by setting them to empty string
    const newFoodPost = {
        Title,
        Rating,
        Description,
        Upvotes,
        Downvotes,
        Comments,
    };

    // Replace undefined properties with empty string
    Object.entries(newFoodPost).forEach(([key, value]) => {
        if (value === undefined) {
            newFoodPost[key] = ""; // Update the property directly
        }
    });

    // get the returant that the food post is about

    // update the rating of the returant
    const returant = getResturant(newFoodPost.Title);

    if (returant != null) {
        const newRating = (Rating * NumberOfRatings + newRating) / (NumberOfRatings + 1);
        returant.updateRating(newRating);
    }

    const result = await foodPosts.insertOne(newFoodPost);
    return result;
}


async function getAllFoodPosts() {
    const foodPosts = await connectToDatabase();
    return foodPosts.find().toArray();
}

async function getFoodPost(Title) {
    const foodPosts = await connectToDatabase();
    return foodPosts.findOne({
        Title
    });
}

async function updateRating(Title, newRating) {
    const foodPosts = await connectToDatabase();
    const foodPost = await foodPosts.findOne({
        Title
    });
    const newRating = (Rating * NumberOfRatings + newRating) / (NumberOfRatings + 1);
    return foodPosts.updateOne({ Title }, { $set: { Rating: newRating } });
}

async function deleteFoodPost(Title) {
    const foodPosts = await connectToDatabase();
    return foodPosts.deleteOne({ Title });
}

export { createFoodPost, getAllFoodPosts, getFoodPost, updateRating, deleteFoodPost };