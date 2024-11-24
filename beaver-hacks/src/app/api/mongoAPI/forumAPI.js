const { MongoClient, ObjectId } = require("mongodb");
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
    const posts = await connectToDatabase();
    const filter = { _id: new ObjectId(postId) };

    const update = upvote
      ? {
          $addToSet: { UpVotes: user },  // Add to UpVotes
          $pull: { DownVotes: user },  // Remove from DownVotes
        }
      : {
          $addToSet: { DownVotes: user },  // Add to DownVotes
          $pull: { UpVotes: user },  // Remove from UpVotes
        };

    const result = await posts.updateOne(filter, update);

    if (result.modifiedCount === 0) {
      throw new Error("Failed to update vote");
    }

    return result;
  }


async function getPosts(page) {
    try {
        const pageNumber = parseInt(page, 10);
        const postsPerPage = 10;

        if (isNaN(pageNumber) || pageNumber < 0) {
            return null;
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

        return results
    } catch (error) {
        console.error('Error fetching paginated posts:', error);
        return null;
    }
}

// Export using CommonJS syntax
module.exports = {
    createPost,
    getPosts,
    vote,
};
