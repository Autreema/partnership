import { t as supabase } from "./client-DRzh4j6T.js";
import { t as Route } from "./dashboard.cart-CZ0bqA8J.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { n as money } from "./format-yU-BRXA1.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
//#region src/routes/_authenticated/dashboard.cart.tsx?tsr-split=component
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
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
		className: "text-2xl font-display font-bold mb-6",
		children: "Your cart"
	}), (items ?? []).length === 0 ? /* @__PURE__ */ jsxs(Card, {
		className: "p-12 text-center shadow-card",
		children: [
			/* @__PURE__ */ jsx(ShoppingCart, { className: "w-10 h-10 mx-auto text-muted-foreground mb-3" }),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground",
				children: "Your cart is empty."
			}),
			/* @__PURE__ */ jsx(Button, {
				asChild: true,
				className: "mt-4",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/dashboard/browse",
					children: "Browse products"
				})
			})
		]
	}) : /* @__PURE__ */ jsxs("div", {
		className: "grid lg:grid-cols-3 gap-6",
		children: [/* @__PURE__ */ jsx("div", {
			className: "lg:col-span-2 space-y-3",
			children: (items ?? []).map((i) => /* @__PURE__ */ jsxs(Card, {
				className: "p-4 shadow-card flex gap-4 items-center",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "w-20 h-20 rounded bg-muted overflow-hidden shrink-0",
						children: i.products?.image_url && /* @__PURE__ */ jsx("img", {
							src: i.products.image_url,
							alt: "",
							className: "w-full h-full object-cover"
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ jsx("div", {
							className: "font-medium",
							children: i.products?.name
						}), /* @__PURE__ */ jsxs("div", {
							className: "text-sm text-muted-foreground",
							children: [money(i.products?.price ?? 0), " each"]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(Button, {
								size: "icon",
								variant: "outline",
								onClick: () => updateQty(i.id, i.quantity - 1),
								children: /* @__PURE__ */ jsx(Minus, { className: "w-3 h-3" })
							}),
							/* @__PURE__ */ jsx("span", {
								className: "w-8 text-center",
								children: i.quantity
							}),
							/* @__PURE__ */ jsx(Button, {
								size: "icon",
								variant: "outline",
								onClick: () => updateQty(i.id, i.quantity + 1),
								children: /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" })
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "font-semibold w-20 text-right",
						children: money(Number(i.products?.price ?? 0) * i.quantity)
					}),
					/* @__PURE__ */ jsx(Button, {
						size: "icon",
						variant: "ghost",
						onClick: () => remove(i.id),
						children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-destructive" })
					})
				]
			}, i.id))
		}), /* @__PURE__ */ jsxs(Card, {
			className: "p-6 shadow-card h-fit",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "font-display font-semibold text-lg mb-4",
					children: "Summary"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between text-sm mb-1",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: "Subtotal"
					}), /* @__PURE__ */ jsx("span", { children: money(total) })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between text-sm mb-3",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: "Tax"
					}), /* @__PURE__ */ jsx("span", { children: money(0) })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between font-semibold border-t border-border pt-3",
					children: [/* @__PURE__ */ jsx("span", { children: "Total" }), /* @__PURE__ */ jsx("span", { children: money(total) })]
				}),
				/* @__PURE__ */ jsx(Button, {
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
