import { t as supabase } from "./client-DRzh4j6T.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { n as money } from "./format-yU-BRXA1.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
//#region src/routes/_authenticated/dashboard.browse.tsx?tsr-split=component
function Browse() {
	const { data } = useQuery({
		queryKey: ["products", "browse"],
		queryFn: async () => (await supabase.from("products").select("id, name, slug, short_description, price, image_url").eq("status", "active")).data ?? []
	});
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
		className: "text-2xl font-display font-bold mb-6",
		children: "Browse products"
	}), /* @__PURE__ */ jsx("div", {
		className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
		children: (data ?? []).map((p) => /* @__PURE__ */ jsx(Link, {
			to: "/products/$slug",
			params: { slug: p.slug },
			children: /* @__PURE__ */ jsxs(Card, {
				className: "overflow-hidden shadow-card hover:shadow-glow transition-shadow",
				children: [/* @__PURE__ */ jsx("div", {
					className: "aspect-video bg-muted",
					children: p.image_url && /* @__PURE__ */ jsx("img", {
						src: p.image_url,
						alt: p.name,
						className: "w-full h-full object-cover"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-4",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "font-display font-semibold",
							children: p.name
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-sm text-muted-foreground line-clamp-2",
							children: p.short_description
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-2 font-semibold text-primary",
							children: [money(p.price), /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: "/mo"
							})]
						})
					]
				})]
			})
		}, p.id))
	})] });
}
//#endregion
export { Browse as component };
