import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PartnerShip" },
      { name: "description", content: "PartnerShip is a modern software marketplace built for both makers and resellers." },
    ],
  }),
  component: () => (
    <MarketingLayout>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold">About PartnerShip</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          We built PartnerShip because we believe every great product deserves a great distribution network — and every recommender deserves to earn from what they share.
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { k: "Our mission", v: "Make software distribution partner-first from day one." },
            { k: "Our team", v: "Ex-marketplace and payments engineers based across three continents." },
            { k: "Our values", v: "Transparent pricing, fair commissions, and no hidden fees." },
          ].map((b) => (
            <Card key={b.k} className="p-6 shadow-card">
              <div className="font-display font-semibold">{b.k}</div>
              <div className="text-sm text-muted-foreground mt-2">{b.v}</div>
            </Card>
          ))}
        </div>
      </section>
    </MarketingLayout>
  ),
});
