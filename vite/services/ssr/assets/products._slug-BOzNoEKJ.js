import { t as Button } from "./button-Bq5vK6RO.js";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/products.$slug.tsx?tsr-split=notFoundComponent
var SplitNotFoundComponent = () => /* @__PURE__ */ jsx(MarketingLayout, { children: /* @__PURE__ */ jsxs("div", {
	className: "max-w-7xl mx-auto px-4 py-24 text-center",
	children: [/* @__PURE__ */ jsx("h1", {
		className: "text-3xl font-display font-bold",
		children: "Product not found"
	}), /* @__PURE__ */ jsx(Button, {
		asChild: true,
		className: "mt-4",
		children: /* @__PURE__ */ jsx(Link, {
			to: "/products",
			children: "Back to marketplace"
		})
	})]
}) });
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
