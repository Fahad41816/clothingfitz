"use client"

import Link from "next/link" 
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Eye, Truck, CheckCircle, Clock } from "lucide-react"

const orders = [
  {
    id: "ORD-2024-001",
    date: "Dec 10, 2024",
    total: "$87.50",
    status: "delivered",
    items: 3,
    image: "/plain-white-tshirt.png",
  },
  {
    id: "ORD-2024-002",
    date: "Dec 8, 2024",
    total: "$125.00",
    status: "in-transit",
    items: 5,
    image: "/classic-polo-shirt.png",
  },
  {
    id: "ORD-2024-003",
    date: "Dec 5, 2024",
    total: "$45.00",
    status: "processing",
    items: 2,
    image: "/various-hats.png",
  },
  {
    id: "ORD-2024-004",
    date: "Nov 28, 2024",
    total: "$210.00",
    status: "delivered",
    items: 10,
    image: "/custom-shirt.jpg",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="w-4 h-4" />
    case "in-transit":
      return <Truck className="w-4 h-4" />
    case "processing":
      return <Clock className="w-4 h-4" />
    default:
      return <Package className="w-4 h-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "default"
    case "in-transit":
      return "secondary"
    case "processing":
      return "outline"
    default:
      return "outline"
  }
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col"> 

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance">My Orders</h1>
            <p className="text-muted-foreground mt-1">View and track all your orders</p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img src={order.image || "/placeholder.svg"} alt="Order" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                        </div>
                        <Badge variant={getStatusColor(order.status)} className="gap-1">
                          {getStatusIcon(order.status)}
                          {order.status.replace("-", " ")}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-muted-foreground">
                          {order.items} {order.items === 1 ? "item" : "items"}
                        </span>
                        <span className="font-semibold text-lg">{order.total}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" asChild>
                        <Link href={`/orders/${order.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {orders.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Package className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
                <Button asChild>
                  <Link href="/">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

       
    </div>
  )
}
