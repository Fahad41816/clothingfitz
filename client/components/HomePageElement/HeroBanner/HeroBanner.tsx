"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Custom Hats Made Perfect",
    subtitle: "Design your unique style",
    description:
      "From baseball caps to beanies, create custom headwear that represents your brand with premium quality materials.",
    image:
      "https://cdn.shopify.com/s/files/1/1616/9825/files/Flat_BBCanvasDecadeOne_45angle_Web.png?v=1751992437&width=500&crop=center",
    cta: "Design Your Hat",
    bgColor: "from-blue-50 via-blue-100 to-cyan-50",
    accent: "from-blue-500 to-cyan-500",
    products: [
      {
        name: "Baseball Cap",
        image:
          "https://cdn.shopify.com/s/files/1/1616/9825/files/100_Heather_45angle_FR_WEB_7833be47-378f-48f0-a49d-6a75b63e0c4c.png?v=1723233993&width=500&crop=center",
        link: "/hats/baseball",
      },
      {
        name: "Trucker Hat",
        image:
          "https://cdn.shopify.com/s/files/1/1616/9825/files/trucker_1baabd3f-6d18-4c0d-a1e7-1a5f92b6d220.png?v=1723641227&width=500&crop=center",
        link: "/hats/trucker",
      },
      {
        name: "Beanie",
        image:
          "https://cdn.shopify.com/s/files/1/1616/9825/files/Visual_Tile.png?v=1749664176&width=500&crop=center",
        link: "/hats/beanie",
      },
    ],
  },
  {
    id: 2,
    title: "Premium T-Shirt Printing",
    subtitle: "Comfort meets creativity",
    description:
      "High-quality cotton tees with vibrant, long-lasting prints. Perfect for events, teams, or personal expression.",
    image:
      "https://i.ibb.co.com/673c4zTn/d5dbe4c3-ac9f-4f68-a4a5-13403c1a0c80.png",
    cta: "Create T-Shirt",
    bgColor: "from-slate-50 via-gray-100 to-slate-50",
    accent: "from-slate-600 to-gray-700",
    products: [
      {
        name: "Basic Tee",
        image: "https://i.ibb.co.com/FbYcYJZK/ys58-unt2-210608.jpg",
        link: "/tshirts/basic",
      },
      {
        name: "Premium Cotton",
        image: "https://i.ibb.co.com/gFvPDZZK/b09f-kovj-210608.jpg",
        link: "/tshirts/premium",
      },
      {
        name: "Long Sleeve",
        image:
          "https://shop.adarbepari.com/wp-content/uploads/2021/04/bangladesh-flag71-map-tshirt.jpg",
        link: "/tshirts/longsleeve",
      },
    ],
  },
  {
    id: 3,
    title: "Professional Polo Shirts",
    subtitle: "Business casual perfection",
    description:
      "Elevate your professional wardrobe with custom embroidered polo shirts. Ideal for corporate events and uniforms.",
    image:
      "https://i.ibb.co.com/1GDNvVjh/4158f568-54b1-40ea-a4fe-7d5fe3d585d9.png",
    cta: "Order Polos",
    bgColor: "from-emerald-50 via-green-100 to-teal-50",
    accent: "from-emerald-500 to-teal-500",
    products: [
      {
        name: "Classic Polo",
        image:
          "data:image/jpeg;base64,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",
        link: "/polo/classic",
      },
      {
        name: "Performance",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb3_TCbrCNcafu7sMAKcow0utIQ9FG_oh0Uw&s",
        link: "/polo/performance",
      },
      {
        name: "Long Sleeve",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-sm5tayT_wmZl4vFNcW72ZjqatsnYcpIR_Q&s",
        link: "/polo/longsleeve",
      },
    ],
  },
  {
    id: 4,
    title: "Hoodies & Sweatshirts",
    subtitle: "Cozy custom comfort",
    description:
      "Stay warm in style with our premium hoodies and sweatshirts. Perfect for teams, events, or everyday wear.",
    image:
      "https://i.ibb.co.com/5hpr9kt3/a48fd025-7d38-4e73-80a7-01e41cb6c086.png",
    cta: "Design Hoodie",
    bgColor: "from-purple-50 via-indigo-100 to-blue-50",
    accent: "from-purple-500 to-indigo-500",
    products: [
      {
        name: "Pullover Hoodie",
        image:
          "https://i.ibb.co.com/nNqfNxvh/man-wearing-hoodie-with-hoodie-it.jpg",
        link: "/hoodies/pullover",
      },
      {
        name: "Zip Hoodie",
        image:
          "https://i.ibb.co.com/n8mYtbBB/236d2355-ef94-45ae-b51b-8d4cfb1cdbf5.jpg",
        link: "/hoodies/zip",
      },
      {
        name: "Sweatshirt",
        image:
          "https://i.ibb.co.com/n8mYtbBB/236d2355-ef94-45ae-b51b-8d4cfb1cdbf5.jpg",
        link: "/hoodies/sweatshirt",
      },
    ],
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgColor}`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg rotate-45 blur-lg"
            />
            <motion.div
              animate={{
                rotate: [0, -360],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute top-1/2 left-10 w-16 h-16 border-2 border-primary/30 rounded-full"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
            <div className="flex items-center justify-between h-full">
              <div className="flex-1 max-w-2xl">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <p
                      className={`bg-gradient-to-r ${slides[currentSlide].accent} bg-clip-text text-transparent font-semibold`}
                    >
                      {slides[currentSlide].subtitle}
                    </p>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
                    {slides[currentSlide].title}
                  </h1>

                  <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
                    {slides[currentSlide].description}
                  </p>

                  <Button
                    size="lg"
                    className={`text-lg px-8 py-6 bg-gradient-to-r ${slides[currentSlide].accent} hover:shadow-xl hover:scale-105 transition-all duration-300 text-white`}
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    {slides[currentSlide].cta}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>

                  <div className="flex items-center gap-4 mt-8">
                    {/* <span className="text-sm text-muted-foreground">Quick access:</span> */}
                    {slides[currentSlide].products.map((product, index) => (
                      <motion.a
                        key={index}
                        href={product.link}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="group flex flex-col items-center p-2 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={20}
                          height={20}
                          className="w-12 h-12 object-cover rounded-lg mb-1 group-hover:scale-110 transition-transform"
                        />
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                          {product.name}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="flex-1 flex justify-center items-center">
                <motion.div
                  initial={{ x: 50, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    <Image
                      src={slides[currentSlide].image || "/placeholder.svg"}
                      alt={slides[currentSlide].title}
                      width={500}
                      priority={true} 
                      height={500}
                      className="object-contain drop-shadow-2xl"
                    />

                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                    >
                      <Star className="h-4 w-4 text-white" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-primary/30"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}