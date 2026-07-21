import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/profile")({
  component: Profile,
});

function Profile() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => (await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()).data,
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => { if (data) { setName(data.full_name ?? ""); setPhone(data.phone ?? ""); } }, [data]);

  async function save() {
    const { error } = await supabase.from("profiles").update({ full_name: name, phone }).eq("id", user.id);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["profile"] }); }
  }
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Profile</h1>
      <Card className="p-6 max-w-lg shadow-card space-y-4">
        <div><Label>Email</Label><Input value={user.email ?? ""} disabled /></div>
        <div><Label htmlFor="fn">Full name</Label><Input id="fn" value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div><Label htmlFor="ph">Phone</Label><Input id="ph" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
        <Button onClick={save} className="bg-brand-gradient text-white border-0">Save changes</Button>
      </Card>
    </div>
  );
}
