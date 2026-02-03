/* eslint-disable @next/next/no-img-element */
"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Upload, X, Check } from "lucide-react" 
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PrintLocationSelectorProps {
  printLocations: string[]
  setPrintLocations: (locations: string[]) => void
  uploadedImages: Record<string, string>
  setUploadedImages: (images: Record<string, string>) => void
}

const locations = [
  { id: "front-full", label: "Front Full Print", conflictsWith: ["front-chest"] },
  { id: "front-chest", label: "Front Chest Print", conflictsWith: ["front-full"] },
  { id: "back-full", label: "Back Full Print", conflictsWith: [] },
]

export function PrintLocationSelector({
  printLocations,
  setPrintLocations,
  uploadedImages,
  setUploadedImages,
}: PrintLocationSelectorProps) {
  const toggleLocation = (locationId: string) => {
    const location = locations.find((l) => l.id === locationId)
    if (!location) return

    if (printLocations.includes(locationId)) {
      // Remove location
      setPrintLocations(printLocations.filter((l) => l !== locationId))
      // Remove uploaded image for this location
      const newImages = { ...uploadedImages }
      delete newImages[locationId]
      setUploadedImages(newImages)
    } else {
      // Check for conflicts
      const hasConflict = location.conflictsWith.some((conflictId) => printLocations.includes(conflictId))
      if (hasConflict) {
        // Remove conflicting locations
        const newLocations = printLocations.filter((l) => !location.conflictsWith.includes(l))
        setPrintLocations([...newLocations, locationId])
        // Remove images for conflicting locations
        const newImages = { ...uploadedImages }
        location.conflictsWith.forEach((conflictId) => delete newImages[conflictId])
        setUploadedImages(newImages)
      } else {
        setPrintLocations([...printLocations, locationId])
      }
    }
  }

  const handleFileUpload = (locationId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImages({
        ...uploadedImages,
        [locationId]: e.target?.result as string,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (locationId: string, e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(locationId, e.dataTransfer.files[0])
    }
  }

  const isLocationDisabled = (locationId: string) => {
    const location = locations.find((l) => l.id === locationId)
    if (!location) return false
    return location.conflictsWith.some((conflictId) => printLocations.includes(conflictId))
  }

  return (
    <Card className="p-6 shadow-xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold">Print Locations & Upload Artwork</h3>
        <p className="text-sm text-muted-foreground">Select print locations and upload your designs</p>
      </div>

      {/* Print Location Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {locations.map((location) => {
          const isSelected = printLocations.includes(location.id)
          const isDisabled = isLocationDisabled(location.id)

          return (
            <motion.button
              key={location.id}
              onClick={() => !isDisabled && toggleLocation(location.id)}
              disabled={isDisabled}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : isDisabled
                    ? "border-border bg-muted opacity-50 cursor-not-allowed"
                    : "border-border hover:border-primary/50"
              }`}
              whileHover={!isDisabled ? { scale: 1.02 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
            >
              <img
                src={`/.jpg?height=120&width=120&query=${location.label}`}
                alt={location.label}
                className="w-full h-24 object-contain mb-2"
              />
              <p className="text-xs font-semibold text-center">{location.label}</p>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1"
                >
                  <Check className="h-3 w-3" />
                </motion.div>
              )}
              {isDisabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                  <p className="text-xs text-destructive font-semibold">Conflicts</p>
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Upload Areas for Selected Locations */}
      {printLocations.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Upload Artwork for Selected Locations</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {printLocations.map((locationId) => {
              const location = locations.find((l) => l.id === locationId)
              if (!location) return null

              const hasImage = uploadedImages[locationId]

              return (
                <motion.div
                  key={locationId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="border-2 border-dashed rounded-lg p-4 relative"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(locationId, e)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold">{location.label} Artwork</p>
                    {hasImage && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          const newImages = { ...uploadedImages }
                          delete newImages[locationId]
                          setUploadedImages(newImages)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {hasImage ? (
                    <img
                      src={uploadedImages[locationId] || "/placeholder.svg"}
                      alt={`${location.label} design`}
                      className="w-full h-32 object-contain rounded"
                    />
                  ) : (
                    <div className="text-center py-6">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground mb-2">Drag and drop Artwork here</p>
                      <p className="text-xs text-muted-foreground mb-3">OR</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const input = document.createElement("input")
                          input.type = "file"
                          input.accept = "image/*"
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) handleFileUpload(locationId, file)
                          }
                          input.click()
                        }}
                      >
                        Click to upload
                      </Button>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Copyright Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-accent/10 border border-accent rounded-lg"
          >
            <p className="text-xs text-accent-foreground">
              ⚠️ I confirm that this artwork does not violate any copyright laws.
            </p>
          </motion.div>
        </div>
      )}
    </Card>
  )
}
