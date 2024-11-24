import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox({ showSearchBox, setShowSearchBox }) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const router = useRouter();

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
    <>
      {showSearchBox && (
        <>
          <div className="screen-overlay" onClick={() => setShowSearchBox(false)} />
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
    </>
  );
}