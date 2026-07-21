import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as supabase } from "./client-DRzh4j6T.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { M as Download } from "../_libs/lucide-react.mjs";
import { n as money, t as dateFmt } from "./format-yU-BRXA1.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Route } from "./dashboard.orders-BiEHt1qh.mjs";
import { t as E } from "../_libs/jspdf.mjs";
import { t as autoTable } from "../_libs/jspdf-autotable.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.orders-CMHrprDZ.js
var import_jsx_runtime = require_jsx_runtime();
function Orders() {
	const { user } = Route.useRouteContext();
	const { data } = useQuery({
		queryKey: [
			"orders",
			user.id,
			"list"
		],
		queryFn: async () => (await supabase.from("orders").select("*, order_items(*)").eq("user_id", user.id).order("created_at", { ascending: false })).data ?? []
	});
	function invoice(o) {
		const doc = new E();
		doc.setFontSize(20);
		doc.text("PartnerShip Invoice", 14, 20);
		doc.setFontSize(10);
		doc.text(`Order: ${o.order_number}`, 14, 30);
		doc.text(`Date: ${dateFmt(o.created_at)}`, 14, 36);
		doc.text(`Status: ${o.status}`, 14, 42);
		autoTable(doc, {
			startY: 50,
			head: [[
				"Product",
				"Qty",
				"Unit",
				"Total"
			]],
			body: (o.order_items ?? []).map((it) => [
				it.product_name,
				it.quantity,
				money(it.unit_price),
				money(it.line_total)
			])
		});
		const y = doc.lastAutoTable.finalY + 10;
		doc.setFontSize(12);
		doc.text(`Total: ${money(o.total)}`, 14, y);
		doc.save(`invoice-${o.order_number}.pdf`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-display font-bold mb-6",
			children: "Order history"
		}),
		(data ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-8 text-center text-muted-foreground shadow-card",
			children: "No orders yet."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: (data ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-between items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: o.order_number
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							dateFmt(o.created_at),
							" · ",
							o.payment_method
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: o.status === "paid" ? "default" : "secondary",
								className: "capitalize",
								children: o.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: money(o.total)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => invoice(o),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3 h-3" }), " Invoice"]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 text-sm text-muted-foreground space-y-1",
					children: (o.order_items ?? []).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						it.product_name,
						" × ",
						it.quantity,
						" — ",
						money(it.line_total)
					] }, it.id))
				})]
			}, o.id))
		})
	] });
}
//#endregion
export { Orders as component };
