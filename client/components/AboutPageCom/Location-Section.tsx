"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"

const locations = [
  {
    city: "New York",
    country: "USA",
    address: "123 Fashion Ave, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "ny@clothingfitz.com",
  },
  {
    city: "London",
    country: "UK",
    address: "456 Design Street, London EC1A 1BB",
    phone: "+44 (020) 7946-0958",
    email: "london@clothingfitz.com",
  },
  {
    city: "Tokyo",
    country: "Japan",
    address: "789 Shibuya Plaza, Tokyo 150-0002",
    phone: "+81 (03) 1234-5678",
    email: "tokyo@clothingfitz.com",
  },
]

export default function LocationsSection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Locations</h2>
          <p className="text-lg text-muted-foreground">Visit us around the world</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-card to-card/80 border border-primary/20 rounded-xl p-8 hover:border-primary/40 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{location.city}</h3>
                    <p className="text-sm text-muted-foreground">{location.country}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <p>{location.address}</p>
                  </div>

                  <div className="flex gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <p>{location.phone}</p>
                  </div>

                  <div className="flex gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <p>{location.email}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
