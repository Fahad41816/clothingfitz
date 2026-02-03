"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Check, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import GoogleImg from "@/assets/icon/google-pay.png";
import AppleImg from "@/assets/Icon/apple-pay.png";
import SingUpImg from "@/assets/images/singup.jpg";
import Link from "next/link";

const SingUpPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Registration attempted with: " + email);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Registration Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6 animate-slideInLeft"
          >
            {/* Logo and Welcome Text */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    <LogIn />
                  </span>
                </div>
                <span className="text-2xl font-bold text-primary">
                  ClothingFitz
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Join the
                <span className="text-primary ml-2">ClothingFitz</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Create your account and unlock exclusive access to premium
                collections, special discounts, and early bird offers on every
                purchase.
              </p>
            </motion.div>

            {/* Full Name Input */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-foreground"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base border-2 border-border rounded-xl focus:border-primary transition-colors bg-card"
                />
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base border-2 border-border rounded-xl focus:border-primary transition-colors bg-card"
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 py-3 text-base border-2 border-border rounded-xl focus:border-primary transition-colors bg-card"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary hover:text-secondary transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-foreground"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12 pr-12 py-3 text-base border-2 border-border rounded-xl focus:border-primary transition-colors bg-card"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary hover:text-secondary transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Terms and Conditions Checkbox */}
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-3"
            >
              <button
                type="button"
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  agreedToTerms
                    ? "bg-primary border-primary"
                    : "border-border hover:border-primary"
                }`}
                aria-label="Agree to terms"
              >
                {agreedToTerms && <Check className="w-4 h-4 text-white" />}
              </button>
              <p className="text-sm text-muted-foreground">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-primary font-semibold hover:text-secondary transition-colors"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-primary font-semibold hover:text-secondary transition-colors"
                >
                  Privacy Policy
                </a>
              </p>
            </motion.div>

            {/* Register Button */}
            <motion.div variants={itemVariants}>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !agreedToTerms}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 text-base rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  "Create Your Account"
                )}
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-medium text-muted-foreground uppercase">
                Or sign up with
              </span>
              <div className="flex-1 h-px bg-border" />
            </motion.div>

            {/* Social Registration Buttons */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              <Button
                variant="outline"
                className="border-2 border-border p-2 h-12 rounded-xl hover:bg-muted hover:text-black transition-colors flex items-center justify-center gap-2 bg-transparent"
              >
                <Image
                  src={GoogleImg}
                  alt="Google_Image"
                  width={30}
                  height={30}
                />{" "}
                Google
              </Button>
              <Button
                variant="outline"
                className="border-2 border-border py-3 h-12 rounded-xl hover:bg-muted hover:text-black transition-colors flex items-center justify-center gap-2 bg-transparent"
              >
                <Image
                  src={AppleImg}
                  alt="Google_Image"
                  width={30}
                  height={30}
                />
                <span className="font-semibold">Apple</span>
              </Button>
            </motion.div>

            {/* Login Link */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/singIn"
                  className="text-primary font-semibold hover:text-secondary transition-colors"
                >
                  Login here
                </Link>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:flex items-center justify-center animate-slideInRight"
          >
            <div className="relative w-full h-[600px] max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={SingUpImg}
                alt="Join ClothingFitz"
                className="w-full h-full object-cover"
              />
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-secondary/20 pointer-events-none" />

              {/* Floating welcome badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-6 right-6 bg-white rounded-full p-4 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    Welcome!
                  </div>
                  <div className="text-xs font-semibold text-foreground">
                    Join the family
                  </div>
                </div>
              </motion.div>

              {/* Floating benefits badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                }}
                className="absolute bottom-6 left-6 bg-white rounded-2xl p-4 shadow-xl max-w-xs"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">
                      Get 20% Off
                    </div>
                    <div className="text-xs text-muted-foreground">
                      on your first purchase
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SingUpPage;
