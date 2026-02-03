/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { motion } from "framer-motion";
import ArtworkUploadSection from "./HatsStepThreePageCom/ArtwartUpload";
import EmbroideryOptionsSection from "./HatsStepThreePageCom/EmbroderyOptionSection";
import LocationSelectorSection from "./HatsStepThreePageCom/PrintLocationSection";
import ThreadColorSection from "./HatsStepThreePageCom/ThreadColor";
import StitchingOptionsSection from "./HatsStepThreePageCom/StitchingOptions";

const HatsStepThree = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  quantities,
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
  // steps
  // 1. Artwart option
  // 2. Embroder option
  //  3. print location
  // 4. tread color.
  //  5.Back & Side Stitching.

  //

  // Calculate extra charges
  // const getEmbroideryExtra = () => {
  //   if (embroideryType === "standard") return 0;
  //   const pricingTiers = {
  //     1: 8,
  //     12: 5,
  //     24: 4,
  //     50: 3,
  //     100: 2,
  //   };
  //   const tier =
  //     Object.keys(pricingTiers)
  //       .reverse()
  //       .find((q) => quantities >= parseInt(q)) || "1";
  //   return (pricingTiers as Record<string, number>)[tier] || 8;
  // };

  // const getStitchingExtra = () => {
  //   if (stitchingOptions.length === 0) return 0;
  //   const pricingTiers = {
  //     1: 10,
  //     12: 8,
  //     24: 6,
  //     72: 4,
  //     144: 3,
  //   };
  //   const tier =
  //     Object.keys(pricingTiers)
  //       .reverse()
  //       .find((q) => quantities >= parseInt(q)) || "1";
  //   const perLocationPrice =
  //     (pricingTiers as Record<string, number>)[tier] || 10;
  //   // Charge per selected location
  //   return perLocationPrice * stitchingOptions.length;
  // };

  const maxThreadColors = Math.ceil(totalQty / 6);

  return (
    <>
      <div className="">
        <div>
          <div className="">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <LocationSelectorSection
                location={location}
                setLocation={setLocation}
              />
            </motion.div>

            {/* Main Content */}
            <div className="mt-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ArtworkUploadSection
                  location={location}
                  artwork={artwork}
                  setArtwork={setArtwork}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <EmbroideryOptionsSection
                  embroideryType={embroideryType}
                  setEmbroideryType={setEmbroideryType}
                />
              </motion.div>

             

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <StitchingOptionsSection
                  stitchingOptions={stitchingOptions} // pass array instead of single option
                  setStitchingOptions={setStitchingOptions}
                  stitchingArtwork={stitchingArtwork} // pass object instead of single artwork
                  setStitchingArtwork={setStitchingArtwork}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HatsStepThree;
