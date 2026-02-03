"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BedDouble as Needle, Upload, X, FileType } from "lucide-react";
import BackStiching from "../../../assets/images/BackSide.png";
import RightSideStching from "../../../assets/images/RightSide.png";
import LeftSideStiching from "../../../assets/images/LeftSideStiching.png";
import Image from "next/image";

interface StitchingArtwork {
  [key: string]: { file: File; name: string };
}

interface StitchingOptionsSectionProps {
  stitchingOptions: string[]; // changed from single option to array
  setStitchingOptions: (options: string[]) => void; // changed to array setter
  stitchingArtwork: StitchingArtwork; // changed to object with keys for each location
  setStitchingArtwork: (artwork: StitchingArtwork) => void; // updated type
}

export default function StitchingOptionsSection({
  stitchingOptions,
  setStitchingOptions,
  stitchingArtwork,
  setStitchingArtwork,
}: StitchingOptionsSectionProps) {
  const [dragActive, setDragActive] = useState<string | null>(null); // track which location is being dragged

  const stitchingLocations = [
    {
      id: "back-side",
      name: "Back Side Stitching",
      description: "Logo or text on the back of the hat",
      image: BackStiching,
      price: "$3-$10",
    },
    {
      id: "left-side",
      name: "Left Side Stitching",
      description: "Logo or text on the left side",
      image: LeftSideStiching,
      price: "$3-$10",
    },
    {
      id: "right-side",
      name: "Right Side Stitching",
      description: "Logo or text on the right side",
      image: RightSideStching,
      price: "$3-$10",
    },
  ];

  const toggleStitchingOption = (locationId: string) => {
    if (stitchingOptions.includes(locationId)) {
      const updated = stitchingOptions.filter((id) => id !== locationId);
      setStitchingOptions(updated);
      // Remove artwork for this location
      const updatedArtwork = { ...stitchingArtwork };
      delete updatedArtwork[locationId];
      setStitchingArtwork(updatedArtwork);
    } else {
      setStitchingOptions([...stitchingOptions, locationId]);
    }
  };

  const handleDrop = (e: React.DragEvent, locationId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setStitchingArtwork({
        ...stitchingArtwork,
        [locationId]: { file, name: file.name },
      });
    }
  };

  return (
    <Card className="border-2 border-slate-200 mt-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Needle className="h-5 w-5 text-blue-600" />
          Back & Side Stitching (Optional)
        </CardTitle>
        <CardDescription>
          Add logos or text to one or more sides of your hat. Select multiple
          locations to add stitching to different areas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stitching location options */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">
            Select Stitching Locations (Multiple Allowed):
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {stitchingLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => toggleStitchingOption(location.id)} // use toggle function
                className={`p-2 rounded-lg border-2 transition-all text-center ${
                  stitchingOptions.includes(location.id) // check if in array
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-300"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={location.name}
                  className="w-full h-20 object-cover rounded-lg mb-3"
                  width={180}
                />
                <h3 className="font-semibold text-slate-900">
                  {location.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {location.description}
                </p>
                <p className="text-sm font-medium text-blue-600 mt-2">
                  {location.price}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Stitching artwork upload for each selected location */}
        {stitchingOptions.length > 0 && ( // show uploads for all selected locations
          <div className="pt-4 border-t border-slate-200 space-y-6">
            <p className="text-sm font-medium text-slate-700">
              Upload Artwork for Selected Locations:
            </p>
            {stitchingLocations
              .filter((loc) => stitchingOptions.includes(loc.id))
              .map((location) => (
                <div
                  key={location.id}
                  className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200 space-y-3"
                >
                  <h4 className="font-semibold text-slate-900">
                    {location.name}
                  </h4>
                  {stitchingArtwork[location.id] ? (
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border-2 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileType className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-slate-900">
                            {stitchingArtwork[location.id].name}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            const updated = { ...stitchingArtwork };
                            delete updated[location.id];
                            setStitchingArtwork(updated);
                          }}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(location.id);
                      }}
                      onDragLeave={() => setDragActive(null)}
                      onDrop={(e) => handleDrop(e, location.id)} // pass location id
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                        dragActive === location.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-300"
                      }`}
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm font-medium text-slate-900">
                        Drag & drop artwork
                      </p>
                      <p className="text-xs text-slate-600 mt-1">or</p>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="mt-2 inline-flex"
                      >
                        <label className="cursor-pointer">
                          Browse
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                const file = e.target.files[0];
                                setStitchingArtwork({
                                  ...stitchingArtwork,
                                  [location.id]: { file, name: file.name },
                                });
                              }
                            }}
                            accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.eps"
                          />
                        </label>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Optional note */}
        {stitchingOptions.length === 0 && (
          <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600">
            💡 Add stitching to one or more sides to create a professional
            multi-location design for your hat.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
