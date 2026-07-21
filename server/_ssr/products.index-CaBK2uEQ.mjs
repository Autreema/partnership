import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { _ as Search } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as money } from "./format-yU-BRXA1.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as productsQuery, t as categoriesQuery } from "./products.index-3zTneb-q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.index-CaBK2uEQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductsPage() {
	const { data: products } = useSuspenseQuery(productsQuery);
	const { data: categories } = useSuspenseQuery(categoriesQuery);
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)(null);
	const filtered = products.filter((p) => {
		if (cat && p.categories?.slug !== cat) return false;
		if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-display font-bold",
				children: "Software marketplace"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-2",
				children: "Every product ships with a reseller commission built in."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 min-w-[240px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search products…",
						value: q,
						onChange: (e) => setQ(e.target.value),
						className: "pl-9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setCat(null),
						className: `px-3 py-1.5 rounded-full text-sm border ${!cat ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-accent"}`,
						children: "All"
					}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setCat(c.slug),
						className: `px-3 py-1.5 rounded-full text-sm border ${cat === c.slug ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-accent"}`,
						children: c.name
					}, c.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
				children: [filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/products/$slug",
					params: { slug: p.slug },
					className: "group",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden shadow-card hover:shadow-glow transition-shadow h-full flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-video bg-muted overflow-hidden",
							children: p.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.image_url,
								alt: p.name,
								className: "w-full h-full object-cover group-hover:scale-105 transition-transform"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 flex-1 flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display font-semibold",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "secondary",
										className: "text-xs",
										children: [p.commission_percent, "% commission"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground line-clamp-2 mt-1",
									children: p.short_description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto pt-3 font-semibold text-primary",
									children: [money(p.price), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-normal text-muted-foreground",
										children: "/mo"
									})]
								})
							]
						})]
					})
				}, p.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground col-span-full text-center py-12",
					children: "No products match your search."
				})]
			})
		]
	}) });
}
//#endregion
export { ProductsPage as component };
