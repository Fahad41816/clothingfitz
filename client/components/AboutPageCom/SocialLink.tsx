"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, MessageCircle, Mail, Phone } from "lucide-react";

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    url: "#",
    color: "hover:bg-blue-600 hover:text-white",
  },
  {
    icon: Instagram,
    label: "Instagram",
    url: "#",
    color: "hover:bg-pink-600 hover:text-white",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    url: "#",
    color: "hover:bg-green-600 hover:text-white",
  },
  {
    icon: Mail,
    label: "Email",
    url: "#",
    color: "hover:bg-primary hover:text-primary-foreground",
  },
  {
    icon: Phone,
    label: "Phone",
    url: "#",
    color: "hover:bg-accent hover:text-accent-foreground",
  },
];

export default function SocialLinks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-t border-primary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect With Us
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow our journey and stay updated with latest collections
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center items-center gap-6 flex-wrap"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.url}
                variants={itemVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-full bg-card border border-primary/20 text-foreground transition-all ${social.color}`}
                title={social.label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center space-y-4"
        >
          <p className="text-muted-foreground">
            📧{" "}
            <a
              href="mailto:sales@clothingfitz.com"
              className="text-primary hover:underline"
            >
              sales@clothingfitz.com
            </a>
          </p>
          <p className="text-muted-foreground">
            📞{" "}
            <a href="tel:+1954483" className="text-primary hover:underline">
              +1 (954) 483-8862
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
