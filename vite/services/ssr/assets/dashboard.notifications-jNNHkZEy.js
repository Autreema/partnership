import { t as supabase } from "./client-DRzh4j6T.js";
import { t as Route } from "./dashboard.notifications-O8fHvxLu.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { t as dateFmt } from "./format-yU-BRXA1.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
//#region src/routes/_authenticated/dashboard.notifications.tsx?tsr-split=component
function Notif() {
	const { user } = Route.useRouteContext();
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["notifications", user.id],
		queryFn: async () => (await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false })).data ?? []
	});
	async function markAll() {
		await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
		qc.invalidateQueries({ queryKey: ["notifications"] });
	}
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between mb-6",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-display font-bold",
			children: "Notifications"
		}), /* @__PURE__ */ jsx(Button, {
			size: "sm",
			variant: "outline",
			onClick: markAll,
			children: "Mark all read"
		})]
	}), (data ?? []).length === 0 ? /* @__PURE__ */ jsxs(Card, {
		className: "p-8 text-center shadow-card",
		children: [/* @__PURE__ */ jsx(Bell, { className: "w-8 h-8 mx-auto text-muted-foreground mb-2" }), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground",
			children: "You're all caught up."
		})]
	}) : /* @__PURE__ */ jsx("div", {
		className: "space-y-2",
		children: (data ?? []).map((n) => /* @__PURE__ */ jsx(Card, {
			className: `p-4 shadow-card ${!n.read ? "border-primary/40 bg-accent/30" : ""}`,
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "font-medium",
					children: n.title
				}), n.body && /* @__PURE__ */ jsx("div", {
					className: "text-sm text-muted-foreground",
					children: n.body
				})] }), /* @__PURE__ */ jsx("div", {
					className: "text-xs text-muted-foreground",
					children: dateFmt(n.created_at)
				})]
			})
		}, n.id))
	})] });
}
//#endregion
export { Notif as component };
