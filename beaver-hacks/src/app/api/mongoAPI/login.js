<<<<<<<< HEAD:beaver-hacks/src/app/api/login/route.js
import { verifyPassword } from "../../utils/hash";
import { getUser } from "../mongoAPI/usersAPI";
========
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { getUser } from "./usersAPI";
import { verifyPassword } from "../../../utils/hash";
>>>>>>>> main:beaver-hacks/src/app/api/mongoAPI/login.js

export default async function handler(req, res) {

  //console.log(process.env.JWT_SECRET);  // Logs the value of JWT_SECRET to the console


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

    // Ensure that the JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables.');
      return res.status(500).json({ message: "Server error: JWT secret not defined." });
    }

    // Sign the JWT token with a secret key
    const token = sign(
      { username: user.username, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(token)

    // Set the cookie with the JWT token
    res.setHeader('Set-Cookie', serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only set secure cookies in production
      maxAge: 3600, // 1 hour
      path: '/',
    }));

    return res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
