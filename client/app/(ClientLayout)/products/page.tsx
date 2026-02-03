"use client"

import { useState } from "react" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ProductFilters } from "@/components/ProductFilter/ProductFilter"
import { ProductCard } from "@/components/ProductCard/ProductCard"

// Sample product data
const products = [
  {
    id: "1",
    name: "Custom Baseball Cap",
    price: 24.99,
    image: "/beige-baseball-cap.jpg",
    category: "Hats",
    colors: ["#F5F5DC", "#000000", "#001F3F", "#FFFFFF"],
    isNew: true,
  },
  {
    id: "2",
    name: "Premium Snapback Hat",
    price: 29.99,
    image: "/black-snapback-hat.jpg",
    category: "Hats",
    colors: ["#000000", "#FFFFFF", "#FF4136", "#0074D9"],
  },
  {
    id: "3",
    name: "Classic Cotton T-Shirt",
    price: 19.99,
    image: "/white-cotton-tshirt.jpg",
    category: "T-Shirts",
    colors: ["#FFFFFF", "#000000", "#001F3F", "#2ECC40"],
    isNew: true,
  },
  {
    id: "4",
    name: "Performance Polo Shirt",
    price: 34.99,
    image: "/navy-polo-shirt.jpg",
    category: "Polo Shirts",
    colors: ["#001F3F", "#FFFFFF", "#000000"],
  },
  {
    id: "5",
    name: "Vintage Dad Hat",
    price: 22.99,
    image: "/vintage-dad-hat.jpg",
    category: "Hats",
    colors: ["#8B4513", "#000000", "#FFFFFF"],
  },
  {
    id: "6",
    name: "Graphic Print T-Shirt",
    price: 24.99,
    image: "/graphic-tshirt.png",
    category: "T-Shirts",
    colors: ["#000000", "#FFFFFF", "#FF4136"],
  },
  {
    id: "7",
    name: "Trucker Mesh Cap",
    price: 21.99,
    image: "/trucker-mesh-cap.jpg",
    category: "Hats",
    colors: ["#000000", "#FFFFFF", "#0074D9"],
  },
  {
    id: "8",
    name: "Premium Polo Shirt",
    price: 39.99,
    image: "/white-polo-shirt.png",
    category: "Polo Shirts",
    colors: ["#FFFFFF", "#001F3F", "#000000"],
    isNew: true,
  },
  {
    id: "9",
    name: "Fitted Baseball Cap",
    price: 27.99,
    image: "/fitted-baseball-cap.jpg",
    category: "Hats",
    colors: ["#000000", "#FFFFFF", "#FF4136", "#0074D9"],
  },
  {
    id: "10",
    name: "V-Neck T-Shirt",
    price: 21.99,
    image: "/vneck-tshirt.jpg",
    category: "T-Shirts",
    colors: ["#000000", "#FFFFFF", "#001F3F"],
  },
  {
    id: "11",
    name: "Beanie Winter Hat",
    price: 18.99,
    image: "/beanie-winter-hat.jpg",
    category: "Hats",
    colors: ["#000000", "#001F3F", "#2ECC40"],
  },
  {
    id: "12",
    name: "Long Sleeve Polo",
    price: 42.99,
    image: "/long-sleeve-polo.jpg",
    category: "Polo Shirts",
    colors: ["#001F3F", "#000000", "#FFFFFF"],
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto"> 

      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">All Products</h1>
          <p className="text-muted-foreground text-lg">Discover our collection of customizable apparel</p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <ProductFilters />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <ProductFilters />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing {products.length} products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t bg-muted/30">
        <div className="container py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 ClothingFitz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
