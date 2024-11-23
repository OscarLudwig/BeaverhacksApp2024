const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.MONGODB_STRING;
const client = new MongoClient(connectionString);

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

// Wrap logic in an async function
(async () => {
  try {
    const created_user = await createUser("Username", "Password", true, new Date(), "email@example.com", "First", "Last");
    console.log("Created User:", created_user);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
})();