import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as supabase } from "./client-DRzh4j6T.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { B as Bell } from "../_libs/lucide-react.mjs";
import { t as dateFmt } from "./format-yU-BRXA1.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./dashboard.notifications-O8fHvxLu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.notifications-jNNHkZEy.js
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-display font-bold",
			children: "Notifications"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "outline",
			onClick: markAll,
			children: "Mark all read"
		})]
	}), (data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-8 text-center shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-8 h-8 mx-auto text-muted-foreground mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "You're all caught up."
		})]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: (data ?? []).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: `p-4 shadow-card ${!n.read ? "border-primary/40 bg-accent/30" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium",
					children: n.title
				}), n.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: n.body
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: dateFmt(n.created_at)
				})]
			})
		}, n.id))
	})] });
}
//#endregion
export { Notif as component };
