/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FileType, 
  LocateFixed,
  Package,
  Palette,
  Ruler,
  ShoppingCart,
  Volleyball,
} from "lucide-react";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const HatsStepFour = ({
  selectedPackage,
  selectedColors,
  totalQty,
  artwork,
  embroideryType,
  embroideryLocation,
  stitchingArtwork,
}: any) => {
  console.log("stitchingArtwork", stitchingArtwork);

  console.log(Object.keys(stitchingArtwork));

  return (
    <section>
      <div>
        <h3 className="text-xl font-bold mb-2">Step 1: Review Your Order</h3>
        <p className="text-sm text-muted-foreground">
          Review your selections before adding to cart
        </p>
      </div>

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

        <Card className="p-2 col-span-">
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
        <Card className="p-2">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Volleyball className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Embroidery Type</h4>
              <p className="text-sm text-muted-foreground">{embroideryType}</p>
            </div>
          </div>
        </Card>
        <Card className="p-2 col-span-2">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <LocateFixed className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 ">
              <h4 className="font-semibold mb-1">Embroidery Location</h4>
              <p className="text-sm text-muted-foreground">
                {embroideryLocation}
              </p>
            </div>
          </div>
        </Card>

        {/* <Card className="p-4">
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
        </Card> */}

        {/* <Card className="p-4">
          <h4 className="font-semibold mb-4">Quantity Breakdown</h4>
          <div className="space-y-3">
            {selectedColors.map((color) => {
              const colorQty = quantities[color] || {};
              const colorTotal = Object.values(colorQty).reduce(
                (sum, qty) => sum + qty,
                0
              );
              if (colorTotal === 0) return null;

              return (
                <div key={color} className="pb-3 border-b last:border-b-0">
                  <p className="font-medium mb-2 capitalize">{color}</p>
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
        </Card> */}

        {/* {Object.keys(uploadedImages).length > 0 && (
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
        )} */}

        {/* <motion.div
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
        </motion.div> */}
      </div>

      <Card className="mt-2 p-2">
        <p className="font-bold text-lg">Step 2: Your Artwork</p>

        <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg p-6 border-2  border-blue-200">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-blue-600 text-white rounded-lg p-3 h-fit">
                <FileType className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{artwork.name}</p>
                <div className="mt-2 space-y-1 text-sm text-slate-600">
                  <p>
                    Format:{" "}
                    <span className="font-medium text-slate-900">
                      {artwork.format}
                    </span>
                  </p>
                  <p>
                    Size:{" "}
                    <span className="font-medium text-slate-900">
                      {artwork.size}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mt-2 p-2">
        <p className="font-bold text-lg">Step 3: Back & Side Stitching </p>

        {Object.keys(stitchingArtwork).map((stitchingname) => {
          const StitchingData = stitchingArtwork[stitchingname];

          return (
            <div
              className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg  border-2  border-blue-200"
              key={stitchingname}
            >
              <p className="font-bold text-lg px-4 py-2 text-blue-500">
                {" "}
                {stitchingname}
              </p>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-blue-600 text-white rounded-lg p-3 h-fit">
                      <FileType className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        {StitchingData.name}
                      </p>
                      <div className="mt-2 space-y-1 text-sm text-slate-600">
                        <p>
                          Format:{" "}
                          <span className="font-medium text-slate-900">
                            {StitchingData.file.name.split(".")[1]}
                          </span>
                        </p>
                        <p>
                          Size:{" "}
                          <span className="font-medium text-slate-900">
                            {StitchingData.file.size}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Card>

      <motion.div
        className="p-6 bg-primary/5 border-2 border-primary rounded-lg mt-2"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Unit Price:</span>
            <span className="font-medium">${144}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Quantity:</span>
            <span className="font-medium">{totalQty} pieces</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-3xl font-bold text-primary">{244}</span>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-3 mt-3">
        {/* {onBack && ( */}
        <Button
          variant="outline"
          className="flex-1 bg-transparent"
          // onClick={onBack}
        >
          Back
        </Button>
        {/* )} */}
        <Button className="flex-1" size="lg">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
        {/* <Button className="flex-1" size="lg" onClick={handleAddToCart}>
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button> */}
      </div>
    </section>
  );
};

export default HatsStepFour;
