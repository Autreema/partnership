import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/ui/kpi-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wallet, ArrowUpRight, Clock, Plus } from "lucide-react";
import { money, dateFmt } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/reseller/withdrawals")({
  component: Withdrawals,
});

const WITHDRAWAL_HISTORY = [
  { id: "1", date: "2026-03-14", amount: 350.00, method: "Bank Transfer", status: "completed" as const },
  { id: "2", date: "2026-03-07", amount: 200.00, method: "PayPal", status: "completed" as const },
  { id: "3", date: "2026-02-28", amount: 450.00, method: "Bank Transfer", status: "completed" as const },
  { id: "4", date: "2026-02-20", amount: 180.00, method: "PayPal", status: "pending" as const },
  { id: "5", date: "2026-02-10", amount: 120.00, method: "Bank Transfer", status: "completed" as const },
];

function Withdrawals() {
  const totalWithdrawn = WITHDRAWAL_HISTORY.filter((w) => w.status === "completed").reduce((s, w) => s + w.amount, 0);
  const pendingAmount = WITHDRAWAL_HISTORY.filter((w) => w.status === "pending").reduce((s, w) => s + w.amount, 0);

  const requestWithdrawal = () => {
    toast.success("Withdrawal request submitted for review");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold">Withdrawals</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your withdrawal requests and payout methods.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard icon={Wallet} label="Available Balance" value={money(438.49)} hint="Ready to withdraw" />
        <KpiCard icon={ArrowUpRight} label="Total Withdrawn" value={money(totalWithdrawn)} hint="All time payouts" />
        <KpiCard icon={Clock} label="Pending Withdrawals" value={money(pendingAmount)} hint="Under review" />
      </div>
      <Card className="p-6 shadow-card border-border/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-semibold">Request a Withdrawal</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Your available balance of <span className="font-semibold text-foreground">{money(438.49)}</span> can be withdrawn to your preferred payment method.
            </p>
          </div>
          <Button onClick={requestWithdrawal} className="bg-brand-gradient text-white border-0 shrink-0">
            <Plus className="w-4 h-4" />
            Request Withdrawal
          </Button>
        </div>
      </Card>
      <Card className="shadow-card border-border/70">
        <div className="p-5 pb-3">
          <h2 className="font-display font-semibold">Withdrawal History</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Your recent withdrawal requests</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {WITHDRAWAL_HISTORY.map((w) => (
              <TableRow key={w.id}>
                <TableCell className="font-medium">{dateFmt(w.date)}</TableCell>
                <TableCell className="text-right font-semibold">{money(w.amount)}</TableCell>
                <TableCell>{w.method}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={w.status === "completed" ? "default" : "secondary"} className="capitalize">{w.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
