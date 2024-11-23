import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URI;
const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });


async function createUser(Username, Password, OSUverified, CreatedDate, Email, FirstName, LastName) {
  return client.connect().then(() => {
    const db = client.db("FoodPosts");
    const users = db.collection("users");
    const newUser = {
      Username,
      Password,
      OSUverified,
      CreatedDate,
      Email,
      FirstName,
      LastName,
    };

    for (const [key, value] of Object.entries(newUser)) {
      if (value === undefined) {
        throw new Error(`Missing field: ${key}`);
      }
    }

    return users.insertOne(newUser);
  });
}


async function getUser(Username) {
    return client.connect().then(() => {
        const db = client.db("FoodPosts");
        const users = db.collection("users");
        return users.findOne({ Username });
})}

async function updateUser(Username, Password, OSUverified, CreatedDate, Email, FirstName, LastName) {
    return client.connect().then(() => {
        const db = client.db("FoodPosts");
        const users = db.collection("users");
        return users.updateOne({ Username}, { $set: { Password, OSUverified, CreatedDate, Email, FirstName, LastName } });
})}

export { createUser, getUser, updateUser };