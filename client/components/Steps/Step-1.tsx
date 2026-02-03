/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorPickerModal } from "@/app/(ClientLayout)/product/tShirt/ColorPicker";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface StepOneProps {
  selectedPackage: number | null;
  setSelectedPackage: (pkg: number | null) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  onColorChange?: (color: string) => void;
}

const packages = [
  { id: null, label: "No Minimum", minQty: 1, popular: false },
  { id: 10, label: "10 Pieces", minQty: 10, popular: false },
  { id: 24, label: "25 Pieces", minQty: 25, popular: false },
  { id: 50, label: "50 Pieces", minQty: 50, popular: true },
  { id: 100, label: "100 Pieces", minQty: 100, popular: false },
];

const quickColors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#1E3A8A" },
  { name: "Red", hex: "#DC2626" },
  { name: "Yellow", hex: "#EAB308" },
  { name: "Green", hex: "#16A34A" },
];

export function StepOne({
  selectedPackage,
  setSelectedPackage,
  selectedColors,
  setSelectedColors,
  onColorChange,
}: StepOneProps) {
  const [showColorModal, setShowColorModal] = useState(false);

  const selectColor = (colorName: string) => {
    console.log(colorName);
    console.log(selectedColors);
    setSelectedColors([colorName]);
    console.dir(selectedColors);
    onColorChange?.(colorName);
  };

  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter((c) => c !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Package Selection */}
      <div>
        <label className="text-sm font-semibold mb-3 block">
          Select Package
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {packages.map((pkg) => (
            <motion.button
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                selectedPackage === pkg.id
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border hover:border-primary/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {pkg.popular && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full font-semibold">
                  Popular
                </span>
              )}
              <div className="text-center">
                <p className="font-bold text-sm">{pkg.label}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Min: {pkg.minQty}
                </p>
              </div>
              {selectedPackage === pkg.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1"
                >
                  <Check className="h-3 w-3" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold mb-3 block">Select Color</label>
        <div className="flex flex-wrap gap-3">
          {quickColors.map((color: any) => (
            <Tooltip key={color.name}>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => selectColor(color)}
                  className={`relative w-16 h-16 rounded-lg border-2 transition-all ${
                    selectedColors.some((C: any) => C.name == color.name)
                      ? "border-primary ring-4 ring-primary/20 shadow-lg scale-110"
                      : "border-border hover:border-primary/50"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedColors.some((C: any) => C.name == color.name) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center   rounded-lg"
                    >
                      <Check className="h-6 w-6 text-slate-300 drop-shadow-lg" />
                    </motion.div>
                  )}
                  <span className="sr-only"></span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={() => setShowColorModal(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Choose More Colors
      </Button>

      {/* Selected Colors Display */}
      {selectedColors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-4 bg-primary/5 border-2 border-primary/20 rounded-lg"
        >
          <p className="text-sm font-semibold mb-2">
            Selected Colors ({selectedColors.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedColors.map((color: any) => (
              <span
                key={color.name}
                className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium"
              >
                {color.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      <ColorPickerModal
        open={showColorModal}
        onClose={() => setShowColorModal(false)}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
      />
    </div>
  );
}
