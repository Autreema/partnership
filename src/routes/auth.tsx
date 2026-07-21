import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { Sparkles, ShieldCheck, Store, User as UserIcon } from "lucide-react";
import { ensureDemoAccounts, DEMO_ACCOUNTS } from "@/lib/demo-accounts.functions";

const emailSchema = z.string().trim().email().max(255);
const pwSchema = z.string().min(8).max(72);

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — PartnerShip" },
      { name: "description", content: "Sign in or create your PartnerShip account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [asReseller, setAsReseller] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Idempotently ensure the three demo accounts exist on first visit.
    ensureDemoAccounts().catch(() => {});
  }, []);

  function fillDemo(role: "admin" | "reseller" | "user") {
    const acc = DEMO_ACCOUNTS.find((a) => a.role === role);
    if (!acc) return;
    setMode("login");
    setEmail(acc.email);
    setPassword(acc.password);
  }

  async function afterAuth(userId: string) {
    if (mode === "register" && asReseller) {
      // add reseller role
      await supabase.from("user_roles").insert({ user_id: userId, role: "reseller" as never });
    }
    // determine role
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    const list = (roles ?? []).map((r) => r.role);
    if (list.includes("admin")) navigate({ to: "/admin" });
    else if (list.includes("reseller")) navigate({ to: "/reseller" });
    else navigate({ to: "/dashboard" });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const eResult = emailSchema.safeParse(email);
    const pResult = pwSchema.safeParse(password);
    if (!eResult.success) return toast.error("Enter a valid email");
    if (!pResult.success) return toast.error("Password must be 8-72 characters");
    setLoading(true);
    if (mode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Welcome back");
      if (data.user) afterAuth(data.user.id);
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { full_name: name },
        },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Account created");
      if (data.user) afterAuth(data.user.id);
    }
  }

  async function google() {
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (res.error) toast.error("Google sign-in failed");
  }

  async function forgot() {
    if (!emailSchema.safeParse(email).success) return toast.error("Enter your email first");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success("Password reset email sent");
  }

  return (
    <MarketingLayout>
      <section className="mx-auto max-w-md px-4 py-16">
        <Card className="p-8 shadow-glow">
          <Link to="/" className="flex items-center gap-2 font-display font-bold mb-6 justify-center">
            <span className="w-8 h-8 rounded-lg bg-brand-gradient grid place-items-center text-white">
              <Sparkles className="w-4 h-4" />
            </span>
            PartnerShip
          </Link>
          <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "register")}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Sign in</TabsTrigger>
              <TabsTrigger value="register">Create account</TabsTrigger>
            </TabsList>
            <form onSubmit={submit} className="mt-6 space-y-4">
              {mode === "register" && (
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required maxLength={72} minLength={8} />
              </div>
              {mode === "register" && (
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" checked={asReseller} onChange={(e) => setAsReseller(e.target.checked)} />
                  Sign me up as a reseller
                </label>
              )}
              <Button type="submit" disabled={loading} className="w-full bg-brand-gradient text-white border-0">
                {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
              </Button>
              {mode === "login" && (
                <button type="button" onClick={forgot} className="text-xs text-muted-foreground hover:text-primary w-full text-center">
                  Forgot password?
                </button>
              )}
            </form>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <Button type="button" variant="outline" className="w-full mt-6" onClick={google}>
              <GoogleIcon /> Continue with Google
            </Button>
            <TabsContent value="login" />
            <TabsContent value="register" />
          </Tabs>
        </Card>

        <Card className="mt-6 p-6">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold">Demo Accounts</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Try PartnerShip instantly — click a role to fill the sign-in form, then press Sign in.
          </p>
          <div className="space-y-3">
            {DEMO_ACCOUNTS.map((acc) => {
              const Icon = acc.role === "admin" ? ShieldCheck : acc.role === "reseller" ? Store : UserIcon;
              return (
                <div key={acc.role} className="rounded-lg border border-border/60 p-3 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-muted grid place-items-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="font-medium text-sm capitalize">{acc.role}</div>
                    <div className="text-muted-foreground truncate">Email: {acc.email}</div>
                    <div className="text-muted-foreground">Password: {acc.password}</div>
                  </div>
                  <Button type="button" size="sm" variant="outline" onClick={() => fillDemo(acc.role)}>
                    Use
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </MarketingLayout>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.3l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2c-.4.4 6.6-4.8 6.6-14.8 0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}
