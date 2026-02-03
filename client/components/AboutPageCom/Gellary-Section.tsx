"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const galleryItems = [
  {
    title: "Manufacturing Floor",
    image: "/modern-manufacturing-facility-textiles.jpg",
    category: "Production",
  },
  {
    title: "Quality Control",
    image: "/quality-inspection-clothing-apparel.jpg",
    category: "Quality",
  },
  {
    title: "Team Meeting",
    image: "/creative-team-collaboration-office.jpg",
    category: "Team",
  },
  {
    title: "Product Showcase",
    image: "/finished-clothing-products-display.jpg",
    category: "Products",
  },
  {
    title: "Design Studio",
    image: "/design-studio-creative-workspace.jpg",
    category: "Design",
  },
  {
    title: "Warehouse",
    image: "/organized-warehouse-storage-inventory.jpg",
    category: "Storage",
  },
]

const categories = ["All", "Production", "Quality", "Team", "Products", "Design", "Storage"]

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems =
    activeCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Behind The Scenes</h2>
          <p className="text-lg text-muted-foreground">A glimpse into our production and team culture</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                  : "bg-card border border-primary/20 text-foreground hover:border-primary/40"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
