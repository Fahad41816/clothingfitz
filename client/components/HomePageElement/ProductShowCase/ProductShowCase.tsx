/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion"; 
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  priceRange: string;
  images: string[];
  rating: number;
  reviews: number;
  colors: string[];
  tag?: string;
}

interface ProductShowcaseProps {
  title: string;
  products: Product[];
}

export function ProductShowcase({ title, products }: ProductShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedImages, setSelectedImages] = useState<{
    [key: number]: number;
  }>({});
  const itemsPerView = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= products.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerView < 0
        ? Math.max(0, products.length - itemsPerView)
        : prev - itemsPerView
    );
  };

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  const handleImageChange = (productId: number, imageIndex: number) => {
    setSelectedImages((prev) => ({ ...prev, [productId]: imageIndex }));
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground text-balance"
          >
            {title}
          </motion.h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary hover:to-primary/80 hover:text-primary-foreground transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary hover:to-primary/80 hover:text-primary-foreground transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 transition-all duration-500 transform hover:scale-105">
                <div className="relative aspect-square overflow-hidden">
                  {product.tag && (
                    <Badge className="absolute top-3 left-3 z-10 bg-black text-white text-xs px-3 py-1 font-medium">
                      {product.tag}
                    </Badge>
                  )}

                  <Image
                    fill
                    src={
                      product.images[selectedImages[product.id] || 0] ||
                      "/placeholder.svg"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {product.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {product.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            (selectedImages[product.id] || 0) === imgIndex
                              ? "bg-white scale-125"
                              : "bg-white/60 hover:bg-white/80"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageChange(product.id, imgIndex);
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* <AnimatePresence>
                    {hoveredProduct === product.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm"
                      >
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-xl border-0 px-6 py-2"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence> */}
                </div>

                <div className="p-2 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2 font-medium">
                      ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-3 text-base leading-tight hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  <div className="text-xl font-bold text-gray-900 mb-4">
                    {product.priceRange}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {product.colors.slice(0, 6).map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-5 h-5 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-125 transition-all duration-300 hover:shadow-lg"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 6 && (
                      <span className="text-sm text-gray-600 font-medium ml-1">
                        +{product.colors.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
