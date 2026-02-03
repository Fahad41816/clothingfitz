"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Truck,
  Clock, 
  ShieldCheck,
  Store,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<"shipping" | "pickup">(
    "shipping"
  );
  // const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [courier, setCourier] = useState("standard");

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <div className="container mx-auto px-4 py-10">
        {/* Checkout Progress (Visual only) */}
        <div className="flex items-center justify-center mb-12 text-sm font-medium text-gray-500">
          <span className="text-[#3B82F6]">Cart</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#3B82F6]">Information</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900">Checkout</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span>Payment</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/*guest user checkout email section  */}
            <Card className="p-4">
              <h2 className="text-2xl font-bold flex items-center justify-start gap-1"><Mail color="blue"/> Contact Information</h2>
              <p className="text-gray-400">
                you are currently checking out as a guest. please enter your
                email address below so that we can send you confirmation of your
                order. if you are allready a member please{" "}
                <a className="font-semibold text-blue-500">Login</a>
              </p> 
                <Input placeholder="Email" /> 
            </Card>

            {/* Delivery Method Toggle */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#3B82F6]" /> Delivery Method
              </h2>

              <RadioGroup
                defaultValue="shipping"
                value={deliveryMethod}
                onValueChange={(v) =>
                  setDeliveryMethod(v as "shipping" | "pickup")
                }
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="shipping"
                    id="dm-shipping"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="dm-shipping"
                    className="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-200 peer-data-[state=checked]:border-[#3B82F6] peer-data-[state=checked]:bg-blue-50 transition-all h-full"
                  >
                    <Truck className="w-8 h-8 mb-2 text-gray-600 peer-data-[state=checked]:text-[#3B82F6]" />
                    <span className="font-semibold text-lg">Ship to Me</span>
                    <span className="text-sm text-gray-500 text-center mt-1">
                      Delivery to your address
                    </span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem
                    value="pickup"
                    id="dm-pickup"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="dm-pickup"
                    className="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-200 peer-data-[state=checked]:border-[#3B82F6] peer-data-[state=checked]:bg-blue-50 transition-all h-full"
                  >
                    <Store className="w-8 h-8 mb-2 text-gray-600 peer-data-[state=checked]:text-[#3B82F6]" />
                    <span className="font-semibold text-lg">Pick Up</span>
                    <span className="text-sm text-gray-500 text-center mt-1">
                      Collect from our store
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </section>

            <AnimatePresence mode="wait">
              {deliveryMethod === "pickup" ? (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  key="pickup-info"
                  className="bg-blue-50 border border-blue-100 p-6 rounded-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm text-[#3B82F6]">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Pickup Location
                      </h3>
                      <p className="text-gray-700">
                        123 Fashion Avenue, Design District
                      </p>
                      <p className="text-gray-700">New York, NY 10001</p>

                      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Clock className="w-4 h-4" />
                        Available for pickup: Mon-Fri, 9AM - 6PM
                      </div>
                      <div className="mt-2 text-sm text-[#3B82F6]">
                        Please wait for your &rdquo;Ready for Pickup&rdquo; email before
                        visiting.
                      </div>
                    </div>
                  </div>
                </motion.section>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  key="shipping-form"
                  className="space-y-8"
                >
                  {/* Shipping Address Form */}
                  <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Main St, Apt 4B" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State / Province</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP / Postal Code</Label>
                        <Input id="zip" placeholder="10001" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                  </section>

                  {/* Courier Selection */}
                  <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Courier Method
                    </h2>
                    <RadioGroup
                      value={courier}
                      onValueChange={setCourier}
                      className="space-y-3"
                    >
                      <div
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                          courier === "standard"
                            ? "border-[#3B82F6] bg-blue-50"
                            : "hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="standard" id="c-standard" />
                          <div>
                            <Label
                              htmlFor="c-standard"
                              className="font-semibold cursor-pointer"
                            >
                              Standard Shipping
                            </Label>
                            <p className="text-sm text-gray-500">
                              2 to 5 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-medium">$15.00</span>
                      </div>

                      <div
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                          courier === "express"
                            ? "border-[#3B82F6] bg-blue-50"
                            : "hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="express" id="c-express" />
                          <div>
                            <Label
                              htmlFor="c-express"
                              className="font-semibold cursor-pointer"
                            >
                              Express Priority
                            </Label>
                            <p className="text-sm text-gray-500">
                              1 to 2 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-medium">$25.00</span>
                      </div>

                      <div
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                          courier === "overnight"
                            ? "border-[#3B82F6] bg-blue-50"
                            : "hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="overnight" id="c-overnight" />
                          <div>
                            <Label
                              htmlFor="c-overnight"
                              className="font-semibold cursor-pointer"
                            >
                              Overnight Air
                            </Label>
                            <p className="text-sm text-gray-500">
                              Next day before 12PM
                            </p>
                          </div>
                        </div>
                        <span className="font-medium">$45.00</span>
                      </div>
                    </RadioGroup>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                {/* Mock Item in summary */}
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded border flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">
                      Custom Embroidered Snapback
                    </p>
                    <p className="text-xs text-gray-500">Qty: 3</p>
                  </div>
                  <p className="text-sm font-medium">$74.97</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded border flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">
                      Premium Cotton Tee
                    </p>
                    <p className="text-xs text-gray-500">Qty: 8</p>
                  </div>
                  <p className="text-sm font-medium">$163.92</p>
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>$238.89</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {deliveryMethod === "pickup" ? (
                    <span className="text-green-600">Free (Pickup)</span>
                  ) : (
                    <span>
                      {courier === "standard"
                        ? "$15.00"
                        : courier === "express"
                        ? "$25.00"
                        : "$45.00"}
                    </span>
                  )}
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>$19.11</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-[#3B82F6]">
                  $273.00
                </span>
              </div>

              <Button className="w-full h-12 text-lg bg-gradient-to-tl from-[#06B6D4] to-[#0cdbff] hover:bg-[#0891b2] cursor-pointer shadow-lg shadow-cyan-500/20">
                Continue to Payment
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-green-500" /> Secure SSL
                Encrypted Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
