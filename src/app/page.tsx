// app/page.tsx
"use client";
import { useEffect, useState } from "react";

const feedbacks = [
  "Excellent service! My car was fixed quickly.",
  "Professional and courteous team. Highly recommended!",
  "Affordable and reliable, will use again.",
  "Great mobile support — saved me time and money!",
];

export default function Home() {
  const [feedbackIndex, setFeedbackIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedbackIndex((prev) => (prev + 1) % feedbacks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-blue-950 text-white px-4">
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-red-700">
          Bilstein Mobile Garage
        </h1>
        <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
          Fast, reliable, and professional auto services at your doorstep.
        </p>

        <div className="mt-16 max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            Customer Feedback
          </h2>
          <div className="bg-white text-blue-950 p-6 rounded-2xl shadow-xl transition-all duration-500">
            {feedbacks[feedbackIndex]}
          </div>
        </div>
      </section>
    </main>
  );
}
