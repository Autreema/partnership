import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({
  icon: Icon,
  label,
  value,
  trend,
  hint,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: number;
  hint?: string;
  className?: string;
}) {
  const positive = typeof trend === "number" ? trend >= 0 : undefined;
  return (
    <Card
      className={cn(
        "relative overflow-hidden p-5 shadow-card hover-lift border-border/70",
        className,
      )}
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-gradient opacity-[0.08] blur-2xl" />
      <div className="flex items-start justify-between relative">
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </div>
          <div className="mt-2 text-2xl font-display font-bold tracking-tight">
            {value}
          </div>
          {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
        </div>
        <div className="w-10 h-10 rounded-xl bg-brand-gradient grid place-items-center text-white shadow-md shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {typeof trend === "number" && (
        <div
          className={cn(
            "mt-3 inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5",
            positive
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive",
          )}
        >
          {positive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {positive ? "+" : ""}
          {trend}%
        </div>
      )}
    </Card>
  );
}
