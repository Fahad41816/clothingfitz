"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  MessageSquare,
  Printer,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ordersData } from "../OrdersPage";

// import { useToast } from "@/hooks/use-toast";
// import { Toaster } from "@/components/ui/toaster";

const statusColors = {
  pending: "bg-warning/10 text-warning border-warning/20",
  processing: "bg-primary/10 text-primary border-primary/20",
  delivered: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusIcons = {
  pending: Clock,
  processing: Package,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const paymentColors = {
  paid: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  refunded: "bg-muted text-muted-foreground border-border",
};

export default function OrderDetailsPage(id : any) {
  // const { toast } = useToast();
  const [order, setOrder] = useState(() => ordersData.find((o) => o.id === id));

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Package className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Order Not Found
        </h2>
        <p className="text-muted-foreground mb-4">
          The order you are looking for does not exist.
        </p>
        <Link href="/dashboard/orders">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];

  const handleStatusChange = (newStatus: string) => {
    setOrder({ ...order, status: newStatus });
    // toast({
    //   title: "Order status updated",
    //   description: `Order ${order.id} has been marked as ${newStatus}.`,
    // });
  };

  return (
    <div className="space-y-6">
      {/* <Toaster /> */}

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <Link href="/dashboard/orders">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Order Details
            </h1>
            <p className="text-muted-foreground font-mono">{order.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl bg-transparent">
            <Printer className="w-4 h-4 mr-2" />
            Print Invoice
          </Button>
        </div>
      </motion.div>

      {/* Status & Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 rounded-2xl ${
                    order.status === "delivered"
                      ? "bg-success/10"
                      : order.status === "cancelled"
                      ? "bg-destructive/10"
                      : "bg-primary/10"
                  }`}
                >
                  <StatusIcon
                    className={`w-8 h-8 ${
                      order.status === "delivered"
                        ? "text-success"
                        : order.status === "cancelled"
                        ? "text-destructive"
                        : "text-primary"
                    }`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Badge
                      variant="outline"
                      className={`${
                        statusColors[order.status as keyof typeof statusColors]
                      } text-base px-4 py-1`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        paymentColors[
                          order.paymentStatus as keyof typeof paymentColors
                        ]
                      }
                    >
                      Payment: {order.paymentStatus}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {order.date} at {order.time}
                  </p>
                </div>
              </div>
              {order.status !== "delivered" && order.status !== "cancelled" && (
                <div className="flex items-center gap-2">
                  {order.status === "pending" && (
                    <Button
                      onClick={() => handleStatusChange("processing")}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Process Order
                    </Button>
                  )}
                  {order.status === "processing" && (
                    <Button
                      onClick={() => handleStatusChange("delivered")}
                      className="bg-success hover:bg-success/90 text-success-foreground"
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Mark Delivered
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange("cancelled")}
                    className="text-destructive border-destructive hover:bg-destructive/10"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Order
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Products */}
          <Card className="border-0 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Order Items ({order.products.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.products.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-card flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground">
                        {product.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Color: {product.color}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Size: {product.size}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Qty: {product.quantity}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        ${(product.price * product.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${product.price.toFixed(2)} each
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-primary">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Shipping Method */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="font-semibold text-foreground">
                    {order.paymentMethod}
                  </p>
                  <Badge
                    variant="outline"
                    className={`mt-2 ${
                      paymentColors[
                        order.paymentStatus as keyof typeof paymentColors
                      ]
                    }`}
                  >
                    {order.paymentStatus.charAt(0).toUpperCase() +
                      order.paymentStatus.slice(1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Shipping Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="font-semibold text-foreground">
                    {order.shippingMethod}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Estimated delivery based on shipping selection
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Notes */}
          {order.additionalNotes && (
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Additional Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                  <p className="text-foreground">{order.additionalNotes}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Right Column - Customer & Address Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Customer Info */}
          <Card className="border-0 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary">
                  <Image
                    src={order.customer.avatar || "/placeholder.svg"}
                    alt={order.customer.name}
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {order.customer.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{order.customer.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="border-0 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="font-semibold text-foreground">
                  {order.customer.name}
                </p>
                <p className="text-muted-foreground mt-1">
                  {order.shipping.address}
                </p>
                <p className="text-muted-foreground">
                  {order.shipping.city}, {order.shipping.state}{" "}
                  {order.shipping.zip}
                </p>
                <p className="text-muted-foreground">
                  {order.shipping.country}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card className="border-0 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Billing Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="font-semibold text-foreground">
                  {order.customer.name}
                </p>
                <p className="text-muted-foreground mt-1">
                  {order.billing.address}
                </p>
                <p className="text-muted-foreground">
                  {order.billing.city}, {order.billing.state}{" "}
                  {order.billing.zip}
                </p>
                <p className="text-muted-foreground">{order.billing.country}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
