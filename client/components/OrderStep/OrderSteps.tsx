"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StepOne } from "../Steps/Step-1";
import { StepTwo } from "../Steps/Steps-two";
import { StepThree } from "../Steps/Steps.three";
import { StepFour } from "../Steps/Steps.four";

interface OrderStepsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  selectedPackage: number | null;
  setSelectedPackage: (pkg: number | null) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  quantities: Record<string, Record<string, number>>;
  setQuantities: (quantities: Record<string, Record<string, number>>) => void;
  printLocations: string[];
  setPrintLocations: (locations: string[]) => void;
  uploadedImages: Record<string, string>;
  setUploadedImages: (images: Record<string, string>) => void;
  minQuantity: number;
  totalQty: number;
  onColorChange?: (color: string) => void;
}

const steps = [
  {
    number: 1,
    title: "Package & Colors",
    description: "Choose your package and colors",
  },
  {
    number: 2,
    title: "Size & Quantity",
    description: "Select sizes and quantities",
  },
  {
    number: 3,
    title: "Print Design",
    description: "Choose print location & upload",
  },
  { number: 4, title: "Review & Cart", description: "Review and add to cart" },
];

export function OrderSteps({
  currentStep, 
  selectedPackage,
  setSelectedPackage,
  selectedColors,
  setSelectedColors,
  quantities,
  setQuantities,
  printLocations,
  setPrintLocations,
  uploadedImages,
  setUploadedImages,
  minQuantity,
  totalQty,
  onColorChange,
}: OrderStepsProps) {
  return (
    <Card className="p-4 shadow-xl border-2">
      <div className="mb-8">
        <div className="flex items-start justify-between mb-2">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center ">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    currentStep > step.number
                      ? "bg-gradient-to-tr from-[#74b9ff] to-[#0984e3] text-primary-foreground"
                      : currentStep === step.number
                      ? "bg-gradient-to-tr from-[#74b9ff] to-[#0984e3] text-primary-foreground  ring-4 ring-[#0984e3]/50 shadow-xl scale-110"
                      : "bg-muted text-muted-foreground"
                  }`}
                  animate={{
                    scale: currentStep === step.number ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {currentStep > step.number ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    step.number
                  )}
                </motion.div>
                <div className="text-center mt-2">
                  <p
                    className={`text-xs font-semibold ${
                      currentStep === step.number ? "text-primary" : ""
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <motion.div
                  className={`h-1 flex-1 mx-2 rounded-full transition-all ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: currentStep > step.number ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <StepOne
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              onColorChange={onColorChange}
            />
          )}
          {currentStep === 2 && (
            <StepTwo
              selectedPackage={selectedPackage}
              selectedColors={selectedColors}
              quantities={quantities}
              setQuantities={setQuantities}
              minQuantity={minQuantity}
              totalQty={totalQty}
            />
          )}
          {currentStep === 3 && (
            <StepThree
              printLocations={printLocations}
              setPrintLocations={setPrintLocations}
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
            />
          )}
          {currentStep === 4 && (
            <StepFour
              selectedPackage={selectedPackage}
              selectedColors={selectedColors}
              quantities={quantities}
              printLocations={printLocations}
              uploadedImages={uploadedImages}
              totalQty={totalQty}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}
