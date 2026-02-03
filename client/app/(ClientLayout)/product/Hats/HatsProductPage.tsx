/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ProductDescription } from "../tShirt/ProductDescription";
import { ImageSlider } from "@/components/imageSlider/ImagesSlider";
import { motion } from "framer-motion";
import { ProductInfo } from "../tShirt/Product-info";
import { OrderSteps } from "@/components/OrderStep/OrderSteps";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { ProductReviews } from "../tShirt/ProductReview";
import { useState } from "react";
import HatsOrderStep from "@/components/HatsProductPageCom/HatsOrderStep";

const HatsProductPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [currentDisplayColor, setCurrentDisplayColor] = useState<string>("");
  const [EmbroderyOption, setEmbroderyOption] = useState("");
  const [TreadColors, setTreadColors] = useState([]);
  const [stitching, setStitching] = useState("");
  const [additionalNote, setadditionalNote] = useState("");
  const [quantities, setQuantities] = useState({});
  const [printLocations, setPrintLocations] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>(
    {}
  );

  const [artwork, setArtwork] = useState<{
    file: File;
    name: string;
    size: string;
    format: string;
  } | null>(null);
  const [embroideryType, setEmbroideryType] = useState("standard");
  const [location, setLocation] = useState("center-front");
  const [threadColors, setThreadColors] = useState<string[]>(["#000000"]);
  const [stitchingOptions, setStitchingOptions] = useState<string[]>([]); // changed from single option to array
  const [stitchingArtwork, setStitchingArtwork] = useState({}); // changed to object

  // All Console Here
  console.log("quantities", quantities);
  console.log("Colors", selectedColors);
  console.log("Package", selectedPackage);

  const getTotalQuantity = () => {
    const totalQuantity = Object.values(quantities).reduce(
      (sum: any, q: any) => sum + q,
      0
    );
    return totalQuantity;
  };

  const minQuantity = selectedPackage || 1;
  const totalQty: any = getTotalQuantity();
  console.log(totalQty);
  const canProceedToStep2 =
    selectedPackage !== null && selectedColors.length > 0;
  const canProceedToStep3 = totalQty >= minQuantity;
  const canProceedToStep4 =
    artwork &&
    embroideryType &&
    location &&
    threadColors.length >= 0 &&
    stitchingOptions.length >= 0 &&
    stitchingArtwork;

  const handleNext = () => {
    if (currentStep === 1 && canProceedToStep2) setCurrentStep(2);
    else if (currentStep === 2 && canProceedToStep3) setCurrentStep(3);
    else if (currentStep === 3 && canProceedToStep4) setCurrentStep(4);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleAddToCart = () => {
    console.log("[v0] Adding to cart:", {
      package: selectedPackage,
      colors: selectedColors,
      quantities,
      printLocations,
      uploadedImages,
    });
  };

  const productColors = [
    {
      name: "Cerulean Blue",
      hex: "#2A52BE",
      rgb: "rgb(42, 82, 190)",
    },
    {
      name: "Classic Red",
      hex: "#B22222",
      rgb: "rgb(178, 34, 34)",
    },
    {
      name: "Forest Green",
      hex: "#228B22",
      rgb: "rgb(34, 139, 34)",
    },
    {
      name: "Sunburst Orange",
      hex: "#FF8C00",
      rgb: "rgb(255, 140, 0)",
    },
    {
      name: "Graphite Gray",
      hex: "#36454F",
      rgb: "rgb(54, 69, 79)",
    },
    {
      name: "Cream Beige",
      hex: "#F5F5DC",
      rgb: "rgb(245, 245, 220)",
    },
    {
      name: "Deep Purple",
      hex: "#4B0082",
      rgb: "rgb(75, 0, 130)",
    },
    {
      name: "Rose Gold",
      hex: "#B76E79", // A popular approximate hex for Rose Gold
      rgb: "rgb(183, 110, 121)",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 mb-8">
          {/* Left Column - Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImageSlider
              SliderImages={[
                `https://cdn.shopify.com/s/files/1/1616/9825/files/545_BlackWhite_45angle_Web_d9b49f7c-fcb5-41b9-8911-eea1ecbf836e.png?v=1762273477&width=700&height=700&crop=center`,
                `https://cdn.shopify.com/s/files/1/1616/9825/files/545_WhiteBlack_Back_WEB_10cb1d75-9982-4f0f-8545-ded1f7c475d5.png?v=1752785426&width=700&height=700&crop=center`,
                `https://cdn.shopify.com/s/files/1/1616/9825/files/545_BlackWhite_Front_Web.png?v=1752785426&width=700&height=700&crop=center`,
                "https://cdn.shopify.com/s/files/1/1616/9825/files/545_BlackWhite_Snap_Web.jpg?v=1752785426&width=700&height=700&crop=center",
              ]}
              selectedColors={selectedColors}
              currentColor={currentDisplayColor}
            />
          </motion.div>

          {/* Right Column - Product Info & Order Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <ProductInfo
              name={"Streetfitz - Snapback Trucker Hat"}
              Price={{
                discountPrice: 12.5,
                orginalPrice: 16.5,
              }}
            />

            {/* hats steps here  */}
            <HatsOrderStep
              setSelectedPackage={setSelectedPackage}
              selectedPackage={selectedPackage}
              setSelectedColors={setSelectedColors}
              selectedColors={selectedColors}
              PDTColors={productColors}
              currentStep={currentStep}
              quantities={quantities}
              setQuantities={setQuantities}
              minQty={minQuantity}
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
            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !canProceedToStep2) ||
                    (currentStep === 2 && !canProceedToStep3) ||
                    (currentStep === 3 && !canProceedToStep4)
                  }
                  className="flex-1"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleAddToCart} className="flex-1" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - {totalQty} pieces
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Description & Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-8"
        >
          <ProductDescription />
          <ProductReviews />
        </motion.div>
      </div>
    </div>
  );
};

export default HatsProductPage;
