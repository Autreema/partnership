import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions, useQueryClient } from "@tanstack/react-query";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { money } from "@/lib/format";
import { Check, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/hooks/use-session";

const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*, categories(name, slug)")
        .eq("slug", slug)
        .maybeSingle();
      return data;
    },
  });

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(productQuery(params.slug));
    if (!data) throw notFound();
  },
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — PartnerShip` },
      { name: "description", content: `Buy ${params.slug.replace(/-/g, " ")} on PartnerShip.` },
    ],
  }),
  component: ProductDetail,
  notFoundComponent: () => (
    <MarketingLayout>
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-display font-bold">Product not found</h1>
        <Button asChild className="mt-4"><Link to="/products">Back to marketplace</Link></Button>
      </div>
    </MarketingLayout>
  ),
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(productQuery(slug));
  const { user } = useSession();
  const navigate = useNavigate();
  const qc = useQueryClient();
  if (!p) return null;

  async function addToCart() {
    if (!user) {
      toast.info("Sign in to add items to your cart");
      navigate({ to: "/auth" });
      return;
    }
    const { error } = await supabase.from("cart_items").upsert(
      { user_id: user.id, product_id: p!.id, quantity: 1 },
      { onConflict: "user_id,product_id,plan_id" }
    );
    if (error) toast.error(error.message);
    else {
      toast.success("Added to cart");
      qc.invalidateQueries({ queryKey: ["cart"] });
    }
  }

  return (
    <MarketingLayout>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <Card className="overflow-hidden shadow-card">
            <div className="aspect-video bg-muted">
              {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />}
            </div>
          </Card>
        </div>
        <div>
          {p.categories && <Badge variant="secondary">{p.categories.name}</Badge>}
          <h1 className="mt-3 text-4xl font-display font-bold">{p.name}</h1>
          <p className="mt-3 text-muted-foreground">{p.description || p.short_description}</p>
          <div className="mt-6 flex items-baseline gap-2">
            <div className="text-3xl font-display font-bold text-primary">{money(p.price)}</div>
            <div className="text-muted-foreground">/ month</div>
          </div>
          <ul className="mt-6 space-y-2 text-sm">
            {["Instant activation", "Cancel anytime", "24/7 support", `${p.commission_percent}% reseller commission`].map((f) => (
              <li key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-success" />{f}</li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Button size="lg" className="bg-brand-gradient text-white border-0 hover:opacity-90" onClick={addToCart}>
              <ShoppingCart className="w-4 h-4" /> Add to cart
            </Button>
            <Button size="lg" variant="outline" asChild><Link to="/products">Back</Link></Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
