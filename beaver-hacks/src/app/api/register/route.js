import { NextResponse } from 'next/server';
import { hashPassword } from "../../utils/hash";
import { createUser, getUser } from "../mongoAPI/usersAPI";

export async function POST(req) {
  console.log(await req.body);
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
    await createUser(username, hashedPassword, osuVerified, createdDate, email, firstName, lastName);

    return NextResponse.json({ message: "User registered successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
