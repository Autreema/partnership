import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/ui/kpi-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { money, dateFmt } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/reseller/commissions")({
  component: Commissions,
});

const COMMISSION_RECORDS = [
  { id: "1", date: "2026-03-15", customer: "Acme Corp", product: "Pro Analytics Suite", commission: 149.99, status: "paid" as const },
  { id: "2", date: "2026-03-12", customer: "Globex Inc.", product: "Cloud Storage Pro", commission: 89.50, status: "paid" as const },
  { id: "3", date: "2026-03-10", customer: "Initech", product: "AI Assistant", commission: 199.00, status: "pending" as const },
  { id: "4", date: "2026-03-08", customer: "Umbrella Co.", product: "Pro Analytics Suite", commission: 149.99, status: "pending" as const },
  { id: "5", date: "2026-03-05", customer: "Hooli", product: "Cloud Storage Pro", commission: 89.50, status: "paid" as const },
  { id: "6", date: "2026-03-01", customer: "Stark Industries", product: "AI Assistant", commission: 199.00, status: "pending" as const },
];

function Commissions() {
  const totalEarned = COMMISSION_RECORDS.reduce((s, r) => s + r.commission, 0);
  const totalPaid = COMMISSION_RECORDS.filter((r) => r.status === "paid").reduce((s, r) => s + r.commission, 0);
  const totalPending = COMMISSION_RECORDS.filter((r) => r.status === "pending").reduce((s, r) => s + r.commission, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold">Commissions</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your commission earnings from referrals.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard icon={DollarSign} label="Total Earned" value={money(totalEarned)} hint="All time" />
        <KpiCard icon={Clock} label="Pending" value={money(totalPending)} hint="Awaiting payout" />
        <KpiCard icon={CheckCircle2} label="Paid" value={money(totalPaid)} hint="Already withdrawn" />
      </div>
      <Card className="shadow-card border-border/70">
        <div className="p-5 pb-3">
          <h2 className="font-display font-semibold">Commission History</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Recent commission records from your referrals</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Commission</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {COMMISSION_RECORDS.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{dateFmt(record.date)}</TableCell>
                <TableCell>{record.customer}</TableCell>
                <TableCell>{record.product}</TableCell>
                <TableCell className="text-right font-semibold">{money(record.commission)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={record.status === "paid" ? "default" : "secondary"} className="capitalize">{record.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
