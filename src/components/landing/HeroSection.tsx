"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";

export default function HeroSection() {
  const { user, isAuthenticated } = useAuth();

  const title = isAuthenticated && user ? `${user.displayName}'s Hub` : "Your's Hub";

  return (
    <section id="home" className="bg-white pt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cap-dark-blue">{title}</h1>
        </div>
        <div className="relative w-full overflow-hidden rounded-2xl shadow-sm">
          {/* Tỉ lệ khung hình 16:7 (tương đối từ bản mẫu) hoặc responsive padding */}
          <div className="pt-[43.75%] relative bg-gray-100">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="https://learnwithcap.com/wp-content/uploads/2025/10/0701.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </div>
        </div>
      </div>
    </section>
  );
}