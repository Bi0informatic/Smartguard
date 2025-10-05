"use client";

import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = () => {
    if (!username || !password || !role) {
      alert("Please fill out all fields.");
      return;
    }

    // send login info back to parent
    onLogin({ username, role });
  };

  return (
    <div className="flex flex-col gap-4 border p-6 rounded-xl shadow-md bg-gray-50 dark:bg-gray-900 w-full max-w-sm">
      <h2 className="text-lg font-semibold text-center">Login</h2>

      <input
        type="text"
        placeholder="Username"
        className="rounded-lg border border-gray-300 dark:border-gray-700 bg-background text-foreground px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="rounded-lg border border-gray-300 dark:border-gray-700 bg-background text-foreground px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="rounded-lg border border-gray-300 dark:border-gray-700 bg-background text-foreground px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">-- Select Role --</option>
        <option value="student">Student</option>
        <option value="service">Service Person</option>
      </select>

      <button
        className="rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition-colors"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
