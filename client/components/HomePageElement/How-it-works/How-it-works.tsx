"use client";

import { motion } from "framer-motion";
import { Search, Upload, ShoppingCart, CreditCard } from "lucide-react";
import Image from "next/image";
import BrowseImg from "@/assets/images/BrowseImg.jpg";
import AddToCartImg from "@/assets/images/AddToCart.jpg";
import PaymentImg from "@/assets/images/PaymentImage.jpg";
import UploadFileImage from "@/assets/images/UploadImage.jpg";

const steps = [
  {
    icon: Search,
    title: "Browse Products",
    description:
      "Explore our wide range of customizable apparel including t-shirts, hats, hoodies, and more.",
    image: BrowseImg,
  },
  {
    icon: Upload,
    title: "Upload Your Design",
    description:
      "Upload your logo, artwork, or use our design tools to create something unique.",
    image: UploadFileImage,
  },
  {
    icon: ShoppingCart,
    title: "Add to Cart",
    description:
      "Choose your sizes, colors, and quantities, then add your custom items to cart.",
    image: AddToCartImg,
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    description:
      "Complete your order with our secure payment system and we'll handle the rest.",
    image: PaymentImg,
  },
];

export function HowItWorks() {
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
              How Your Products Come To Life
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              {
                "What's more, we do it right! A full administration printing background."
              }
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden   flex items-center justify-center">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={400}
                    height={400}
                    className="w-42 h-42 object-contain"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-pretty">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
