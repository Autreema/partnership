import { n as productsQuery, t as categoriesQuery } from "./products.index-3zTneb-q.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { n as money } from "./format-yU-BRXA1.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
//#region src/routes/products.index.tsx?tsr-split=component
function ProductsPage() {
	const { data: products } = useSuspenseQuery(productsQuery);
	const { data: categories } = useSuspenseQuery(categoriesQuery);
	const [q, setQ] = useState("");
	const [cat, setCat] = useState(null);
	const filtered = products.filter((p) => {
		if (cat && p.categories?.slug !== cat) return false;
		if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
		return true;
	});
	return /* @__PURE__ */ jsx(MarketingLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-4xl font-display font-bold",
				children: "Software marketplace"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-2",
				children: "Every product ships with a reseller commission built in."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-8 flex flex-wrap gap-3 items-center",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative flex-1 min-w-[240px]",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
						placeholder: "Search products…",
						value: q,
						onChange: (e) => setQ(e.target.value),
						className: "pl-9"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2 flex-wrap",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => setCat(null),
						className: `px-3 py-1.5 rounded-full text-sm border ${!cat ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-accent"}`,
						children: "All"
					}), categories.map((c) => /* @__PURE__ */ jsx("button", {
						onClick: () => setCat(c.slug),
						className: `px-3 py-1.5 rounded-full text-sm border ${cat === c.slug ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-accent"}`,
						children: c.name
					}, c.id))]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
				children: [filtered.map((p) => /* @__PURE__ */ jsx(Link, {
					to: "/products/$slug",
					params: { slug: p.slug },
					className: "group",
					children: /* @__PURE__ */ jsxs(Card, {
						className: "overflow-hidden shadow-card hover:shadow-glow transition-shadow h-full flex flex-col",
						children: [/* @__PURE__ */ jsx("div", {
							className: "aspect-video bg-muted overflow-hidden",
							children: p.image_url && /* @__PURE__ */ jsx("img", {
								src: p.image_url,
								alt: p.name,
								className: "w-full h-full object-cover group-hover:scale-105 transition-transform"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-5 flex-1 flex flex-col",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("div", {
										className: "font-display font-semibold",
										children: p.name
									}), /* @__PURE__ */ jsxs(Badge, {
										variant: "secondary",
										className: "text-xs",
										children: [p.commission_percent, "% commission"]
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-sm text-muted-foreground line-clamp-2 mt-1",
									children: p.short_description
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-auto pt-3 font-semibold text-primary",
									children: [money(p.price), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-normal text-muted-foreground",
										children: "/mo"
									})]
								})
							]
						})]
					})
				}, p.id)), filtered.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground col-span-full text-center py-12",
					children: "No products match your search."
				})]
			})
		]
	}) });
}
//#endregion
export { ProductsPage as component };
