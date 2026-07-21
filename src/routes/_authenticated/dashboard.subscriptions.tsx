import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dateFmt } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/dashboard/subscriptions")({
  component: Subs,
});

function Subs() {
  const { user } = Route.useRouteContext();
  const { data } = useQuery({
    queryKey: ["subs", user.id, "list"],
    queryFn: async () =>
      (await supabase.from("subscriptions").select("*, products(name)").eq("user_id", user.id).order("created_at", { ascending: false })).data ?? [],
  });
  const now = Date.now();
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Subscriptions</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {(data ?? []).map((s) => {
          const expired = new Date(s.expires_at).getTime() < now;
          return (
            <Card key={s.id} className="p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div className="font-display font-semibold">{s.products?.name}</div>
                <Badge variant={expired ? "destructive" : "default"}>{expired ? "Expired" : "Active"}</Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-2">Started {dateFmt(s.started_at)}</div>
              <div className="text-sm text-muted-foreground">Renews {dateFmt(s.expires_at)}</div>
            </Card>
          );
        })}
        {(data ?? []).length === 0 && <Card className="p-8 text-center text-muted-foreground shadow-card md:col-span-2">No subscriptions yet.</Card>}
      </div>
    </div>
  );
}
