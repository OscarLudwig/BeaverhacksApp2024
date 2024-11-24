"use client";

import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchBox from "./searchbox";
import LoginBox from "./loginbox";

export default function TitleBar() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showLoginBox, setShowLoginBox] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false) // TODO: Make this more rigourous
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check for the presence of the 'auth_token' cookie
    const token = Cookie.get('auth_token');
    if (token) {
      let decodedToken;
      try {
        // If the token is present, decode it to get the user's name (this assumes the token contains the user's name)
        decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT (assuming it's in base64 format)
      } catch (error) {
        handleLogout();
        return;
      }

      setIsLoggedIn(true);
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
        <a href="/" className="title-buttons">Home</a>
        <a href="/message-board" className="title-buttons">Message board</a>
        <a href="/food" className="title-buttons">Food</a>
        <a href="/clubs" className="title-buttons">Clubs</a>
        <a href="/events" className="title-buttons">Events</a>
      </nav>
      <div className="search-container">
        <button className="button" onClick={() => setShowSearchBox(!showSearchBox)}>
          Search
        </button>
        <SearchBox showSearchBox={showSearchBox} setShowSearchBox={setShowSearchBox} />
        {isLoggedIn ? (
          <button className="button logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="button login" onClick={() => setShowLoginBox(true)}>
            Login
          </button>
        )}
        <LoginBox showLoginBox={showLoginBox} setShowLoginBox={setShowLoginBox} setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
      </div>
    </div>
  );
}