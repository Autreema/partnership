import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-BOzNoEKJ.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "max-w-7xl mx-auto px-4 py-24 text-center",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-3xl font-display font-bold",
		children: "Product not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/products",
			children: "Back to marketplace"
		})
	})]
}) });
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
