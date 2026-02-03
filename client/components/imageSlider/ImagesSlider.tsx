/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ImageSlider({
  SliderImages,
  selectedColors,
  currentColor,
}: any) {
  console.log(SliderImages[0]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const displayColor = currentColor || selectedColors[0]?.name || "Yellow";

  useEffect(() => {
    setCurrentIndex(0);
  }, [displayColor]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SliderImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + SliderImages.length) % SliderImages.length
    );
  };

  return (
    <div className="relative rounded-2xl overflow-hidden  ">
      <div className="aspect-square relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${displayColor.hex}-${currentIndex}`}
            src={SliderImages[currentIndex]}
            alt={`${displayColor.name} T-Shirt view ${currentIndex + 1}`}
            className="w-full h-full object-cover bg-slate-200"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
          {displayColor.name}
        </div>

        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex gap-2 p-4 ">
        {SliderImages.map((img: string, idx: any) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all bg-slate-200 ${
              idx === currentIndex
                ? "border-primary scale-105"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={img || "/placeholder.svg"}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
