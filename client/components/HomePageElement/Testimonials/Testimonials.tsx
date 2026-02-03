/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc.",
    image: "/professional-woman-headshot.png",
    rating: 5,
    text: "PrintCraft delivered exceptional quality custom t-shirts for our company event. The printing was crisp, colors were vibrant, and the customer service was outstanding. Highly recommended!",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Event Coordinator",
    company: "Sports League",
    image: "/professional-man-headshot.png",
    rating: 5,
    text: "We needed 200 custom hats for our tournament, and PrintCraft exceeded our expectations. Fast turnaround, great quality, and competitive pricing. Will definitely use them again.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    company: "Local Cafe",
    image: "/business-owner-woman-headshot.jpg",
    rating: 5,
    text: "The custom polo shirts for my staff look amazing! The embroidery is perfect and the fabric quality is excellent. My customers have been complimenting the professional look.",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Team Manager",
    company: "Youth Soccer Club",
    image: "/coach-man-headshot.jpg",
    rating: 5,
    text: "PrintCraft made our team hoodies exactly as we envisioned. The kids love them, parents are happy with the quality, and the ordering process was seamless.",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              {"Client's Testimonial"}
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Hear what our satisfied customers have to say about their experience with PrintCraft
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-background shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <Image
                          src={testimonials[currentIndex].image || "/placeholder.svg"}
                          alt={testimonials[currentIndex].name}
                          className="w-24 h-24 rounded-full object-cover"
                          width={100}
                          height={100}
                        />
                        <div className="absolute -top-2 -right-2 bg-primary rounded-full p-2">
                          <Quote className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start items-center gap-1 mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <blockquote className="text-lg md:text-xl text-foreground mb-6 text-pretty">
                        "{testimonials[currentIndex].text}"
                      </blockquote>

                      <div>
                        <div className="font-semibold text-foreground text-lg">{testimonials[currentIndex].name}</div>
                        <div className="text-muted-foreground">
                          {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background shadow-lg"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background shadow-lg"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-primary/30"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
