"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Wallet, DollarSign, Check } from "lucide-react";

export default function InvoicePage({ params }: { params: { id: string } }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPaid, setIsPaid] = useState(false);

  if (isPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your payment has been processed successfully. You will receive a
              confirmation email shortly.
            </p>
            <Button
              className="w-full"
              onClick={() => (window.location.href = "/")}
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Invoice Payment</h1>
            <p className="text-muted-foreground">
              Complete your payment securely
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Choose how you'd like to pay
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="card" id="card" />
                        <Label
                          htmlFor="card"
                          className="flex items-center gap-2 cursor-pointer flex-1"
                        >
                          <CreditCard className="w-5 h-5 text-primary" />
                          <span className="font-medium">
                            Credit / Debit Card
                          </span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="stripe" id="stripe" />
                        <Label
                          htmlFor="stripe"
                          className="flex items-center gap-2 cursor-pointer flex-1"
                        >
                          <DollarSign className="w-5 h-5 text-primary" />
                          <span className="font-medium">Stripe</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="apple" id="apple" />
                        <Label
                          htmlFor="apple"
                          className="flex items-center gap-2 cursor-pointer flex-1"
                        >
                          <Wallet className="w-5 h-5 text-primary" />
                          <span className="font-medium">Apple Pay</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="google" id="google" />
                        <Label
                          htmlFor="google"
                          className="flex items-center gap-2 cursor-pointer flex-1"
                        >
                          <Wallet className="w-5 h-5 text-primary" />
                          <span className="font-medium">Google Pay</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label
                          htmlFor="paypal"
                          className="flex items-center gap-2 cursor-pointer flex-1"
                        >
                          <Wallet className="w-5 h-5 text-primary" />
                          <span className="font-medium">PayPal</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Invoice #{params.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded bg-muted flex-shrink-0">
                        <img
                          src="/diverse-products-still-life.png"
                          alt="Product"
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          Custom T-Shirt Design
                        </p>
                        <p className="text-xs text-muted-foreground">Qty: 25</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$250.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Discount (10%)
                      </span>
                      <span className="text-green-600">-$25.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$18.00</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>$243.00</span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setIsPaid(true)}
                  >
                    Pay Now
                  </Button>

                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    Your payment is secured with industry-standard encryption
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
