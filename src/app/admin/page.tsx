"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

const AdminPage = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };

  // Change password handler
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return;
    }

    if (newPassword.trim() === "") {
      setErrorMessage("Password cannot be empty.");
      setSuccessMessage("");
      return;
    }

    // Save the new password to localStorage (or replace with a secure backend API call)
    localStorage.setItem("adminPassword", newPassword);
    setSuccessMessage("Password changed successfully!");
    setErrorMessage("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuthenticated = localStorage.getItem("auth") === "true";
        if (!isAuthenticated) {
          router.push("/login");
        } else {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading screen
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!authenticated) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 text-white space-y-6">
      <h1 className="text-4xl font-bold text-center text-red-700">
        Admin Settings
      </h1>
      <button
        onClick={handleLogout}
        className="bg-gray-800 px-4 py-2 mt-4 rounded"
      >
        Logout
      </button>

      <section>
        <h2 className="text-2xl font-semibold text-blue-100 mb-4">
          Change Admin Password
        </h2>
        {/* <div className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button className="bg-red-700" onClick={handleChangePassword}>
            Change Password
          </Button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div> */}
      </section>
    </div>
  );
};

export default AdminPage;
