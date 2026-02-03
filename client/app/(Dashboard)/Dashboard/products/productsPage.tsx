"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export const productsData = [
  {
    id: 1,
    title: "Premium Cotton T-Shirt",
    category: "t-shirt",
    price: 29.99,
    discountPrice: 24.99,
    status: "active",
    primaryImages: [
      "/custom-blue-t-shirt.jpg",
      "/tshirt-front.jpg",
      "/tshirt-back.jpg",
    ],
    description:
      "<p>High-quality cotton t-shirt perfect for custom prints and embroidery.</p><ul><li>100% Premium Cotton</li><li>Pre-shrunk fabric</li><li>Seamless collar</li></ul>",
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: ["/tshirt-white.jpg", "/tshirt-white-back.jpg"],
        active: true,
      },
      {
        name: "Black",
        hex: "#000000",
        images: ["/tshirt-black.jpg", "/tshirt-black-back.jpg"],
        active: true,
      },
      {
        name: "Navy",
        hex: "#1E3A5F",
        images: ["/tshirt-navy.jpg"],
        active: true,
      },
      {
        name: "Red",
        hex: "#DC2626",
        images: ["/tshirt-red.jpg"],
        active: false,
      },
    ],
    sizes: [
      { name: "S", extraCharge: 0 },
      { name: "M", extraCharge: 0 },
      { name: "L", extraCharge: 0 },
      { name: "XL", extraCharge: 2 },
      { name: "2XL", extraCharge: 4 },
      { name: "3XL", extraCharge: 6 },
    ],
    stock: 150,
    sold: 456,
  },
  {
    id: 2,
    title: "Custom Embroidered Snapback",
    category: "hat",
    price: 34.99,
    discountPrice: null,
    status: "active",
    primaryImages: ["/snapback-hat-navy.jpg", "/snapback-front.jpg"],
    description:
      "<p>Classic snapback hat with premium embroidery options.</p><p>Perfect for teams, events, or personal style.</p>",
    colors: [
      {
        name: "Black",
        hex: "#000000",
        images: ["/hat-black.jpg", "/hat-black-side.jpg"],
        active: true,
      },
      { name: "Navy", hex: "#1E3A5F", images: ["/hat-navy.jpg"], active: true },
      {
        name: "White",
        hex: "#FFFFFF",
        images: ["/hat-white.jpg"],
        active: true,
      },
    ],
    sizes: [],
    stock: 89,
    sold: 234,
  },
  {
    id: 3,
    title: "Premium Pullover Hoodie",
    category: "hoodie",
    price: 54.99,
    discountPrice: 49.99,
    status: "active",
    primaryImages: [
      "/premium-white-hoodie.jpg",
      "/hoodie-front.jpg",
      "/hoodie-back.jpg",
    ],
    description:
      "<p>Cozy pullover hoodie with front pocket, perfect for custom designs.</p><ul><li>80% Cotton, 20% Polyester</li><li>Soft fleece interior</li><li>Kangaroo pocket</li></ul>",
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: ["/hoodie-white.jpg", "/hoodie-white-back.jpg"],
        active: true,
      },
      {
        name: "Gray",
        hex: "#6B7280",
        images: ["/hoodie-gray.jpg"],
        active: true,
      },
      {
        name: "Black",
        hex: "#000000",
        images: ["/hoodie-black.jpg", "/hoodie-black-back.jpg"],
        active: true,
      },
    ],
    sizes: [
      { name: "S", extraCharge: 0 },
      { name: "M", extraCharge: 0 },
      { name: "L", extraCharge: 0 },
      { name: "XL", extraCharge: 3 },
      { name: "2XL", extraCharge: 5 },
    ],
    stock: 67,
    sold: 189,
  },
  {
    id: 4,
    title: "Classic Polo Shirt",
    category: "t-shirt",
    price: 39.99,
    discountPrice: null,
    status: "deactive",
    primaryImages: ["/polo-shirt-green.jpg"],
    description: "<p>Professional polo shirt ideal for business branding.</p>",
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: ["/polo-white.jpg"],
        active: true,
      },
      {
        name: "Navy",
        hex: "#1E3A5F",
        images: ["/polo-navy.jpg"],
        active: true,
      },
      {
        name: "Green",
        hex: "#059669",
        images: ["/polo-green.jpg"],
        active: false,
      },
    ],
    sizes: [
      { name: "S", extraCharge: 0 },
      { name: "M", extraCharge: 0 },
      { name: "L", extraCharge: 0 },
      { name: "XL", extraCharge: 2 },
    ],
    stock: 0,
    sold: 78,
  },
  {
    id: 5,
    title: "Dad Hat",
    category: "hat",
    price: 24.99,
    discountPrice: 19.99,
    status: "active",
    primaryImages: ["/dad-hat-beige.jpg"],
    description: "<p>Relaxed fit dad hat with adjustable strap.</p>",
    colors: [
      {
        name: "Beige",
        hex: "#D4A373",
        images: ["/dadhat-beige.jpg"],
        active: true,
      },
      {
        name: "Black",
        hex: "#000000",
        images: ["/dadhat-black.jpg"],
        active: true,
      },
    ],
    sizes: [],
    stock: 120,
    sold: 312,
  },
  {
    id: 6,
    title: "Crewneck Sweatshirt",
    category: "hoodie",
    price: 44.99,
    discountPrice: null,
    status: "active",
    primaryImages: ["/custom-gray-sweatshirt.jpg"],
    description: "<p>Comfortable crewneck sweatshirt for casual wear.</p>",
    colors: [
      {
        name: "Gray",
        hex: "#6B7280",
        images: ["/sweat-gray.jpg"],
        active: true,
      },
      {
        name: "Black",
        hex: "#000000",
        images: ["/sweat-black.jpg"],
        active: true,
      },
    ],
    sizes: [
      { name: "S", extraCharge: 0 },
      { name: "M", extraCharge: 0 },
      { name: "L", extraCharge: 0 },
      { name: "XL", extraCharge: 3 },
      { name: "2XL", extraCharge: 5 },
    ],
    stock: 45,
    sold: 156,
  },
];

const categoryLabels = {
  "t-shirt": "T-Shirt",
  hoodie: "Hoodie",
  hat: "Hat",
};

const statusColors = {
  active: "bg-success/10 text-success border-success/20",
  deactive: "bg-muted text-muted-foreground border-border",
};

// Removed defaultNewProduct and related states (isAddDialogOpen, isEditDialogOpen, selectedProduct, newProduct)
// as the UI for adding/editing products has been moved to separate pages.

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [products, setProducts] = useState(productsData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "deactive" : "active" }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Product Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your product catalog
          </p>
        </div>
        <Link href="/dashboard/products/add">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-0"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-secondary border-0">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="t-shirt">T-Shirts</SelectItem>
                  <SelectItem value="hoodie">Hoodies</SelectItem>
                  <SelectItem value="hat">Hats</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-secondary border-0">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="deactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {paginatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card className="border-0 shadow-lg shadow-primary/5 overflow-hidden group">
                  {/* Product Image */}
                  <div className="relative h-48 bg-secondary overflow-hidden">
                    <Image
                      src={product.primaryImages[0] || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge
                        variant="outline"
                        className={
                          statusColors[
                            product.status as keyof typeof statusColors
                          ]
                        }
                      >
                        {product.status === "active" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {product.status}
                      </Badge>
                    </div>
                    {product.discountPrice && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-destructive text-destructive-foreground">
                          {Math.round(
                            ((product.price - product.discountPrice) /
                              product.price) *
                              100
                          )}
                          % OFF
                        </Badge>
                      </div>
                    )}
                    {/* Image count badge */}
                    {product.primaryImages.length > 1 && (
                      <div className="absolute bottom-3 left-3">
                        <Badge
                          variant="secondary"
                          className="bg-background/80 backdrop-blur-sm"
                        >
                          {product.primaryImages.length} images
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {
                            categoryLabels[
                              product.category as keyof typeof categoryLabels
                            ]
                          }
                        </Badge>
                        <h3 className="font-semibold text-foreground line-clamp-1">
                          {product.title}
                        </h3>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/products/${product.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/products/${product.id}/edit`}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(product.id)}
                          >
                            {product.status === "active" ? (
                              <>
                                <XCircle className="w-4 h-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      {product.discountPrice ? (
                        <>
                          <span className="text-lg font-bold text-foreground">
                            ${product.discountPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-foreground">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Colors */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-muted-foreground">
                        Colors:
                      </span>
                      <div className="flex gap-1">
                        {product.colors.slice(0, 5).map((color, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 rounded-full border-2 ${
                              color.active
                                ? "border-foreground/20"
                                : "border-destructive"
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={`${color.name} (${color.images.length} images)`}
                          />
                        ))}
                        {product.colors.length > 5 && (
                          <span className="text-xs text-muted-foreground">
                            +{product.colors.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Sizes (only for clothing) */}
                    {product.sizes.length > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-muted-foreground">
                          Sizes:
                        </span>
                        <div className="flex gap-1 flex-wrap">
                          {product.sizes.map((size, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs"
                            >
                              {size.name}
                              {size.extraCharge > 0 && ` +$${size.extraCharge}`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Stock: </span>
                        <span
                          className={
                            product.stock < 20
                              ? "text-destructive font-medium"
                              : "text-foreground"
                          }
                        >
                          {product.stock}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Sold: </span>
                        <span className="text-foreground font-medium">
                          {product.sold}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Removed Add Product Dialog */}
      {/* Removed Edit Product Dialog */}
    </div>
  );
}
