"use client";

import { useState } from "react";
import Cookie from "js-cookie";
import Image from "next/image";
import LoginBox from "./loginbox";

export default function ClientTitleBar({ username }) {
  const [showLoginBox, setShowLoginBox] = useState(false);

  const handleLogout = () => {
    // Remove the 'auth_token' cookie and reset the login state
    Cookie.remove('auth_token');
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
        {username !== undefined ? (
          <button className="button logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="button login" onClick={() => setShowLoginBox(true)}>
            Login
          </button>
        )}
        <LoginBox showLoginBox={showLoginBox} setShowLoginBox={setShowLoginBox} />
      </div>
    </div>
  );
}