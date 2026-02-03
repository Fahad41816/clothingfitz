"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageSlider } from "@/components/imageSlider/ImagesSlider";
import { ProductInfo } from "./Product-info";
import { OrderSteps } from "@/components/OrderStep/OrderSteps";
import { Button } from "@/components/ui/button";
import { ProductDescription } from "./ProductDescription";
import { ProductReviews } from "./ProductReview";

export default function ProductPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [currentDisplayColor, setCurrentDisplayColor] = useState<string>("");
  const [quantities, setQuantities] = useState<
    Record<string, Record<string, number>>
  >({});
  const [printLocations, setPrintLocations] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>(
    {}
  );

  const getTotalQuantity = () => {
    let total = 0;
    Object.values(quantities).forEach((colorQty) => {
      Object.values(colorQty).forEach((qty) => {
        total += qty;
      });
    });
    return total;
  };

  const minQuantity = selectedPackage || 1;
  const totalQty = getTotalQuantity();

  const canProceedToStep2 =
    selectedPackage !== null && selectedColors.length > 0;
  const canProceedToStep3 = totalQty >= minQuantity;
  const canProceedToStep4 =
    printLocations.length > 0 &&
    printLocations.every((loc) => uploadedImages[loc]);

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
                `https://bangladeshbiponee.com/wp-content/uploads/2022/09/Half-sleve-t-shirt-14.webp`,
                `https://rlv.zcache.ca/my_brothers_girlfriend_is_the_best_t_shirt-r7d20520df1c844b89db46c33ea92b57e_k218r_644.jpg`,
                `https://bangladeshbiponee.com/wp-content/uploads/2022/09/Half-sleve-t-shirt-14.webp`,
                "https://shop.captaintoms.co.jp/cdn/shop/products/000000-2_000000003602.jpg?v=1627716534",
              ]}
              selectedColors={selectedColors}
              currentColor={currentDisplayColor}
            />

            <ProductDescription />
          </motion.div>

          {/* Right Column - Product Info & Order Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <ProductInfo
              name={"Gildan HeavyCotton 5.3oz. T-Shirt"}
              Price={{
                discountPrice: 12.5,
                orginalPrice: 16.5,
              }}
            />

            <OrderSteps
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              quantities={quantities}
              setQuantities={setQuantities}
              printLocations={printLocations}
              setPrintLocations={setPrintLocations}
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
              minQuantity={minQuantity}
              totalQty={totalQty}
              onColorChange={setCurrentDisplayColor}
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
          <ProductReviews />
        </motion.div>
      </div>
    </div>
  );
}
