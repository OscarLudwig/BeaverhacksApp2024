"use client";

import { useState, useEffect, useRef } from "react";
import Cookie from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TitleBar() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const router = useRouter();
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

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem("searchQuery");
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }
  }, []);

  useEffect(() => {
    if (showSearchBox) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          setShowSearchBox(false);
        }
      };
      document.addEventListener('keydown', handleEscape);

      // Select all text if search box is opened and has text
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        if (searchQuery) {
          searchInputRef.current.select();
        }
      }

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showSearchBox]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
    setShowSearchBox(false);
  };

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    localStorage.setItem("searchQuery", query);
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
        {showSearchBox && (
          <>
            <div className="search-overlay" onClick={() => setShowSearchBox(false)} />
            <div className="search-box" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder="Type and press Enter to search"
                  autoFocus
                  ref={searchInputRef}
                />
              </form>
            </div>
          </>
        )}
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