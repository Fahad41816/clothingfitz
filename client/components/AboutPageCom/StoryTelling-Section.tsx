"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function StorytellingSection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded with a simple vision: to empower individuals and
                businesses to express themselves through custom apparel. What
                started as a small workshop has grown into a global phenomenon.
              </p>

              <div className="flex gap-4">
                <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg italic text-foreground font-medium">
                  "Every garment tells a story. We're just here to make sure
                  your story is told perfectly."
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we're proud to serve thousands of customers worldwide,
                from small startups to Fortune 500 companies. Our commitment to
                quality, innovation, and customer satisfaction remains
                unwavering.
              </p>

              <button className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all">
                Read Full Story
              </button>
            </div>
          </motion.div>

          {/* Story Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="/clothing-manufacturing-process-quality.jpg"
                alt="Manufacturing excellence"
                className="w-full h-60 object-cover rounded-xl cursor-pointer transition-transform"
              />
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="/team-collaboration-clothing-production.jpg"
                alt="Team collaboration"
                className="w-full h-40 object-cover rounded-xl cursor-pointer transition-transform"
              />
            </div>

            <div className="space-y-4 pt-8">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="/finished-products-apparel-showcase.jpg"
                alt="Finished products"
                className="w-full h-40 object-cover rounded-xl cursor-pointer transition-transform"
              />
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="/customer-satisfaction-happy-clients.jpg"
                alt="Customer satisfaction"
                className="w-full h-60 object-cover rounded-xl cursor-pointer transition-transform"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
