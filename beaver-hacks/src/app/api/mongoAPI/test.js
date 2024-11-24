const { MongoClient, ObjectId } = require("mongodb");
// import { getResturant, updateRating } from "./resturantsAPI";

const connectionString = "mongodb+srv://tangcharles29:Ogl6HT4ej30CQidS@foodposts.yds5q.mongodb.net/?retryWrites=true&w=majority&appName=FoodPosts"
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

// Wrap logic in an async function
(async () => {

  let openingHours = []
  let closingHours = []
  const weekdayOpen = 12 
  const weekdayClose = 12 + 7
  const satOpen = null
  const satClose = null
  const sunOpen = 12 + 3
  const sunClose = 12 + 8

  for (let i = 0; i < 7; i++) {
    if (i === 7) {
      openingHours.push(sunOpen)
      closingHours.push(sunClose)
    } else if (i === 6) {
      openingHours.push(satOpen)
      closingHours.push(satClose)
    } else {
      openingHours.push(weekdayOpen)
      closingHours.push(weekdayClose)
    }
  }

  try {
    const createdRestaurant = await createResturant("Clubhouse", 4, 1, "n/a", openingHours, closingHours, "Marketplace West");
    console.log("Created User:", createdRestaurant);
  } catch (err) {
    console.error("Error during voting test:", err);
  } 

})();
