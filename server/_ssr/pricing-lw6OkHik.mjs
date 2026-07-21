import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { R as Check } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-lw6OkHik.js
var import_jsx_runtime = require_jsx_runtime();
var TIERS = [
	{
		name: "Monthly",
		price: 29,
		period: "/mo",
		desc: "Perfect for trying us out",
		features: [
			"All software access",
			"Reseller referral link",
			"Email support"
		]
	},
	{
		name: "Quarterly",
		price: 78,
		period: "/quarter",
		desc: "Save 10% vs monthly",
		features: [
			"Everything in Monthly",
			"Priority support",
			"Reseller analytics"
		]
	},
	{
		name: "Half-Yearly",
		price: 145,
		period: "/6mo",
		desc: "Save 17% vs monthly",
		features: [
			"Everything in Quarterly",
			"Higher commission tiers",
			"Dedicated account manager"
		],
		highlight: true
	},
	{
		name: "Yearly",
		price: 260,
		period: "/yr",
		desc: "Save 25% vs monthly",
		features: [
			"Everything in Half-Yearly",
			"Custom integrations",
			"Early feature access"
		]
	}
];
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
	className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl md:text-5xl font-display font-bold",
			children: "Simple, transparent pricing"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground mt-3 max-w-2xl mx-auto",
			children: "Pick a billing cadence — every plan includes the full marketplace and reseller tools."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left",
			children: TIERS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: `p-6 shadow-card ${t.highlight ? "border-primary ring-1 ring-primary shadow-glow" : ""}`,
				children: [
					t.highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold text-primary mb-2",
						children: "MOST POPULAR"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-xl font-semibold",
						children: t.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground text-sm",
						children: t.desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-baseline gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-3xl font-display font-bold",
							children: ["$", t.price]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground",
							children: t.period
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-2 text-sm",
						children: t.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-success mt-0.5" }), f]
						}, f))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: `mt-6 w-full ${t.highlight ? "bg-brand-gradient text-white border-0" : ""}`,
						variant: t.highlight ? "default" : "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: "Get started"
						})
					})
				]
			}, t.name))
		})
	]
}) });
//#endregion
export { SplitComponent as component };
