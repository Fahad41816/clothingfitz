"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  User,
  Mail,
  CreditCard,
  Trash2,
  Plus,
  Send,
  CheckCircle,
  ShoppingBag,
  ArrowRight,
  Percent,
  Tag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
// import { useToast } from "@/hooks/use-toast"
// import { Toaster } from "@/components/ui/toaster"
import Image from "next/image";

const productsData = [
  {
    id: 1,
    title: "Premium Cotton T-Shirt",
    category: "t-shirt",
    basePrice: 29.99,
    image: "/custom-blue-t-shirt.jpg",
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#1E3A5F" },
    ],
    sizes: [
      { name: "S", extraCharge: 0 },
      { name: "M", extraCharge: 0 },
      { name: "L", extraCharge: 0 },
      { name: "XL", extraCharge: 2 },
      { name: "2XL", extraCharge: 4 },
    ],
  },
  {
    id: 2,
    title: "Custom Embroidered Snapback",
    category: "hat",
    basePrice: 34.99,
    image: "/snapback-hat-navy.jpg",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#1E3A5F" },
      { name: "White", hex: "#FFFFFF" },
    ],
    sizes: [],
  },
  {
    id: 3,
    title: "Premium Pullover Hoodie",
    category: "hoodie",
    basePrice: 54.99,
    image: "/premium-white-hoodie.jpg",
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Gray", hex: "#6B7280" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: [
      { name: "S", extraCharge: 0 },
      { name: "M", extraCharge: 0 },
      { name: "L", extraCharge: 0 },
      { name: "XL", extraCharge: 3 },
      { name: "2XL", extraCharge: 5 },
    ],
  },
  {
    id: 4,
    title: "Dad Hat",
    category: "hat",
    basePrice: 24.99,
    image: "/dad-hat-beige.jpg",
    colors: [
      { name: "Beige", hex: "#D4A373" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: [],
  },
  {
    id: 5,
    title: "Crewneck Sweatshirt",
    category: "hoodie",
    basePrice: 44.99,
    image: "/custom-gray-sweatshirt.jpg",
    colors: [
      { name: "Gray", hex: "#6B7280" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: [
      { name: "S", extraCharge: 0 },
      { name: "M", extraCharge: 0 },
      { name: "L", extraCharge: 0 },
      { name: "XL", extraCharge: 3 },
    ],
  },
];

interface SizeQuantity {
  size: string;
  quantity: number;
  extraCharge: number;
}

interface InvoiceItem {
  id: number;
  productId: number;
  product: (typeof productsData)[0];
  color: string;
  sizeQuantities: SizeQuantity[]; // For clothing - multiple sizes
  quantity: number; // For hats - single quantity
  unitPrice: number;
}

export default function CreateInvoicePage() {
  //   const { toast } = useToast()
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [sizeQuantities, setSizeQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [generatedInvoiceId, setGeneratedInvoiceId] = useState("");

  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(
    "percentage"
  );
  const [discountValue, setDiscountValue] = useState("");

  const currentProduct = productsData.find(
    (p) => p.id.toString() === selectedProduct
  );
  const isClothing = currentProduct && currentProduct.sizes.length > 0;

  // Initialize size quantities when product changes
  const handleProductChange = (productId: string) => {
    setSelectedProduct(productId);
    setSelectedColor("");
    setSizeQuantities({});
    setQuantity(1);
  };

  const updateSizeQuantity = (sizeName: string, qty: number) => {
    setSizeQuantities((prev) => ({
      ...prev,
      [sizeName]: Math.max(0, qty),
    }));
  };

  const getTotalItemQuantity = () => {
    if (!isClothing) return quantity;
    return Object.values(sizeQuantities).reduce((sum, qty) => sum + qty, 0);
  };

  const addItem = () => {
    if (!currentProduct || !selectedColor) {
      // toast({
      //   title: "Missing information",
      //   description: "Please select a product and color.",
      //   variant: "destructive",
      // });
      return;
    }

    if (isClothing) {
      const totalQty = getTotalItemQuantity();
      if (totalQty === 0) {
        // toast({
        //   title: "No size selected",
        //   description: "Please add quantity for at least one size.",
        //   variant: "destructive",
        // });
        return;
      }

      // Create size quantities array
      const sizes: SizeQuantity[] = Object.entries(sizeQuantities)
        .filter(([_, qty]) => qty > 0)
        .map(([sizeName, qty]) => {
          const sizeData = currentProduct.sizes.find(
            (s) => s.name === sizeName
          );
          return {
            size: sizeName,
            quantity: qty,
            extraCharge: sizeData?.extraCharge || 0,
          };
        });

      const newItem: InvoiceItem = {
        id: Date.now(),
        productId: currentProduct.id,
        product: currentProduct,
        color: selectedColor,
        sizeQuantities: sizes,
        quantity: totalQty,
        unitPrice: currentProduct.basePrice,
      };

      setItems([...items, newItem]);
    } else {
      // Hat - no sizes
      const newItem: InvoiceItem = {
        id: Date.now(),
        productId: currentProduct.id,
        product: currentProduct,
        color: selectedColor,
        sizeQuantities: [],
        quantity,
        unitPrice: currentProduct.basePrice,
      };

      setItems([...items, newItem]);
    }

    setSelectedProduct("");
    setSelectedColor("");
    setSizeQuantities({});
    setQuantity(1);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateItemTotal = (item: InvoiceItem) => {
    if (item.sizeQuantities.length > 0) {
      // Clothing with multiple sizes
      return item.sizeQuantities.reduce((sum, sq) => {
        return sum + (item.unitPrice + sq.extraCharge) * sq.quantity;
      }, 0);
    } else {
      // Hat - single quantity
      return item.unitPrice * item.quantity;
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const calculateDiscount = () => {
    if (!discountEnabled || !discountValue) return 0;
    const subtotal = calculateSubtotal();
    if (discountType === "percentage") {
      return (subtotal * Number.parseFloat(discountValue)) / 100;
    }
    return Number.parseFloat(discountValue);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleCreateInvoice = () => {
    if (!customerName || !customerEmail) {
      // toast({
      //   title: "Customer information required",
      //   description: "Please enter customer name and email.",
      //   variant: "destructive",
      // });
      return;
    }

    if (items.length === 0) {
      // toast({
      //   title: "No items added",
      //   description: "Please add at least one item to the invoice.",
      //   variant: "destructive",
      // });
      return;
    }

    const invoiceId = `INV-${Date.now().toString(36).toUpperCase()}`;
    setGeneratedInvoiceId(invoiceId);
    setIsSuccessDialogOpen(true);
  };

  const resetForm = () => {
    setCustomerName("");
    setCustomerEmail("");
    setItems([]);
    setDiscountEnabled(false);
    setDiscountValue("");
    setIsSuccessDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* <Toaster /> */}

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Create Invoice</h1>
        <p className="text-muted-foreground mt-1">
          Generate a payment invoice and send it to the customer
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Product Selection & Customer Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Customer Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="John Doe"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Customer Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Add Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Add Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Product Select */}
                  <div className="space-y-2">
                    <Label>Product *</Label>
                    <Select
                      value={selectedProduct}
                      onValueChange={handleProductChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {productsData.map((product) => (
                          <SelectItem
                            key={product.id}
                            value={product.id.toString()}
                          >
                            {product.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Color Select */}
                  <div className="space-y-2">
                    <Label>Color *</Label>
                    <Select
                      value={selectedColor}
                      onValueChange={setSelectedColor}
                      disabled={!currentProduct}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentProduct?.colors.map((color) => (
                          <SelectItem key={color.name} value={color.name}>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full border border-border"
                                style={{ backgroundColor: color.hex }}
                              />
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Size Selection for Clothing */}
                {currentProduct && isClothing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-4"
                  >
                    <Label className="mb-3 block">
                      Select Sizes & Quantities
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {currentProduct.sizes.map((size) => (
                        <div
                          key={size.name}
                          className="p-3 rounded-xl bg-secondary/50 text-center"
                        >
                          <p className="font-bold text-foreground">
                            {size.name}
                          </p>
                          {size.extraCharge > 0 && (
                            <p className="text-xs text-primary mb-2">
                              +${size.extraCharge}
                            </p>
                          )}
                          <Input
                            type="number"
                            min={0}
                            value={sizeQuantities[size.name] || 0}
                            onChange={(e) =>
                              updateSizeQuantity(
                                size.name,
                                Number.parseInt(e.target.value) || 0
                              )
                            }
                            className="h-8 text-center bg-background border-0"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Total quantity: {getTotalItemQuantity()} item(s)
                    </p>
                  </motion.div>
                )}

                {/* Quantity for Hats */}
                {currentProduct && !isClothing && (
                  <div className="mb-4">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Number.parseInt(e.target.value) || 1)
                      }
                      className="w-32 mt-2"
                    />
                  </div>
                )}

                {/* Selected Product Preview */}
                {currentProduct && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 rounded-xl bg-secondary mb-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-background">
                        <Image
                          src={currentProduct.image || "/placeholder.svg"}
                          alt={currentProduct.title}
                          className="w-full h-full object-cover"
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {currentProduct.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Base Price: ${currentProduct.basePrice.toFixed(2)}
                        </p>
                        {selectedColor && (
                          <Badge variant="outline" className="mt-1">
                            {selectedColor}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                <Button
                  onClick={addItem}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Invoice
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Added Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  Invoice Items ({items.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <div className="py-12 text-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">No items added yet</p>
                    <p className="text-sm text-muted-foreground">
                      Add products above to create the invoice
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-4 p-4 rounded-xl bg-secondary"
                        >
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-background flex-shrink-0">
                            <Image
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.title}
                              className="w-full h-full object-cover"
                              width={56}
                              height={56}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">
                              {item.product.title}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {item.color}
                              </Badge>
                              {item.sizeQuantities.length > 0 ? (
                                item.sizeQuantities.map((sq, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {sq.size}: {sq.quantity}
                                    {sq.extraCharge > 0 &&
                                      ` (+$${sq.extraCharge})`}
                                  </Badge>
                                ))
                              ) : (
                                <Badge variant="outline" className="text-xs">
                                  Qty: {item.quantity}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-semibold text-foreground">
                              ${calculateItemTotal(item).toFixed(2)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.sizeQuantities.length > 0
                                ? `${item.sizeQuantities.reduce(
                                    (s, sq) => s + sq.quantity,
                                    0
                                  )} items`
                                : `${item.quantity} items`}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Discount Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  Discount (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 mb-4">
                  <div>
                    <Label>Apply Discount</Label>
                    <p className="text-sm text-muted-foreground">
                      Give customer a special discount
                    </p>
                  </div>
                  <Switch
                    checked={discountEnabled}
                    onCheckedChange={setDiscountEnabled}
                  />
                </div>

                {discountEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <Label>Discount Type</Label>
                      <Select
                        value={discountType}
                        onValueChange={(v) =>
                          setDiscountType(v as "percentage" | "fixed")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">
                            Percentage (%)
                          </SelectItem>
                          <SelectItem value="fixed">
                            Fixed Amount ($)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Discount Value</Label>
                      <div className="relative">
                        {discountType === "percentage" ? (
                          <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        ) : (
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                        )}
                        <Input
                          type="number"
                          step="0.01"
                          value={discountValue}
                          onChange={(e) => setDiscountValue(e.target.value)}
                          placeholder={
                            discountType === "percentage" ? "10" : "5.00"
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="sticky top-24"
          >
            <Card className="border-0 shadow-lg shadow-primary/5 overflow-hidden">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-primary">
                    <CreditCard className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Invoice</h3>
                    <p className="text-sm text-muted-foreground">Summary</p>
                  </div>
                </div>

                {customerName && (
                  <div className="p-3 rounded-xl bg-card mb-4">
                    <p className="text-sm text-muted-foreground">Sending to:</p>
                    <p className="font-medium text-foreground">
                      {customerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {customerEmail}
                    </p>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[180px]">
                        {item.product.title} x
                        {item.sizeQuantities.length > 0
                          ? item.sizeQuantities.reduce(
                              (s, sq) => s + sq.quantity,
                              0
                            )
                          : item.quantity}
                      </span>
                      <span className="text-foreground font-medium">
                        ${calculateItemTotal(item).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  {discountEnabled && discountValue && (
                    <div className="flex justify-between text-sm">
                      <span className="text-success">Discount</span>
                      <span className="text-success">
                        -${calculateDiscount().toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <Button
                  onClick={handleCreateInvoice}
                  disabled={
                    items.length === 0 || !customerName || !customerEmail
                  }
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group"
                >
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Generate & Send Invoice
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto p-4 rounded-full bg-success/10 mb-4">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <DialogTitle className="text-center text-2xl">
              Invoice Created!
            </DialogTitle>
          </DialogHeader>

          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">
              Invoice has been generated and sent to{" "}
              <strong className="text-foreground">{customerEmail}</strong>
            </p>
            <div className="p-4 rounded-xl bg-secondary">
              <p className="text-sm text-muted-foreground">Invoice ID</p>
              <p className="font-mono font-bold text-lg text-foreground">
                {generatedInvoiceId}
              </p>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-primary/10">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="font-bold text-2xl text-primary">
                ${calculateTotal().toFixed(2)}
              </p>
              {discountEnabled && discountValue && (
                <Badge
                  variant="outline"
                  className="mt-2 bg-success/10 text-success border-success/20"
                >
                  Discount Applied: ${calculateDiscount().toFixed(2)} off
                </Badge>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={resetForm}
              className="flex-1 bg-transparent"
            >
              Create Another
            </Button>
            <Button
              onClick={() => setIsSuccessDialogOpen(false)}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Done
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
