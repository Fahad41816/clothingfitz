/* eslint-disable @next/next/no-img-element */
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SizeGuideModalProps {
  open: boolean
  onClose: () => void
}

const sizeData = [
  { size: "XS", chest: "31-34", length: "27", sleeve: "15.5" },
  { size: "S", chest: "34-37", length: "28", sleeve: "16" },
  { size: "M", chest: "38-41", length: "29", sleeve: "16.5" },
  { size: "L", chest: "42-45", length: "30", sleeve: "17" },
  { size: "XL", chest: "46-49", length: "31", sleeve: "17.5" },
  { size: "2XL", chest: "50-53", length: "32", sleeve: "18" },
  { size: "3XL", chest: "54-57", length: "33", sleeve: "18.5" },
]

export function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-card rounded-2xl shadow-2xl z-50 p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Size Guide</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mb-6">
              <img src="/t-shirt-measurement-guide-diagram.jpg" alt="How to measure" className="w-full rounded-lg" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-4 font-semibold">Size</th>
                    <th className="text-left py-3 px-4 font-semibold">Chest (inches)</th>
                    <th className="text-left py-3 px-4 font-semibold">Length (inches)</th>
                    <th className="text-left py-3 px-4 font-semibold">Sleeve (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row) => (
                    <tr key={row.size} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{row.size}</td>
                      <td className="py-3 px-4">{row.chest}</td>
                      <td className="py-3 px-4">{row.length}</td>
                      <td className="py-3 px-4">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> If a particular size is unavailable, we&rsquo;ll email you. Well find that size
                assured, well find a suitable alternative for your accordingly.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={onClose}>Close</Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
