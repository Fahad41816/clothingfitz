"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Info } from "lucide-react" 
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SizeGuideModal } from "./SizeGuideModal"

interface QuantitySelectorProps {
  selectedColors: string[]
  quantities: Record<string, Record<string, number>>
  setQuantities: (quantities: Record<string, Record<string, number>>) => void
  selectedPackage: number | null
  totalQty: number
  minQuantity: number
}

const sizes = [
  { name: "S", price: 2.5 },
  { name: "M", price: 3.5 },
  { name: "L", price: 4.5 },
  { name: "XL", price: 5.5 },
  { name: "2XL", price: 6.5 },
  { name: "3XL", price: 7.5 },
  { name: "4XL", price: 8.5 },
  { name: "5XL", price: 9.5 },
]

export function QuantitySelector({
  selectedColors,
  quantities,
  setQuantities,
  selectedPackage,
  totalQty,
  minQuantity,
}: QuantitySelectorProps) {
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  const updateQuantity = (color: string, size: string, value: string) => {
    const newQuantities = { ...quantities }
    if (!newQuantities[color]) newQuantities[color] = {}
    const qty = Number.parseInt(value) || 0
    newQuantities[color][size] = Math.max(0, qty)
    setQuantities(newQuantities)
  }

  if (selectedColors.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Please select colors from the top bar to continue</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">Size & Quantity</h3>
          <p className="text-sm text-muted-foreground">
            Enter quantities for each size
            {selectedPackage && ` (Min: ${minQuantity} pieces)`}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowSizeGuide(true)}>
          <Info className="h-4 w-4 mr-2" />
          Size Guide
        </Button>
      </div>

      {/* Quantity Summary */}
      <motion.div
        className={`p-3 rounded-lg mb-4 ${
          totalQty >= minQuantity
            ? "bg-primary/10 border border-primary"
            : "bg-destructive/10 border border-destructive"
        }`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Total Quantity:</span>
          <span className="text-xl font-bold">{totalQty}</span>
        </div>
        {totalQty < minQuantity && (
          <p className="text-xs text-destructive mt-1">Need {minQuantity - totalQty} more pieces</p>
        )}
      </motion.div>

      {/* Table for each color */}
      <div className="space-y-6">
        {selectedColors.map((color, idx) => (
          <motion.div
            key={color}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="border-2 border-border rounded-lg overflow-hidden"
          >
            <div className="bg-secondary px-4 py-2">
              <h4 className="font-semibold">{color}</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {sizes.map((size) => (
                      <th key={size.name} className="px-2 py-2 text-center text-sm font-semibold">
                        {size.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {sizes.map((size) => (
                      <td key={size.name} className="px-2 py-2">
                        <Input
                          type="number"
                          min="0"
                          placeholder="Qty"
                          value={quantities[color]?.[size.name] || ""}
                          onChange={(e) => updateQuantity(color, size.name, e.target.value)}
                          className="text-center h-9"
                        />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-muted/30">
                    {sizes.map((size) => (
                      <td key={size.name} className="px-2 py-1 text-center text-xs text-muted-foreground">
                        +${size.price.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>

      <SizeGuideModal open={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </Card>
  )
}
