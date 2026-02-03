"use client"

import { use } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Edit,
  CheckCircle,
  XCircle,
  Package,
  Palette,
  Ruler,
  ImageIcon,
  ShoppingBag,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { productsData } from "../page"

export default function ViewProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = productsData.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Package className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-4">The product you are looking for does not exist.</p>
        <Link href="/dashboard/products">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>
    )
  }

  const categoryLabels = {
    "t-shirt": "T-Shirt",
    hoodie: "Hoodie",
    hat: "Hat",
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <Link href="/dashboard/products">
            <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{product.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{categoryLabels[product.category as keyof typeof categoryLabels]}</Badge>
              <Badge variant={product.status === "active" ? "default" : "secondary"}>
                {product.status === "active" ? (
                  <CheckCircle className="w-3 h-3 mr-1" />
                ) : (
                  <XCircle className="w-3 h-3 mr-1" />
                )}
                {product.status}
              </Badge>
            </div>
          </div>
        </div>
        <Link href={`/dashboard/products/${product.id}/edit`}>
          <Button className="bg-primary hover:bg-primary/90">
            <Edit className="w-4 h-4 mr-2" />
            Edit Product
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Primary Images */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Primary Images ({product.primaryImages.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.primaryImages.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative aspect-square rounded-xl bg-secondary overflow-hidden"
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Primary ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 0 && <Badge className="absolute top-2 left-2 bg-primary">Main</Badge>}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Colors */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Available Colors ({product.colors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + index * 0.05 }}
                      className="p-4 rounded-xl bg-secondary/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full border-2 border-border"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div>
                            <p className="font-medium text-foreground">{color.name}</p>
                            <p className="text-sm text-muted-foreground font-mono">{color.hex}</p>
                          </div>
                        </div>
                        <Badge variant={color.active ? "default" : "secondary"}>
                          {color.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {color.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="w-16 h-16 rounded-lg bg-background overflow-hidden">
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`${color.name} ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sizes (for clothing) */}
          {product.sizes.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Card className="border-0 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-primary" />
                    Available Sizes ({product.sizes.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="px-4 py-3 rounded-xl bg-secondary/50 text-center min-w-[80px]"
                      >
                        <p className="font-bold text-foreground text-lg">{size.name}</p>
                        {size.extraCharge > 0 ? (
                          <p className="text-sm text-primary">+${size.extraCharge.toFixed(2)}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">No extra</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right Column - Stats & Pricing */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Pricing */}
          <Card className="border-0 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-foreground">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-primary/10">
                <p className="text-sm text-muted-foreground">Current Price</p>
                <div className="flex items-center gap-2">
                  {product.discountPrice ? (
                    <>
                      <span className="text-3xl font-bold text-primary">${product.discountPrice.toFixed(2)}</span>
                      <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  )}
                </div>
                {product.discountPrice && (
                  <Badge className="mt-2 bg-destructive text-destructive-foreground">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="border-0 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-foreground">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Stock</p>
                    <p className={`text-xl font-bold ${product.stock < 20 ? "text-destructive" : "text-foreground"}`}>
                      {product.stock} units
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sold</p>
                    <p className="text-xl font-bold text-foreground">{product.sold} units</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-semibold text-foreground">
                    ${((product.discountPrice || product.price) * product.sold).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock Value</span>
                  <span className="font-semibold text-foreground">
                    ${((product.discountPrice || product.price) * product.stock).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/dashboard/products/${product.id}/edit`} className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Product
                </Button>
              </Link>
              <Link href="/dashboard/invoices/create" className="block">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Package className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
