/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Upload, Check, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface StepThreeProps {
  printLocations: string[];
  setPrintLocations: (locations: string[]) => void;
  uploadedImages: Record<string, string>;
  setUploadedImages: (images: Record<string, string>) => void;
}

const printLocationOptions = [
  {
    id: "front-full",
    label: "Front Full Print",
    image: "/t-shirt-front-full-print-area.jpg",
  },
  {
    id: "front-chest",
    label: "Front Chest Print",
    image: "/t-shirt-front-chest-print-area.jpg",
  },
  {
    id: "back-full",
    label: "Back Full Print",
    image: "/t-shirt-back-full-print-area.jpg",
  },
  {
    id: "Left sleeve",
    label: "Left Sleeve Print",
    image: "/t-shirt-sleeve-print-area.jpg",
  },
  {
    id: "Right sleeve",
    label: "Right Sleeve Print",
    image: "/t-shirt-sleeve-print-area.jpg",
  },
];

export function StepThree({
  printLocations,
  setPrintLocations,
  uploadedImages,
  setUploadedImages,
}: StepThreeProps) {
  const [dragActive, setDragActive] = useState<string | null>(null);

  const togglePrintLocation = (locationId: string) => {
    // Check for conflicts
    const hasFrontFull = printLocations.includes("front-full");
    const hasFrontChest = printLocations.includes("front-chest");

    // Prevent selecting both front-full and front-chest
    if (locationId === "front-full" && hasFrontChest) {
      return; // Cannot select front-full when front-chest is selected
    }
    if (locationId === "front-chest" && hasFrontFull) {
      return; // Cannot select front-chest when front-full is selected
    }

    if (printLocations.includes(locationId)) {
      setPrintLocations(printLocations.filter((loc) => loc !== locationId));
      const newImages = { ...uploadedImages };
      delete newImages[locationId];
      setUploadedImages(newImages);
    } else {
      setPrintLocations([...printLocations, locationId]);
    }
  };

  const handleFileUpload = (file: File, locationId: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImages({
        ...uploadedImages,
        [locationId]: e.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent, locationId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(locationId);
    } else if (e.type === "dragleave") {
      setDragActive(null);
    }
  };

  const handleDrop = (e: React.DragEvent, locationId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], locationId);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-1">
          Print Location & Design Upload
        </h3>
        <p className="text-sm text-muted-foreground">
          Select print locations and upload designs for each
        </p>
      </div>

      <div className="space-y-4">
        {printLocationOptions.map((location) => {
          const isSelected = printLocations.includes(location.id);
          const hasImage = uploadedImages[location.id];

          const hasFrontFull = printLocations.includes("front-full");
          const hasFrontChest = printLocations.includes("front-chest");
          const isDisabled =
            (location.id === "front-full" && hasFrontChest) ||
            (location.id === "front-chest" && hasFrontFull);

          return (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`border-2 rounded-xl overflow-hidden transition-all ${
                isSelected
                  ? "border-primary shadow-lg"
                  : isDisabled
                  ? "border-border opacity-50"
                  : "border-border"
              }`}
            >
              {/* Location Header */}
              <button
                onClick={() => !isDisabled && togglePrintLocation(location.id)}
                disabled={isDisabled}
                className={`w-full flex items-center gap-4 p-4 transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-primary/20 to-primary/10"
                    : isDisabled
                    ? "bg-muted/20 cursor-not-allowed"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-primary border-primary"
                      : isDisabled
                      ? "border-muted bg-muted"
                      : "border-border"
                  }`}
                >
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>
                <img
                  src={location.image || "/placeholder.svg"}
                  alt={location.label}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1 text-left">
                  <p
                    className={`font-bold text-sm ${
                      isDisabled ? "text-muted-foreground" : ""
                    }`}
                  >
                    {location.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isDisabled
                      ? "Cannot combine with other front print"
                      : hasImage
                      ? "Design uploaded ✓"
                      : "No design uploaded"}
                  </p>
                </div>
                {isDisabled && (
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {/* Upload Area (shown when selected) */}
              {isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t-2 border-border bg-card"
                >
                  <div className="p-4">
                    <motion.div
                      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                        dragActive === location.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      onDragEnter={(e) => handleDrag(e, location.id)}
                      onDragLeave={(e) => handleDrag(e, location.id)}
                      onDragOver={(e) => handleDrag(e, location.id)}
                      onDrop={(e) => handleDrop(e, location.id)}
                    >
                      {hasImage ? (
                        <div className="space-y-3 flex flex-col items-center justify-center">
                          <div className="relative inline-block">
                            <img
                              src={
                                uploadedImages[location.id] ||
                                "/placeholder.svg"
                              }
                              alt="Uploaded design"
                              className="max-h-42 mx-auto rounded-lg border-2 border-primary"
                            />
                            <button
                              onClick={() => {
                                const newImages = { ...uploadedImages };
                                delete newImages[location.id];
                                setUploadedImages(newImages);
                              }}
                              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:scale-110 transition-transform"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const input = document.createElement("input");
                              input.type = "file";
                              input.accept = "image/*";
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement)
                                  .files?.[0];
                                if (file) handleFileUpload(file, location.id);
                              };
                              input.click();
                            }}
                          >
                            Change Image
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                          <p className="text-sm font-semibold mb-2">
                            Drag & drop design here
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            or
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const input = document.createElement("input");
                              input.type = "file";
                              input.accept = "image/*";
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement)
                                  .files?.[0];
                                if (file) handleFileUpload(file, location.id);
                              };
                              input.click();
                            }}
                          >
                            Browse Files
                          </Button>
                          <p className="text-xs text-muted-foreground mt-3">
                            PNG, JPG, SVG (Max 10MB)
                          </p>
                        </>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Copyright Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-3 bg-accent/10 border-2 border-accent/30 rounded-lg"
      >
        <p className="text-xs font-semibold text-accent-foreground">
          ⚠️ I confirm that this artwork does not violate any copyright laws.
        </p>
      </motion.div>
    </div>
  );
}
