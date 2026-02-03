/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface ProductFiltersProps {
  onFilterChange?: (filters: any) => void
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 100])

  const categories = [
    { id: "hats", label: "Hats", count: 24 },
    { id: "t-shirts", label: "T-Shirts", count: 36 },
    { id: "polo-shirts", label: "Polo Shirts", count: 18 },
    { id: "hoodies", label: "Hoodies", count: 12 },
  ]

  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
  ]

  const colors = [
    { id: "black", label: "Black", hex: "#000000" },
    { id: "white", label: "White", hex: "#FFFFFF" },
    { id: "navy", label: "Navy", hex: "#001F3F" },
    { id: "red", label: "Red", hex: "#FF4136" },
    { id: "blue", label: "Blue", hex: "#0074D9" },
    { id: "green", label: "Green", hex: "#2ECC40" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Filters</h3>
        <Button variant="ghost" size="sm" className="text-primary">
          Clear All
        </Button>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Category</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={category.id} />
                <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                  {category.label}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={5} className="w-full" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">${priceRange[0]}</span>
            <span className="text-muted-foreground">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div>
        <h4 className="font-medium mb-3">Size</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <div key={size.id} className="flex items-center space-x-2">
              <Checkbox id={size.id} />
              <Label htmlFor={size.id} className="text-sm font-normal cursor-pointer">
                {size.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h4 className="font-medium mb-3">Color</h4>
        <div className="space-y-3">
          {colors.map((color) => (
            <div key={color.id} className="flex items-center space-x-2">
              <Checkbox id={color.id} />
              <div className="h-5 w-5 rounded-full border-2 border-border" style={{ backgroundColor: color.hex }} />
              <Label htmlFor={color.id} className="text-sm font-normal cursor-pointer">
                {color.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
