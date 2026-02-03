/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SizeGuideModal } from "@/app/(ClientLayout)/product/tShirt/SizeGuideModal";

interface StepTwoProps {
  selectedPackage: number | null;
  selectedColors: string[];
  quantities: Record<string, Record<string, number>>;
  setQuantities: (quantities: Record<string, Record<string, number>>) => void;
  minQuantity: number;
  totalQty: number;
}

const sizes = [
  { name: "XS", price: 0 },
  { name: "S", price: 0 },
  { name: "L", price: 0 },
  { name: "XL", price: 0 },
  { name: "2XL", price: 2.5 },
  { name: "3XL", price: 3.5 },
  { name: "4XL", price: 4.5 },
  { name: "5XL", price: 5.5 },
];

export function StepTwo({
  selectedPackage,
  selectedColors,
  quantities,
  setQuantities,
  minQuantity,
  totalQty,
}: StepTwoProps) {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const updateQuantity = (color: any, size: string, value: string) => {
    console.log(color, size, value);
    const newQuantities = { ...quantities };
    if (!newQuantities[color.name]) newQuantities[color.name] = {};
    const qty = Number.parseInt(value) || 0;
    newQuantities[color.name][size] = Math.max(0, qty);
    setQuantities(newQuantities);
  };

  const canProceed = totalQty >= minQuantity;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold mb-1">Select Size & Quantity</h3>
          <p className="text-sm text-muted-foreground">
            Enter quantities for each size
            {selectedPackage && ` (Min: ${minQuantity} pieces)`}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSizeGuide(true)}
        >
          <Info className="h-4 w-4 mr-2" />
          Size Guide
        </Button>
      </div>

      <motion.div
        className={`p-5 rounded-xl ${
          canProceed
            ? "bg-gradient-to-r from-emerald-500/20 via-primary/20 to-blue-500/20 border-2 border-primary shadow-xl"
            : "bg-gradient-to-r from-red-500/20 via-destructive/20 to-orange-500/20 border-2 border-destructive shadow-xl"
        }`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">Total Quantity:</span>
          <motion.span
            className="text-4xl font-black"
            key={totalQty}
            initial={{ scale: 1.5, color: canProceed ? "#10b981" : "#ef4444" }}
            animate={{ scale: 1, color: "inherit" }}
            transition={{ duration: 0.3 }}
          >
            {totalQty}
          </motion.span>
        </div>
        {!canProceed && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-destructive mt-2 font-semibold"
          >
            Need {minQuantity - totalQty} more pieces to meet minimum
          </motion.p>
        )}
      </motion.div>

      <div className="space-y-6">
        {selectedColors.map((color: any, idx: number) => (
          <motion.div
            key={color.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="border-2 border-primary/30 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <div className="flex  items-center justify-start gap-2 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 px-4 py-3 border-b-2 border-primary/30">
              <div className="md:w-16 flex-shrink-0">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary/20 shadow-md">
                  <img
                    src={`/${color.name.toLowerCase()}-t-shirt-front-view.jpg`}
                    alt={`${color.name} T-Shirt`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="font-bold text-base">{color.name}</h4>
            </div>
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-card">
              <div className="flex-1 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-primary/20">
                      {sizes.map((size) => (
                        <th
                          key={size.name}
                          className="px-2 py-2 text-center text-sm font-bold"
                        >
                          {size.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {sizes.map((size) => (
                        <td key={size.name} className="px-0.5 py-3">
                          <Input
                            type="text"
                            min="0"
                            placeholder="Qty"
                            value={quantities[color.name]?.[size.name] || ""}
                            onChange={(e) =>
                              updateQuantity(color, size.name, e.target.value)
                            }
                            className="text-center h-12 font-bold text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/30 transition-all"
                          />
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t-2 bg-gradient-to-r from-primary/10 to-primary/5">
                      {sizes.map((size) => (
                        <td
                          key={size.name}
                          className="px-2 py-2 text-center text-sm font-bold text-primary"
                        >
                          +${size.price.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <SizeGuideModal
        open={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />
    </div>
  );
}
