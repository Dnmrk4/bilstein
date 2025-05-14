// app/feedback/page.tsx
"use client";
import { useState } from "react";

interface Feedback {
  name: string;
  comment: string;
}

export default function FeedbackPage() {
  const [form, setForm] = useState<Feedback>({ name: "", comment: "" });
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    { name: "Alex", comment: "Great service! Quick and professional." },
    { name: "Jordan", comment: "Highly recommend this mobile garage!" },
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    setFeedbacks([{ ...form }, ...feedbacks]);
    setForm({ name: "", comment: "" });
  };

  return (
    <main className="min-h-screen bg-blue-950 text-white px-4 py-16">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-700 mb-8">
          Customer Feedback
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white text-blue-950 p-6 rounded-2xl shadow-lg mb-12 space-y-4"
        >
          <div>
            <label className="block font-semibold mb-1">Your Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Your Feedback</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              rows={4}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <button
            type="submit"
            className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition"
          >
            Submit Feedback
          </button>
        </form>

        <div className="space-y-6">
          {feedbacks.map((fb, idx) => (
            <div
              key={idx}
              className="bg-white text-blue-950 p-4 rounded-xl shadow"
            >
              <p className="font-semibold text-red-700">{fb.name}</p>
              <p>{fb.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
