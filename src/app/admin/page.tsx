"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface Tip {
  title: string;
  content: string;
}

interface Feedback {
  name: string;
  message: string;
}

const AdminPage = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [tips, setTips] = useState<Tip[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [newTip, setNewTip] = useState<Tip>({ title: "", content: "" });
  const [newImageURL, setNewImageURL] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  const handleAddTip = () => {
    if (newTip.title && newTip.content) {
      setTips((prev) => [...prev, newTip]);
      setNewTip({ title: "", content: "" });
    }
  };

  const handleDeleteTip = (index: number) => {
    setTips((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteFeedback = (index: number) => {
    setFeedbacks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    if (newImageURL) {
      setCarouselImages((prev) => [...prev, newImageURL]);
      setNewImageURL("");
    }
  };

  const handleDeleteImage = (index: number) => {
    setCarouselImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (!authenticated) return null;
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  return (
    <div className="max-w-6xl flex flex-row mx-auto p-6 text-white space-y-12">
      {" "}
      <h1 className="text-4xl font-bold text-center text-red-700">
        Admin Panel
      </h1>
      <button
        onClick={handleLogout}
        className="bg-gray-800 px-4 py-2 mt-4 rounded"
      >
        Logout
      </button>
      {/* Manage Tips */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-100 mb-4">
          Service Tips
        </h2>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <Input
            placeholder="Tip title"
            value={newTip.title}
            onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
          />
          <Textarea
            placeholder="Tip content"
            value={newTip.content}
            onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
          />
          <Button className="bg-red-700" onClick={handleAddTip}>
            Add Tip
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip, idx) => (
            <Card
              key={idx}
              className="bg-neutral-900 border border-neutral-700"
            >
              <CardContent className="space-y-2">
                <h3 className="text-xl text-blue-200 font-bold">{tip.title}</h3>
                <p className="text-gray-300">{tip.content}</p>
                <Button
                  className="text-red-500"
                  onClick={() => handleDeleteTip(idx)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Manage Feedbacks */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-100 mb-4">
          Customer Feedbacks
        </h2>
        <div className="space-y-4">
          {feedbacks.map((fb, idx) => (
            <Card key={idx} className="bg-neutral-900 border border-gray-700">
              <CardContent>
                <p className="italic text-gray-300">{fb.message}</p>
                <p className="text-sm text-gray-500 text-right">- {fb.name}</p>
                <Button
                  className="text-red-500 mt-2"
                  onClick={() => handleDeleteFeedback(idx)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Manage Carousel Images */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-100 mb-4">
          Carousel Fliers
        </h2>
        <div className="flex gap-3 mb-4">
          <Input
            placeholder="Image URL"
            value={newImageURL}
            onChange={(e) => setNewImageURL(e.target.value)}
          />
          <Button className="bg-red-700" onClick={handleAddImage}>
            Add Image
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {carouselImages.map((img, idx) => (
            <Card
              key={idx}
              className="bg-neutral-900 border border-neutral-700"
            >
              <CardContent>
                <Image
                  src={img}
                  alt={`carousel-${idx}`}
                  width={160}
                  height={160}
                  className="w-full h-40 object-cover rounded"
                />
                <Button
                  className="text-red-500 bg-transparent mt-2"
                  onClick={() => handleDeleteImage(idx)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
