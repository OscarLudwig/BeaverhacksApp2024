import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { hashPassword } from "../../utils/hash";
import { createUser, getUser } from "../mongoAPI/usersAPI";

export async function POST(req) {
  const { username, email, password, firstName, lastName } = await req.json();
  const osuVerified = false;
  const createdDate = new Date();

  if (!username || !email || !password || !firstName || !lastName) {
    return NextResponse.json({ message: "Username, email, password, first name, last name" }, { status: 400 });
  }

  try {
    // Check if the user already exists
    const existingUser = await getUser(username);

    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const user = await createUser(username, hashedPassword, osuVerified, createdDate, email, firstName, lastName);

    const token = sign(
      { username: username, userId: user.insertedId },
      process.env.JWT_SECRET,
    );

    let headers = {'Set-Cookie': serialize('auth_token', token, {
      secure: process.env.NODE_ENV === 'production', // only set secure cookies in production
      maxAge: 3600, // 1 hour
      path: '/',
    })};

    return NextResponse.json({ message: "User registered successfully." }, { status: 201, headers });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
