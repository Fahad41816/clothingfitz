"use client"

import { motion } from "framer-motion"
import { Star, ThumbsUp } from "lucide-react"
import { Card } from "@/components/ui/card" 
import { Button } from "@/components/ui/button"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback } from "@/components/ui/avatar"

const reviews = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Excellent quality! The print came out perfect and the shirt is very comfortable. Ordered 50 pieces for our company event.",
    helpful: 24,
  },
  {
    id: 2,
    author: "John D.",
    rating: 5,
    date: "1 month ago",
    comment:
      "Great bulk pricing and fast turnaround. The step-by-step ordering process made it so easy to customize exactly what we needed.",
    helpful: 18,
  },
  {
    id: 3,
    author: "Emily R.",
    rating: 4,
    date: "1 month ago",
    comment:
      "Good quality shirts. The only reason for 4 stars is that shipping took a bit longer than expected, but the final product was worth the wait.",
    helpful: 12,
  },
]

export function ProductReviews() {
  return (
    <Card className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <Button variant="outline">Write a Review</Button>
        </div>

        <div className="space-y-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="pb-6 border-b last:border-b-0"
            >
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{review.comment}</p>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Card>
  )
}
