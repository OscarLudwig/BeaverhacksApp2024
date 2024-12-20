const { MongoClient, ObjectId } = require("mongodb");
// import { getResturant, updateRating } from "./resturantsAPI";
const { getResturant, updateRating} = require("./resturantsAPI");

// loool u really thikn this connection string works (gl with that)
const connectionString = "mongodb+srv://tangcharles29:Ogl6HT4ej30CQidS@foodposts.yds5q.mongodb.net/?retryWrites=true&w=majority&appName=FoodPosts";

const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

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

async function createFoodPost(Restaurant, Title, TimeStamp, Rating, Description, Upvotes, Downvotes, Comments) {
  const foodPosts = await connectToDatabase();

  // Handle undefined values by setting them to empty string
  const newFoodPost = {
      Restaurant,
      Title,
      TimeStamp,
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

  // get the resturant that the food post is about

  // update the rating of the resturant
  const resturant = getResturant(newFoodPost.Title);


  if (resturant != null) {
      const newRating = (resturant.Rating * resturant.NumberOfRatings + Rating) / (resturant.NumberOfRatings + 1);
      updateRating(resturant.Name, newRating);
  }

  const result = await foodPosts.insertOne(newFoodPost);
  return result;
}

// Wrap logic in an async function
(async () => {
  try {
    const created_user = await createFoodPost("e.Cafe", "Custom sandwich was very good today, but waited 20 min", new Date(), 5, "This is just a test post, but there are no more biscuits.", 0, 0, []);
    console.log("Created User:", created_user);
  } catch (err) {
    console.error("Error during voting test:", err);
  } 

})();
