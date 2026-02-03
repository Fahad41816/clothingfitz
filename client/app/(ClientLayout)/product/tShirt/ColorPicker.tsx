/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorPickerModalProps {
  open: boolean;
  onClose: () => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
}

const allColors = [
  { name: "Black", hex: "#000000", rgb: "rgb(34, 139, 34)" },
  { name: "White", hex: "#FFFFFF", rgb: "rgb(34, 139, 34)" },
  { name: "Navy", hex: "#1E3A8A", rgb: "rgb(34, 139, 34)" },
  { name: "Red", hex: "#DC2626", rgb: "rgb(34, 139, 34)" },
  { name: "Yellow", hex: "#EAB308", rgb: "rgb(34, 139, 34)" },
  { name: "Green", hex: "#16A34A", rgb: "rgb(34, 139, 34)" },
  { name: "Blue", hex: "#3B82F6", rgb: "rgb(34, 139, 34)" },
  { name: "Purple", hex: "#9333EA", rgb: "rgb(34, 139, 34)" },
  { name: "Pink", hex: "#EC4899", rgb: "rgb(34, 139, 34)" },
  { name: "Orange", hex: "#F97316", rgb: "rgb(34, 139, 34)" },
  { name: "Gray", hex: "#6B7280", rgb: "rgb(34, 139, 34)" },
  { name: "Brown", hex: "#92400E", rgb: "rgb(34, 139, 34)" },
  { name: "Teal", hex: "#14B8A6", rgb: "rgb(34, 139, 34)" },
  { name: "Indigo", hex: "#6366F1", rgb: "rgb(34, 139, 34)" },
  { name: "Lime", hex: "#84CC16", rgb: "rgb(34, 139, 34)" },
  { name: "Cyan", hex: "#06B6D4", rgb: "rgb(34, 139, 34)" },
];

export function ColorPickerModal({
  open,
  onClose,
  selectedColors,
  setSelectedColors,
}: ColorPickerModalProps) {
  const toggleColor = (color: any) => {
    if (selectedColors.some((C: any) => C.name == color.name)) {
      setSelectedColors(
        selectedColors.filter((c: any) => c.name !== color.name)
      );
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card rounded-2xl shadow-2xl z-50 p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Choose Colors</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-6">
              {allColors.map((color: any) => (
                <Tooltip key={color.name}>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => toggleColor(color)}
                      className={`relative aspect-square rounded-lg border-2 transition-all ${
                        selectedColors.some((C: any) => C.name == color.name)
                          ? "border-primary ring-4 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {selectedColors.some(
                        (C: any) => C.name == color.name
                      ) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center   rounded-lg"
                        >
                          <Check className="h-8 w-8 text-slate-300" />
                        </motion.div>
                      )}
                      <span className="sr-only">{color.name}</span>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{color.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {selectedColors.length} color
                {selectedColors.length !== 1 ? "s" : ""} selected
              </p>
              <Button onClick={onClose}>Done</Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
