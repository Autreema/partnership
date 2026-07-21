import { t as supabase } from "./client-DRzh4j6T.js";
import { t as Route } from "./dashboard.index-DD-Rlufa.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { n as money, t as dateFmt } from "./format-yU-BRXA1.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CreditCard, Package, Receipt, ShoppingCart, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
//#region src/components/ui/kpi-card.tsx
function KpiCard({ icon: Icon, label, value, trend, hint, className }) {
	const positive = typeof trend === "number" ? trend >= 0 : void 0;
	return /* @__PURE__ */ jsxs(Card, {
		className: cn("relative overflow-hidden p-5 shadow-card hover-lift border-border/70", className),
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-gradient opacity-[0.08] blur-2xl" }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between relative",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
						children: label
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-2 text-2xl font-display font-bold tracking-tight",
						children: value
					}),
					hint && /* @__PURE__ */ jsx("div", {
						className: "mt-1 text-xs text-muted-foreground",
						children: hint
					})
				] }), /* @__PURE__ */ jsx("div", {
					className: "w-10 h-10 rounded-xl bg-brand-gradient grid place-items-center text-white shadow-md shrink-0",
					children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" })
				})]
			}),
			typeof trend === "number" && /* @__PURE__ */ jsxs("div", {
				className: cn("mt-3 inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5", positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"),
				children: [
					positive ? /* @__PURE__ */ jsx(TrendingUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(TrendingDown, { className: "w-3 h-3" }),
					positive ? "+" : "",
					trend,
					"%"
				]
			})
		]
	});
}
//#endregion
//#region src/components/ui/empty-state.tsx
function EmptyState({ icon: Icon, title, description, action }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center text-center py-16 px-6 animate-fade-in",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-brand-gradient rounded-2xl blur-2xl opacity-20" }), /* @__PURE__ */ jsx("div", {
					className: "relative w-16 h-16 rounded-2xl bg-brand-gradient-soft border grid place-items-center",
					children: /* @__PURE__ */ jsx(Icon, { className: "w-7 h-7 text-primary" })
				})]
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "mt-6 font-display font-semibold text-lg",
				children: title
			}),
			description && /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm text-muted-foreground max-w-sm",
				children: description
			}),
			action && /* @__PURE__ */ jsx("div", {
				className: "mt-6",
				children: action
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/dashboard.index.tsx?tsr-split=component
function DashboardHome() {
	const { user } = Route.useRouteContext();
	const { data: orders } = useQuery({
		queryKey: ["orders", user.id],
		queryFn: async () => (await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5)).data ?? []
	});
	const { data: subs } = useQuery({
		queryKey: ["subs", user.id],
		queryFn: async () => (await supabase.from("subscriptions").select("*, products(name)").eq("user_id", user.id).eq("status", "active")).data ?? []
	});
	const { data: cart } = useQuery({
		queryKey: ["cart", user.id],
		queryFn: async () => (await supabase.from("cart_items").select("id").eq("user_id", user.id)).data ?? []
	});
	const totalSpent = (orders ?? []).filter((o) => o.status === "paid").reduce((s, o) => s + Number(o.total), 0);
	const displayName = user.email?.split("@")[0] ?? "there";
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative overflow-hidden rounded-2xl bg-brand-gradient p-6 md:p-8 text-white shadow-glow",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-bg opacity-10" }),
					/* @__PURE__ */ jsx("div", { className: "absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" }),
					/* @__PURE__ */ jsxs("div", {
						className: "relative flex flex-col md:flex-row md:items-center md:justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium",
								children: [/* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3" }), " Welcome back"]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "mt-3 text-3xl md:text-4xl font-display font-bold capitalize",
								children: [
									"Hi, ",
									displayName,
									" 👋"
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-white/85 max-w-xl",
								children: "Here's a live snapshot of your subscriptions, orders, and cart activity."
							})
						] }), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ jsx(Button, {
								asChild: true,
								variant: "secondary",
								size: "sm",
								className: "bg-white text-primary hover:bg-white/90",
								children: /* @__PURE__ */ jsxs(Link, {
									to: "/dashboard/browse",
									children: ["Browse marketplace ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })]
								})
							}), /* @__PURE__ */ jsx(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								className: "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/dashboard/cart",
									children: "View cart"
								})
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(KpiCard, {
						icon: Receipt,
						label: "Orders",
						value: orders?.length ?? 0,
						hint: "Last 5 shown"
					}),
					/* @__PURE__ */ jsx(KpiCard, {
						icon: CreditCard,
						label: "Active subscriptions",
						value: subs?.length ?? 0
					}),
					/* @__PURE__ */ jsx(KpiCard, {
						icon: ShoppingCart,
						label: "Cart items",
						value: cart?.length ?? 0
					}),
					/* @__PURE__ */ jsx(KpiCard, {
						icon: Package,
						label: "Total spent",
						value: money(totalSpent)
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "p-6 shadow-card border-border/70",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-display font-semibold",
							children: "Recent orders"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Your last 5 purchases"
						})] }), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "sm",
							variant: "ghost",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/dashboard/orders",
								children: ["View all ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })]
							})
						})]
					}), (orders ?? []).length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
						icon: Receipt,
						title: "No orders yet",
						description: "Once you buy something, your order history will appear here.",
						action: /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/dashboard/browse",
								children: "Browse products"
							})
						})
					}) : /* @__PURE__ */ jsx("ul", {
						className: "divide-y divide-border/60",
						children: (orders ?? []).map((o) => /* @__PURE__ */ jsxs("li", {
							className: "py-3 flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-medium truncate",
									children: o.order_number
								}), /* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground",
									children: dateFmt(o.created_at)
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-right shrink-0",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-semibold",
									children: money(o.total)
								}), /* @__PURE__ */ jsx(Badge, {
									variant: "secondary",
									className: `text-[10px] mt-0.5 capitalize ${o.status === "paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`,
									children: o.status
								})]
							})]
						}, o.id))
					})]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "p-6 shadow-card border-border/70",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "font-display font-semibold",
							children: "Active subscriptions"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Renewing automatically"
						})] }), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "sm",
							variant: "ghost",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/dashboard/subscriptions",
								children: ["Manage ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })]
							})
						})]
					}), (subs ?? []).length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
						icon: CreditCard,
						title: "No active subscriptions",
						description: "Subscribe to a product to unlock ongoing access.",
						action: /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/dashboard/browse",
								children: "Explore marketplace"
							})
						})
					}) : /* @__PURE__ */ jsx("ul", {
						className: "space-y-2",
						children: (subs ?? []).map((s) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-center justify-between p-3 rounded-lg border border-border/60 hover-lift text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-medium truncate",
								children: s.products?.name
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-muted-foreground text-xs shrink-0",
								children: ["Renews ", dateFmt(s.expires_at)]
							})]
						}, s.id))
					})]
				})]
			})
		]
	});
}
//#endregion
export { DashboardHome as component };
