"use client"

import { motion } from "framer-motion"
import { PlayCircle } from "lucide-react"
import { useState } from "react"

export default function BrandingVideo() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Brand Story</h2>
          <p className="text-lg text-muted-foreground">Discover what drives us to create exceptional clothing</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted">
            <img
              src="/brand-video-thumbnail-clothing-manufacture.jpg"
              alt="ClothingFitz Brand Video"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="relative"
              >
                <PlayCircle className="w-20 h-20 text-white drop-shadow-lg" />
              </motion.button>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 group-hover:border-primary/40 transition-all" />
        </motion.div>
      </div>
    </section>
  )
}
