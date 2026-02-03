"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Eye, ChevronLeft, ChevronRight, Package, CheckCircle, XCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"

export const ordersData = [
  {
    id: "ORD-2024-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234-567-8901",
      avatar: "/generic-person-avatar.png",
    },
    shipping: {
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    billing: {
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    products: [
      {
        name: "Custom T-Shirt",
        image: "/custom-blue-t-shirt.jpg",
        color: "Navy Blue",
        size: "L",
        quantity: 2,
        price: 29.99,
      },
      {
        name: "Embroidered Cap",
        image: "/embroidered-baseball-cap.jpg",
        color: "Black",
        size: "One Size",
        quantity: 1,
        price: 24.99,
      },
    ],
    total: 84.97,
    status: "pending",
    paymentStatus: "paid",
    paymentMethod: "Credit Card (Stripe)",
    shippingMethod: "Standard Shipping (5-7 days)",
    additionalNotes: "Please leave the package at the front door if no one is home.",
    date: "2024-06-15",
    time: "10:30 AM",
  },
  {
    id: "ORD-2024-002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234-567-8902",
      avatar: "/jane-smith-avatar.jpg",
    },
    shipping: {
      address: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
    billing: {
      address: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
    products: [
      {
        name: "Premium Hoodie",
        image: "/premium-white-hoodie.jpg",
        color: "White",
        size: "XL",
        quantity: 1,
        price: 59.99,
      },
    ],
    total: 59.99,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "PayPal",
    shippingMethod: "Express Shipping (2-3 days)",
    additionalNotes: "",
    date: "2024-06-14",
    time: "2:15 PM",
  },
  {
    id: "ORD-2024-003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234-567-8903",
      avatar: "/mike-johnson-avatar.jpg",
    },
    shipping: {
      address: "789 Pine Rd",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA",
    },
    billing: {
      address: "789 Pine Rd",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA",
    },
    products: [
      {
        name: "Polo Shirt",
        image: "/polo-shirt-green.jpg",
        color: "Green",
        size: "M",
        quantity: 3,
        price: 34.99,
      },
      {
        name: "Baseball Cap",
        image: "/baseball-cap-red.jpg",
        color: "Red",
        size: "One Size",
        quantity: 2,
        price: 19.99,
      },
    ],
    total: 144.95,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "Credit Card (Stripe)",
    shippingMethod: "Standard Shipping (5-7 days)",
    additionalNotes: "Gift wrap please - this is a birthday present.",
    date: "2024-06-13",
    time: "9:45 AM",
  },
  {
    id: "ORD-2024-004",
    customer: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 234-567-8904",
      avatar: "/sarah-wilson-avatar.jpg",
    },
    shipping: {
      address: "321 Elm St",
      city: "Houston",
      state: "TX",
      zip: "77001",
      country: "USA",
    },
    billing: {
      address: "321 Elm St",
      city: "Houston",
      state: "TX",
      zip: "77001",
      country: "USA",
    },
    products: [
      {
        name: "Custom Sweatshirt",
        image: "/custom-gray-sweatshirt.jpg",
        color: "Gray",
        size: "S",
        quantity: 1,
        price: 49.99,
      },
    ],
    total: 49.99,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "Credit Card (Stripe)",
    shippingMethod: "Standard Shipping (5-7 days)",
    additionalNotes: "Customer requested cancellation - wrong size ordered.",
    date: "2024-06-12",
    time: "4:20 PM",
  },
  {
    id: "ORD-2024-005",
    customer: {
      name: "Chris Brown",
      email: "chris@example.com",
      phone: "+1 234-567-8905",
      avatar: "/chris-brown-avatar.jpg",
    },
    shipping: {
      address: "654 Maple Dr",
      city: "Phoenix",
      state: "AZ",
      zip: "85001",
      country: "USA",
    },
    billing: {
      address: "654 Maple Dr",
      city: "Phoenix",
      state: "AZ",
      zip: "85001",
      country: "USA",
    },
    products: [
      {
        name: "Snapback Hat",
        image: "/snapback-hat-navy.jpg",
        color: "Navy",
        size: "One Size",
        quantity: 4,
        price: 22.99,
      },
    ],
    total: 91.96,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "Awaiting Payment",
    shippingMethod: "Standard Shipping (5-7 days)",
    additionalNotes: "",
    date: "2024-06-11",
    time: "11:00 AM",
  },
  {
    id: "ORD-2024-006",
    customer: {
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 234-567-8906",
      avatar: "/emily-davis-avatar.jpg",
    },
    shipping: {
      address: "987 Cedar Ln",
      city: "Philadelphia",
      state: "PA",
      zip: "19101",
      country: "USA",
    },
    billing: {
      address: "987 Cedar Ln",
      city: "Philadelphia",
      state: "PA",
      zip: "19101",
      country: "USA",
    },
    products: [
      {
        name: "Premium T-Shirt",
        image: "/premium-black-t-shirt.jpg",
        color: "Black",
        size: "M",
        quantity: 2,
        price: 32.99,
      },
      {
        name: "Dad Hat",
        image: "/dad-hat-beige.jpg",
        color: "Beige",
        size: "One Size",
        quantity: 1,
        price: 18.99,
      },
    ],
    total: 84.97,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "Apple Pay",
    shippingMethod: "Express Shipping (2-3 days)",
    additionalNotes: "Please call before delivery.",
    date: "2024-06-10",
    time: "3:30 PM",
  },
]

const statusColors = {
  pending: "bg-warning/10 text-warning border-warning/20",
  processing: "bg-primary/10 text-primary border-primary/20",
  delivered: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
}

const statusIcons = {
  pending: Clock,
  processing: Package,
  delivered: CheckCircle,
  cancelled: XCircle,
}

const paymentColors = {
  paid: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  refunded: "bg-muted text-muted-foreground border-border",
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [orders] = useState(ordersData)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)






  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Orders Management</h1>
        <p className="text-muted-foreground mt-1">View and manage all customer orders</p>
      </motion.div>

      {/* Order Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        {[
          { label: "Total Orders", value: orderStats.total, color: "bg-primary" },
          { label: "Pending", value: orderStats.pending, color: "bg-warning" },
          { label: "Processing", value: orderStats.processing, color: "bg-chart-5" },
          { label: "Delivered", value: orderStats.delivered, color: "bg-success" },
          { label: "Cancelled", value: orderStats.cancelled, color: "bg-destructive" },
        ].map((stat, index) => (
          <motion.div key={stat.label} whileHover={{ scale: 1.02 }} transition={{ delay: index * 0.05 }}>
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-3 h-10 rounded-full ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, customer name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-0"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-secondary border-0">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Orders Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-foreground">Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Products</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Payment</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {paginatedOrders.map((order, index) => {
                      const StatusIcon = statusIcons[order.status as keyof typeof statusIcons]
                      return (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <span className="font-mono font-medium text-foreground">{order.id}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-foreground">{order.customer.name}</p>
                              <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {order.products.slice(0, 3).map((product, i) => (
                                  <div
                                    key={i}
                                    className="w-8 h-8 rounded-lg border-2 border-card bg-secondary overflow-hidden"
                                  >
                                    <Image
                                      src={product.image || "/placeholder.svg"}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                      width={32}
                                      height={32}
                                    />
                                  </div>
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {order.products.length} item{order.products.length > 1 ? "s" : ""}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-foreground">${order.total.toFixed(2)}</td>
                          <td className="py-4 px-4">
                            <Badge
                              variant="outline"
                              className={statusColors[order.status as keyof typeof statusColors]}
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              variant="outline"
                              className={paymentColors[order.paymentStatus as keyof typeof paymentColors]}
                            >
                              {order.paymentStatus}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            <div>
                              <p className="text-foreground">{order.date}</p>
                              <p className="text-xs">{order.time}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Link href={`/dashboard/orders/${order.id}`}>
                              <Button variant="ghost" size="sm" className="rounded-lg">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </Link>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-primary text-primary-foreground" : ""}
                    >
                      {page}
                    </Button>
                  ))}
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
