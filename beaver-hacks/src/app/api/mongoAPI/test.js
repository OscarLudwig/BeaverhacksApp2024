const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const { createPost } = require("./forumAPI"); // Import your createPost function
dotenv.config();

const connectionString = process.env.MONGODB_STRING;
if (!connectionString) {
  throw new Error("MONGODB_STRING is not defined in the environment variables.");
}
const client = new MongoClient(connectionString);

// Connect to the database
async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("forumPosts"); // Use your posts database
    return db.collection("posts");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database");
  }
}

// Function to create a default post
async function createDefaultPost() {
  const author = "testUser"; // Replace with a valid username
  const title = "Default Post Title";
  const body = "This is a default test post created for testing.";
  const tags = ["test", "default"]; // Example tags

  // Call the createPost function from postsAPI
  const result = await createPost(author, title, body, tags);
  return result;
}

// Wrap logic in an async function
(async () => {
  try {
    // Create a default post and log the result
    const createdPost = await createDefaultPost();
    console.log("Created Post:", createdPost);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Close the database connection
    await client.close();
  }
})();
