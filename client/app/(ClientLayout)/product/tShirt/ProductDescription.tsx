"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function ProductDescription() {
  return (
    <div className="p-6 bg-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Product Description</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            The Gildan Heavy Cotton T-Shirt is a classic choice for custom printing. Made from 100% preshrunk cotton,
            this shirt offers exceptional comfort and durability for everyday wear.
          </p>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Material:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>100% Cotton (Solid Colors)</li>
              <li>90% Cotton, 10% Polyester (Ash Grey)</li>
              <li>50% Cotton, 50% Polyester (Sport Grey, Heather Colors)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Seamless rib at neck</li>
              <li>Taped shoulder-to-shoulder</li>
              <li>Quarter-turned to eliminate center crease</li>
              <li>Classic fit</li>
              <li>Tear-away label</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Care Instructions:</h3>
            <p>Machine wash cold with like colors. Tumble dry low. Do not iron decoration.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
