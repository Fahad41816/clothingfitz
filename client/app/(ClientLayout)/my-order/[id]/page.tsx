import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Truck, CheckCircle, MapPin, FileText } from "lucide-react";
import Link from "next/link";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Order Details</h1>
              <p className="text-muted-foreground mt-1">Order #{params.id}</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/orders">Back to Orders</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Order Status</CardTitle>
                    <Badge className="gap-1">
                      <Truck className="w-4 h-4" />
                      In Transit
                    </Badge>
                  </div>
                  <CardDescription>Your order is on the way</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div className="w-0.5 h-16 bg-primary" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-semibold">Order Placed</h4>
                        <p className="text-sm text-muted-foreground">
                          Dec 8, 2024 at 10:30 AM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div className="w-0.5 h-16 bg-primary" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-semibold">Processing</h4>
                        <p className="text-sm text-muted-foreground">
                          Dec 8, 2024 at 2:15 PM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div className="w-0.5 h-16 bg-muted" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-semibold">Shipped</h4>
                        <p className="text-sm text-muted-foreground">
                          Dec 9, 2024 at 9:00 AM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                          <Package className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-semibold text-muted-foreground">
                          Delivered
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Expected Dec 14, 2024
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={`/generic-product-display.png?height=80&width=80&query=product+${item}`}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">
                          Custom Printed T-Shirt
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Size: L, Color: Blue
                        </p>
                        <p className="text-sm text-muted-foreground">Qty: 1</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$25.00</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed">
                  <p className="font-semibold">Nahidul Islam Fahad</p>
                  <p className="text-muted-foreground">123 Main Street</p>
                  <p className="text-muted-foreground">
                    Fort Lauderdale, FL 33301
                  </p>
                  <p className="text-muted-foreground">United States</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>$125.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>$10.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>$135.00</span>
                  </div>

                  <Button
                    className="w-full mt-4 bg-transparent"
                    variant="outline"
                  >
                    Download Invoice
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
