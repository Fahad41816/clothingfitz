"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Plus } from "lucide-react" 
import { Button } from "@/components/ui/button"
import { ColorPickerModal } from "./ColorPicker"

interface TopBarProps {
  selectedPackage: number | null
  setSelectedPackage: (pkg: number | null) => void
  selectedColors: string[]
  setSelectedColors: (colors: string[]) => void
}

const packages = [
  { id: null, label: "No Minimum", minQty: 1 },
  { id: 24, label: "24 Pieces", minQty: 24 },
  { id: 50, label: "50 Pieces", minQty: 50 },
  { id: 100, label: "100 Pieces", minQty: 100 },
]

const quickColors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#1E3A8A" },
  { name: "Red", hex: "#DC2626" },
  { name: "Yellow", hex: "#EAB308" },
  { name: "Green", hex: "#16A34A" },
  { name: "Gray", hex: "#6B7280" },
  { name: "Orange", hex: "#EA580C" },
]

export function TopBar({ selectedPackage, setSelectedPackage, selectedColors, setSelectedColors }: TopBarProps) {
  const [showColorModal, setShowColorModal] = useState(false)

  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter((c) => c !== colorName))
    } else {
      setSelectedColors([...selectedColors, colorName])
    }
  }

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Package Selection */}
            <div className="flex-shrink-0">
              <label className="text-xs font-semibold mb-2 block text-muted-foreground">PACKAGE</label>
              <div className="flex gap-2">
                {packages.map((pkg) => (
                  <motion.button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                      selectedPackage === pkg.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {pkg.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-12 w-px bg-border" />

            {/* Color Selection */}
            <div className="flex-1">
              <label className="text-xs font-semibold mb-2 block text-muted-foreground">
                COLORS ({selectedColors.length} selected)
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {quickColors.map((color) => (
                  <motion.button
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColors.includes(color.name)
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border hover:border-primary/50"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={color.name}
                  >
                    {selectedColors.includes(color.name) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full"
                      >
                        <Check className="h-4 w-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs bg-transparent"
                  onClick={() => setShowColorModal(true)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <ColorPickerModal
        open={showColorModal}
        onClose={() => setShowColorModal(false)}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
      />
    </>
  )
}
