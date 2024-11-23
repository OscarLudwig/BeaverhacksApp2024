const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

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

async function createPost(author, title, body, tags) {
    const posts = await connectToDatabase();

    const newPost = {
        author,
        title,
        body,
        tags,
        CreatedTime: new Date(),
        UpVotes: [author],
        DownVotes: [],
    };

    // Replace undefined properties with empty string
    Object.entries(newPost).forEach(([key, value]) => {
        if (value === undefined) {
          newPost[key] = "";  // Update the property directly
        }
    });

    const res = await posts.insertOne(newPost);
    return res;
}

//upvote true for up, false for down
async function vote(postId, user, upvote) {
    try {
        const posts = await connectToDatabase();

        // Ensure postId is a valid ObjectId
        const postObjectId = new ObjectId(postId);

        // Build the update query
        const updateQuery = {
            $pull: { UpVotes: user, DownVotes: user }, // Remove user from both arrays
            ...(upvote ? { $addToSet: { UpVotes: user } } : { $addToSet: { DownVotes: user } }) // Add user to the correct array
        };

        // Update the post
        const result = await posts.updateOne(
            { _id: postObjectId }, // Filter by post ID
            updateQuery // Apply the update
        );

        return result;
    } catch (error) {
        console.error("Error updating vote:", error);
        throw new Error("Failed to update vote");
    }
}

async function handler(req, res) {
    try {
        const { page = 0 } = req.query; // Default to page 0 if not provided
        const pageNumber = parseInt(page, 10);
        const postsPerPage = 10;

        if (isNaN(pageNumber) || pageNumber < 0) {
            return res.status(400).json({ message: 'Invalid page number.' });
        }

        const posts = await connectToDatabase();
        const skip = pageNumber * postsPerPage;

        // Fetch paginated posts
        const results = await posts
            .find()
            .sort({ CreatedTime: -1 }) // Sort by most recent
            .skip(skip) // Skip the offset
            .limit(postsPerPage) // Limit results
            .toArray();

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching paginated posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Export using CommonJS syntax
module.exports = {
    createPost,
    handler,
    vote,
};
