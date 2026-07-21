import { createFileRoute, Outlet, redirect, Link, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard, Package, ShoppingCart, Receipt, CreditCard, Bell, User, LogOut, Sparkles,
  Link2, Wallet, TrendingUp, Users, BarChart3, Settings, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
    const list = (roles ?? []).map((r) => r.role);
    const role: "admin" | "reseller" | "user" =
      list.includes("admin") ? "admin" : list.includes("reseller") ? "reseller" : "user";
    return { user: data.user, role };
  },
  component: AppShell,
});

function AppShell() {
  const { user, role } = Route.useRouteContext();
  const path = useRouterState({ select: (r) => r.location.pathname });

  const { data: notifCount } = useQuery({
    queryKey: ["notif-unread", user.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("read", false);
      return count ?? 0;
    },
  });

  const crumbs = path.split("/").filter(Boolean);
  const initials = (user.email ?? "U").slice(0, 2).toUpperCase();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AppSidebar role={role} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 glass-strong px-4 md:px-6">
            <SidebarTrigger className="shrink-0" />
            <nav className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5 truncate">
                  {i > 0 && <span className="opacity-40">/</span>}
                  <span className={i === crumbs.length - 1 ? "text-foreground font-medium capitalize truncate" : "capitalize truncate"}>
                    {c}
                  </span>
                </span>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-1">
              <ThemeToggle />
              <Button asChild variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Link to="/dashboard/notifications">
                  <Bell className="w-4 h-4" />
                  {(notifCount ?? 0) > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold grid place-items-center">
                      {notifCount! > 9 ? "9+" : notifCount}
                    </span>
                  )}
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 h-9">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-brand-gradient text-white text-[10px] font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm max-w-40 truncate">{user.email}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">{role}</Badge>
                    <span className="text-xs truncate">{user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile"><User className="w-4 h-4" /> Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/notifications"><Bell className="w-4 h-4" /> Notifications</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={async () => {
                      await supabase.auth.signOut();
                      window.location.href = "/";
                    }}
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const USER_NAV = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/browse", icon: Package, label: "Browse products" },
  { to: "/dashboard/cart", icon: ShoppingCart, label: "Cart" },
  { to: "/dashboard/orders", icon: Receipt, label: "Orders" },
  { to: "/dashboard/subscriptions", icon: CreditCard, label: "Subscriptions" },
  { to: "/dashboard/notifications", icon: Bell, label: "Notifications" },
  { to: "/dashboard/profile", icon: User, label: "Profile" },
] as const;

const RESELLER_NAV = [
  { to: "/reseller", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/reseller/referrals", icon: Link2, label: "Referral link" },
  { to: "/reseller/commissions", icon: TrendingUp, label: "Commissions" },
  { to: "/reseller/withdrawals", icon: Wallet, label: "Withdrawals" },
  { to: "/dashboard/profile", icon: User, label: "Profile" },
] as const;

const ADMIN_NAV = [
  // Map admin sidebar items to the existing authenticated routes
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/dashboard/profile", icon: Users, label: "Users" },
  { to: "/dashboard/browse", icon: Package, label: "Products" },
  { to: "/dashboard/orders", icon: Receipt, label: "Orders" },
  { to: "/dashboard/subscriptions", icon: TrendingUp, label: "Commissions" },
  { to: "/dashboard/profile", icon: Wallet, label: "Withdrawals" },
  { to: "/dashboard", icon: BarChart3, label: "Reports" },
  { to: "/dashboard/profile", icon: Settings, label: "Settings" },
] as const;


function AppSidebar({ role }: { role: "admin" | "reseller" | "user" }) {
  const nav = role === "admin" ? ADMIN_NAV : role === "reseller" ? RESELLER_NAV : USER_NAV;
  const path = useRouterState({ select: (r) => r.location.pathname });
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const rootPath = role === "admin" ? "/admin" : role === "reseller" ? "/reseller" : "/dashboard";
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <div className="px-3 py-4 flex items-center gap-2 font-display font-bold">
          <span className="w-9 h-9 rounded-xl bg-brand-gradient grid place-items-center text-white shrink-0 shadow-md">
            <Sparkles className="w-4 h-4" />
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate">PartnerShip</div>
              <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                {role} portal
              </div>
            </div>
          )}
        </div>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((n) => {
                const active =
                  path === n.to || (n.to !== rootPath && path.startsWith(n.to + "/"));
                return (
                  <SidebarMenuItem key={n.to}>
                    <SidebarMenuButton asChild isActive={active} tooltip={n.label}>
                      <Link to={n.to as string}>
                        <n.icon className="w-4 h-4" />
                        {!collapsed && <span>{n.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
