/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import StripeGetway from "@/components/PaymentsGetway/StripeGetway";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Elements } from "@stripe/react-stripe-js";
import { ShieldCheck } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import GpayIcon from "@/assets/Icon/google-pay.png";
import AppleIcon from "@/assets/Icon/apple-pay.png";
import PaypalIcon from "@/assets/Icon/Paypal.png";
import Image from "next/image";
const stripePromise = loadStripe(
  "pk_test_51NJZyDEWZrevdXvyL05y7mCSXWpHPt9NeWkzPIzXaCa95EoLq9npzOrJJup1OAJlG530TjFWQvccU6l4etn0BknB00Igt4nJwY"
);

const page = () => {
  const deliveryMethod = "pickup";
  const courier = "standard";

  const options: any = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Method  */}
            <p className="text-2xl font-bold">Payment Method</p>
            <div className="w-full flex items-center justify-around gap-2  ">
              <Button
                variant="secondary"
                className="bg-[#eee] w-[160px] h-[50px]"
              >
                <Image src={GpayIcon} alt="Google_Pay" width={35} /> Google Pay
              </Button>
              <Button
                variant="secondary"
                className="bg-[#eee] w-[160px] h-[50px] "
              >
                <Image src={AppleIcon} alt="Google_Pay" width={35} /> Apple Pay
              </Button>
              <Button
                variant="secondary"
                className="bg-[#eee] w-[160px] h-[50px] "
              >
                <Image src={PaypalIcon} alt="Google_Pay" width={70} />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="w-52 h-[1px] bg-slate-300"></div>
              <span className="font-semibold text-slate-400">
                Or Pay with different method
              </span>
              <div className="w-52 h-[1px] bg-slate-300"></div>
            </div>

            <Elements stripe={stripePromise} options={options}>
              <StripeGetway />
            </Elements>
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
};

export default page;
