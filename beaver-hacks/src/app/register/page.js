"use client"

import { useState } from "react";
import styles from "./register.module.css";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    firstName,
                    lastName,
                }),
            });

            const data = await response.json();
            
            if (response.ok) {
                alert(data.message);
                router.push('/login'); // Redirect to login page after successful registration
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred during registration');
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.centerContainer}>
                <h1 className={styles.welcomeTitle}>Welcome to BeaverHacks</h1>
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <h1>Register</h1>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.buttonContainer}>
                    <button type="submit" 
                                className={`${styles.registerButton}`}>
                            Register
                        </button>
                        <button type="button" 
                                className={`${styles.cancelButton}`}
                                onClick={() => router.back()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}