/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Package, Palette, Ruler, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StepFourProps {
  selectedPackage: number | null;
  selectedColors: string[];
  quantities: Record<string, Record<string, number>>;
  printLocations: string[]; // Changed from printLocation (string) to printLocations (array)
  uploadedImages: Record<string, string>; // Changed from uploadedImage (string) to uploadedImages (Record)
  totalQty: number; // Added totalQty prop
  onBack?: () => void;
}

export function StepFour({
  selectedPackage,
  selectedColors,
  quantities,
  printLocations,
  uploadedImages,
  totalQty,
  onBack,
}: StepFourProps) {
  const pricePerUnit = 12.5;
  const totalPrice = totalQty * pricePerUnit;

  console.log(selectedColors);
  console.log(quantities);

  const handleAddToCart = () => {
    // Add to cart logic here
    alert("Added to cart!");
  };

  const formatLocationName = (location: string) => {
    return location.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Step 4: Review Your Order</h3>
        <p className="text-sm text-muted-foreground">
          Review your selections before adding to cart
        </p>
      </div>

      {/* Order Summary Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Package</h4>
              <p className="text-sm text-muted-foreground">
                {selectedPackage
                  ? `${selectedPackage} Pieces Package`
                  : "No Minimum"}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Palette className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Colors</h4>
              <p className="text-sm text-muted-foreground">
                {selectedColors.length} color
                {selectedColors.length !== 1 ? "s" : ""} selected
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Ruler className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Total Quantity</h4>
              <p className="text-sm text-muted-foreground">{totalQty} pieces</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ImageIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Print Locations</h4>
              <p className="text-sm text-muted-foreground">
                {printLocations.length > 0
                  ? printLocations
                      .map((loc) => formatLocationName(loc))
                      .join(", ")
                  : "No locations selected"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card className="p-4">
        <h4 className="font-semibold mb-4">Quantity Breakdown</h4>
        <div className="space-y-3">
          {selectedColors.map((color: any) => {
            const colorQty = quantities[color.name] || {};
            const colorTotal = Object.values(colorQty).reduce(
              (sum, qty) => sum + qty,
              0
            );
            if (colorTotal === 0) return null;

            return (
              <div key={color.name} className="pb-3 border-b last:border-b-0">
                <p className="font-medium mb-2 capitalize">{color.name}</p>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  {Object.entries(colorQty).map(([size, qty]) => {
                    if (qty === 0) return null;
                    return (
                      <div key={size} className="flex justify-between">
                        <span className="text-muted-foreground">{size}:</span>
                        <span className="font-medium">{qty}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {Object.keys(uploadedImages).length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold mb-3">Your Designs</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(uploadedImages).map(([location, image]) => (
              <div key={location} className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  {formatLocationName(location)}
                </p>
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${formatLocationName(location)} design`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Price Summary */}
      <motion.div
        className="p-6 bg-primary/5 border-2 border-primary rounded-lg"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Unit Price:</span>
            <span className="font-medium">${pricePerUnit.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Quantity:</span>
            <span className="font-medium">{totalQty} pieces</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-3xl font-bold text-primary">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {onBack && (
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={onBack}
          >
            Back
          </Button>
        )}
        <Button className="flex-1" size="lg" onClick={handleAddToCart}>
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
