'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Palette, Plus, X } from 'lucide-react'

interface ThreadColorSectionProps {
  threadColors: string[]
  setThreadColors: (colors: string[]) => void
  maxColors: number
}

const THREAD_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Navy', value: '#001F3F' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Gold', value: '#F59E0B' },
  { name: 'Silver', value: '#D1D5DB' },
  { name: 'Purple', value: '#A855F7' },
  { name: 'Orange', value: '#FF8C00' },
  { name: 'Maroon', value: '#800000' },
  { name: 'Teal', value: '#14B8A6' },
]

export default function ThreadColorSection({
  threadColors,
  setThreadColors,
  maxColors,
}: ThreadColorSectionProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)

  const addColor = (color: string) => {
    if (threadColors.length < maxColors && !threadColors.includes(color)) {
      setThreadColors([...threadColors, color])
    }
  }

  const removeColor = (index: number) => {
    setThreadColors(threadColors.filter((_, i) => i !== index))
  }

  return (
    <Card className="border-2 border-slate-200 mt-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-blue-600" />
          Thread Colors
        </CardTitle>
        <CardDescription>
          Select thread colors for your embroidery ({threadColors.length} of {maxColors})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Color change note */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
          <p className="font-medium">📌 Important:</p>
          <p>Colors can only be changed once per 6 or more hats ordered. You can select up to {maxColors} thread color{maxColors > 1 ? 's' : ''} for your order.</p>
        </div>

        {/* Selected colors */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">Selected Colors:</p>
          <div className="flex flex-wrap gap-2">
            {threadColors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-2"
              >
                <div
                  className="w-6 h-6 rounded-full border-2 border-slate-300"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-medium text-slate-700">
                  {THREAD_COLORS.find(c => c.value === color)?.name || 'Custom'}
                </span>
                {threadColors.length > 1 && (
                  <button
                    onClick={() => removeColor(index)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add color button */}
        {threadColors.length < maxColors && (
          <Button
            variant="outline"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Thread Color
          </Button>
        )}

        {/* Color picker */}
        {showColorPicker && threadColors.length < maxColors && (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3 pt-4 border-t border-slate-200">
            {THREAD_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => {
                  addColor(color.value)
                  setShowColorPicker(false)
                }}
                disabled={threadColors.includes(color.value)}
                className="group relative"
              >
                <div
                  className="w-full aspect-square rounded-lg border-2 border-slate-300 transition-transform hover:scale-110 disabled:opacity-50"
                  style={{ backgroundColor: color.value }}
                />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
