"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Custom T-Shirt",
    amount: "$45.99",
    status: "pending",
    date: "2 min ago",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Embroidered Hat",
    amount: "$74.97",
    status: "delivered",
    date: "15 min ago",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    product: "Premium Hoodie",
    amount: "$89.99",
    status: "processing",
    date: "1 hour ago",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    product: "Polo Shirt x2",
    amount: "$65.98",
    status: "pending",
    date: "2 hours ago",
  },
  {
    id: "ORD-005",
    customer: "Chris Brown",
    email: "chris@example.com",
    product: "Custom Snapback",
    amount: "$54.99",
    status: "cancelled",
    date: "3 hours ago",
  },
];

const statusColors = {
  pending: "bg-warning/10 text-warning border-warning/20",
  delivered: "bg-success/10 text-success border-success/20",
  processing: "bg-primary/10 text-primary border-primary/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export function RecentOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-0 shadow-lg shadow-primary/5">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`/.jpg?height=40&width=40&query=${order.customer} avatar`}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {order.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">
                      {order.customer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.product}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {order.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      statusColors[order.status as keyof typeof statusColors]
                    }
                  >
                    {order.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="rounded-lg">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
