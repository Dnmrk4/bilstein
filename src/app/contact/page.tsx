// app/contact/page.tsx
"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send message.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-blue-950 text-white px-4 py-16">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-red-700 mb-8 text-center">
          Contact Us
        </h1>
        <form
          onSubmit={handleSubmit} // This will handle the Enter key press
          className="bg-white p-8 rounded-2xl shadow-lg text-blue-950 space-y-6"
        >
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-semibold mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            ></textarea>
          </div>
          <button
            type="submit" // This ensures the form is submitted when Enter is pressed
            className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {success && (
            <p className="text-green-600 mt-4">Message sent successfully!</p>
          )}
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </form>
      </section>
    </main>
  );
}
