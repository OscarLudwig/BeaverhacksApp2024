import { verifyPassword } from "../../utils/hash";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Username, Email and password are required." });
  }

  try {
    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const db = client.db();

    const user = await db.collection("users").findOne({ username });

    if (!user) {
      client.close();
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      client.close();
      return res.status(401).json({ message: "Invalid credentials." });
    }

    client.close();

    return res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
