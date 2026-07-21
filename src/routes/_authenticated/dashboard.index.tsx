import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/ui/kpi-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Package, ShoppingCart, Receipt, CreditCard, ArrowRight, Sparkles } from "lucide-react";
import { money, dateFmt } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { user } = Route.useRouteContext();
  const { data: orders } = useQuery({
    queryKey: ["orders", user.id],
    queryFn: async () => (await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5)).data ?? [],
  });
  const { data: subs } = useQuery({
    queryKey: ["subs", user.id],
    queryFn: async () => (await supabase.from("subscriptions").select("*, products(name)").eq("user_id", user.id).eq("status", "active")).data ?? [],
  });
  const { data: cart } = useQuery({
    queryKey: ["cart", user.id],
    queryFn: async () => (await supabase.from("cart_items").select("id").eq("user_id", user.id)).data ?? [],
  });
  const totalSpent = (orders ?? []).filter((o) => o.status === "paid").reduce((s, o) => s + Number(o.total), 0);
  const displayName = user.email?.split("@")[0] ?? "there";

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-brand-gradient p-6 md:p-8 text-white shadow-glow">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium">
              <Sparkles className="w-3 h-3" /> Welcome back
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-display font-bold capitalize">
              Hi, {displayName} 👋
            </h1>
            <p className="mt-2 text-white/85 max-w-xl">
              Here's a live snapshot of your subscriptions, orders, and cart activity.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
              <Link to="/dashboard/browse">Browse marketplace <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/dashboard/cart">View cart</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Receipt} label="Orders" value={orders?.length ?? 0} hint="Last 5 shown" />
        <KpiCard icon={CreditCard} label="Active subscriptions" value={subs?.length ?? 0} />
        <KpiCard icon={ShoppingCart} label="Cart items" value={cart?.length ?? 0} />
        <KpiCard icon={Package} label="Total spent" value={money(totalSpent)} />
      </div>

      {/* Content grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-card border-border/70">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-semibold">Recent orders</h2>
              <p className="text-xs text-muted-foreground">Your last 5 purchases</p>
            </div>
            <Button asChild size="sm" variant="ghost"><Link to="/dashboard/orders">View all <ArrowRight className="w-3.5 h-3.5" /></Link></Button>
          </div>
          {(orders ?? []).length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="No orders yet"
              description="Once you buy something, your order history will appear here."
              action={<Button asChild size="sm"><Link to="/dashboard/browse">Browse products</Link></Button>}
            />
          ) : (
            <ul className="divide-y divide-border/60">
              {(orders ?? []).map((o) => (
                <li key={o.id} className="py-3 flex items-center justify-between text-sm">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{o.order_number}</div>
                    <div className="text-xs text-muted-foreground">{dateFmt(o.created_at)}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-semibold">{money(o.total)}</div>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] mt-0.5 capitalize ${
                        o.status === "paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}
                    >
                      {o.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-6 shadow-card border-border/70">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-semibold">Active subscriptions</h2>
              <p className="text-xs text-muted-foreground">Renewing automatically</p>
            </div>
            <Button asChild size="sm" variant="ghost"><Link to="/dashboard/subscriptions">Manage <ArrowRight className="w-3.5 h-3.5" /></Link></Button>
          </div>
          {(subs ?? []).length === 0 ? (
            <EmptyState
              icon={CreditCard}
              title="No active subscriptions"
              description="Subscribe to a product to unlock ongoing access."
              action={<Button asChild size="sm"><Link to="/dashboard/browse">Explore marketplace</Link></Button>}
            />
          ) : (
            <ul className="space-y-2">
              {(subs ?? []).map((s) => (
                <li key={s.id} className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover-lift text-sm">
                  <span className="font-medium truncate">{s.products?.name}</span>
                  <span className="text-muted-foreground text-xs shrink-0">Renews {dateFmt(s.expires_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
