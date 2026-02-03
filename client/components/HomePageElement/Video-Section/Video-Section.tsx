"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, you would control video playback here
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              See Our Process in Action
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Watch how we bring your custom designs to life with precision and care
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl overflow-hidden relative">
            <Image fill src="https://vnis.edu.vn/wp-content/uploads/2023/11/VNIS-POD-process-Graphic-new-1024x717.jpeg" alt="Video thumbnail" className="w-full h-full object-cover" />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="lg"
                  className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-2xl"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                </Button>
              </motion.div>
            </div>

            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
              >
                <div className="text-white text-center">
                  <div className="text-2xl font-semibold mb-2">Video Playing...</div>
                  <div className="text-sm opacity-80">In a real implementation, this would show the actual video</div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
