import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense, useState, useEffect } from "react";
import { ArrowRight, Users, DollarSign, TrendingUp, Package, Shield, Zap } from "lucide-react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { money } from "@/lib/format";

const featuredProducts = queryOptions({
  queryKey: ["home", "featured"],
  queryFn: async () => {
    const { data } = await supabase
      .from("products")
      .select("id, name, slug, short_description, price, image_url")
      .eq("status", "active")
      .eq("featured", true)
      .limit(3);
    return data ?? [];
  },
});

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <MarketingLayout>
      <Hero />
      <Stats />
      <Suspense fallback={<div className="h-40" />}>
        <Featured />
      </Suspense>
      <Why />
      <CTA />
    </MarketingLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-12">
      {/* Animated grid background */}
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-0 -z-10 bg-brand-gradient-soft opacity-[0.08]" />

      {/* Animated floating gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] animate-pulse" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px] animate-pulse [animation-delay:2s]" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-brand-3/10 blur-[100px] animate-pulse [animation-delay:4s]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT: Hero Content */}
          <div className="max-w-xl lg:pr-4 animate-fade-in">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gradient/10 border border-brand/20 text-sm font-medium text-brand mb-6">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              PartnerShip Platform
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-bold tracking-tight leading-[1.05] text-foreground">
              Build, Sell{' '}
              <span className="text-brand-gradient">&amp; Scale</span>
              <br />
              Your Software Business
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground/90 leading-relaxed max-w-lg">
              Launch your SaaS marketplace, onboard reseller partners, automate commissions, manage subscriptions, and grow recurring revenue from one platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-brand-gradient text-white border-0 shadow-glow shadow-brand/25 transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 text-base px-8 py-6"
              >
                <Link to="/auth">
                  Start Free Trial <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="transition-all duration-300 hover:-translate-y-0.5 text-base px-8 py-6"
              >
                <Link to="/products">Explore Marketplace</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 pt-8 border-t border-border/40">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4">
                {[
                  { icon: Shield, label: "Secure Payments" },
                  { icon: Zap, label: "Automated Commissions" },
                  { icon: Users, label: "Global Partners" },
                  { icon: Package, label: "Subscription Management" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <badge.icon className="w-4 h-4 text-brand shrink-0" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Premium Hero Image */}
          <div className="relative flex items-center justify-center animate-fade-in [animation-delay:150ms]">
            {/* Radial background behind image */}
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-brand/5 via-brand-3/5 to-transparent blur-3xl" />

            {/* Floating gradient blobs */}
            <div className="absolute -top-16 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-[80px] animate-pulse" />
            <div className="absolute -bottom-12 -left-16 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/20 to-brand-3/20 blur-[80px] animate-pulse [animation-delay:3s]" />

            {/* Soft blue glow */}
            <div className="absolute -inset-6 rounded-[3rem] bg-blue-500/5 blur-[60px]" />
            {/* Purple glow */}
            <div className="absolute -inset-4 rounded-[3rem] bg-purple-500/5 blur-[60px]" />

            {/* Glassmorphism card */}
            <div className="relative w-full max-w-[720px] p-4 sm:p-5 rounded-[32px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] dark:from-white/[0.06] dark:to-transparent backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
              {/* Image */}
              <div className="relative w-full aspect-[16/10] max-h-[300px] sm:max-h-[420px] lg:max-h-[520px] overflow-hidden rounded-[28px] border border-white/10 group">
                <img
                  src="/images/employees.jpg"
                  alt="Professional team collaborating in a modern startup office environment"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-[6px]"
                  style={{
                    boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
                  }}
                />
                {/* Image overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Soft shadow under the image */}
            <div className="absolute -bottom-6 left-[15%] right-[15%] h-12 bg-gradient-to-r from-brand/0 via-brand/10 to-brand/0 blur-2xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Sparkle() {
  return <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient" />;
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

function Stats() {
  const items = [
    { k: 10000, suffix: "+", v: "Businesses" },
    { k: 250000, suffix: "+", v: "Subscriptions" },
    { k: 50, suffix: "+", v: "Countries" },
    { k: 99.9, suffix: "%", v: "Platform Uptime" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {items.map((it) => (
          <div key={it.v} className="text-center p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-transparent border border-border/40">
            <div className="text-3xl md:text-4xl font-display font-bold text-foreground">
              <AnimatedCounter target={it.k} suffix={it.suffix} />
            </div>
            <div className="mt-1.5 text-sm text-muted-foreground font-medium">{it.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const { data } = useSuspenseQuery(featuredProducts);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Featured software</h2>
          <p className="text-muted-foreground mt-1">Popular picks resellers love to promote.</p>
        </div>
        <Button asChild variant="ghost"><Link to="/products">All products <ArrowRight className="w-4 h-4" /></Link></Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((p) => (
          <Link key={p.id} to="/products/$slug" params={{ slug: p.slug }} className="group">
            <Card className="overflow-hidden shadow-card hover:shadow-glow transition-shadow">
              <div className="aspect-video bg-muted overflow-hidden">
                {p.image_url && (
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                )}
              </div>
              <div className="p-5">
                <div className="font-display font-semibold">{p.name}</div>
                <div className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.short_description}</div>
                <div className="mt-3 font-semibold text-primary">{money(p.price)}<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Why() {
  const items = [
    { icon: Zap, t: "Instant onboarding", d: "Sign up, pick products, share your referral link. Done in minutes." },
    { icon: DollarSign, t: "Auto commissions", d: "Every purchase through your link generates a commission — tracked in real time." },
    { icon: Shield, t: "Secure & compliant", d: "Bank-grade auth, role-based access, RLS on every table." },
  ];
  return (
    <section className="bg-muted/30 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-3 gap-8">
        {items.map((it) => (
          <div key={it.t}>
            <div className="w-12 h-12 rounded-xl bg-brand-gradient grid place-items-center text-white mb-4">
              <it.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-semibold">{it.t}</h3>
            <p className="text-muted-foreground mt-2">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <Card className="p-10 md:p-16 bg-brand-gradient text-white border-0 text-center shadow-glow">
        <h2 className="text-3xl md:text-4xl font-display font-bold">Ready to earn from what you already recommend?</h2>
        <p className="mt-3 text-white/85 max-w-2xl mx-auto">Join PartnerShip and turn your network into recurring commission revenue.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="secondary"><Link to="/auth">Create account</Link></Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white">
            <Link to="/products">Browse marketplace</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
