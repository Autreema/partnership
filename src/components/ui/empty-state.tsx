import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-brand-gradient rounded-2xl blur-2xl opacity-20" />
        <div className="relative w-16 h-16 rounded-2xl bg-brand-gradient-soft border grid place-items-center">
          <Icon className="w-7 h-7 text-primary" />
        </div>
      </div>
      <h3 className="mt-6 font-display font-semibold text-lg">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
