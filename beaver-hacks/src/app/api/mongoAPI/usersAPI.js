import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGODB_STRING
if (!connectionString) {
  throw new Error("MONGODB_STRING is not defined in the environment variables.");
}

const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
      // Connect if not already connected (no need for `isConnected` check)
      await client.connect();
      const db = client.db("UserInfo");
      return db.collection("users");
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw new Error("Failed to connect to the database");
    }
  }

async function createUser(Username, Password, OSUverified, CreatedDate, Email, FirstName, LastName) {
  const users = await connectToDatabase();

  // Handle undefined values by setting them to empty string
  const newUser = {
    Username,
    Password,
    OSUverified,
    CreatedDate,
    Email,
    FirstName,
    LastName,
  };

  // Replace undefined properties with empty string
  Object.entries(newUser).forEach(([key, value]) => {
    if (value === undefined) {
      newUser[key] = "";  // Update the property directly
    }
  });

  const result = await users.insertOne(newUser);
  return result;
}

async function getUser(Username) {
  const users = await connectToDatabase();
  const user = await users.findOne({ Username });
  return user;
}

async function updateUser(Username, Password, OSUverified, CreatedDate, Email, FirstName, LastName) {
  const users = await connectToDatabase();
  const result = await users.updateOne(
    { Username },
    { $set: { Password, OSUverified, CreatedDate, Email, FirstName, LastName } }
  );
  return result;
}

export { createUser, getUser, updateUser };
