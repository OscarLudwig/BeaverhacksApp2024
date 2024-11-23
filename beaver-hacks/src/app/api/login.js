import { verifyPassword } from "../../utils/hash";
import { getUser } from "./usersAPI";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    // Fetch the user from the database
    const user = await getUser(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Verify the password
    const isValidPassword = await verifyPassword(password, user.Password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    return res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
