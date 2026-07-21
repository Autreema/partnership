import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { money, dateFmt } from "@/lib/format";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const Route = createFileRoute("/_authenticated/dashboard/orders")({
  component: Orders,
});

function Orders() {
  const { user } = Route.useRouteContext();
  const { data } = useQuery({
    queryKey: ["orders", user.id, "list"],
    queryFn: async () =>
      (await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })).data ?? [],
  });

  function invoice(o: NonNullable<typeof data>[number]) {
    const doc = new jsPDF();
    doc.setFontSize(20); doc.text("PartnerShip Invoice", 14, 20);
    doc.setFontSize(10);
    doc.text(`Order: ${o.order_number}`, 14, 30);
    doc.text(`Date: ${dateFmt(o.created_at)}`, 14, 36);
    doc.text(`Status: ${o.status}`, 14, 42);
    autoTable(doc, {
      startY: 50,
      head: [["Product", "Qty", "Unit", "Total"]],
      body: (o.order_items ?? []).map((it) => [it.product_name, it.quantity, money(it.unit_price), money(it.line_total)]),
    });
    const y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total: ${money(o.total)}`, 14, y);
    doc.save(`invoice-${o.order_number}.pdf`);
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Order history</h1>
      {(data ?? []).length === 0 && <Card className="p-8 text-center text-muted-foreground shadow-card">No orders yet.</Card>}
      <div className="space-y-3">
        {(data ?? []).map((o) => (
          <Card key={o.id} className="p-5 shadow-card">
            <div className="flex flex-wrap justify-between items-start gap-3">
              <div>
                <div className="font-medium">{o.order_number}</div>
                <div className="text-xs text-muted-foreground">{dateFmt(o.created_at)} · {o.payment_method}</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={o.status === "paid" ? "default" : "secondary"} className="capitalize">{o.status}</Badge>
                <div className="font-semibold">{money(o.total)}</div>
                <Button size="sm" variant="outline" onClick={() => invoice(o)}><Download className="w-3 h-3" /> Invoice</Button>
              </div>
            </div>
            <ul className="mt-3 text-sm text-muted-foreground space-y-1">
              {(o.order_items ?? []).map((it) => (
                <li key={it.id}>{it.product_name} × {it.quantity} — {money(it.line_total)}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
