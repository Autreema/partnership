import { t as Card } from "./card-CzXpCsbD.js";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/about.tsx?tsr-split=component
var SplitComponent = () => /* @__PURE__ */ jsx(MarketingLayout, { children: /* @__PURE__ */ jsxs("section", {
	className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16",
	children: [
		/* @__PURE__ */ jsx("h1", {
			className: "text-4xl md:text-5xl font-display font-bold",
			children: "About PartnerShip"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mt-6 text-lg text-muted-foreground",
			children: "We built PartnerShip because we believe every great product deserves a great distribution network — and every recommender deserves to earn from what they share."
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-10 grid md:grid-cols-3 gap-4",
			children: [
				{
					k: "Our mission",
					v: "Make software distribution partner-first from day one."
				},
				{
					k: "Our team",
					v: "Ex-marketplace and payments engineers based across three continents."
				},
				{
					k: "Our values",
					v: "Transparent pricing, fair commissions, and no hidden fees."
				}
			].map((b) => /* @__PURE__ */ jsxs(Card, {
				className: "p-6 shadow-card",
				children: [/* @__PURE__ */ jsx("div", {
					className: "font-display font-semibold",
					children: b.k
				}), /* @__PURE__ */ jsx("div", {
					className: "text-sm text-muted-foreground mt-2",
					children: b.v
				})]
			}, b.k))
		})
	]
}) });
//#endregion
export { SplitComponent as component };
