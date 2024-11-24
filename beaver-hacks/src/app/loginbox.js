import { useState, useRef, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginBox({ showLoginBox, setShowLoginBox }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add error state
  const loginInputRef = useRef(null);
  const router = useRouter();

  // Focus on login input when shown
  useEffect(() => {
    if (showLoginBox && loginInputRef.current) {
      loginInputRef.current.focus();
    }
  }, [showLoginBox]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful');
        setShowLoginBox(false);
        window.location.reload()
        return; // Exit early on success
      }

      // Only show alert for failed login attempts
      setError(data.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  const handleClose = () => {
    setShowLoginBox(false);
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <>
      {showLoginBox && (
        <>
          <div className="screen-overlay" onClick={handleClose} />
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                autoFocus
                ref={loginInputRef}
                autoCapitalize="none" // Add this line
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <div className="login-error-container">
              {error ? <div className="login-error">{error}</div> : <div className="login-error">&nbsp;</div>}
              </div>
              <button type="submit">Login</button>
              <h2 className="above-spaced-h2">New Account</h2>
              <button type="button" onClick={() => router.push('/register')}>Register</button>
              <div className="close-button">
                <button type="button" onClick={handleClose}>Cancel</button>
              </div>
            </form>

          </div>
        </>
      )}
    </>
  );
}