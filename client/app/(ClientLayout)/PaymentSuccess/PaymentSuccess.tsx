/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function PaymentSuccess() {
  const [isHovering, setIsHovering] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const checkmarkVariants: any = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  const orderDetailsVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.1,
      },
    }),
  };

  return (
    <motion.div
      className="w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Card Container */}
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-8 space-y-6"
        whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Success Badge */}
        <motion.div
          className="flex justify-center mb-4"
          variants={itemVariants}
        >
          <motion.div className="relative" variants={checkmarkVariants}>
            <motion.div
              className="absolute inset-0 bg-emerald-400 rounded-full blur-lg opacity-50"
              variants={pulseVariants}
              animate="animate"
            />
            <div className="relative bg-gradient-to-br from-emerald-400 to-emerald-500 p-4 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 text-balance leading-tight">
            Your order has been
            <br />
            successfully submitted
          </h1>
        </motion.div>

        {/* Order Details */}
        <motion.div className="space-y-4 bg-gray-50 rounded-2xl p-5">
          {[
            { label: "Order ID", value: "57625869" },
            { label: "Payment Method", value: "Apple Pay" },
            { label: "Date & Time", value: "01/02/24 23:46" },
            { label: "Total", value: "$ 129" },
          ].map((detail, i) => (
            <motion.div
              key={i}
              className="flex justify-between items-center"
              custom={i}
              variants={orderDetailsVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="text-sm text-gray-500 font-medium">
                {detail.label}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {detail.value}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Track Order Button */}
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          className="w-full py-4 px-6 rounded-full font-semibold text-white text-base transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-full" />

          {/* Hover effect overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 rounded-full opacity-0"
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Button text and shine effect */}
          <div className="relative flex items-center justify-center gap-2">
            <motion.span
              className="relative z-10"
              animate={{ x: isHovering ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Track Order
            </motion.span>
            <motion.svg
              className="w-5 h-5 relative z-10"
              animate={{ x: isHovering ? 6 : 0 }}
              transition={{ duration: 0.2 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7m0 0l-7 7m7-7H5"
              />
            </motion.svg>
          </div>

          {/* Shine animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rounded-full"
            animate={isHovering ? { x: ["100%", "-100%"] } : {}}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.3,
            }}
          />
        </motion.button>

        {/* Success Message */}
        <motion.p
          variants={itemVariants}
          className="text-center text-sm text-gray-500"
        >
          Check your email for order details and tracking information
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
