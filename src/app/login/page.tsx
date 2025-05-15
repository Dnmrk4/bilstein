"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === "bilsteinSecret123") {
      localStorage.setItem("auth", "true");
      router.push("/admin");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl mb-4 font-bold">Admin Login</h1>
      <input
        type="password"
        className="p-2 rounded text-black"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={handleLogin}
        className="mt-4 bg-red-700 px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
