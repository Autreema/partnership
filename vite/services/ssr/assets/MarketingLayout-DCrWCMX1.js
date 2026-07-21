import { t as supabase } from "./client-DRzh4j6T.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as ThemeToggle } from "./theme-toggle-Cu3039Js.js";
import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { LayoutDashboard, LogOut, Menu, Sparkles, X } from "lucide-react";
//#region src/hooks/use-session.ts
function useSession() {
	const [session, setSession] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setLoading(false);
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
		return () => sub.subscription.unsubscribe();
	}, []);
	return {
		session,
		user: session?.user ?? null,
		loading
	};
}
//#endregion
//#region src/components/marketing/MarketingLayout.tsx
var NAV = [
	{
		to: "/products",
		label: "Products"
	},
	{
		to: "/pricing",
		label: "Pricing"
	},
	{
		to: "/how-it-works",
		label: "How it works"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/faq",
		label: "FAQ"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function MarketingLayout({ children }) {
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
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex flex-col bg-background",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: `sticky top-0 z-40 transition-all duration-300 ${scrolled ? "glass-strong border-b border-border/60 shadow-[0_1px_0_0_rgba(15,23,42,0.04)]" : "border-b border-transparent bg-background/60 backdrop-blur"}`,
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "h-16 flex items-center justify-between gap-4",
						children: [
							/* @__PURE__ */ jsxs(Link, {
								to: "/",
								className: "flex items-center gap-2 font-display font-bold text-lg shrink-0",
								children: [/* @__PURE__ */ jsx("span", {
									className: "w-8 h-8 rounded-xl bg-brand-gradient grid place-items-center text-white shadow-md",
									children: /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4" })
								}), "PartnerShip"]
							}),
							/* @__PURE__ */ jsx("nav", {
								className: "hidden md:flex items-center gap-1",
								children: NAV.map((n) => {
									const active = pathname === n.to || pathname.startsWith(n.to + "/");
									return /* @__PURE__ */ jsxs(Link, {
										to: n.to,
										className: `relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`,
										children: [n.label, active && /* @__PURE__ */ jsx("span", { className: "absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient" })]
									}, n.to);
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hidden md:flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx(ThemeToggle, {}), user ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button, {
									asChild: true,
									variant: "ghost",
									size: "sm",
									children: /* @__PURE__ */ jsxs(Link, {
										to: "/dashboard",
										children: [/* @__PURE__ */ jsx(LayoutDashboard, { className: "w-4 h-4" }), " Dashboard"]
									})
								}), /* @__PURE__ */ jsxs(Button, {
									size: "sm",
									variant: "outline",
									onClick: async () => {
										await supabase.auth.signOut();
										window.location.href = "/";
									},
									children: [/* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }), " Sign out"]
								})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button, {
									asChild: true,
									variant: "ghost",
									size: "sm",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/auth",
										children: "Sign in"
									})
								}), /* @__PURE__ */ jsx(Button, {
									asChild: true,
									size: "sm",
									className: "bg-brand-gradient text-white border-0 shadow-md hover:opacity-90 hover:shadow-lg transition-all",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/auth",
										search: { tab: "register" },
										children: "Get started"
									})
								})] })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "md:hidden flex items-center gap-1",
								children: [/* @__PURE__ */ jsx(ThemeToggle, {}), /* @__PURE__ */ jsx("button", {
									className: "p-2 -mr-2 rounded-md hover:bg-accent",
									onClick: () => setOpen((o) => !o),
									"aria-label": "Menu",
									children: open ? /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
								})]
							})
						]
					}), open && /* @__PURE__ */ jsxs("div", {
						className: "md:hidden pb-4 flex flex-col gap-1 animate-fade-in",
						children: [NAV.map((n) => /* @__PURE__ */ jsx(Link, {
							to: n.to,
							className: "px-3 py-2 rounded-lg text-sm hover:bg-accent",
							children: n.label
						}, n.to)), /* @__PURE__ */ jsx("div", {
							className: "flex gap-2 pt-2",
							children: user ? /* @__PURE__ */ jsx(Button, {
								asChild: true,
								className: "flex-1",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/dashboard",
									children: "Dashboard"
								})
							}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button, {
								asChild: true,
								variant: "outline",
								className: "flex-1",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/auth",
									children: "Sign in"
								})
							}), /* @__PURE__ */ jsx(Button, {
								asChild: true,
								className: "flex-1 bg-brand-gradient text-white border-0",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/auth",
									children: "Get started"
								})
							})] })
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1 animate-fade-in",
				children
			}),
			/* @__PURE__ */ jsxs("footer", {
				className: "border-t border-border/60 bg-muted/30",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 font-display font-bold",
							children: [/* @__PURE__ */ jsx("span", {
								className: "w-8 h-8 rounded-xl bg-brand-gradient grid place-items-center text-white",
								children: /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4" })
							}), "PartnerShip"]
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-3 text-sm text-muted-foreground max-w-xs",
							children: "Software marketplace with resellers and commissions built in."
						})] }),
						/* @__PURE__ */ jsx(FooterCol, {
							title: "Product",
							links: [
								["Products", "/products"],
								["Pricing", "/pricing"],
								["How it works", "/how-it-works"]
							]
						}),
						/* @__PURE__ */ jsx(FooterCol, {
							title: "Company",
							links: [
								["About", "/about"],
								["Contact", "/contact"],
								["FAQ", "/faq"]
							]
						}),
						/* @__PURE__ */ jsx(FooterCol, {
							title: "Account",
							links: [
								["Sign in", "/auth"],
								["Get started", "/auth"],
								["Dashboard", "/dashboard"]
							]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "border-t border-border/60 py-4 text-center text-xs text-muted-foreground",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" PartnerShip. All rights reserved."
					]
				})]
			})
		]
	});
}
function FooterCol({ title, links }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
		className: "font-semibold text-sm mb-3",
		children: title
	}), /* @__PURE__ */ jsx("ul", {
		className: "space-y-2 text-sm text-muted-foreground",
		children: links.map(([label, to]) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
			to,
			className: "hover:text-foreground transition-colors",
			children: label
		}) }, to))
	})] });
}
//#endregion
export { useSession as n, MarketingLayout as t };
