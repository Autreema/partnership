import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const TIERS = [
  {
    name: "Monthly",
    price: 29,
    period: "/mo",
    desc: "Perfect for trying us out",
    features: ["All software access", "Reseller referral link", "Email support"],
  },
  {
    name: "Quarterly",
    price: 78,
    period: "/quarter",
    desc: "Save 10% vs monthly",
    features: ["Everything in Monthly", "Priority support", "Reseller analytics"],
  },
  {
    name: "Half-Yearly",
    price: 145,
    period: "/6mo",
    desc: "Save 17% vs monthly",
    features: ["Everything in Quarterly", "Higher commission tiers", "Dedicated account manager"],
    highlight: true,
  },
  {
    name: "Yearly",
    price: 260,
    period: "/yr",
    desc: "Save 25% vs monthly",
    features: ["Everything in Half-Yearly", "Custom integrations", "Early feature access"],
  },
];

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — PartnerShip" },
      { name: "description", content: "Simple subscription pricing with reseller commissions on every plan." },
    ],
  }),
  component: () => (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold">Simple, transparent pricing</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Pick a billing cadence — every plan includes the full marketplace and reseller tools.
        </p>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {TIERS.map((t) => (
            <Card key={t.name} className={`p-6 shadow-card ${t.highlight ? "border-primary ring-1 ring-primary shadow-glow" : ""}`}>
              {t.highlight && <div className="text-xs font-semibold text-primary mb-2">MOST POPULAR</div>}
              <div className="font-display text-xl font-semibold">{t.name}</div>
              <div className="text-muted-foreground text-sm">{t.desc}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <div className="text-3xl font-display font-bold">${t.price}</div>
                <div className="text-muted-foreground">{t.period}</div>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                {t.features.map((f) => <li key={f} className="flex gap-2"><Check className="w-4 h-4 text-success mt-0.5" />{f}</li>)}
              </ul>
              <Button asChild className={`mt-6 w-full ${t.highlight ? "bg-brand-gradient text-white border-0" : ""}`} variant={t.highlight ? "default" : "outline"}>
                <Link to="/auth">Get started</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </MarketingLayout>
  ),
});
