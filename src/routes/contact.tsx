import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1).max(2000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PartnerShip" },
      { name: "description", content: "Get in touch with the PartnerShip team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setSending(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Thanks! We'll be in touch.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  }
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl font-display font-bold">Get in touch</h1>
          <p className="text-muted-foreground mt-3">Questions about becoming a reseller, listing a product, or bulk pricing? We'd love to hear from you.</p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" />hello@partnership.app</div>
            <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" />+1 (555) 010-0100</div>
            <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" />Remote-first, globally distributed</div>
          </div>
        </div>
        <Card className="p-6 shadow-card">
          <form onSubmit={submit} className="space-y-4">
            <div><Label htmlFor="n">Name</Label><Input id="n" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={100} /></div>
            <div><Label htmlFor="e">Email</Label><Input id="e" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={255} /></div>
            <div><Label htmlFor="s">Subject</Label><Input id="s" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={200} /></div>
            <div><Label htmlFor="m">Message</Label><Textarea id="m" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} maxLength={2000} /></div>
            <Button type="submit" disabled={sending} className="w-full bg-brand-gradient text-white border-0">
              {sending ? "Sending…" : "Send message"}
            </Button>
          </form>
        </Card>
      </section>
    </MarketingLayout>
  );
}
