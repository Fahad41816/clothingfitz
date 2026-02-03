 
import { Card, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col"> 

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-balance mb-3">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 16, 2025</p>
          </div>

          <Card>
            <CardContent className="prose prose-slate max-w-none p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-3">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At ClothingFitz, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our website or make a purchase from us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Name and contact information (email address, phone number, shipping address)</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                  <li>Order history and preferences</li>
                  <li>Communication preferences</li>
                  <li>Custom design files and specifications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and our services</li>
                  <li>Improve our website and customer experience</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Prevent fraudulent transactions and protect our users</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information with trusted service providers who assist us in operating our website, conducting our
                  business, or servicing you, as long as those parties agree to keep this information confidential.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized or unlawful processing, accidental loss, destruction, or damage. All payment
                  transactions are encrypted using SSL technology.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain
                  information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                  sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
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
  )
}
