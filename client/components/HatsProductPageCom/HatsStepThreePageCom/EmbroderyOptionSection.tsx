"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap } from "lucide-react";
import ThreeDPuffEmbroderyImage from "../../../assets/images/3dPuffEmbrodery.png";
import StandardFlatEmbrodery from "../../../assets/images/standardFlatEmbrodery.jpeg";
import Image from "next/image";

interface EmbroideryOptionsSectionProps {
  embroideryType: string;
  setEmbroideryType: (type: string) => void;
}

export default function EmbroideryOptionsSection({ 
  embroideryType,
  setEmbroideryType,
}: EmbroideryOptionsSectionProps) {
  const options = [
    {
      id: "standard",
      name: "Standard Flat Embroidery",
      description: "Classic embroidery with clean, flat finish",
      price: 0,
      image: StandardFlatEmbrodery,
    },
    {
      id: "3d-puff",
      name: "3D Puff Embroidery",
      description: "Raised, dimensional embroidery for bold designs",
      price: "From $2-$8",
      image: ThreeDPuffEmbroderyImage,
    },
  ];

  return (
    <Card className="border-2 border-slate-200 mt-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          Embroidery Type
        </CardTitle>
        <CardDescription>Choose your embroidery style</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setEmbroideryType(option.id)}
              className={`p-2 rounded-lg border-2 transition-all text-left ${
                embroideryType === option.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Image
                src={option.image || "/placeholder.svg"}
                alt={option.name}
                className="w-full h-24 object-center rounded-lg mb-3"
                width={200}
              />
              <h3 className="font-semibold text-slate-900">{option.name}</h3>
              <p className="text-sm text-slate-600 mt-1">
                {option.description}
              </p>
              {option.price && (
                <p className="text-sm font-medium text-blue-600 mt-2">
                  {option.price === 0 ? "Included" : option.price}
                </p>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
