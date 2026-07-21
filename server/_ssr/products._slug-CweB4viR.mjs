import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as supabase } from "./client-DRzh4j6T.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { R as Check, p as ShoppingCart } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSession, t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as money } from "./format-yU-BRXA1.mjs";
import { a as useQueryClient, n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as productQuery, t as Route } from "./products._slug-oksc4UMR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-CweB4viR.js
var import_jsx_runtime = require_jsx_runtime();
function ProductDetail() {
	const { slug } = Route.useParams();
	const { data: p } = useSuspenseQuery(productQuery(slug));
	const { user } = useSession();
	const navigate = useNavigate();
	const qc = useQueryClient();
	if (!p) return null;
	async function addToCart() {
		if (!user) {
			toast.info("Sign in to add items to your cart");
			navigate({ to: "/auth" });
			return;
		}
		const { error } = await supabase.from("cart_items").upsert({
			user_id: user.id,
			product_id: p.id,
			quantity: 1
		}, { onConflict: "user_id,product_id,plan_id" });
		if (error) toast.error(error.message);
		else {
			toast.success("Added to cart");
			qc.invalidateQueries({ queryKey: ["cart"] });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-hidden shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-video bg-muted",
				children: p.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.image_url,
					alt: p.name,
					className: "w-full h-full object-cover"
				})
			})
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			p.categories && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "secondary",
				children: p.categories.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-4xl font-display font-bold",
				children: p.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: p.description || p.short_description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-baseline gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-3xl font-display font-bold text-primary",
					children: money(p.price)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground",
					children: "/ month"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-2 text-sm",
				children: [
					"Instant activation",
					"Cancel anytime",
					"24/7 support",
					`${p.commission_percent}% reseller commission`
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-success" }), f]
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "bg-brand-gradient text-white border-0 hover:opacity-90",
					onClick: addToCart,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-4 h-4" }), " Add to cart"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/products",
						children: "Back"
					})
				})]
			})
		] })]
	}) });
}
//#endregion
export { ProductDetail as component };
