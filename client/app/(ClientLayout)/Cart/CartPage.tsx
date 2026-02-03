"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
  HandCoins,
  X,
  Check,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { CartItemRow } from "@/components/CartPageComponents/CartProductRow";
import { motion } from "framer-motion";
const INITIAL_CART = [
  {
    id: "1",
    name: "Custom Embroidered Snapback",
    type: "hat",
    basePrice: 24.99,
    variants: [
      {
        id: "v1",
        color: "Navy Blue",
        quantity: 2,
        price: 24.99,
        image:
          "https://cdn.shopify.com/s/files/1/1616/9825/files/545_OrionWhite_Dad_45angle_Web.png?v=1758667084&width=500&crop=center",
      },
      {
        id: "v2",
        color: "Classic Red",
        quantity: 1,
        price: 24.99,
        image:
          "https://cdn.shopify.com/s/files/1/1616/9825/files/545_OrionWhite_Dad_45angle_Web.png?v=1758667084&width=500&crop=center",
      },
    ],
  },
  {
    id: "2",
    name: "Premium Cotton Tee",
    type: "clothing",
    basePrice: 19.99,
    variants: [
      {
        id: "v3",
        color: "Black",
        size: "L",
        quantity: 5,
        price: 19.99,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSiN6Bmoxi-12YyLT80yiaCCfudW-jDHVj6A&s",
      },
      {
        id: "v4",
        color: "Black",
        size: "XL",
        quantity: 2,
        price: 21.99,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSiN6Bmoxi-12YyLT80yiaCCfudW-jDHVj6A&s",
      },
      {
        id: "v5",
        color: "White",
        size: "M",
        quantity: 1,
        price: 19.99,
        image: "/placeholder.svg?height=100&width=100&text=White+Tee",
      },
    ],
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  const updateQuantity = (
    itemId: string,
    variantId: string,
    newQty: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== itemId) return item;
          return {
            ...item,
            variants: item.variants.map((v) =>
              v.id === variantId ? { ...v, quantity: newQty } : v
            ),
          };
        })
        .filter((item) => item.variants.some((v) => v.quantity > 0))
    ); // Remove item if all variants are 0? Or keep empty?
  };

  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return (
      acc + item.variants.reduce((vAcc, v) => vAcc + v.quantity * v.price, 0)
    );
  }, 0);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState(0);

  // Animation variants
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

 

  const handleApplyPromo = () => {
    setPromoError("");

    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    // Mock promo codes
    const validPromos: { [key: string]: number } = {
      SAVE10: 0.1,
      SAVE20: 0.2,
      SAVE15: 0.15,
    };

    if (validPromos[promoCode.toUpperCase()]) {
      const discountAmount = subtotal * validPromos[promoCode.toUpperCase()];
      setDiscount(discountAmount);
      setAppliedPromo(promoCode.toUpperCase());
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setDiscount(0);
    setPromoCode("");
    setPromoError("");
  };

  const shipping = subtotal > 100 ? 0 : 15.0;
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="w-full overflow-hidden relative flex flex-col items-center justify-center p-20 bg-gradient-to-l from-blue-300/20 to-blue-500/30">
        <p className="text-3xl font-semibold z-50 flex gap-1 items-center justify-center">
          Shopping Cart <ShoppingBag size={40} />
        </p>
        <p className="mt-5 z-50">Home / Shopping Cart</p>

        {/* circle animation  */}
        <div className="w-36 h-36 bg-gradient-to-tr  from-blue-400 to-blue-200 absolute rounded-full -bottom-10 right-14"></div>
        <div className="w-32 h-32 bg-white/20 shadow-l -top-5 right-6 absolute rounded-full"></div>
        <div className="w-32 h-32 bg-gradient-to-tr  from-blue-400 to-blue-200 absolute left-0 top-0 rounded-full"></div>
        <div className="w-96 h-96 bg-gradient-to-tr  from-sky-100 to-sky-200 absolute left-[30%] top-0 rounded-full"></div>
      </div>
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link
            href="/"
            className="hover:text-blue-600 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mt-2 mb-6">
              Looks like you haven&lsquo;t added anything yet.
            </p>
            <Button asChild className="bg-[#06B6D4] hover:bg-[#0891b2]">
              <Link href="/">Start Designing</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className=" border-2 rounded-xl bg-gradient-to-tl from-pink-400/30 via-blue-100 to-blue-300/40 p-4 ">
                <div className="bg-white/30 p-6 rounded-xl shadow-sm border-2 border-gray-100 ">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 border-b-2 py-2 border-gray-200">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        <span className="font-medium text-gray-900">
                          ${shipping.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax Estimate</span>
                      <span className="font-medium text-gray-900">
                        Calculated at checkout
                      </span>
                    </div>
                  </div>

                  {/* <Separator className="mb-6" /> */}

                  <div className="flex justify-between items-center mb-8 border-t-2 py-2 border-gray-200">
                    <span className="text-lg font-bold text-gray-900">
                      Total Payable
                    </span>
                    <span className="text-2xl font-bold text-[#3B82F6]">
                      ${(subtotal + shipping).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Section  */}
                <div className="bg-white/30  rounded-xl shadow-sm border-2 border-gray-100 mt-2">
                  <motion.div 
                    variants={containerVariants}
                  >
                    {appliedPromo ? (
                      // Applied Promo Display
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border-green-300 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <Check className="w-5 h-5 text-green-600" />
                          </motion.div>
                          <div>
                            <p className="text-sm font-semibold text-green-900">
                              {appliedPromo} Applied
                            </p>
                            <p className="text-xs text-green-700">
                              Saving ${discount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={removePromo}
                          className="text-green-600 hover:text-green-800 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    ) : (
                      // Promo Input Form
                      <motion.div
                        className="space-y-3 p-2"
                        variants={containerVariants}
                      >
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Ticket className="w-4 h-4" />
                          Have a promo code?
                        </label>
                        <div className="flex gap-2">
                          <motion.input
                            type="text"
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => {
                              setPromoCode(e.target.value);
                              setPromoError("");
                            }}
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleApplyPromo()
                            }
                            className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white/50 text-gray-900 placeholder-gray-500 transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.button
                            onClick={handleApplyPromo}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:shadow-lg transition-shadow"
                          >
                            Apply
                          </motion.button>
                        </div>
                        {promoError && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-600 font-medium"
                          >
                            {promoError}
                          </motion.p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                <Button
                  asChild
                  className="w-full h-12 text-lg bg-gradient-to-l from-[#3498db] via-blue-300 to-[#2980b9] shadow-lg shadow-cyan-500/20 mt-5 "
                >
                  <Link href="/checkout">
                    Proceed to Secure Checkout{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <div className="flex items-center justify-center mt-2 ">
                  <p className="font-semibold text-slate-500">
                    Estimated Delivery by 25 Dec, 2025
                  </p>
                </div>
                <div className="mt-6 flex justify-center gap-4 text-gray-400">
                  {/* Payment Icons Placeholder */}
                  <div
                    className="w-8 h-5 bg-gray-100 rounded border"
                    title="Visa"
                  ></div>
                  <div
                    className="w-8 h-5 bg-gray-100 rounded border"
                    title="Mastercard"
                  ></div>
                  <div
                    className="w-8 h-5 bg-gray-100 rounded border"
                    title="PayPal"
                  ></div>
                  <div
                    className="w-8 h-5 bg-gray-100 rounded border"
                    title="Apple Pay"
                  ></div>
                </div>
              </div>

              <div className="flex flex-col bg-white border-2 rounded-2xl mt-2 p-4">
                <div className="flex justify-start gap-1">
                  <HandCoins size={35} />
                  <h1 className="font-semibold">
                    YOUR SATISFACTION IS GUARANTEED
                  </h1>
                </div>
                <p className="mt-2">
                  We&#39;re confident we design and sell the very best Red Light
                  equipment available at an affordable price, and we want you to
                  share our confidence! that&rsquo;s why we back every sale with a
                  60-day money back guarantee.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
