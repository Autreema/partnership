import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as supabase } from "./client-DRzh4j6T.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { F as Circle } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as money } from "./format-yU-BRXA1.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./dashboard.checkout-HzJ8ie2b.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/@radix-ui/react-radio-group+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.checkout-ClRUkOFb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
var METHODS = [
	{
		id: "credit_card",
		label: "Credit Card"
	},
	{
		id: "debit_card",
		label: "Debit Card"
	},
	{
		id: "upi",
		label: "UPI"
	},
	{
		id: "wallet",
		label: "Wallet"
	},
	{
		id: "net_banking",
		label: "Net Banking"
	}
];
function Checkout() {
	const { user } = Route.useRouteContext();
	const qc = useQueryClient();
	const navigate = useNavigate();
	const [method, setMethod] = (0, import_react.useState)("credit_card");
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const { data: items } = useQuery({
		queryKey: [
			"cart",
			user.id,
			"checkout"
		],
		queryFn: async () => (await supabase.from("cart_items").select("*, products(id, name, price, commission_percent)").eq("user_id", user.id)).data ?? []
	});
	const subtotal = (items ?? []).reduce((s, i) => s + Number(i.products?.price ?? 0) * i.quantity, 0);
	const total = subtotal;
	async function pay() {
		if (!items || items.length === 0) return toast.error("Cart is empty");
		setProcessing(true);
		const refCode = typeof window !== "undefined" ? window.localStorage.getItem("ref_code") : null;
		let referrerId = null;
		if (refCode) {
			const { data: ref } = await supabase.from("referrals").select("reseller_id").eq("code", refCode).maybeSingle();
			referrerId = ref?.reseller_id ?? null;
		}
		const { data: order, error: oErr } = await supabase.from("orders").insert({
			user_id: user.id,
			referrer_id: referrerId,
			subtotal,
			tax: 0,
			total,
			status: "paid",
			payment_method: method
		}).select().single();
		if (oErr || !order) {
			setProcessing(false);
			return toast.error(oErr?.message ?? "Failed");
		}
		const orderItems = items.map((i) => ({
			order_id: order.id,
			product_id: i.product_id,
			product_name: i.products?.name ?? "",
			unit_price: Number(i.products?.price ?? 0),
			quantity: i.quantity,
			line_total: Number(i.products?.price ?? 0) * i.quantity,
			commission_percent: Number(i.products?.commission_percent ?? 0)
		}));
		await supabase.from("order_items").insert(orderItems);
		await supabase.from("payments").insert({
			order_id: order.id,
			user_id: user.id,
			amount: total,
			method,
			status: "success"
		});
		const expires = /* @__PURE__ */ new Date();
		expires.setDate(expires.getDate() + 30);
		await supabase.from("subscriptions").insert(items.map((i) => ({
			user_id: user.id,
			product_id: i.product_id,
			status: "active",
			expires_at: expires.toISOString()
		})));
		await supabase.from("notifications").insert({
			user_id: user.id,
			title: "Order confirmed",
			body: `Your order ${order.order_number} has been paid.`,
			type: "order"
		});
		await supabase.from("cart_items").delete().eq("user_id", user.id);
		qc.invalidateQueries();
		setProcessing(false);
		toast.success("Payment successful!");
		navigate({ to: "/dashboard/orders" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-display font-bold mb-6",
		children: "Checkout"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid lg:grid-cols-3 gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "lg:col-span-2 p-6 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display font-semibold mb-4",
					children: "Payment method"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
					value: method,
					onValueChange: setMethod,
					className: "grid sm:grid-cols-2 gap-3",
					children: METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: m.id,
						className: `flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${method === m.id ? "border-primary bg-accent/50" : "hover:bg-accent/30"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
							id: m.id,
							value: m.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: m.label
						})]
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: "This is a simulated payment — no real charge is made."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 shadow-card h-fit",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display font-semibold mb-4",
					children: "Order"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm mb-4",
					children: (items ?? []).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							children: [
								i.products?.name,
								" × ",
								i.quantity
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-3",
							children: money(Number(i.products?.price ?? 0) * i.quantity)
						})]
					}, i.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border pt-3 flex justify-between font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(total) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full mt-6 bg-brand-gradient text-white border-0",
					disabled: processing,
					onClick: pay,
					children: processing ? "Processing…" : `Pay ${money(total)}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					className: "w-full mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard/cart",
						children: "Back to cart"
					})
				})
			]
		})]
	})] });
}
//#endregion
export { Checkout as component };
