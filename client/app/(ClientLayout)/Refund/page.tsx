import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <RefreshCw className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-balance mb-3">
              Refund Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: December 16, 2024
            </p>
          </div>

          <Card>
            <CardContent className="prose prose-slate max-w-none p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-3">Our Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At ClothingFitz, we stand behind the quality of our products.
                  If you're not completely satisfied with your purchase, we're
                  here to help. Please review our refund policy below to
                  understand your options.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Refund Eligibility</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You may be eligible for a refund if:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>The product arrived damaged or defective</li>
                  <li>The wrong item was shipped to you</li>
                  <li>The print quality does not meet our standards</li>
                  <li>
                    The item differs significantly from the approved design
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Custom Orders</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Due to the custom nature of our products, we cannot accept
                  returns or offer refunds for orders where the design was
                  approved by the customer and the product matches the approved
                  specifications. Please carefully review your design before
                  approval.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Refund Process</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  To request a refund:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Contact our customer service team within 7 days of receiving
                    your order
                  </li>
                  <li>
                    Provide your order number and photos of the issue (if
                    applicable)
                  </li>
                  <li>
                    Our team will review your request within 2-3 business days
                  </li>
                  <li>
                    If approved, refunds will be processed to your original
                    payment method
                  </li>
                  <li>
                    Please allow 5-10 business days for the refund to appear in
                    your account
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Exchanges</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We offer exchanges for defective or incorrect items. If you
                  receive a damaged or incorrect product, we'll send you a
                  replacement at no additional cost once we receive photos
                  documenting the issue.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">
                  Non-Refundable Items
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  The following items are not eligible for refunds:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Custom-designed products that match the approved design
                  </li>
                  <li>
                    Products damaged due to customer misuse or improper care
                  </li>
                  <li>Orders placed more than 30 days ago</li>
                  <li>Sale or clearance items (unless defective)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Shipping Costs</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Original shipping costs are non-refundable. If you receive a
                  refund, the cost of return shipping may be deducted from your
                  refund (unless the return is due to our error or a defective
                  product).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our refund policy or need to
                  initiate a return, please contact us:
                </p>
                <div className="mt-3 text-muted-foreground">
                  <p>Email: sales@clothingfitz.com</p>
                  <p>Phone: +1 954-483-8862</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
