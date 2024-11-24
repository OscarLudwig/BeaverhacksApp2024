import { NextResponse } from 'next/server';

import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { getUser } from "../mongoAPI/usersAPI";
import { verifyPassword } from "../../utils/hash";

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: "Username and password are required." }, {status: 400});
  }

  try {
    // Fetch the user from the database
    const user = await getUser(username);

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials." }, {status: 401});
    }

    // Verify the password
    const isValidPassword = await verifyPassword(password, user.Password);

    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    // Ensure that the JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables.');
      return NextResponse.json({ message: "Server error: JWT secret not defined."  }, { status: 500 });
    }

    // Sign the JWT token with a secret key
    const token = sign(
      { username: user.username, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    //console.log(token)

    // Set the cookie with the JWT token
    let headers = {'Set-Cookie': serialize('auth_token', token, {
      secure: process.env.NODE_ENV === 'production', // only set secure cookies in production
      maxAge: 3600, // 1 hour
      path: '/',
    })};

    return NextResponse.json({ message: "Login successful."  }, { status: 200, headers: headers });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Something went wrong."  }, { status: 500 });
  }
}
