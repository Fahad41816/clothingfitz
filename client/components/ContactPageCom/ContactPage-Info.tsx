"use client"

import { motion } from "framer-motion"
import { Phone, Mail, Facebook, Instagram, MessageCircle, Linkedin } from "lucide-react"

export default function ContactInfo() {
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: MessageCircle, href: "https://whatsapp.com", label: "WhatsApp" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ]

  const partners = ["Spherule", "Luminous", "FocalPoint", "Polymath", "Acme Corp", "CloudWatch"]

  return (
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
      <h2 className="text-2xl font-serif font-bold md:text-3xl">Contact Links</h2>

      {/* Call */}
      <motion.div variants={itemVariants} className="space-y-3 group cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Phone className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <h3 className="font-semibold">Call</h3>
        </div>
        <p className="ml-13 text-muted-foreground group-hover:text-primary transition-colors">+1 954-483-8862</p>
      </motion.div>

      {/* Email */}
      <motion.div variants={itemVariants} className="space-y-3 group cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-950 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Mail className="h-5 w-5 text-green-600 group-hover:text-primary-foreground transition-colors" />
          </div>
          <h3 className="font-semibold">Email</h3>
        </div>
        <p className="ml-13 text-muted-foreground group-hover:text-primary transition-colors">sales@clothingfitz.com</p>
      </motion.div>

      {/* Socials */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
            <span className="text-lg">💬</span>
          </div>
          <h3 className="font-semibold">Socials</h3>
        </div>
        <div className="ml-13 flex gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            )
          })}
        </div>
      </motion.div>

      {/* Partners/Clients Section */}
      <motion.div variants={itemVariants} className="pt-4 border-t border-border">
        <h3 className="mb-4 font-semibold text-foreground">Trusted by</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              className="flex items-center justify-center rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
