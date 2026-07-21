import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Sparkles, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

const NAV = [
  { to: "/products", label: "Products" },
  { to: "/pricing", label: "Pricing" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function MarketingLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { user } = useSession();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "glass-strong border-b border-border/60 shadow-[0_1px_0_0_rgba(15,23,42,0.04)]"
            : "border-b border-transparent bg-background/60 backdrop-blur"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg shrink-0">
              <span className="w-8 h-8 rounded-xl bg-brand-gradient grid place-items-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </span>
              PartnerShip
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((n) => {
                const active = pathname === n.to || pathname.startsWith(n.to + "/");
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {n.label}
                    {active && (
                      <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-1.5">
              <ThemeToggle />
              {user ? (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/dashboard">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.href = "/";
                    }}
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/auth">Sign in</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-brand-gradient text-white border-0 shadow-md hover:opacity-90 hover:shadow-lg transition-all"
                  >
                    <Link to="/auth" search={{ tab: "register" } as never}>
                      Get started
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center gap-1">
              <ThemeToggle />
              <button
                className="p-2 -mr-2 rounded-md hover:bg-accent"
                onClick={() => setOpen((o) => !o)}
                aria-label="Menu"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {open && (
            <div className="md:hidden pb-4 flex flex-col gap-1 animate-fade-in">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="px-3 py-2 rounded-lg text-sm hover:bg-accent"
                >
                  {n.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                {user ? (
                  <Button asChild className="flex-1"><Link to="/dashboard">Dashboard</Link></Button>
                ) : (
                  <>
                    <Button asChild variant="outline" className="flex-1"><Link to="/auth">Sign in</Link></Button>
                    <Button asChild className="flex-1 bg-brand-gradient text-white border-0">
                      <Link to="/auth">Get started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 animate-fade-in">{children}</main>

      <footer className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display font-bold">
              <span className="w-8 h-8 rounded-xl bg-brand-gradient grid place-items-center text-white">
                <Sparkles className="w-4 h-4" />
              </span>
              PartnerShip
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Software marketplace with resellers and commissions built in.
            </p>
          </div>
          <FooterCol title="Product" links={[["Products", "/products"], ["Pricing", "/pricing"], ["How it works", "/how-it-works"]]} />
          <FooterCol title="Company" links={[["About", "/about"], ["Contact", "/contact"], ["FAQ", "/faq"]]} />
          <FooterCol title="Account" links={[["Sign in", "/auth"], ["Get started", "/auth"], ["Dashboard", "/dashboard"]]} />
        </div>
        <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PartnerShip. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="font-semibold text-sm mb-3">{title}</div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link to={to} className="hover:text-foreground transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
