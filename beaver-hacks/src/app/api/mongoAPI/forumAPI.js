const { MongoClient } = require("mongodb");
const dontenv = require ("dotenv");
const postcss = require("postcss");
dontenv.config();

const connectionString = process.env.MONGODB_STRING;
if (!connectionString) {
  throw new Error("users api: MONGODB_STRING is not defined in the environment variables.");
}

const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

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

export async function createPost(
    author,
    title,
    body,
    tags,)
{
    const posts = await connectToDatabase();

    const newPost = {
        author,
        title,
        body,
        tags,
        CreatedTime : new Date(),
        UpVotes : [author],
        DownVotes : [],
    };

    // Replace undefined properties with empty string
    Object.entries(newUser).forEach(([key, value]) => {
        if (value === undefined) {
          newUser[key] = "";  // Update the property directly
        }
    });

    const res = await posts.insertOne(newPost);
    return res;
}


// The exported API function
export default async function handler(req, res) {
    try {
      const { page = 0 } = req.query; // Default to page 0 if not provided
      const pageNumber = parseInt(page, 10);
      const postsPerPage = 10;
  
      if (isNaN(pageNumber) || pageNumber < 0) {
        return res.status(400).json({ message: 'Invalid page number.' });
      }
  
      const db = await connectToDatabase();
      const skip = pageNumber * postsPerPage;
  
      // Fetch paginated posts
      const posts = await db.collection(posts)
        .find()
        .sort({ createdAt: -1 }) // Sort by most recent
        .skip(skip) // Skip the offset
        .limit(postsPerPage) // Limit results
        .toArray();
  
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching paginated posts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }