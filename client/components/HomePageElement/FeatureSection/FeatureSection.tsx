/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-2xl">
                  {/* <img
                    src="/custom-t-shirt-printing-process.jpg"
                    alt="T-shirt printing process"
                    className="w-full h-64 object-cover"
                  /> */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">Custom Printing</h3>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative overflow-hidden rounded-2xl">
                  {/* <img
                    src="/professional-printing-workspace-with-person-workin.jpg"
                    alt="Professional printing workspace"
                    className="w-full h-56 object-cover"
                  /> */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">Expert Team</h3>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-orange-200"
            >
              {/* <img
                src="/custom-printed-t-shirt-with-logo.jpg"
                alt="Custom printed shirt"
                className="w-20 h-20 object-cover rounded-lg"
              /> */}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 px-4 py-2 text-sm font-medium">
              ABOUT PRINTING SERVICE
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              We are just better Quality{" "}
              <span className="text-orange-500">For over 5 years</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              We offer a wide selection of brand-name apparel that's primed for
              personalization. Choose from popular brands like Nike. We offer a
              wide selection of brand-name apparel that's designed for your
              needs.
            </p>

            <div className="flex gap-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">65K</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">65K</div>
                  <div className="text-sm text-gray-600">Banners Printing</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">37K</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">37K</div>
                  <div className="text-sm text-gray-600">T-Shirt Printing</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">
                  Large paper & stock selection & Unique Print
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">
                  Printing programs tailored to your company needs
                </span>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              ORDER NOW
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
