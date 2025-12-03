"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Tính toán hiển thị
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Tính toán phần trăm cuộn
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed top-1/2 -translate-y-1/2 right-6 z-50 flex flex-col items-center space-y-2 focus:outline-none transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5 text-cap-sky-blue" />
      <div className="relative h-16 w-0.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute bottom-0 w-full bg-cap-sky-blue transition-all duration-100 ease-out" 
          style={{ height: `${scrollProgress}%` }}
        ></div>
      </div>
    </button>
  );
}