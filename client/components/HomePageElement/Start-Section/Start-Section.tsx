"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Award, Clock } from "lucide-react"


const stats = [
  {
    icon: TrendingUp,
    number: "50,000+",
    label: "Products Sold",
    description: "Custom items delivered worldwide",
    image: "/products-sold-chart-trending-up.jpg",
  },
  {
    icon: Users,
    number: "10,000+",
    label: "Happy Customers",
    description: "Satisfied clients across industries",
    image: "/happy-customer-testimonials.png",
  },
  {
    icon: Award,
    number: "15+",
    label: "Years Experience",
    description: "Expertise in custom printing",
    image: "/award-trophy-excellence-printing.jpg",
  },
  {
    icon: Clock,
    number: "48hrs",
    label: "Fast Turnaround",
    description: "Quick production and shipping",
    image: "/fast-delivery-clock-shipping.jpg",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Why Choose ClothingFitz?</h2>
            <p className="text-xl text-primary-foreground/80 text-pretty max-w-2xl mx-auto">
              Trusted by thousands of businesses and individuals worldwide for premium quality printing
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-6 mx-auto w-24 h-24">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  {/* <img
                    src={stat.image || "/placeholder.svg"}
                    alt={stat.label}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  /> */}
                </div>
                <div className="absolute inset-0 bg-primary-foreground/10 rounded-2xl flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors duration-300">
                  <stat.icon className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>

              <motion.div
                className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              >
                
                
                {stat.number}
              </motion.div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <div className="text-primary-foreground/80 text-pretty leading-relaxed">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
