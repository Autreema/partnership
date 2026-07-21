import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "How much do resellers earn?", a: "Each product sets its own commission rate — typically between 10% and 25% of every purchase made through your referral link." },
  { q: "How often are commissions paid?", a: "You can request a payout any time your approved commissions exceed the minimum threshold in your dashboard." },
  { q: "What payment methods do you support?", a: "Simulated cards, UPI, wallets, and net banking are supported at checkout in this demo." },
  { q: "Can I cancel a subscription anytime?", a: "Yes — subscriptions can be cancelled from your dashboard and remain active until the end of the paid period." },
  { q: "Is my data secure?", a: "Yes. We use row-level security, role-based access, and encrypted sessions." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — PartnerShip" },
      { name: "description", content: "Answers to common questions about PartnerShip, resellers, and commissions." },
    ],
  }),
  component: () => (
    <MarketingLayout>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold">Frequently asked</h1>
        <Accordion type="single" collapsible className="mt-8">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`i-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </MarketingLayout>
  ),
});
