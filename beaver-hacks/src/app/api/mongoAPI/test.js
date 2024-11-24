const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const { vote } = require("./forumAPI"); // Assuming `vote` is exported from your API file

const connectionString = process.env.MONGODB_STRING;
if (!connectionString) {
  throw new Error("MONGODB_STRING is not defined in the environment variables.");
}

const client = new MongoClient(connectionString);

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("forumPosts");
    return db.collection("posts");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database");
  }
}

async function createSamplePost() {
  const posts = await connectToDatabase();
  const samplePost = {
    _id: new ObjectId("674267a5ff3d6117641a3c4a"),
    title: "Sample Post",
    body: "This is a sample post for testing purposes.",
    author: "test_user",
    tags: ["test", "sample"],
    CreatedTime: new Date(),
    UpVotes: [],
    DownVotes: [],
  };

  // Insert the sample post if it doesn't already exist
  await posts.updateOne(
    { _id: samplePost._id },
    { $setOnInsert: samplePost },
    { upsert: true }
  );

  return samplePost;
}

// Wrap logic in an async function
(async () => {
  try {
    await createSamplePost();

    const postId = "674267a5ff3d6117641a3c4a"; // Test post ID
    const user = "john_doe"; // Test user
    const upvote = false; // Change to false to test downvoting

    console.log(`Testing ${upvote ? "upvoting" : "downvoting"} by user: ${user}`);

    const result = await vote(postId, user, upvote);
    console.log("Vote update result:", result);

    // Verify the update
    const posts = await connectToDatabase();
    const updatedPost = await posts.findOne({ _id: new ObjectId(postId) });
    console.log("Updated Post:", updatedPost);
  } catch (err) {
    console.error("Error during voting test:", err);
  } finally {
    await client.close();
  }
})();
