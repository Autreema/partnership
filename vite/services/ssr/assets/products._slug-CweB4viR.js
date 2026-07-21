import { t as supabase } from "./client-DRzh4j6T.js";
import { n as productQuery, t as Route } from "./products._slug-oksc4UMR.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { n as money } from "./format-yU-BRXA1.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { n as useSession, t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.js";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, ShoppingCart } from "lucide-react";
//#region src/routes/products.$slug.tsx?tsr-split=component
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
	return /* @__PURE__ */ jsx(MarketingLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10",
		children: [/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Card, {
			className: "overflow-hidden shadow-card",
			children: /* @__PURE__ */ jsx("div", {
				className: "aspect-video bg-muted",
				children: p.image_url && /* @__PURE__ */ jsx("img", {
					src: p.image_url,
					alt: p.name,
					className: "w-full h-full object-cover"
				})
			})
		}) }), /* @__PURE__ */ jsxs("div", { children: [
			p.categories && /* @__PURE__ */ jsx(Badge, {
				variant: "secondary",
				children: p.categories.name
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-3 text-4xl font-display font-bold",
				children: p.name
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-3 text-muted-foreground",
				children: p.description || p.short_description
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6 flex items-baseline gap-2",
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-3xl font-display font-bold text-primary",
					children: money(p.price)
				}), /* @__PURE__ */ jsx("div", {
					className: "text-muted-foreground",
					children: "/ month"
				})]
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "mt-6 space-y-2 text-sm",
				children: [
					"Instant activation",
					"Cancel anytime",
					"24/7 support",
					`${p.commission_percent}% reseller commission`
				].map((f) => /* @__PURE__ */ jsxs("li", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-success" }), f]
				}, f))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-8 flex gap-3",
				children: [/* @__PURE__ */ jsxs(Button, {
					size: "lg",
					className: "bg-brand-gradient text-white border-0 hover:opacity-90",
					onClick: addToCart,
					children: [/* @__PURE__ */ jsx(ShoppingCart, { className: "w-4 h-4" }), " Add to cart"]
				}), /* @__PURE__ */ jsx(Button, {
					size: "lg",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ jsx(Link, {
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
