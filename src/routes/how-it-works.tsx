import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { UserPlus, Link2, DollarSign, Rocket } from "lucide-react";

const STEPS = [
  { icon: UserPlus, t: "1. Create an account", d: "Sign up as a customer or reseller in under a minute." },
  { icon: Link2, t: "2. Grab your referral link", d: "Every reseller gets a unique code that tracks clicks, signups, and purchases." },
  { icon: DollarSign, t: "3. Earn commissions", d: "When someone buys through your link, you earn a % — automatically." },
  { icon: Rocket, t: "4. Withdraw anytime", d: "Request payouts to your preferred method whenever you hit the minimum." },
];

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — PartnerShip" },
      { name: "description", content: "See how the PartnerShip marketplace, referrals, and commissions work end-to-end." },
    ],
  }),
  component: () => (
    <MarketingLayout>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-center">How it works</h1>
        <p className="text-muted-foreground text-center mt-3 max-w-2xl mx-auto">
          Four steps from signup to your first commission payout.
        </p>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {STEPS.map((s) => (
            <div key={s.t} className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-gradient grid place-items-center text-white">
                <s.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-semibold text-lg">{s.t}</div>
                <div className="text-muted-foreground text-sm mt-1">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MarketingLayout>
  ),
});
