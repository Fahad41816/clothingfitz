"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";

import CenterFrontIMG from "../../../assets/images/CenterFront.png";
import LeftPanelIMG from "../../../assets/images/LeftPanel.png";
import RightPanelImg from "../../../assets/images/rightpanel.png";
import Image from "next/image";

interface LocationSelectorSectionProps {
  location: string;
  setLocation: (location: string) => void;
}

export default function LocationSelectorSection({
  location,
  setLocation,
}: LocationSelectorSectionProps) {
  const locations = [
    {
      id: "center-front",
      name: "Center Front",
      description: "Front center of the hat",
      image: CenterFrontIMG,
    },
    {
      id: "left-panel",
      name: "Left Panel",
      description: "Left side of the hat",
      image: LeftPanelIMG,
    },
    {
      id: "right-panel",
      name: "Right Panel",
      description: "Right side of the hat",
      image: RightPanelImg,
    },
  ];

  return (
    <Card className="border-2 border-slate-200 mt-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Embroidery Location
        </CardTitle>
        <CardDescription>Select where to place your design</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setLocation(loc.id)}
              className={`p-1 rounded-lg border-2 transition-all text-center ${
                location === loc.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Image
                src={loc.image || "/placeholder.svg"}
                alt={loc.name}
                className="w-full h-20 object-center rounded-lg mb-3"
                width={180}
              />
              <h3 className="font-semibold text-slate-900">{loc.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{loc.description}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
