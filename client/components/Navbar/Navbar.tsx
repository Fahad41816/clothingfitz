"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  Truck,
  LogOut,
  BanknoteArrowDown,
  LayoutDashboard,
  CircleStar,
  UserRoundPen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileImage from "@/assets/Icon/profile.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const productCategories = {
  hats: {
    title: "Hats",
    featured: [
      {
        name: "SNAPBACK TRUCKER",
        image: "https://i.ibb.co.com/9s19gJB/Snapback-Trucker-01.png",
        link: "/hats/baseball",
      },
      {
        name: "CAMO",
        image: "https://i.ibb.co.com/K9Hbnym/Camo.png",
        link: "/hats/trucker",
      },
      {
        name: "PERFORMANCE",
        image: "https://i.ibb.co.com/WDdpxK6/Performance.png",
        link: "/hats/beanies",
      },
      {
        name: "FITTED",
        image: "https://i.ibb.co.com/GxsBN1S/Fitted.png",
        link: "/hats/snapbacks",
      },
      {
        name: "FLATBILL",
        image: "https://i.ibb.co.com/YRfZZW0/Flatbill.png",
        link: "/hats/snapbacks",
      },
      {
        name: "BEANIES",
        image: "https://i.ibb.co.com/HYMM0c9/Beanies.png",
        link: "/hats/snapbacks",
      },
      {
        name: "DAD HATS",
        image: "https://i.ibb.co.com/dPqWRdf/dad-hat.png",
        link: "/hats/snapbacks",
      },
      {
        name: "BUCKET HATS",
        image: "https://i.ibb.co.com/KKj3kk7/Bucket-hat.png",
        link: "/hats/snapbacks",
      },
      {
        name: "VISOR HATS",
        image: "https://i.ibb.co.com/fDbKJv3/Visor-Hat.png",
        link: "/hats/snapbacks",
      },
    ],
  },
  tshirts: {
    title: "T-Shirts",
    featured: [
      {
        name: "SHORT SLEEVE T-SHIRTS",
        image: "https://i.ibb.co.com/Tq5kw8G/sort-sleev.png",
        link: "/tshirts/basic",
      },
      {
        name: "LONG SLEEVE T-SHIRTS",
        image:
          "https://i.ibb.co.com/Vpmj0y3/b8c19817-d159-43ff-b09d-b5a3ccc5a05e.png",
        link: "/tshirts/premium",
      },
      {
        name: "V NECK T-SHIRTS",
        image:
          "https://i.ibb.co.com/GHmkK6k/Next-Level-Apparel-4-3oz-Unisex-CVC-T-Shirt.png",
        link: "/tshirts/longsleeve",
      },
      {
        name: "KIDS T-SHIRTS",
        image: "https://i.ibb.co.com/Z1nFrnc/kids.png",
        link: "/tshirts/tanks",
      },
    ],
  },
  polo: {
    title: "Polo Shirts",
    featured: [
      {
        name: "Gildan Adult 6 oz. 50/50 Jersey Polo",
        image:
          "https://i.ibb.co.com/9ZjTN7r/267538ee-b9dd-4190-842b-c6aa87b0597f.png",
        link: "/polo/classic",
      },
      {
        name: "CORE365 Ladies’ Origin Performance Piqué Polo",
        image:
          "https://i.ibb.co.com/k275KtF/4c861401-0b6c-45a2-8d50-847f8232e849.png",
        link: "/polo/performance",
      },
      {
        name: "CORE365 Men’s Origin Performance Piqué Polo",
        image:
          "https://i.ibb.co.com/z4k4m0L/9155e00e-971f-4dcd-b7e8-2653d7234b04.png",
        link: "/polo/longsleeve",
      },
      {
        name: "Team 365 Men’s Zone Performance Polo",
        image:
          "https://i.ibb.co.com/g6CTK4w/1f1e8a54-5b9b-464e-ab7c-ddd2f36cc619.png",
        link: "/polo/pique",
      },
    ],
  },
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [user, setuser] = useState(true);

  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#0984e3] to-[#74b9ff] via-[#dfe6e9] text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="font-semibold text-[15px]">+1 954-483-8862</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="font-semibold text-[15px]">
                sales@clothingfitz.com
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="font-semibold text-[15px]">
              Free shipping on orders over $100!
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={"/"} className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ClothingFitz
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {Object.entries(productCategories).map(([key, category]) => (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors py-2">
                      {category.title} <ChevronDown className="h-4 w-4" />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === key && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 w-[600px] bg-background border border-border rounded-lg shadow-xl p-6 mt-2"
                        >
                          <div className="w-full">
                            <div>
                              <h3 className="font-semibold text-foreground mb-4">
                                Featured Products
                              </h3>
                              <div className="grid grid-cols-4 gap-4">
                                {category.featured.map((item, index) => (
                                  <a
                                    key={index}
                                    href={item.link}
                                    className="group flex flex-col items-center p-3 rounded-lg hover:bg-muted transition-colors"
                                  >
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      width={100}
                                      height={100}
                                      className="object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform"
                                    />
                                    <span className="text-sm font-medium text-center">
                                      {item.name}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <a
                  href="#"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>

              <div>
                {user ? (
                  <DropdownMenu
                    open={openDropdown}
                    onOpenChange={() => setOpenDropdown(false)}
                  >
                    <DropdownMenuTrigger
                      onMouseEnter={() => setOpenDropdown(true)}
                      className="border-none outline-0"
                    >
                      <div className="flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer">
                        <Avatar>
                          <AvatarImage
                            src={
                              "https://cdn-icons-png.flaticon.com/512/5249/5249066.png"
                            }
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start justify-start">
                          <p className="font-semibold text-sm">
                            Nahidul Islam Fahad
                          </p>
                          <p className="font-semibold text-sm">
                            nahidulislamfahad6@
                          </p>
                        </div>
                        <div>
                          <ChevronDown />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      onMouseLeave={() => setOpenDropdown(false)}
                      className="w-62"
                    >
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href={"/profile"}>
                        <DropdownMenuItem className="text-gray-800 focus:bg-blue-500 focus:text-white cursor-pointer group-[HoverIcon]">
                          <UserRoundPen className="HoverIcon:hover:text-white" />
                          Profile
                        </DropdownMenuItem>
                      </Link>
                      <Link href={"/My-Order"}>
                        <DropdownMenuItem className="text-gray-800 focus:bg-blue-500 focus:text-white cursor-pointer group-[HoverIcon]">
                          <CircleStar className="HoverIcon:hover:text-white" />
                          My Order
                        </DropdownMenuItem>
                      </Link>
                      <Link href={"/Dashboard"}>
                        <DropdownMenuItem className="text-gray-800 focus:bg-blue-500 focus:text-white cursor-pointer group-[HoverIcon]">
                          <LayoutDashboard className="HoverIcon:hover:text-white" />
                          Dashboard
                        </DropdownMenuItem>
                      </Link>
                      <Link href={"/Bill"}>
                        <DropdownMenuItem className="text-gray-800 focus:bg-blue-500 focus:text-white cursor-pointer group-[HoverIcon]">
                          <BanknoteArrowDown className="HoverIcon:hover:text-white" />
                          Billing
                        </DropdownMenuItem>
                      </Link>

                      <DropdownMenuItem
                        onClick={() => setuser(false)}
                        className="text-red-600 focus:bg-red-100 focus:text-red cursor-pointer group-[HoverIcon]"
                      >
                        <LogOut className="HoverIcon:hover:text-red-200" />
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link href={"/singIn"}>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-t border-border"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div className="px-3 py-2">
                  <Input placeholder="Search products..." />
                </div>
                <a
                  href="#"
                  className="block px-3 py-2 text-foreground hover:text-primary"
                >
                  Hats
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-foreground hover:text-primary"
                >
                  T-Shirts
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-foreground hover:text-primary"
                >
                  Polo
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-foreground hover:text-primary"
                >
                  Contact Us
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-foreground hover:text-primary"
                >
                  Process
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
