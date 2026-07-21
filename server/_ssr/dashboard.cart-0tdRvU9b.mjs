import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as supabase } from "./client-DRzh4j6T.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { T as Minus, b as Plus, l as Trash2, p as ShoppingCart } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as money } from "./format-yU-BRXA1.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./dashboard.cart-CZ0bqA8J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.cart-0tdRvU9b.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { user } = Route.useRouteContext();
	const qc = useQueryClient();
	const navigate = useNavigate();
	const { data: items } = useQuery({
		queryKey: [
			"cart",
			user.id,
			"detail"
		],
		queryFn: async () => (await supabase.from("cart_items").select("*, products(id, name, price, image_url, commission_percent)").eq("user_id", user.id)).data ?? []
	});
	async function updateQty(id, q) {
		if (q < 1) return;
		await supabase.from("cart_items").update({ quantity: q }).eq("id", id);
		qc.invalidateQueries({ queryKey: ["cart"] });
	}
	async function remove(id) {
		await supabase.from("cart_items").delete().eq("id", id);
		qc.invalidateQueries({ queryKey: ["cart"] });
		toast.success("Removed");
	}
	const total = (items ?? []).reduce((s, i) => s + Number(i.products?.price ?? 0) * i.quantity, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-display font-bold mb-6",
		children: "Your cart"
	}), (items ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-12 text-center shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-10 h-10 mx-auto text-muted-foreground mb-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Your cart is empty."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard/browse",
					children: "Browse products"
				})
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid lg:grid-cols-3 gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:col-span-2 space-y-3",
			children: (items ?? []).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4 shadow-card flex gap-4 items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 rounded bg-muted overflow-hidden shrink-0",
						children: i.products?.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: i.products.image_url,
							alt: "",
							className: "w-full h-full object-cover"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium",
							children: i.products?.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted-foreground",
							children: [money(i.products?.price ?? 0), " each"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "outline",
								onClick: () => updateQty(i.id, i.quantity - 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-3 h-3" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 text-center",
								children: i.quantity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "outline",
								onClick: () => updateQty(i.id, i.quantity + 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3 h-3" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold w-20 text-right",
						children: money(Number(i.products?.price ?? 0) * i.quantity)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						onClick: () => remove(i.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4 text-destructive" })
					})
				]
			}, i.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 shadow-card h-fit",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display font-semibold text-lg mb-4",
					children: "Summary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-sm mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Subtotal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(total) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-sm mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Tax"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(0) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between font-semibold border-t border-border pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(total) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full mt-6 bg-brand-gradient text-white border-0",
					onClick: () => navigate({ to: "/dashboard/checkout" }),
					children: "Checkout"
				})
			]
		})]
	})] });
}
//#endregion
export { CartPage as component };
