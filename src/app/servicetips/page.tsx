"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { getFeedbacks } from "@/lib/feedback";

const carouselImages = ["/carousel1.jpg", "/carousel2.jpg", "/carousel3.jpg"];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  interface Feedback {
    message: string;
    name: string;
  }

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadFeedbacks = async () => {
      const data = await getFeedbacks();
      setFeedbacks(data);
    };
    loadFeedbacks();
  }, []);

  return (
    <main className="text-white space-y-12">
      {/* Carousel */}
      <div className="relative w-full h-[60vh] rounded-xl overflow-hidden shadow-lg">
        {carouselImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Carousel image ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* About Us Section */}
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          About Bilstein Mobile Garage
        </h2>
        <p className="text-gray-300 text-lg">
          We are a fully mobile auto garage serving your mechanical needs
          wherever you are. From diagnostics to full repairs, our skilled
          professionals bring the garage to your doorstep. With premium service,
          transparent pricing, and a passion for quality, Bilstein ensures your
          vehicle is always in top condition.
        </p>
        <div className="mt-6">
          <Button className="bg-red-700 hover:bg-red-800">
            Book a Service
          </Button>
        </div>
      </section>

      {/* Customer Feedbacks */}
      <section className="bg-[#1a1a1a] py-10 px-4 rounded-xl max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-100 mb-6">
          What Our Customers Say
        </h2>
        <div className="space-y-4">
          {feedbacks.length ? (
            feedbacks.map((fb, idx) => (
              <Card key={idx} className="bg-neutral-900 border border-gray-700">
                <CardContent className="p-4">
                  <p className="text-gray-300 italic">{fb.message}</p>
                  <p className="text-sm text-gray-500 text-right mt-2">
                    — {fb.name}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-400 text-center">Loading feedbacks...</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
