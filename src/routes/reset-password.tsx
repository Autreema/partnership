import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — PartnerShip" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw.length < 8) return toast.error("Password must be at least 8 characters");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setLoading(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Password updated");
      navigate({ to: "/dashboard" });
    }
  }
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-md px-4 py-16">
        <Card className="p-8 shadow-card">
          <h1 className="text-2xl font-display font-bold">Set a new password</h1>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="pw">New password</Label>
              <Input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} minLength={8} maxLength={72} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-brand-gradient text-white border-0">
              {loading ? "Saving…" : "Update password"}
            </Button>
          </form>
        </Card>
      </section>
    </MarketingLayout>
  );
}
