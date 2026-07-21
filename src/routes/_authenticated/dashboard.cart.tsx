import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { money } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/cart")({
  component: CartPage,
});

function CartPage() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { data: items } = useQuery({
    queryKey: ["cart", user.id, "detail"],
    queryFn: async () =>
      (await supabase.from("cart_items").select("*, products(id, name, price, image_url, commission_percent)").eq("user_id", user.id)).data ?? [],
  });
  async function updateQty(id: string, q: number) {
    if (q < 1) return;
    await supabase.from("cart_items").update({ quantity: q }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["cart"] });
  }
  async function remove(id: string) {
    await supabase.from("cart_items").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["cart"] });
    toast.success("Removed");
  }
  const total = (items ?? []).reduce((s, i) => s + (Number(i.products?.price ?? 0) * i.quantity), 0);
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Your cart</h1>
      {(items ?? []).length === 0 ? (
        <Card className="p-12 text-center shadow-card">
          <ShoppingCart className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="mt-4"><Link to="/dashboard/browse">Browse products</Link></Button>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {(items ?? []).map((i) => (
              <Card key={i.id} className="p-4 shadow-card flex gap-4 items-center">
                <div className="w-20 h-20 rounded bg-muted overflow-hidden shrink-0">
                  {i.products?.image_url && <img src={i.products.image_url} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{i.products?.name}</div>
                  <div className="text-sm text-muted-foreground">{money(i.products?.price ?? 0)} each</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" onClick={() => updateQty(i.id, i.quantity - 1)}><Minus className="w-3 h-3" /></Button>
                  <span className="w-8 text-center">{i.quantity}</span>
                  <Button size="icon" variant="outline" onClick={() => updateQty(i.id, i.quantity + 1)}><Plus className="w-3 h-3" /></Button>
                </div>
                <div className="font-semibold w-20 text-right">{money(Number(i.products?.price ?? 0) * i.quantity)}</div>
                <Button size="icon" variant="ghost" onClick={() => remove(i.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </Card>
            ))}
          </div>
          <Card className="p-6 shadow-card h-fit">
            <div className="font-display font-semibold text-lg mb-4">Summary</div>
            <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Subtotal</span><span>{money(total)}</span></div>
            <div className="flex justify-between text-sm mb-3"><span className="text-muted-foreground">Tax</span><span>{money(0)}</span></div>
            <div className="flex justify-between font-semibold border-t border-border pt-3"><span>Total</span><span>{money(total)}</span></div>
            <Button className="w-full mt-6 bg-brand-gradient text-white border-0" onClick={() => navigate({ to: "/dashboard/checkout" })}>
              Checkout
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
