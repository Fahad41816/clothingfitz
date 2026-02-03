"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <h2 className="text-2xl font-serif font-bold md:text-3xl">Send a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <motion.div className="space-y-2" variants={fieldVariants}>
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Jane Doe"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border-2 border-border rounded-full px-4 py-2.5 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {touched.fullName && formData.fullName && (
              <motion.div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                ✓
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Email */}
        <motion.div className="space-y-2" variants={fieldVariants}>
          <Label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border-2 border-border rounded-full px-4 py-2.5 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {touched.email && formData.email && (
              <motion.div
                className="absolute right-3 top-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {formData.email.includes("@") ? (
                  <span className="text-green-600">✓</span>
                ) : (
                  <span className="text-destructive">!</span>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Subject */}
        <motion.div className="space-y-2" variants={fieldVariants}>
          <Label htmlFor="subject" className="text-sm font-medium">
            Subject
          </Label>
          <Input
            id="subject"
            name="subject"
            type="text"
            placeholder="How can we help?"
            value={formData.subject}
            onChange={handleChange}
            className="border-2 border-border rounded-full px-4 py-2.5 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </motion.div>

        {/* Message */}
        <motion.div className="space-y-2" variants={fieldVariants}>
          <Label htmlFor="message" className="text-sm font-medium">
            Message <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
            className="border-2 border-border rounded-lg px-4 py-2.5 min-h-32 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={fieldVariants} className="pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 active:scale-95"
          >
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
