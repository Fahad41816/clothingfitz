"use client"

import { useState, use, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, Trash2, Save, X, ImageIcon, Palette, Ruler } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { useRouter } from "next/navigation" 
import dynamic from "next/dynamic"
import { productsData } from "../../productsPage"
 

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor/RichTextEditor"), { ssr: false })

interface ColorData {
  name: string
  hex: string
  images: string[]
  active: boolean
}

interface SizeData {
  name: string
  extraCharge: number
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  // const { toast } = useToast()

  const product = productsData.find((p: any ) => p.id === Number.parseInt(id))

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("t-shirt")
  const [price, setPrice] = useState("")
  const [discountPrice, setDiscountPrice] = useState("")
  const [status, setStatus] = useState(true)
  const [primaryImages, setPrimaryImages] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [colors, setColors] = useState<ColorData[]>([])
  const [sizes, setSizes] = useState<SizeData[]>([])

  const [newPrimaryImage, setNewPrimaryImage] = useState("")
  const [newColorImage, setNewColorImage] = useState("")
  const [editingColorIndex, setEditingColorIndex] = useState<number | null>(null)

  useEffect(() => {
    if (product) {
      setTitle(product.title)
      setCategory(product.category)
      setPrice(product.price.toString())
      setDiscountPrice(product.discountPrice?.toString() || "")
      setStatus(product.status === "active")
      setPrimaryImages(product.primaryImages)
      setDescription(product.description)
      setColors(product.colors)
      setSizes(product.sizes)
    }
  }, [product])

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h2>
        <Link href="/dashboard/products">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>
    )
  }

  const isClothing = category === "t-shirt" || category === "hoodie"

  const addPrimaryImage = () => {
    if (newPrimaryImage.trim()) {
      setPrimaryImages([...primaryImages, newPrimaryImage.trim()])
      setNewPrimaryImage("")
    }
  }

  const removePrimaryImage = (index: number) => {
    setPrimaryImages(primaryImages.filter((_, i) => i !== index))
  }

  const addColor = () => {
    setColors([...colors, { name: "", hex: "#000000", images: [], active: true }])
  }

  const updateColor = (index: number, field: keyof ColorData, value: unknown) => {
    const updated = [...colors]
    updated[index] = { ...updated[index], [field]: value }
    setColors(updated)
  }

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index))
  }

  const addColorImage = (colorIndex: number) => {
    if (newColorImage.trim()) {
      const updated = [...colors]
      updated[colorIndex].images = [...updated[colorIndex].images, newColorImage.trim()]
      setColors(updated)
      setNewColorImage("")
    }
  }

  const removeColorImage = (colorIndex: number, imageIndex: number) => {
    const updated = [...colors]
    updated[colorIndex].images = updated[colorIndex].images.filter((_, i) => i !== imageIndex)
    setColors(updated)
  }

  const addSize = () => {
    setSizes([...sizes, { name: "", extraCharge: 0 }])
  }

  const updateSize = (index: number, field: keyof SizeData, value: unknown) => {
    const updated = [...sizes]
    updated[index] = { ...updated[index], [field]: value }
    setSizes(updated)
  }

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (!title || !price || primaryImages.length === 0) {
      // toast({
      //   title: "Missing required fields",
      //   description: "Please fill in title, price, and add at least one primary image.",
      //   variant: "destructive",
      // })
      return
    }

    // toast({
    //   title: "Product updated",
    //   description: "Your product has been successfully updated.",
    // })
    router.push("/dashboard/products")
  }

  return (
    <div className="space-y-6">
      {/* <Toaster /> */}

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Link href="/dashboard/products">
            <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Product</h1>
            <p className="text-muted-foreground">Update product details</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-secondary border-0"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="bg-secondary border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t-shirt">T-Shirt</SelectItem>
                        <SelectItem value="hoodie">Hoodie</SelectItem>
                        <SelectItem value="hat">Hat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="bg-secondary border-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountPrice">Discount Price ($)</Label>
                    <Input
                      id="discountPrice"
                      type="number"
                      step="0.01"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      className="bg-secondary border-0"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
                  <div>
                    <Label>Product Status</Label>
                    <p className="text-sm text-muted-foreground">Enable or disable this product</p>
                  </div>
                  <Switch checked={status} onCheckedChange={setStatus} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Primary Images */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Primary Images *
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newPrimaryImage}
                    onChange={(e) => setNewPrimaryImage(e.target.value)}
                    placeholder="Enter image URL..."
                    className="bg-secondary border-0"
                  />
                  <Button onClick={addPrimaryImage} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                {primaryImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {primaryImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-xl bg-secondary overflow-hidden">
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`Primary ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {index === 0 && <Badge className="absolute top-2 left-2 bg-primary">Main</Badge>}
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePrimaryImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground">Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor value={description} onChange={setDescription} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Colors */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Product Colors
                </CardTitle>
                <Button onClick={addColor} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Color
                </Button>
              </CardHeader>
              <CardContent>
                {colors.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Palette className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No colors added</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {colors.map((color, colorIndex) => (
                      <div key={colorIndex} className="p-4 rounded-xl bg-secondary/50 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full border-2 border-border"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="font-medium">{color.name || "Unnamed Color"}</span>
                            <Badge variant={color.active ? "default" : "secondary"}>
                              {color.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeColor(colorIndex)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Color Name</Label>
                            <Input
                              value={color.name}
                              onChange={(e) => updateColor(colorIndex, "name", e.target.value)}
                              className="bg-background border-0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Color Code</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={color.hex}
                                onChange={(e) => updateColor(colorIndex, "hex", e.target.value)}
                                className="w-12 h-10 p-1 bg-background border-0"
                              />
                              <Input
                                value={color.hex}
                                onChange={(e) => updateColor(colorIndex, "hex", e.target.value)}
                                className="bg-background border-0"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Status</Label>
                            <div className="flex items-center gap-2 h-10">
                              <Switch
                                checked={color.active}
                                onCheckedChange={(checked) => updateColor(colorIndex, "active", checked)}
                              />
                              <span className="text-sm">{color.active ? "Active" : "Inactive"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Color Images ({color.images.length})</Label>
                          <div className="flex gap-2">
                            <Input
                              value={editingColorIndex === colorIndex ? newColorImage : ""}
                              onChange={(e) => {
                                setEditingColorIndex(colorIndex)
                                setNewColorImage(e.target.value)
                              }}
                              onFocus={() => setEditingColorIndex(colorIndex)}
                              placeholder="Enter image URL..."
                              className="bg-background border-0"
                            />
                            <Button onClick={() => addColorImage(colorIndex)} variant="outline" size="sm">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          {color.images.length > 0 && (
                            <div className="flex gap-2 flex-wrap mt-2">
                              {color.images.map((img, imgIndex) => (
                                <div key={imgIndex} className="relative group">
                                  <div className="w-16 h-16 rounded-lg bg-background overflow-hidden">
                                    <img
                                      src={img || "/placeholder.svg"}
                                      alt={`${color.name} ${imgIndex + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-2 -right-2 w-5 h-5 opacity-0 group-hover:opacity-100"
                                    onClick={() => removeColorImage(colorIndex, imgIndex)}
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Sizes */}
          {isClothing && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-0 shadow-lg shadow-primary/5">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-primary" />
                    Product Sizes
                  </CardTitle>
                  <Button onClick={addSize} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Size
                  </Button>
                </CardHeader>
                <CardContent>
                  {sizes.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Ruler className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No sizes added</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sizes.map((size, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="text-xs">Size Name</Label>
                              <Input
                                value={size.name}
                                onChange={(e) => updateSize(index, "name", e.target.value)}
                                className="bg-background border-0"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Extra Charge ($)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={size.extraCharge}
                                onChange={(e) =>
                                  updateSize(index, "extraCharge", Number.parseFloat(e.target.value) || 0)
                                }
                                className="bg-background border-0"
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSize(index)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right Column - Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24">
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="aspect-square bg-secondary">
                    {primaryImages.length > 0 ? (
                      <img
                        src={primaryImages[0] || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ImageIcon className="w-16 h-16 opacity-50" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {category === "t-shirt" ? "T-Shirt" : category === "hoodie" ? "Hoodie" : "Hat"}
                    </Badge>
                    <h3 className="font-semibold text-foreground">{title || "Product Title"}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {discountPrice ? (
                        <>
                          <span className="text-lg font-bold text-foreground">${discountPrice || "0.00"}</span>
                          <span className="text-sm text-muted-foreground line-through">${price || "0.00"}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-foreground">${price || "0.00"}</span>
                      )}
                    </div>
                    {colors.length > 0 && (
                      <div className="flex gap-1 mt-3">
                        {colors.slice(0, 5).map((color, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full border border-border"
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>
                    )}
                    {sizes.length > 0 && (
                      <div className="flex gap-1 flex-wrap mt-3">
                        {sizes.map((size, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {size.name || "Size"}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
