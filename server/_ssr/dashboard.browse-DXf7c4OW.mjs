import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as supabase } from "./client-DRzh4j6T.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as money } from "./format-yU-BRXA1.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.browse-DXf7c4OW.js
var import_jsx_runtime = require_jsx_runtime();
function Browse() {
	const { data } = useQuery({
		queryKey: ["products", "browse"],
		queryFn: async () => (await supabase.from("products").select("id, name, slug, short_description, price, image_url").eq("status", "active")).data ?? []
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-display font-bold mb-6",
		children: "Browse products"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
		children: (data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/products/$slug",
			params: { slug: p.slug },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden shadow-card hover:shadow-glow transition-shadow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-video bg-muted",
					children: p.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image_url,
						alt: p.name,
						className: "w-full h-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display font-semibold",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground line-clamp-2",
							children: p.short_description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 font-semibold text-primary",
							children: [money(p.price), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
