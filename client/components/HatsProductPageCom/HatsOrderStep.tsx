/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import HatsStepsOne from "./HatsStepsOne";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Check } from "lucide-react";
import HatsStepTwo from "./HatsStepTwo";
import HatsStepThree from "./HatsStepThree";
import HatsStepFour from "./HatsStepFour";

const HatsOrderStep = ({
  setSelectedPackage,
  selectedPackage,
  setSelectedColors,
  selectedColors,
  PDTColors,
  currentStep,
  quantities,
  setQuantities,
  minQty,
  artwork,
  setArtwork,
  embroideryType,
  setEmbroideryType,
  location,
  setLocation,
  threadColors,
  setThreadColors,
  stitchingOptions,
  setStitchingOptions,
  stitchingArtwork,
  setStitchingArtwork,
  totalQty,
}: any) => {
  // this state use for user normally select color without open more selected color
  const [normalSelectedColor, setNormalSelectedColor] = useState({});

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
    {
      number: 4,
      title: "Review & Cart",
      description: "Review and add to cart",
    },
  ];

  return (
    <Card className="border shadow-xl p-2">
      <div className="mb-8">
        <div className="flex items-start justify-between mt-2">
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

      {currentStep == 1 && (
        <HatsStepsOne
          setSelectedPackage={setSelectedPackage}
          selectedPackage={selectedPackage}
          setSelectedColors={setSelectedColors}
          SelectedColors={selectedColors}
          PDTColors={PDTColors}
          setNormalSelectedColor={setNormalSelectedColor}
          normalSelectedColor={normalSelectedColor}
        />
      )}

      {currentStep == 2 && (
        <HatsStepTwo
          SelectedColors={selectedColors}
          quantities={quantities}
          setQuantities={setQuantities}
          minQty={minQty}
        />
      )}
      {currentStep == 3 && (
        <HatsStepThree
          quantities={quantities}
          artwork={artwork}
          setArtwork={setArtwork}
          embroideryType={embroideryType}
          setEmbroideryType={setEmbroideryType}
          location={location}
          setLocation={setLocation}
          threadColors={threadColors}
          setThreadColors={setThreadColors}
          stitchingOptions={stitchingOptions}
          setStitchingOptions={setStitchingOptions}
          stitchingArtwork={stitchingArtwork}
          setStitchingArtwork={setStitchingArtwork}
          totalQty={totalQty}
        />
      )}
      {currentStep == 4 && (
        <HatsStepFour
          totalQty={totalQty}
          selectedPackage={selectedPackage}
          selectedColors={selectedColors}
          artwork={artwork}
          embroideryType={embroideryType}
          embroideryLocation={location}
          stitchingArtwork={stitchingArtwork}
        />
      )}
    </Card>
  );
};

export default HatsOrderStep;
