/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ColorPickerModal } from "@/app/(ClientLayout)/product/tShirt/ColorPicker";

const HatsStepsOne = ({
  setSelectedPackage,
  selectedPackage,
  setSelectedColors,
  SelectedColors,
  PDTColors,
  setNormalSelectedColor,
  normalSelectedColor,
}: any) => {
  const [showColorModal, setShowColorModal] = useState(false);

  const packages = [
    { id: 1, label: "No Minimum", minQty: 1, popular: false },
    { id: 10, label: "10 Pieces", minQty: 10, popular: false },
    { id: 24, label: "24 Pieces", minQty: 24, popular: false },
    { id: 50, label: "50 Pieces", minQty: 50, popular: true },
    { id: 100, label: "100 Pieces", minQty: 100, popular: false },
  ];

  const handleSelecteColor = (Color: any) => {
    console.log(Color);
    // 1. Check if the color is ALREADY SELECTED (Toggling logic)
    if (SelectedColors.some((C: any) => C.name == Color.name)) {
      // 2. If it is selected, REMOVE it (Deselect)
      // setSelectedColors((PrevData) =>
      //   PrevData.filter((ColorData) => ColorData !== ColorName)
      // );
      return;
    } else {
      setSelectedColors((PrevData: any) => [
        ...PrevData.filter(
          (ColorData: any) => ColorData.name !== normalSelectedColor.name
        ),
        Color,
      ]);
    }

    // OPTIONAL: Update a separate 'currently active' color state
    // If you need to keep track of the *last clicked* color, you can still
    // set normalSelectedColor here, but it no longer controls the main array logic.
    setNormalSelectedColor(Color);
  };

  return (
    <section>
      {/* pakage option here  */}
      <div>
        <label className="text-sm font-semibold mb-2 block">
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

      {/* Color Option Here  */}
      <div className="mt-2">
        <label className="text-sm font-semibold mb-2 block">
          Select Colors
        </label>

        <div className="grid grid-cols-8 gap-2">
          {PDTColors.map((color: any) => (
            <Tooltip key={color.hex}>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => handleSelecteColor(color)}
                  className={`relative w-16 h-16 rounded-lg border-2 transition-all ${
                    SelectedColors.some((C: any) => C.name == color.name)
                      ? "border-primary ring-4 ring-primary/20 shadow-lg scale-110"
                      : "border-border hover:border-primary/50"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {SelectedColors.some((C: any) => C.name == color.name) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg"
                    >
                      <Check className="h-6 w-6 text-white drop-shadow-lg" />
                    </motion.div>
                  )}
                  <span className="sr-only"></span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>{color.name}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full hover:bg-gradient-to-tl from-blue-600 via-blue-300 to-blue-400 mt-4"
          onClick={() => setShowColorModal(true)}
        >
          Choice More Color +{" "}
        </Button>
      </div>

      {SelectedColors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-4 bg-primary/5 border-2 border-primary/20 rounded-lg mt-2"
        >
          <p className="text-sm font-semibold mb-2">
            Selected Colors ({SelectedColors.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {SelectedColors.map((color: any) => (
              <span
                key={color.hex}
                className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium"
              >
                {color.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      <ColorPickerModal
        onClose={() => setShowColorModal(false)}
        open={showColorModal}
        selectedColors={SelectedColors}
        setSelectedColors={setSelectedColors}
      ></ColorPickerModal>
    </section>
  );
};

export default HatsStepsOne;
