import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { money } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/dashboard/browse")({
  component: Browse,
});

function Browse() {
  const { data } = useQuery({
    queryKey: ["products", "browse"],
    queryFn: async () =>
      (await supabase.from("products").select("id, name, slug, short_description, price, image_url").eq("status", "active")).data ?? [],
  });
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Browse products</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(data ?? []).map((p) => (
          <Link key={p.id} to="/products/$slug" params={{ slug: p.slug }}>
            <Card className="overflow-hidden shadow-card hover:shadow-glow transition-shadow">
              <div className="aspect-video bg-muted">
                {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />}
              </div>
              <div className="p-4">
                <div className="font-display font-semibold">{p.name}</div>
                <div className="text-sm text-muted-foreground line-clamp-2">{p.short_description}</div>
                <div className="mt-2 font-semibold text-primary">{money(p.price)}<span className="text-xs text-muted-foreground">/mo</span></div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
