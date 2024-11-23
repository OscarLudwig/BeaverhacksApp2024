"use client"
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import Image from "next/image";

export default function TitleBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check for the presence of the 'auth_token' cookie
    const token = Cookie.get('auth_token');
    if (token) {
      setIsLoggedIn(true);
      // If the token is present, decode it to get the user's name (this assumes the token contains the user's name)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT (assuming it's in base64 format)
      console.log(decodedToken)
      setUserName(decodedToken.username); // Set the user's name from the decoded token
    }
  }, []); // Empty dependency array to run on mount

  const handleLogout = () => {
    // Remove the 'auth_token' cookie and reset the login state
    Cookie.remove('auth_token');
    setIsLoggedIn(false);
    setUserName(""); // Clear the user's name
    // Optionally, you can redirect the user to the login page or home page
    window.location.href = '/'; // Redirect to home after logging out
  };

  return (
    <div className="titlebar">
      <div className="left">
        <a href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={45}
            height={45}
            className="titlebar-logo"
          />
        </a>
        <nav>
          <a href="/" className="hover:underline">Home</a>
          <a href="/message-board" className="hover:underline">Message board</a>
          <a href="/food" className="hover:underline">Food</a>
          <a href="/clubs" className="hover:underline">Clubs</a>
          <a href="/events" className="hover:underline">Events</a>
        </nav>
      </div>
      <div className="right">
        <button className="button">
          Search
        </button>
        {isLoggedIn ? (
          <button className="button logout" onClick={handleLogout}>
            Logout  
          </button>
        ) : (
          <button className="button login" onClick={() => window.location.href = '/login'}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}
