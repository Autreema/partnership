import { t as supabase } from "./client-DRzh4j6T.js";
import { t as Route } from "./dashboard.orders-BiEHt1qh.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { n as money, t as dateFmt } from "./format-yU-BRXA1.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
//#region src/routes/_authenticated/dashboard.orders.tsx?tsr-split=component
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
		const doc = new jsPDF();
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
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-display font-bold mb-6",
			children: "Order history"
		}),
		(data ?? []).length === 0 && /* @__PURE__ */ jsx(Card, {
			className: "p-8 text-center text-muted-foreground shadow-card",
			children: "No orders yet."
		}),
		/* @__PURE__ */ jsx("div", {
			className: "space-y-3",
			children: (data ?? []).map((o) => /* @__PURE__ */ jsxs(Card, {
				className: "p-5 shadow-card",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap justify-between items-start gap-3",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "font-medium",
						children: o.order_number
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-xs text-muted-foreground",
						children: [
							dateFmt(o.created_at),
							" · ",
							o.payment_method
						]
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsx(Badge, {
								variant: o.status === "paid" ? "default" : "secondary",
								className: "capitalize",
								children: o.status
							}),
							/* @__PURE__ */ jsx("div", {
								className: "font-semibold",
								children: money(o.total)
							}),
							/* @__PURE__ */ jsxs(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => invoice(o),
								children: [/* @__PURE__ */ jsx(Download, { className: "w-3 h-3" }), " Invoice"]
							})
						]
					})]
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-3 text-sm text-muted-foreground space-y-1",
					children: (o.order_items ?? []).map((it) => /* @__PURE__ */ jsxs("li", { children: [
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
