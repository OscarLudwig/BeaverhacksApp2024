import { hashPassword } from "../../utils/hash";
import { createUser, getUser } from "../mongoAPI/usersAPI";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, email, password, firstName, lastName} = req.body;
  osuVerified = false;
  createdDate = new Date();

  if (!username || !email || !password || !firstName || !lastName) {
    return res.status(400).json({
      message: "Username, email, password, first name, last name,",
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await getUser(username);

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new user
    await createUser(username, hashedPassword, osuVerified, createdDate, email, firstName, lastName);

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
