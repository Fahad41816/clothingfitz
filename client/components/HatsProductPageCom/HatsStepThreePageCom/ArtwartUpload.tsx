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
import { Upload, FileType, X } from "lucide-react";

interface ArtworkUploadSectionProps {
  artwork: { file: File; name: string; size: string; format: string } | null;
  setArtwork: (
    artwork: { file: File; name: string; size: string; format: string } | null
  ) => void;
}

export default function ArtworkUploadSection({
  location,
  artwork,
  setArtwork,
}: ArtworkUploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
    const size = (file.size / 1024 / 1024).toFixed(2) + " MB";
    const format = file.name.split(".").pop()?.toUpperCase() || "UNKNOWN";
    setArtwork({
      file,
      name: file.name,
      size,
      format,
    });
  };

  return (
    <Card className=" ">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-600" />
          Upload Your {location} Artwork
        </CardTitle>
        <CardDescription>
          Supported formats: PNG, JPG, SVG, PDF, AI, EPS
        </CardDescription>
      </CardHeader>
      <CardContent>
        {artwork ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg p-6 border-2 border-blue-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-blue-600 text-white rounded-lg p-3 h-fit">
                    <FileType className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {artwork.name}
                    </p>
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
                <button
                  onClick={() => setArtwork(null)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                const input = document.getElementById(
                  "artwork-input"
                ) as HTMLInputElement;
                input?.click();
              }}
              className="w-full"
            >
              Change Artwork
            </Button>
          </div>
        ) : (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 hover:border-slate-400"
            }`}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            <p className="text-lg font-semibold text-slate-900 mb-2">
              Drag & drop your artwork here
            </p>
            <p className="text-sm text-slate-600 mb-4">or</p>
            <Button variant="outline" asChild className="inline-flex">
              <label className="cursor-pointer">
                Browse Files
                <input
                  id="artwork-input"
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && processFile(e.target.files[0])
                  }
                  accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.eps"
                />
              </label>
            </Button>
            <p className="text-xs text-slate-500 mt-4">
              PNG, JPG, SVG, PDF, AI, EPS up to 50 MB
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
