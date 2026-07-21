import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-e6OfqCGP.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
	className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl md:text-5xl font-display font-bold",
			children: "About PartnerShip"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-lg text-muted-foreground",
			children: "We built PartnerShip because we believe every great product deserves a great distribution network — and every recommender deserves to earn from what they share."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
			].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display font-semibold",
					children: b.k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground mt-2",
					children: b.v
				})]
			}, b.k))
		})
	]
}) });
//#endregion
export { SplitComponent as component };
