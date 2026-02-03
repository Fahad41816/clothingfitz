"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    title: "Corporate Branding Collection",
    description: "Custom apparel for 200+ enterprises",
    image: "/corporate-branding-clothing-collection.jpg",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Sports Team Uniforms",
    description: "Performance wear for athletic excellence",
    image: "/sports-team-uniforms-apparel.jpg",
    color: "from-blue-600 to-blue-400",
  },
  {
    title: "Limited Edition Drops",
    description: "Exclusive designer collaborations",
    image: "/limited-edition-fashion-clothing-drops.jpg",
    color: "from-indigo-500 to-purple-500",
  },
]

export default function ProjectsSection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">Showcase of our finest work and collaborations</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-6 h-64">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>

              <motion.div className="flex items-center gap-2 text-primary font-semibold" whileHover={{ x: 5 }}>
                View Project <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
