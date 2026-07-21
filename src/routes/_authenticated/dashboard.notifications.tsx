import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dateFmt } from "@/lib/format";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/notifications")({
  component: Notif,
});

function Notif() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["notifications", user.id],
    queryFn: async () =>
      (await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false })).data ?? [],
  });
  async function markAll() {
    await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
    qc.invalidateQueries({ queryKey: ["notifications"] });
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Notifications</h1>
        <Button size="sm" variant="outline" onClick={markAll}>Mark all read</Button>
      </div>
      {(data ?? []).length === 0 ? (
        <Card className="p-8 text-center shadow-card">
          <Bell className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">You're all caught up.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {(data ?? []).map((n) => (
            <Card key={n.id} className={`p-4 shadow-card ${!n.read ? "border-primary/40 bg-accent/30" : ""}`}>
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{n.title}</div>
                  {n.body && <div className="text-sm text-muted-foreground">{n.body}</div>}
                </div>
                <div className="text-xs text-muted-foreground">{dateFmt(n.created_at)}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
