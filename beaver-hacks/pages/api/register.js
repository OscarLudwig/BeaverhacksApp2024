import { hashPassword } from "../../utils/hash";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, Email and password are required." });
  }

  try {
    console.log(process.env.DATABASE_URL);
    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ username });

    if (existingUser) {
      client.close();
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await hashPassword(password);

    await db.collection("users").insertOne({ username, email, password: hashedPassword });

    client.close();

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
