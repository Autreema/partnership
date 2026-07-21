import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/ui/kpi-card";
import { Copy, RefreshCw, MousePointerClick, UserPlus, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/reseller/referrals")({
  component: ReferralLink,
});

const SAMPLE_REFERRAL_URL = "https://partnership.com/ref/AC7X2K9";

function ReferralLink() {
  const [referralUrl] = useState(SAMPLE_REFERRAL_URL);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      toast.success("Referral link copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const generateNewLink = () => {
    toast.success("New referral link generated");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold">Referral Link</h1>
        <p className="text-sm text-muted-foreground mt-1">Share your referral link and invite new partners.</p>
      </div>
      <Card className="p-6 shadow-card border-border/70">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
              Your referral link
            </label>
            <Input value={referralUrl} readOnly className="font-mono text-sm" />
          </div>
          <div className="flex gap-2 shrink-0 pt-5 sm:pt-0">
            <Button variant="default" size="default" onClick={copyToClipboard} className="bg-brand-gradient text-white border-0">
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            <Button variant="outline" size="default" onClick={generateNewLink}>
              <RefreshCw className="w-4 h-4" />
              Generate New Link
            </Button>
          </div>
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard icon={MousePointerClick} label="Total Clicks" value="1,482" trend={12.5} hint="Last 30 days" />
        <KpiCard icon={UserPlus} label="Total Signups" value="89" trend={8.3} hint="Last 30 days" />
        <KpiCard icon={TrendingUp} label="Conversion Rate" value="6.0%" trend={-1.2} hint="From clicks to signups" />
      </div>
    </div>
  );
}
