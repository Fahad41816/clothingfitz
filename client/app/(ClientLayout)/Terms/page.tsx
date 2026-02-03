import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-balance mb-3">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground">
              Last updated: December 16, 2024
            </p>
          </div>

          <Card>
            <CardContent className="prose prose-slate max-w-none p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-3">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using ClothingFitz's website and services,
                  you accept and agree to be bound by the terms and conditions
                  of this agreement. If you do not agree to these terms, please
                  do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Use of Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Our print-on-demand services are provided for lawful purposes
                  only. You agree not to use our services to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Create products that infringe on intellectual property
                    rights
                  </li>
                  <li>
                    Produce content that is offensive, illegal, or harmful
                  </li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Harass, abuse, or harm others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">
                  Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You retain ownership of your custom designs. However, by
                  submitting designs to us, you grant ClothingFitz a license to
                  reproduce, modify, and use your designs solely for the purpose
                  of fulfilling your order. You represent and warrant that you
                  have the right to use all designs submitted.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Design Approval</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Once you approve a design proof, you acknowledge that the
                  design is final and production will begin. We are not
                  responsible for errors in the final product if they were
                  present in the approved proof. Please carefully review all
                  proofs before approval.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Pricing and Payment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All prices are listed in USD and are subject to change without
                  notice. Payment is required at the time of order placement. We
                  accept major credit cards, PayPal, and other payment methods
                  as displayed on our website. You agree to pay all charges
                  incurred by you or on your behalf through our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Order Fulfillment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to fulfill orders within the stated production time.
                  However, production and shipping times are estimates and not
                  guarantees. We are not liable for delays caused by factors
                  beyond our control, including but not limited to shipping
                  carrier delays or force majeure events.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Quality Assurance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We maintain high quality standards for all our products. In
                  the rare event that you receive a defective or incorrect
                  product, please contact us within 7 days of receipt. We will
                  work with you to resolve the issue through replacement or
                  refund as appropriate.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">
                  Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, ClothingFitz shall not
                  be liable for any indirect, incidental, special,
                  consequential, or punitive damages resulting from your use of
                  our services. Our total liability shall not exceed the amount
                  paid by you for the specific product or service that gave rise
                  to the claim.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Dispute Resolution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any disputes arising from these terms or your use of our
                  services shall be resolved through binding arbitration in
                  accordance with the rules of the American Arbitration
                  Association. The arbitration shall take place in Fort
                  Lauderdale, Florida.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time.
                  Changes will be effective immediately upon posting to our
                  website. Your continued use of our services after changes are
                  posted constitutes your acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about these Terms & Conditions, please
                  contact us:
                </p>
                <div className="mt-3 text-muted-foreground">
                  <p>ClothingFitz</p>
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
