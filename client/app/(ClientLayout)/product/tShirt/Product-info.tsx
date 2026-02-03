/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Truck, Package, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProductInfo({ name, Price }: any) {
  const [reviewCount, setReviewCount] = useState(0);
  const targetReviews = 1247;

  // Animated counter for reviews
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetReviews / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetReviews) {
        setReviewCount(targetReviews);
        clearInterval(timer);
      } else {
        setReviewCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
          {name}
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
            ))}
          </div>
          <motion.span
            className="text-lg font-semibold text-muted-foreground"
            key={reviewCount}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            ({reviewCount.toLocaleString()} reviews)
          </motion.span>
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        <Badge variant="secondary" className="px-3 py-2 text-sm font-medium">
          <Truck size={20} className="h-4 w-4 mr-2" />
          Free shipping
        </Badge>
        <Badge variant="secondary" className="px-3 py-2 text-sm font-medium">
          <MapPin className="h-4 w-4 mr-2" />
          Free pickup available
        </Badge>
        <Badge variant="secondary" className="px-3 py-2 text-sm font-medium">
          <Package className="h-4 w-4 mr-2" />
          Bulk discounts available
        </Badge>
      </motion.div>

      {/* Price */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-4"
      >
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-primary">
            ${Price.discountPrice}
          </span>
          <span className="text-xl text-muted-foreground line-through">
            ${Price.orginalPrice}
          </span>
          <Badge variant="destructive" className="text-sm">
            30% OFF
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Price per unit (bulk pricing available)
        </p>
      </motion.div>
    </div>
  );
}
