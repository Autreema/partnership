import { t as supabase } from "./client-DRzh4j6T.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { n as money } from "./format-yU-BRXA1.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.js";
import { Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, DollarSign, Package, Shield, TrendingUp, Users, Zap } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
var featuredProducts = queryOptions({
	queryKey: ["home", "featured"],
	queryFn: async () => {
		const { data } = await supabase.from("products").select("id, name, slug, short_description, price, image_url").eq("status", "active").eq("featured", true).limit(3);
		return data ?? [];
	}
});
function Home() {
	return /* @__PURE__ */ jsxs(MarketingLayout, { children: [
		/* @__PURE__ */ jsx(Hero, {}),
		/* @__PURE__ */ jsx(Stats, {}),
		/* @__PURE__ */ jsx(Suspense, {
			fallback: /* @__PURE__ */ jsx("div", { className: "h-40" }),
			children: /* @__PURE__ */ jsx(Featured, {})
		}),
		/* @__PURE__ */ jsx(Why, {}),
		/* @__PURE__ */ jsx(CTA, {})
	] });
}
function Hero() {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background" }),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 bg-brand-gradient-soft opacity-[0.10]" }),
			/* @__PURE__ */ jsx("div", { className: "absolute -top-24 left-1/2 -translate-x-1/2 w-[48rem] h-[48rem] rounded-full bg-brand-gradient opacity-[0.08] blur-3xl -z-10" }),
			/* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid lg:grid-cols-2 gap-12 lg:gap-10 items-center",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "max-w-xl lg:pr-6",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "animate-slide-up [animation-delay:60ms]",
								children: /* @__PURE__ */ jsxs("h1", {
									className: "font-display text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight leading-[1.05] text-foreground",
									children: [
										"Grow Your",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-brand-gradient",
											children: "Software Business"
										}),
										/* @__PURE__ */ jsx("br", {}),
										"With Trusted Reseller Partners"
									]
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed",
								children: "Launch and scale your SaaS with a reseller network built for subscriptions—automate commissions, track payouts, and grow revenue from one modern platform."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ jsx(Button, {
									asChild: true,
									size: "lg",
									className: "bg-brand-gradient text-white border-0 shadow-glow transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5",
									children: /* @__PURE__ */ jsxs(Link, {
										to: "/auth",
										children: ["Get Started ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-0.5" })]
									})
								}), /* @__PURE__ */ jsx(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									className: "transition-all duration-300 hover:-translate-y-0.5",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/products",
										children: "Explore Marketplace"
									})
								})]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "absolute -inset-6 -z-10",
							children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[2rem] bg-brand-gradient opacity-[0.10] blur-2xl" }), /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-brand-gradient opacity-[0.08] blur-3xl" })]
						}), /* @__PURE__ */ jsx("div", {
							className: "relative w-full flex justify-center animate-slide-up [animation-delay:120ms] z-10",
							children: /* @__PURE__ */ jsx("div", {
								style: {
									width: "100%",
									minHeight: "350px"
								},
								children: /* @__PURE__ */ jsx("img", {
									src: "/images/employees.jpg",
									alt: "Employees collaborating in modern office",
									loading: "lazy",
									style: {
										width: "100%",
										height: "auto",
										objectFit: "cover",
										borderRadius: "20px",
										display: "block",
										boxShadow: "0 20px 60px -20px rgba(37,99,235,0.25)"
									}
								})
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "sr-only",
				children: "Hero entrance animations are applied via utility classes."
			})
		]
	});
}
function Stats() {
	return /* @__PURE__ */ jsx("section", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-4",
		children: [
			{
				icon: Users,
				k: "12k+",
				v: "Active resellers"
			},
			{
				icon: Package,
				k: "500+",
				v: "Software products"
			},
			{
				icon: DollarSign,
				k: "$4.2M",
				v: "Paid in commissions"
			},
			{
				icon: TrendingUp,
				k: "38%",
				v: "Avg reseller growth"
			}
		].map((it) => /* @__PURE__ */ jsxs(Card, {
			className: "p-6 shadow-card",
			children: [
				/* @__PURE__ */ jsx(it.icon, { className: "w-5 h-5 text-primary mb-3" }),
				/* @__PURE__ */ jsx("div", {
					className: "text-2xl font-display font-bold",
					children: it.k
				}),
				/* @__PURE__ */ jsx("div", {
					className: "text-sm text-muted-foreground",
					children: it.v
				})
			]
		}, it.v))
	});
}
function Featured() {
	const { data } = useSuspenseQuery(featuredProducts);
	return /* @__PURE__ */ jsxs("section", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-end justify-between mb-8",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
				className: "text-3xl font-display font-bold",
				children: "Featured software"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1",
				children: "Popular picks resellers love to promote."
			})] }), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "ghost",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/products",
					children: ["All products ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })]
				})
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid md:grid-cols-3 gap-6",
			children: data.map((p) => /* @__PURE__ */ jsx(Link, {
				to: "/products/$slug",
				params: { slug: p.slug },
				className: "group",
				children: /* @__PURE__ */ jsxs(Card, {
					className: "overflow-hidden shadow-card hover:shadow-glow transition-shadow",
					children: [/* @__PURE__ */ jsx("div", {
						className: "aspect-video bg-muted overflow-hidden",
						children: p.image_url && /* @__PURE__ */ jsx("img", {
							src: p.image_url,
							alt: p.name,
							className: "w-full h-full object-cover group-hover:scale-105 transition-transform"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "font-display font-semibold",
								children: p.name
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-sm text-muted-foreground line-clamp-2 mt-1",
								children: p.short_description
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-3 font-semibold text-primary",
								children: [money(p.price), /* @__PURE__ */ jsx("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: "/mo"
								})]
							})
						]
					})]
				})
			}, p.id))
		})]
	});
}
function Why() {
	return /* @__PURE__ */ jsx("section", {
		className: "bg-muted/30 border-y border-border/60",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-3 gap-8",
			children: [
				{
					icon: Zap,
					t: "Instant onboarding",
					d: "Sign up, pick products, share your referral link. Done in minutes."
				},
				{
					icon: DollarSign,
					t: "Auto commissions",
					d: "Every purchase through your link generates a commission — tracked in real time."
				},
				{
					icon: Shield,
					t: "Secure & compliant",
					d: "Bank-grade auth, role-based access, RLS on every table."
				}
			].map((it) => /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("div", {
					className: "w-12 h-12 rounded-xl bg-brand-gradient grid place-items-center text-white mb-4",
					children: /* @__PURE__ */ jsx(it.icon, { className: "w-6 h-6" })
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "font-display text-xl font-semibold",
					children: it.t
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground mt-2",
					children: it.d
				})
			] }, it.t))
		})
	});
}
function CTA() {
	return /* @__PURE__ */ jsx("section", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20",
		children: /* @__PURE__ */ jsxs(Card, {
			className: "p-10 md:p-16 bg-brand-gradient text-white border-0 text-center shadow-glow",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "text-3xl md:text-4xl font-display font-bold",
					children: "Ready to earn from what you already recommend?"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-white/85 max-w-2xl mx-auto",
					children: "Join PartnerShip and turn your network into recurring commission revenue."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ jsx(Button, {
						asChild: true,
						size: "lg",
						variant: "secondary",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/auth",
							children: "Create account"
						})
					}), /* @__PURE__ */ jsx(Button, {
						asChild: true,
						size: "lg",
						variant: "outline",
						className: "bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/products",
							children: "Browse marketplace"
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { Home as component };
