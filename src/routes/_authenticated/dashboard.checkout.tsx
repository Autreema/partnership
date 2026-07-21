import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { money } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/checkout")({
  component: Checkout,
});

const METHODS = [
  { id: "credit_card", label: "Credit Card" },
  { id: "debit_card", label: "Debit Card" },
  { id: "upi", label: "UPI" },
  { id: "wallet", label: "Wallet" },
  { id: "net_banking", label: "Net Banking" },
];

function Checkout() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [method, setMethod] = useState("credit_card");
  const [processing, setProcessing] = useState(false);
  const { data: items } = useQuery({
    queryKey: ["cart", user.id, "checkout"],
    queryFn: async () =>
      (await supabase.from("cart_items").select("*, products(id, name, price, commission_percent)").eq("user_id", user.id)).data ?? [],
  });
  const subtotal = (items ?? []).reduce((s, i) => s + Number(i.products?.price ?? 0) * i.quantity, 0);
  const total = subtotal;

  async function pay() {
    if (!items || items.length === 0) return toast.error("Cart is empty");
    setProcessing(true);
    // referral tracking (cookie/localStorage)
    const refCode = typeof window !== "undefined" ? window.localStorage.getItem("ref_code") : null;
    let referrerId: string | null = null;
    if (refCode) {
      const { data: ref } = await supabase.from("referrals").select("reseller_id").eq("code", refCode).maybeSingle();
      referrerId = ref?.reseller_id ?? null;
    }
    // create order
    const { data: order, error: oErr } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        referrer_id: referrerId,
        subtotal, tax: 0, total,
        status: "paid",
        payment_method: method,
      })
      .select()
      .single();
    if (oErr || !order) { setProcessing(false); return toast.error(oErr?.message ?? "Failed"); }
    // order items
    const orderItems = items.map((i) => ({
      order_id: order.id,
      product_id: i.product_id,
      product_name: i.products?.name ?? "",
      unit_price: Number(i.products?.price ?? 0),
      quantity: i.quantity,
      line_total: Number(i.products?.price ?? 0) * i.quantity,
      commission_percent: Number(i.products?.commission_percent ?? 0),
    }));
    await supabase.from("order_items").insert(orderItems);
    // payment record
    await supabase.from("payments").insert({
      order_id: order.id, user_id: user.id, amount: total, method, status: "success",
    });
    // subscriptions — 30 days for each
    const expires = new Date(); expires.setDate(expires.getDate() + 30);
    await supabase.from("subscriptions").insert(items.map((i) => ({
      user_id: user.id, product_id: i.product_id,
      status: "active", expires_at: expires.toISOString(),
    })));
    // notification
    await supabase.from("notifications").insert({
      user_id: user.id, title: "Order confirmed",
      body: `Your order ${order.order_number} has been paid.`, type: "order",
    });
    // clear cart
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    qc.invalidateQueries();
    setProcessing(false);
    toast.success("Payment successful!");
    navigate({ to: "/dashboard/orders" });
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 shadow-card">
          <h2 className="font-display font-semibold mb-4">Payment method</h2>
          <RadioGroup value={method} onValueChange={setMethod} className="grid sm:grid-cols-2 gap-3">
            {METHODS.map((m) => (
              <label key={m.id} htmlFor={m.id} className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${method === m.id ? "border-primary bg-accent/50" : "hover:bg-accent/30"}`}>
                <RadioGroupItem id={m.id} value={m.id} />
                <span className="font-medium">{m.label}</span>
              </label>
            ))}
          </RadioGroup>
          <p className="mt-4 text-xs text-muted-foreground">
            This is a simulated payment — no real charge is made.
          </p>
        </Card>
        <Card className="p-6 shadow-card h-fit">
          <h2 className="font-display font-semibold mb-4">Order</h2>
          <ul className="space-y-2 text-sm mb-4">
            {(items ?? []).map((i) => (
              <li key={i.id} className="flex justify-between">
                <span className="truncate">{i.products?.name} × {i.quantity}</span>
                <span className="ml-3">{money(Number(i.products?.price ?? 0) * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border pt-3 flex justify-between font-semibold">
            <span>Total</span><span>{money(total)}</span>
          </div>
          <Button className="w-full mt-6 bg-brand-gradient text-white border-0" disabled={processing} onClick={pay}>
            {processing ? "Processing…" : `Pay ${money(total)}`}
          </Button>
          <Button asChild variant="ghost" className="w-full mt-2"><Link to="/dashboard/cart">Back to cart</Link></Button>
        </Card>
      </div>
    </div>
  );
}
