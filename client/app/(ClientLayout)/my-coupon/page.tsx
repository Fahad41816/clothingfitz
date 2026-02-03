import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, Copy, Clock, Tag } from "lucide-react";

const coupons = [
  {
    code: "WELCOME25",
    discount: "25% OFF",
    description: "Welcome discount for new customers",
    type: "percentage",
    expiry: "Dec 31, 2024",
    used: false,
  },
  {
    code: "BULK50",
    discount: "$50 OFF",
    description: "Bulk order discount on orders over $200",
    type: "fixed",
    expiry: "Jan 15, 2025",
    used: false,
  },
  {
    code: "FREESHIP",
    discount: "Free Shipping",
    description: "Free shipping on all orders",
    type: "shipping",
    expiry: "Dec 20, 2024",
    used: true,
  },
  {
    code: "HOLIDAY20",
    discount: "20% OFF",
    description: "Holiday season special discount",
    type: "percentage",
    expiry: "Dec 25, 2024",
    used: false,
  },
];

export default function CouponsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance">My Coupons</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your available discount coupons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coupons.map((coupon) => (
              <Card
                key={coupon.code}
                className={
                  coupon.used
                    ? "opacity-60"
                    : "hover:shadow-md transition-shadow"
                }
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Ticket className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-primary">
                          {coupon.discount}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {coupon.description}
                        </p>
                      </div>
                    </div>
                    {coupon.used && <Badge variant="outline">Used</Badge>}
                  </div>

                  <div className="bg-muted rounded-lg p-3 mb-4 flex items-center justify-between">
                    <code className="font-mono font-bold text-lg">
                      {coupon.code}
                    </code>
                    <Button variant="ghost" size="sm" disabled={coupon.used}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Expires {coupon.expiry}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <span className="capitalize">{coupon.type}</span>
                    </div>
                  </div>

                  {!coupon.used && (
                    <Button className="w-full mt-4">Apply Coupon</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {coupons.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Ticket className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No coupons available
                </h3>
                <p className="text-muted-foreground mb-6">
                  Check back later for special offers and discounts
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
