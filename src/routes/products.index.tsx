import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { money } from "@/lib/format";
import { Search } from "lucide-react";

const productsQuery = queryOptions({
  queryKey: ["products", "all"],
  queryFn: async () => {
    const { data } = await supabase
      .from("products")
      .select("id, name, slug, short_description, price, image_url, commission_percent, categories(name, slug)")
      .eq("status", "active")
      .order("featured", { ascending: false });
    return data ?? [];
  },
});

const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: async () => (await supabase.from("categories").select("*").order("name")).data ?? [],
});

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — PartnerShip Software Marketplace" },
      { name: "description", content: "Browse and buy software subscriptions from the PartnerShip marketplace." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQuery);
    context.queryClient.ensureQueryData(categoriesQuery);
  },
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const { data: categories } = useSuspenseQuery(categoriesQuery);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const filtered = products.filter((p) => {
    if (cat && p.categories?.slug !== cat) return false;
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-display font-bold">Software marketplace</h1>
        <p className="text-muted-foreground mt-2">Every product ships with a reseller commission built in.</p>

        <div className="mt-8 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setCat(null)} className={`px-3 py-1.5 rounded-full text-sm border ${!cat ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-accent"}`}>All</button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => setCat(c.slug)} className={`px-3 py-1.5 rounded-full text-sm border ${cat === c.slug ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-accent"}`}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link key={p.id} to="/products/$slug" params={{ slug: p.slug }} className="group">
              <Card className="overflow-hidden shadow-card hover:shadow-glow transition-shadow h-full flex flex-col">
                <div className="aspect-video bg-muted overflow-hidden">
                  {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="font-display font-semibold">{p.name}</div>
                    <Badge variant="secondary" className="text-xs">{p.commission_percent}% commission</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.short_description}</div>
                  <div className="mt-auto pt-3 font-semibold text-primary">{money(p.price)}<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                </div>
              </Card>
            </Link>
          ))}
          {filtered.length === 0 && <p className="text-muted-foreground col-span-full text-center py-12">No products match your search.</p>}
        </div>
      </section>
    </MarketingLayout>
  );
}
