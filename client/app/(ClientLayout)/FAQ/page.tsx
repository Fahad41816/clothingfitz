 
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is the minimum order quantity?",
    answer:
      "We offer flexible ordering options! You can order as few as 1 item with our 'No Minimum' option, or choose from our bulk packages (10, 25, 50, or 100+ pieces) for better pricing.",
  },
  {
    question: "How long does production take?",
    answer:
      "Standard production time is 7-10 business days after design approval. Rush orders are available for an additional fee and can be completed in 3-5 business days. Shipping time varies based on your location and selected shipping method.",
  },
  {
    question: "Can I see a proof before production?",
    answer:
      "We'll send you a digital proof of your design for approval before we start production. You can request revisions until you're completely satisfied with the design.",
  },
  {
    question: "What file formats do you accept for custom designs?",
    answer:
      "We accept PNG, JPG, PDF, AI, and EPS files. For the best print quality, we recommend vector files (AI or EPS) with a resolution of at least 300 DPI for raster images.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes! We offer free shipping on all orders over $100 within the continental United States. For orders under $100, shipping costs are calculated based on weight and destination.",
  },
  {
    question: "How do I care for my custom printed items?",
    answer:
      "To maintain print quality, wash items inside out in cold water on a gentle cycle. Avoid using bleach or fabric softener. Tumble dry on low heat or hang dry. Do not iron directly on the print.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer:
      "You can cancel or modify your order within 24 hours of placement, provided production hasn't started. Once your design is approved and production begins, we cannot accept cancellations or modifications.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are securely processed.",
  },
  {
    question: "Do you offer bulk discounts?",
    answer:
      "Yes! We offer tiered pricing based on quantity. The more you order, the more you save. Select your quantity on the product page to see the discounted pricing for bulk orders.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'My Orders' page.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-balance mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground">
              Find answers to common questions about our services
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Can't find the answer you're looking for? Our friendly customer
                service team is here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-2 justify-center">
                  <span className="font-semibold">Email:</span>
                  <a
                    href="mailto:sales@clothingfitz.com"
                    className="text-primary hover:underline"
                  >
                    sales@clothingfitz.com
                  </a>
                </div>
                <div className="hidden sm:block text-muted-foreground">|</div>
                <div className="flex items-center gap-2 justify-center">
                  <span className="font-semibold">Phone:</span>
                  <a
                    href="tel:+19544838862"
                    className="text-primary hover:underline"
                  >
                    +1 954-483-8862
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
