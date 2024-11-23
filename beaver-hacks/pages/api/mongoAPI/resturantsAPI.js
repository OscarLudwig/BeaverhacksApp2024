import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGODB_STRING;

if (!connectionString) {
    throw new Error("MONGODB_STRING is not defined in the environment variables.");
}

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Name: String,
//     Rating: Number,
//     NumberOfRatings: Number,
//     Description: String,
//     OpeningHour: Number,
//     ClosingHour: Number,
//     Location: String,

async function connectToDatabase() {
    try {
        // Connect if not already connected (no need for `isConnected` check)
        await client.connect();
        const db = client.db("ResturantList");
        return db.collection("resturants");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Failed to connect to the database");
    }
}

async function createResturant(Name, Rating, NumberOfRatings, Description, OpeningHour, ClosingHour, Location) {
    const resturants = await connectToDatabase();

    // Handle undefined values by setting them to empty string
    const newResturant = {
        Name,
        Rating,
        NumberOfRatings,
        Description,
        OpeningHour,
        ClosingHour,
        Location,
    };

    // Replace undefined properties with empty string
    Object.entries(newResturant).forEach(([key, value]) => {
        if (value === undefined) {
            newResturant[key] = ""; // Update the property directly
        }
    });

    const result = await resturants.insertOne(newResturant);
    return result;
}

async function getAllResturants() {
    const resturants = await connectToDatabase();
    return resturants.find().toArray();
}

async function getResturant(Name) {
    const resturants = await connectToDatabase();
    return resturants.findOne({
        Name
    });
}

async function updateRating(Name, newRating) {
    const resturants = await connectToDatabase();
    const returant = await resturants.findOne({
        Name
    });
    const newRating = (Rating * NumberOfRatings + newRating) / (NumberOfRatings + 1);
    return resturants.updateOne({
        Name
    }, {
        $set: {
            Rating: newRating,
            NumberOfRatings: NumberOfRatings + 1
        }
    });
}

async function deleteResturant(Name) {
    const resturants = await connectToDatabase();
    return resturants.deleteOne
}

async function updateResturant(Name, Rating, NumberOfRatings, Description, OpeningHour, ClosingHour, Location) {
    const resturants = await connectToDatabase();
    const result = await resturants.updateOne({
        Name
    }, {
        $set: {
            Rating,
            NumberOfRatings,
            Description,
            OpeningHour,
            ClosingHour,
            Location
        }
    });
    return result;
}

// export { createResturant, getAllResturants, getResturant, updateRating, deleteResturant, updateResturant };